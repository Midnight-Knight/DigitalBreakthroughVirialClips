'use client';
import { Text, usePrismaneTheme } from '@prismane/core';

export default function DownloadPage() {
  const { theme } = usePrismaneTheme();

  return <Text cl={theme.colors.base['50']}>Download</Text>;
}
