import { Dispatch, SetStateAction } from 'react';

export default async function createId(setFileId: Dispatch<SetStateAction<string | null>>) {
  const response = await fetch('https://graciously-direct-hoopoe.cloudpub.ru/api/videoId', {
    method: 'GET',
  });

  console.log(response);

  const { videoId } = await response.json();
  setFileId(videoId);
}
