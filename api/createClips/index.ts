import { Dispatch, SetStateAction } from 'react';

export default async function createClips(
  setStatus: Dispatch<SetStateAction<boolean>>,
  file: File,
  quantity: number | null,
  fileId: string,
) {
  const formData = new FormData();
  formData.append('video', file); // видео
  formData.append('clipsCount', String(quantity)); // кол-во клипов
  formData.append('title', file.name); // название файла
  formData.append('id', fileId); // id файла
  const response = fetch('https://graciously-direct-hoopoe.cloudpub.ru/api/postVideo', {
    method: 'POST',
    body: formData,
  });
  setStatus(true);
}
