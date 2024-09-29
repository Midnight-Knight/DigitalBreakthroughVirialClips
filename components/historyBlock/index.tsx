'use client';
import { Flex, Image, usePrismaneTheme, Text, Button, Link, Center } from '@prismane/core';
import { useEffect, useState } from 'react';
import getId, { status, clip } from '@/api/getId';
import NotFound from '@/public/NotFound.png';

interface Props {
  fileId: string;
}

export default function HistoryBlock({ fileId }: Props) {
  const { theme } = usePrismaneTheme();
  const [clip, setClip] = useState<status | clip | null>(null);

  useEffect(() => {
    getId(setClip, fileId);
  }, []);

  function Sum(clip: clip) {
    let sum = 0;
    for (let i = 0; i < clip.highlights.length; i++) {
      sum += clip.highlights[i].virality;
    }
    return sum / clip.highlights.length;
  }

  return (
    <>
      <Flex direction="row" justify="start" align="center" gap={'2rem'} bg={theme.colors.base['800']} br={'base'} p={'1rem'}>
        {clip && clip.status !== 'notFound' ? (
          <Center w={'100%'} h={'20vh'} br={'base'} of={'hidden'}>
            <video style={{ width: '100%', height: '100%', borderRadius: 6, overflow: 'hidden' }} src={clip.link}>
              Your browser does not support the video tag.
            </video>
          </Center>
        ) : (
          <Image w={'100%'} h={'20vh'} br={'base'} src={NotFound.src} alt={'notFound'} />
        )}
        <Flex w={'100%'} direction="column" justify="end" align="start" gap={'1rem'}>
          <Text as={'h5'}>Название: {clip && clip.status !== 'notFound' ? clip.title : ''}</Text>
          <Text as={'h5'}>
            Статус:{' '}
            {clip && clip.status !== 'notFound'
              ? clip.status === 'Ready'
                ? 'Обработано'
                : clip.status === 'DownloadingToBackend'
                  ? 'Загрузка в модуль ML'
                  : 'Обработка в модуле ML'
              : 'Неизвестно/Ошибка'}
          </Text>
          <Text as={'h5'}>Количество клипов: {clip && clip.status !== 'notFound' ? clip.highlights.length : ''}</Text>
          {clip && clip.status === 'Ready' && (
            <Text as={'h5'}>Средняя виральность: {clip && clip.status === 'Ready' ? Sum(clip) : ''}</Text>
          )}
          {clip && clip.status === 'Ready' && (
            <Link w={'100%'} href={'/' + fileId} target={'_blank'} underline="none">
              <Button w={'100%'} size="base" variant="primary">
                Посмотреть
              </Button>
            </Link>
          )}
        </Flex>
      </Flex>
    </>
  );
}
