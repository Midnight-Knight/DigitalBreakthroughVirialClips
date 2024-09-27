'use client';
import { Button, Center, Flex, Link, Text, usePrismaneTheme } from '@prismane/core';
import Typewriter from 'typewriter-effect';

export default function AppPage() {
  const { theme } = usePrismaneTheme();

  const style = {
    w: '100%',
    h: '100%',
    cl: theme.colors.base['50'],
  };

  const styleHeading = {};

  return (
    <Flex direction="column" p={'5rem'} justify={'center'} align={'center'} {...style}>
      <Center w={'100%'} h={'65%'}>
        <Text cl={() => ['primary', 500]} fs={'4xl'} ta={'center'} w={'75%'} fw={'bold'}>
          <Typewriter
            options={{
              delay: 75,
              loop: false,
            }}
            onInit={(typewriter) => {
              typewriter.typeString('Генерация виральных клипов').start();
            }}
          />
        </Text>
      </Center>
      <Flex w={'100%'} direction={'column'} gap={'2.5rem'} h={'35%'}>
        <Text cl={() => ['primary', 500]} fs={'2xl'} ta={'left'} w={'50%'} fw={'bold'}>
          Страницы
        </Text>
        <Flex w={'100%'} direction={'row'} gap={'5rem'} h={'100%'}>
          <Link w={'100%'} h={'100%'} href={'/download'} underline="none">
            <Button size="lg" br={'0.5rem'} w={'100%'} h={'100%'} variant="tertiary" cl={theme.colors.primary['400']}>
              Загрузка длинного видео для обработки
            </Button>
          </Link>
          <Link w={'100%'} h={'100%'} href={'/clips'} underline="none">
            <Button size="lg" br={'0.5rem'} w={'100%'} h={'100%'} variant="tertiary" cl={theme.colors.primary['400']}>
              Результаты обработки и преобразования длинных видео в клипы
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
}
