'use client';
import { Flex, Grid, SegmentedField, Text } from '@prismane/core';
import Typewriter from 'typewriter-effect';
import HistoryBlock from '@/components/historyBlock';
import { useState } from 'react';

export default function Tape() {
  const [page, setPage] = useState(1);
  const list: string[] = [];
  const p = Math.ceil(list.length / 10);
  const array = [];
  for (let i = 0; i < p; i++) {
    array.push({ element: String(i + 1), value: String(i + 1) });
  }

  return (
    <Flex
      direction={'column'}
      justify={list.length === 0 ? 'center' : 'start'}
      align={'center'}
      gap={'2rem'}
      w={'100%'}
      mih={'80vh'}
      pt={'5rem'}
      pb={'1rem'}>
      {list.length === 0 ? (
        <Text as={'h1'}>
          <Typewriter
            options={{
              delay: 75,
              loop: false,
            }}
            onInit={(typewriter) => {
              typewriter.typeString('Данных нету').start();
            }}
          />
        </Text>
      ) : (
        <>
          <SegmentedField
            size={'md'}
            placeholder="Страницы"
            label="Страницы"
            value={String(page)}
            onChange={(e) => setPage(Number(e.target.value))}
            options={array}
          />
          <Grid templateColumns={2} gap={'1rem'} w={'100%'}>
            {list
              .filter((elem, index) => index >= 10 * (page - 1) && index < 10 * page)
              .map((item, i) => (
                <Grid.Item key={'history_block_' + i}>
                  <HistoryBlock />
                </Grid.Item>
              ))}
          </Grid>
        </>
      )}
    </Flex>
  );
}
