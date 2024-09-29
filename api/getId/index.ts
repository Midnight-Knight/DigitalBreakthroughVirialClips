import { Dispatch, SetStateAction } from 'react';

export interface clip {
  status: 'Ready' | 'DownloadingToBackend' | 'ProcessingInMl';
  link: string;
  title: string;
  highlights: {
    start: number;
    end: number;
    virality: number;
    file: string;
    transcription: {
      text: string;
      start: number;
      end: number;
    }[];
  }[];
}

export interface status {
  status: 'notFound';
}

export default async function getId(setGetId: Dispatch<SetStateAction<clip | status | null>>, fileId: string) {
  try {
    const response = await fetch('https://graciously-direct-hoopoe.cloudpub.ru/api/getVideo?videoId=' + fileId, {
      method: 'GET',
    });

    const data = await response.json();
    setGetId(data);
  } catch (error) {
    setGetId({ status: 'notFound' });
  }
}
