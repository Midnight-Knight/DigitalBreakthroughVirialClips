import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';

interface Subtitle {
  start: number; // Начало субтитра в секундах
  end: number; // Конец субтитра в секундах
  text: string; // Текст субтитра
}

const ffmpeg = new FFmpeg();

export async function addSubtitlesToVideo(videoFile: File, subtitles: Subtitle[]): Promise<File> {
  if (!ffmpeg.loaded) {
    await ffmpeg.load(); // Загружаем FFmpeg в память
  }

  // 1. Преобразуем субтитры в формат WebVTT
  const generateVTT = () => {
    let vttText = 'WEBVTT\n\n';
    subtitles.forEach((subtitle, index) => {
      const start = new Date(subtitle.start * 1000).toISOString().substr(11, 12);
      const end = new Date(subtitle.end * 1000).toISOString().substr(11, 12);
      vttText += `${index + 1}\n${start} --> ${end}\n${subtitle.text}\n\n`;
    });
    return vttText;
  };

  // 2. Создаём Blob для VTT-файла субтитров
  const vttBlob = new Blob([generateVTT()], { type: 'text/vtt' });

  // 3. Записываем видео и субтитры в виртуальную файловую систему FFmpeg
  await ffmpeg.writeFile('input.mp4', await fetchFile(videoFile));
  await ffmpeg.writeFile('subtitles.vtt', await fetchFile(vttBlob));

  // 4. Запускаем FFmpeg для добавления субтитров к видео
  await ffmpeg.exec(
    [
      '-i',
      'input.mp4', // Входное видео
      '-vf',
      'subtitles=subtitles.vtt', // Встроенные субтитры
      'output.mp4',
    ], // Выходное видео
  );

  // 5. Получаем результат (видеофайл с субтитрами)
  const data = await ffmpeg.readFile('output.mp4');
  const videoBlob = typeof data !== 'string' ? new Blob([data.buffer], { type: 'video/mp4' }) : null;

  // 6. Преобразуем Blob в объект File для последующего скачивания
  if (videoBlob) {
    const outputFile = new File([videoBlob], 'video_with_subtitles.mp4', { type: 'video/mp4' });

    return outputFile;
  }
  return videoFile;
}
