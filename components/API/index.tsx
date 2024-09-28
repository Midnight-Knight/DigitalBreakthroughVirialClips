'use client';
import { Box, usePrismaneTheme, Text, Flex } from '@prismane/core';

export default function ApiBlock() {
  const { theme } = usePrismaneTheme();

  return (
    <Flex w={'100%'} mih={'70vh'} p={'16px'} bg={theme.colors.base['800']} br={'base'} direction={'column'} gap={'3rem'}>
      <Flex w={'100%'} direction={'column'} gap={'0.5rem'}>
        <Text as={'h3'}>1. Отправка через видео на обработку через FormData | JS/TS</Text>
        <Box w={'100%'} p={'8px'} bg={theme.colors.base['700']} br={'base'}>
          <code style={{ whiteSpace: 'pre-line' }}>
            {'const formData = new FormData();\n' +
              "          formData.append('video', file); // видео\n" +
              "          formData.append('quantityClips', quantity); // кол-во клипов\n" +
              "          const response = await fetch(url + '?title=' + file.name, {\n" +
              "          ㅤmethod: 'POST',\n" +
              '          ㅤbody: formData,\n' +
              '      });\n' +
              '\n' +
              '          const { fileId } = await response.json();'}
          </code>
        </Box>
        <Flex direction={'row'} gap={'1.5rem'}>
          <Flex w={'100%'} direction={'column'} gap={'0.25rem'}>
            <Text as={'h4'}>Данные FormData</Text>
            <Box w={'100%'} p={'8px'} bg={theme.colors.base['700']} br={'base'}>
              <code style={{ whiteSpace: 'pre-line' }}>{'{\nㅤvideo: File,\n' + 'ㅤquantityClips: number | null,\n}'}</code>
            </Box>
          </Flex>
          <Flex w={'100%'} direction={'column'} self={'stretch'} gap={'0.25rem'}>
            <Text as={'h4'}>Ответ в случае успеха</Text>
            <Box w={'100%'} p={'8px'} h={'100%'} bg={theme.colors.base['700']} br={'base'}>
              <code style={{ whiteSpace: 'pre-line' }}>{'{\nㅤfileId : number,\n}'}</code>
            </Box>
          </Flex>
        </Flex>
      </Flex>
      <Flex w={'100%'} direction={'column'} gap={'0.5rem'}>
        <Text as={'h3'}>2. Получение данных с обработки | JS/TS</Text>
        <Box w={'100%'} p={'8px'} bg={theme.colors.base['700']} br={'base'}>
          <code style={{ whiteSpace: 'pre-line' }}>
            {"const response = await fetch(url + '?fileId=' + fileId , {\n" +
              "      ㅤmethod: 'GET',\n" +
              '    });' +
              '\n\nconst {} = await response.json();'}
          </code>
        </Box>
        <Flex direction={'row'} gap={'1.5rem'}>
          <Flex w={'100%'} direction={'column'} gap={'0.25rem'}>
            <Text as={'h4'}>Ответ в случае успеха</Text>
            <Box w={'100%'} p={'8px'} bg={theme.colors.base['700']} br={'base'}>
              <code style={{ whiteSpace: 'pre-line' }}>{'{\nㅤvideo: File,\n' + 'ㅤquantityClips: number | null,\n}'}</code>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
