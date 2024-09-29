'use client';
import { AspectRatio, Button, Center, Flex, SegmentedField, Text, usePrismaneTheme } from '@prismane/core';
import { useEffect, useRef, useState } from 'react';
import getId, { clip, status } from '@/api/getId';
import { notFound } from 'next/navigation';

interface Props {
  fileId: string;
}

export default function ClipEditor({ fileId }: Props) {
  const { theme } = usePrismaneTheme();
  const [clip, setClip] = useState<status | clip | null>(null);
  const [segment, setSegment] = useState<string>('clips');
  const [current, setCurrent] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    getId(setClip, fileId);
  }, []);

  useEffect(() => {
    if (clip && (clip.status === 'notFound' || clip.status === 'DownloadingToBackend' || clip.status === 'ProcessingInMl')) {
      notFound();
    }
    if (clip && clip.status === 'Ready' && clip.highlights.length !== 0 && current === null) {
      console.log(clip.highlights[0]);
      setCurrent(0);
    }
  }, [clip]);

  function Sum(clip: clip) {
    let sum = 0;
    for (let i = 0; i < clip.highlights.length; i++) {
      sum += clip.highlights[i].virality;
    }
    return sum / clip.highlights.length;
  }

  const handleClipClick = (start: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = start; // Перематываем видео на указанное время// Автоматически воспроизводим
    }
  };

  return (
    clip && (
      <Flex direction={'column'} justify={'start'} align={'center'} gap={'2rem'} w={'100%'} mih={'80vh'} pt={'5rem'} pb={'1rem'}>
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
          <SegmentedField
            value={segment}
            onChange={(e) => setSegment(e.target.value)}
            options={[
              { element: 'Клипы', value: 'clips' },
              { element: 'Оригинальное видео', value: 'video' },
            ]}
          />
          {segment === 'clips' && (
            <Flex w={'100%'} h={'100%'} direction={'row'} justify={'start'} align={'start'} gap={'2rem'}>
              <Flex
                w={'33%'}
                direction={'column'}
                justify={'start'}
                align={'start'}
                gap={'1rem'}
                bg={theme.colors.base['700']}
                br={'base'}
                p={'1rem'}>
                <Text as={'h3'}>Список всех клипов</Text>
                <Text as={'h4'}>Кол-во клипов: {clip.status === 'Ready' ? clip.highlights.length : 0}</Text>
                <Text as={'h4'}>Средняя виральность: {clip && clip.status === 'Ready' ? Sum(clip) : 0}</Text>
                {clip.status === 'Ready' &&
                  clip.highlights.map((elem, index) => (
                    <Flex
                      key={'button_clip_' + index}
                      onClick={() => setCurrent(index)}
                      w={'100%'}
                      h={'17vh'}
                      p={'1rem'}
                      br={'base'}
                      cs={'pointer'}
                      direction={'row'}
                      gap={'1rem'}
                      justify={'start'}
                      align={'center'}
                      bdw={index === current ? 2 : undefined}
                      bds={index === current ? 'solid' : undefined}
                      bdc={index === current ? theme.colors.primary['900'] : undefined}
                      bg={theme.colors.base['600']}>
                      <AspectRatio h={'100%'} ratio={'1/1'} br={'base'} of={'hidden'}>
                        <video style={{ height: '100%', aspectRatio: '1/1', borderRadius: 6, overflow: 'hidden' }} src={elem.file}>
                          Your browser does not support the video tag.
                        </video>
                      </AspectRatio>
                      <Flex direction={'column'} gap={'0.5rem'} justify={'start'} align={'start'}>
                        <Text as={'h5'}>Клип номер: {index + 1}</Text>
                        <Text as={'h5'}>Вириальность: {elem.virality}</Text>
                        <Text as={'h5'}>Начинается клип с: {elem.start} сек</Text>
                        <Text as={'h5'}>Заканчивается на: {elem.end} сек</Text>
                        <a
                          style={{ width: '100%' }}
                          href={clip.status === 'Ready' ? elem.file : ''}
                          download={clip.status === 'Ready' ? clip.title + '_clip_' + (index + 1) : ''}
                          target="_blank">
                          <Button w={'100%'} size="base" variant="primary">
                            Скачать
                          </Button>
                        </a>
                      </Flex>
                    </Flex>
                  ))}
              </Flex>
              <Flex w={'66%'} direction={'row'} justify={'start'} align={'start'} gap={'2rem'}>
                <AspectRatio w={'100%'} bg={theme.colors.base['700']} br={'base'}>
                  <Center>
                    <video
                      ref={videoRef}
                      style={{ width: '100%', borderRadius: '6px' }}
                      src={clip.status === 'Ready' && clip.highlights.length !== 0 && current !== null ? clip.highlights[current].file : ''}
                      controls>
                      Your browser does not support the video tag.
                    </video>
                  </Center>
                </AspectRatio>
                <Flex
                  w={'100%'}
                  bg={theme.colors.base['700']}
                  direction={'column'}
                  justify={'start'}
                  align={'start'}
                  gap={'1rem'}
                  br={'base'}
                  p={'1rem'}>
                  <Text as={'h4'}>Субтитры и таймкоды</Text>
                  {clip.status === 'Ready' &&
                    current !== null &&
                    clip.highlights[current].transcription.map((elem, index) => (
                      <Flex
                        key={'transcriptions_' + index}
                        direction={'column'}
                        w={'100%'}
                        br={'base'}
                        p={'0.5rem'}
                        gap={'0.5rem'}
                        bg={theme.colors.base['600']}
                        cs={'pointer'}
                        onClick={() => handleClipClick(elem.start)}>
                        <Text as={'h5'}>Старт: {elem.start}</Text>
                        <Text as={'h5'}>Конец: {elem.end}</Text>
                        <Text as={'h5'} w={'100%'}>
                          {elem.text}
                        </Text>
                      </Flex>
                    ))}
                </Flex>
              </Flex>
            </Flex>
          )}
          {segment === 'video' && (
            <Flex w={'100%'} h={'100%'} direction={'row'} justify={'start'} align={'start'} gap={'2rem'}>
              <AspectRatio w={'75%'} ratio={'16/9'} bg={theme.colors.base['700']} br={'base'}>
                <Center>
                  <video
                    style={{ width: '100%', aspectRatio: '16/9', borderRadius: '6px' }}
                    src={clip.status === 'Ready' ? clip.link : ''}
                    controls>
                    Your browser does not support the video tag.
                  </video>
                </Center>
              </AspectRatio>
              <Flex w={'25%'} direction={'column'} justify={'start'} align={'start'} gap={'1rem'} pt={'2rem'}>
                <Text style={{ wordBreak: 'break-all' }} as={'h4'}>
                  Название: {clip.status === 'Ready' ? clip.title : ''}
                </Text>
                <Text as={'h4'}>Количество клипов: {clip.status === 'Ready' ? clip.highlights.length : '0'}</Text>
                <Text as={'h4'}>Средняя виральность: {clip && clip.status === 'Ready' ? Sum(clip) : 0}</Text>
                <a
                  style={{ width: '100%' }}
                  href={clip.status === 'Ready' ? clip.link : ''}
                  download={clip.status === 'Ready' ? clip.title : ''}
                  target="_blank">
                  <Button w={'100%'} size="md" variant="primary">
                    Скачать
                  </Button>
                </a>
              </Flex>
            </Flex>
          )}
        </Flex>
      </Flex>
    )
  );
}
