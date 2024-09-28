'use client';
import { Flex, Text, usePrismaneTheme } from '@prismane/core';
import { DownloadSimple } from '@phosphor-icons/react';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import Typewriter from 'typewriter-effect';

interface Props {
  setVideo: Dispatch<SetStateAction<File | null>>;
}

export default function FormDownload({ setVideo }: Props) {
  const { theme } = usePrismaneTheme();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    try {
      const selectedFile = event.target.files?.[0] || null;
      console.log(selectedFile);
      if (selectedFile) {
        setVideo(selectedFile);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Flex w={'100%'} mih={'70vh'} p={'16px'} bg={theme.colors.base['800']} br={'base'} direction={'column'} gap={'3rem'}>
      <Flex pos={'relative'} w={'100%'} h={'100%'} br={'base'} bg={theme.colors.base['700']} justify={'center'} align={'center'}>
        <input
          name={'file'}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
          type="file"
          accept="video/mp4"
          onChange={handleFileChange}
        />
        <Flex direction={'column'} justify={'center'} align={'center'} gap={'1rem'} w={'50%'}>
          <DownloadSimple size={64} />
          <Text as={'h3'}>
            <Typewriter
              options={{
                delay: 75,
                loop: false,
              }}
              onInit={(typewriter) => {
                typewriter.typeString('Загрузить видео').start();
              }}
            />
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
