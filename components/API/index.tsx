'use client';
import { Box, usePrismaneTheme, Text, Flex } from '@prismane/core';

export default function ApiBlock() {
  const { theme } = usePrismaneTheme();

  return (
    <Flex w={'100%'} mih={'70vh'} p={'16px'} bg={theme.colors.base['800']} br={'base'} direction={'column'} gap={'3rem'}>
      <Flex w={'100%'} direction={'column'} gap={'0.5rem'}>
        <Text as={'h3'}>1. Генерация id ключа | JS/TS</Text>
        <Box w={'100%'} p={'8px'} bg={theme.colors.base['700']} br={'base'}>
          <code style={{ whiteSpace: 'pre-line' }}>
            {"const response = await fetch('http://localhost:8080/createId', {\n" +
              "ㅤmethod: 'GET',\n" +
              '});\n' +
              '\n' +
              'const { fileId } = await response.json();'}
          </code>
        </Box>
        <Flex direction={'row'} gap={'1.5rem'}>
          <Flex w={'100%'} direction={'column'} gap={'0.25rem'}>
            <Text as={'h4'}>Данные ответа</Text>
            <Box w={'100%'} p={'8px'} bg={theme.colors.base['700']} br={'base'}>
              <code style={{ whiteSpace: 'pre-line' }}>{'{\nㅤfileId: number\n}'}</code>
            </Box>
          </Flex>
        </Flex>
      </Flex>
      <Flex w={'100%'} direction={'column'} gap={'0.5rem'}>
        <Text as={'h3'}>2. Отправка через видео на обработку через FormData | JS/TS</Text>
        <Box w={'100%'} p={'8px'} bg={theme.colors.base['700']} br={'base'}>
          <code style={{ whiteSpace: 'pre-line' }}>
            {'const formData = new FormData();\n\n' +
              "          formData.append('video', file); // видео\n" +
              "          formData.append('quantityClips', String(quantity)); // кол-во клипов\n" +
              "          formData.append('title', file.name); // название файла\n" +
              "          formData.append('fileId', String(fileId)); // id файла\n\n" +
              "          const response = await fetch('http://localhost:8080/createClips', {\n" +
              "          ㅤmethod: 'POST',\n" +
              '          ㅤbody: formData,\n' +
              '      });\n'}
          </code>
        </Box>
        <Flex direction={'row'} gap={'1.5rem'}>
          <Flex w={'100%'} direction={'column'} gap={'0.25rem'}>
            <Text as={'h4'}>Данные FormData</Text>
            <Box w={'100%'} p={'8px'} bg={theme.colors.base['700']} br={'base'}>
              <code style={{ whiteSpace: 'pre-line' }}>
                {'{\nㅤvideo: File,\n' + 'ㅤquantityClips: number | null,\n' + 'ㅤtitle: string,\n' + 'ㅤfileId: number,\n}'}
              </code>
            </Box>
          </Flex>
        </Flex>
      </Flex>
      <Flex w={'100%'} direction={'column'} gap={'0.5rem'}>
        <Text as={'h3'}>3. Получение данных с обработки | JS/TS</Text>
        <Box w={'100%'} p={'8px'} bg={theme.colors.base['700']} br={'base'}>
          <code style={{ whiteSpace: 'pre-line' }}>
            {"const response = await fetch('http://localhost:8080/getId', {\n" +
              "      ㅤmethod: 'POST',\n" +
              '      ㅤbody: { fileId: fileId },\n' +
              '    });' +
              '\n\nconst { data } = await response.json();'}
          </code>
        </Box>
        <Flex direction={'row'} gap={'1.5rem'}>
          <Flex w={'100%'} direction={'column'} gap={'0.25rem'}>
            <Text as={'h4'}>Ответ в случае успеха</Text>
            <Box w={'100%'} p={'8px'} bg={theme.colors.base['700']} br={'base'}>
              <code style={{ whiteSpace: 'pre-line' }}>
                {'{\nㅤstatus: number,\n' +
                  'ㅤvideo: string,\n' +
                  'ㅤclips: {\n' +
                  'ㅤㅤurl: string,\n' +
                  'ㅤㅤdynamic: number,\n' +
                  'ㅤㅤtranscriptions: {\n' +
                  'ㅤㅤㅤstart: number,\n' +
                  'ㅤㅤㅤend: number,\n' +
                  'ㅤㅤㅤtext: string,\n' +
                  'ㅤㅤ}[],\nㅤ}[],\n' +
                  'ㅤtranscriptions: {\n' +
                  'ㅤㅤstart: number,\n' +
                  'ㅤㅤend: number,\n' +
                  'ㅤㅤtext: string,\n' +
                  'ㅤ}[],\n' +
                  'ㅤdynamics: {\n' +
                  'ㅤㅤstart: number,\n' +
                  'ㅤㅤend: number,\n' +
                  'ㅤㅤdynamics: number,\n' +
                  'ㅤ}[]\n}'}
              </code>
            </Box>
          </Flex>
        </Flex>
      </Flex>
      <Flex w={'100%'} direction={'column'} gap={'0.5rem'}>
        <Text as={'h3'}>4. Получение всех fileId | JS/TS</Text>
        <Box w={'100%'} p={'8px'} bg={theme.colors.base['700']} br={'base'}>
          <code style={{ whiteSpace: 'pre-line' }}>
            {"const response = await fetch('http://localhost:8080/allId', {\n" +
              "      ㅤmethod: 'GET',\n" +
              '    });' +
              '\n\nconst { responseAllId } = await response.json();'}
          </code>
        </Box>
        <Flex direction={'row'} gap={'1.5rem'}>
          <Flex w={'100%'} direction={'column'} gap={'0.25rem'}>
            <Text as={'h4'}>Ответ в случае успеха</Text>
            <Box w={'100%'} p={'8px'} bg={theme.colors.base['700']} br={'base'}>
              <code style={{ whiteSpace: 'pre-line' }}>{'{\nㅤallFileId: number[]\n}'}</code>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
