import { Dispatch, SetStateAction } from 'react';

export default async function allId(setAllId: Dispatch<SetStateAction<string[]>>) {
  const response = await fetch('https://graciously-direct-hoopoe.cloudpub.ru/api/listVideos', {
    method: 'GET',
  });

  const { videos } = await response.json();
  setAllId(videos);
}
