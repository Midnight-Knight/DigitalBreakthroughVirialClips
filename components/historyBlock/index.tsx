'use client';
import { Flex, Image, usePrismaneTheme, Text, Button, Modal } from '@prismane/core';
import { useState } from 'react';

export default function HistoryBlock() {
  const { theme } = usePrismaneTheme();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Modal w={'60vw'} open={open} onClose={() => setOpen(false)} closable>
        <Text cl="white">This is a simple modal</Text>
      </Modal>
      <Flex direction="row" justify="start" align="center" gap={'2rem'} bg={theme.colors.base['800']} br={'base'} p={'1rem'}>
        <Image w={'100%'} h={'20vh'} br={'base'} src={''} alt={''} />
        <Flex w={'100%'} direction="column" justify="end" align="start" gap={'1rem'}>
          <Text as={'h5'}>Название:</Text>
          <Text as={'h5'}>Количество клипов:</Text>
          <Text as={'h5'}>Виральность:</Text>
          <Button w={'100%'} size="base" variant="primary" onClick={() => setOpen(!open)}>
            Посмотреть
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
