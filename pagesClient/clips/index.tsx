'use client';
import { Text, usePrismaneTheme } from '@prismane/core';

export default function ClipsPage() {
  const { theme } = usePrismaneTheme();

  return <Text cl={theme.colors.base['50']}>Clips</Text>;
}
