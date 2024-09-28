'use client';
import { Flex, SegmentedField } from '@prismane/core';
import { useState } from 'react';
import ApiBlock from '@/components/API';
import FormDownload from '@/components/FormDownload';
import Editor from '@/components/Editor';

export default function DownloadPage() {
  const [value, setValue] = useState('form');
  const [video, setVideo] = useState<File | null>(null);

  const style = {
    w: '100%',
    gap: '3rem',
    pt: '6rem',
    p: '3rem',
  };

  return (
    <Flex {...style} direction="column" justify={'start'} align={'start'}>
      <SegmentedField
        size={'md'}
        placeholder="Выбор вариант обработки видео"
        label="Выбор вариант обработки видео:"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        options={[
          { element: 'Форма', value: 'form' },
          { element: 'API', value: 'api' },
        ]}
      />
      {value === 'api' && <ApiBlock />}
      {value === 'form' && (video ? <Editor file={video} /> : <FormDownload setVideo={setVideo} />)}
    </Flex>
  );
}

// <Box w={'100%'} mih={'70vh'} bg={theme.colors.base['800']} br={'base'}></Box>
