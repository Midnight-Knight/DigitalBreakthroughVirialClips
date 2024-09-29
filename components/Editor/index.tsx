import { AspectRatio, Button, Center, Flex, NumberField, Radio, Text, TextField, usePrismaneTheme } from '@prismane/core';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import createId from '@/api/createId';
import getId, { clip, status } from '@/api/getId';
import createClips from '@/api/createClips';
import { useRouter } from 'next/navigation';

interface Props {
  file: File;
}

export default function Editor({ file }: Props) {
  const router = useRouter();
  const { theme } = usePrismaneTheme();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [value, setValue] = useState(2);
  const [valueRadio, setValueRadio] = useState<string>('true');
  const [time, setTime] = useState<number>(15);
  const [input, setInput] = useState(file.name);
  const [fileId, setFileId] = useState<string | null>(null);
  const [status, setStatus] = useState<boolean>(false);
  const [clip, setClip] = useState<status | clip | null>(null);

  useEffect(() => {
    if (file && videoRef.current) {
      const videoURL = URL.createObjectURL(file);
      videoRef.current.src = videoURL;

      const handleLoadedMetadata = () => {
        if (videoRef.current) {
          setDuration(videoRef.current.duration);
        }
      };

      videoRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);

      // Очистка объекта URL при размонтировании компонента
      return () => {
        URL.revokeObjectURL(videoURL);
        videoRef.current?.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, [file]);

  useEffect(() => {
    if (value <= 1 && value < 20) {
      setValue(2);
    }
  }, [value]);

  useEffect(() => {
    if (time <= 0) {
      setTime(1);
    }
  }, [time]);

  function Timer() {
    if (clip === null || (clip && clip.status !== 'Ready')) {
      console.log('Fetching clip status...');
      if (fileId) {
        getId(setClip, fileId);
      }
    }
  }

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (status) {
      interval = setInterval(() => {
        Timer();
      }, 30000);
    }

    // Очищаем интервал при размонтировании компонента или если статус меняется
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [status, clip]);

  useEffect(() => {
    if (fileId) {
      createClips(setStatus, file, valueRadio === 'true' ? 0 : value, fileId);
    }
  }, [fileId]);

  useEffect(() => {
    if (status) {
      Timer();
    }
  }, [status]);

  useEffect(() => {
    if (clip && clip.status === 'Ready') {
      router.push('/' + fileId);
    }
  }, [clip]);

  return (
    <Flex
      w={'100%'}
      mih={'70vh'}
      p={'16px'}
      bg={theme.colors.base['800']}
      br={'base'}
      direction={'column'}
      gap={'3rem'}
      justify={'start'}
      align={'start'}>
      <Flex w={'100%'} h={'100%'} direction={'row'} justify={'start'} align={'start'} gap={'2rem'}>
        <AspectRatio w={'75%'} ratio={'16/9'} bg={theme.colors.base['700']} br={'base'}>
          <Center>
            <video style={{ width: '100%', aspectRatio: '16/9', borderRadius: '6px' }} ref={videoRef} controls>
              Your browser does not support the video tag.
            </video>
          </Center>
        </AspectRatio>
        <Flex w={'25%'} direction={'column'} justify={'start'} align={'start'} gap={'1rem'} pt={'2rem'}>
          <Flex direction={'column'} w={'100%'} gap={'0.5rem'} justify={'start'} align={'start'}>
            <Text as={'h4'}>Название</Text>
            <TextField value={input} onChange={(e) => setInput(e.target.value)} placeholder="Введите название" />
          </Flex>
          {duration && <Text as={'h4'}>Длительность: {Math.floor(duration)} сек</Text>}
          <Flex direction={'column'} w={'100%'} gap={'0.5rem'} justify={'start'} align={'start'}>
            <Text as={'h4'}>Количество клипов</Text>
            <Radio.Group name="answer" value={valueRadio} onChange={(e: ChangeEvent<HTMLInputElement>) => setValueRadio(e.target.value)}>
              <Radio value="true" label="Произвольное кол-во" />
              <Radio value="false" label="Заданное кол-во" />
            </Radio.Group>
            <NumberField disabled={valueRadio === 'true'} value={value} onChange={(e) => setValue(Number(e.target.value))} />
          </Flex>
          <Button
            w={'100%'}
            size="md"
            variant="tertiary"
            disabled={status}
            onClick={() => {
              location.reload();
            }}>
            Очистить
          </Button>
          <Button
            w={'100%'}
            size="md"
            variant="primary"
            disabled={status}
            onClick={() => {
              createId(setFileId);
            }}>
            Отправить
          </Button>
          <Flex direction={'column'} w={'100%'} gap={'0.5rem'} justify={'start'} align={'start'}>
            <Text as={'h4'}>
              Статус:{' '}
              {fileId === null
                ? 'Ожидает отправки'
                : clip === null
                  ? 'Отправляет на Backend'
                  : clip.status === 'DownloadingToBackend'
                    ? 'Отправка в модуль ML'
                    : clip.status === 'ProcessingInMl'
                      ? 'Обработка в модуле ML'
                      : clip.status === 'Ready'
                        ? 'Обработано'
                        : 'Неизвестно/Ошибка'}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

/*<Flex direction={'column'} w={'100%'} gap={'0.5rem'} justify={'start'} align={'start'}>
            <Text as={'h4'}>Время клипов в секундах</Text>
            <Radio.Group name="answer" value={timeRadio} onChange={(e: ChangeEvent<HTMLInputElement>) => setTimeRadio(e.target.value)}>
              <Radio value="true" label="Произвольное кол-во" />
              <Radio value="false" label="Заданное кол-во" />
            </Radio.Group>
            <NumberField disabled={timeRadio === 'true'} value={time} onChange={(e) => setTime(Number(e.target.value))} />
          </Flex>*/
