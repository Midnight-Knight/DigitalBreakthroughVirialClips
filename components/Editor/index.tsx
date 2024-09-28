import { AspectRatio, Button, Center, Flex, NumberField, Radio, Text, usePrismaneTheme } from '@prismane/core';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

interface Props {
  file: File;
}

export default function Editor({ file }: Props) {
  const { theme } = usePrismaneTheme();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [value, setValue] = useState(0);
  const [valueRadio, setValueRadio] = useState<string>('true');
  const [time, setTime] = useState<number>(15);
  const [timeRadio, setTimeRadio] = useState<string>('true');

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
    if (value <= 0) {
      setValue(1);
    }
  }, [value]);

  useEffect(() => {
    if (time <= 0) {
      setTime(1);
    }
  }, [time]);

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
          <Text as={'h4'} style={{ whiteSpace: 'break-word', overflowWrap: 'break-word', wordBreak: 'break-all' }}>
            Название: {file.name}
          </Text>
          {duration && <Text as={'h4'}>Длительность: {Math.floor(duration)} сек</Text>}
          <Flex direction={'column'} w={'100%'} gap={'0.5rem'} justify={'start'} align={'start'}>
            <Text as={'h4'}>Количество клипов</Text>
            <Radio.Group name="answer" value={valueRadio} onChange={(e: ChangeEvent<HTMLInputElement>) => setValueRadio(e.target.value)}>
              <Radio value="true" label="Произвольное кол-во" />
              <Radio value="false" label="Заданное кол-во" />
            </Radio.Group>
            <NumberField disabled={valueRadio === 'true'} value={value} onChange={(e) => setValue(Number(e.target.value))} />
          </Flex>
          <Flex direction={'column'} w={'100%'} gap={'0.5rem'} justify={'start'} align={'start'}>
            <Text as={'h4'}>Время клипов в секундах</Text>
            <Radio.Group name="answer" value={timeRadio} onChange={(e: ChangeEvent<HTMLInputElement>) => setTimeRadio(e.target.value)}>
              <Radio value="true" label="Произвольное кол-во" />
              <Radio value="false" label="Заданное кол-во" />
            </Radio.Group>
            <NumberField disabled={timeRadio === 'true'} value={time} onChange={(e) => setTime(Number(e.target.value))} />
          </Flex>
          <Button
            w={'100%'}
            size="md"
            variant="tertiary"
            onClick={() => {
              location.reload();
            }}>
            Очистить
          </Button>
          <Button w={'100%'} size="md" variant="primary" onClick={() => {}}>
            Отправить
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
