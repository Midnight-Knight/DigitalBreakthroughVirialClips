'use client';

import { Box, usePrismaneTheme } from '@prismane/core';

export default function ApiBlock() {
  const { theme } = usePrismaneTheme();

  return (
    <Box w={'100%'} mih={'70vh'} p={'16px'} bg={theme.colors.base['800']} br={'base'}>
      <Box w={'100%'} mih={'100%'} p={'8px'} bg={theme.colors.base['700']} br={'base'}>
        <code style={{ whiteSpace: 'pre-line' }}>
          {'const formData = new FormData();\n' +
            "          formData.append('video', file);\n" +
            "          let response = await fetch(HTTP_VIDEO_DOWNLOAD + '?title=' + file.name, {\n" +
            "          ㅤmethod: 'POST',\n" +
            '          ㅤbody: formData,\n' +
            '      });\n' +
            '\n' +
            '          const result = await response.json();'}
        </code>
      </Box>
    </Box>
  );
}
