import { Flex, Grid, Text } from '@prismane/core';
import Typewriter from 'typewriter-effect';

export default function Tape() {
  const list = [];

  return (
    <Flex direction={'column'} justify={'center'} align={'center'} gap={'2rem'} w={'100%'} mih={'80vh'}>
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
        <Grid templateColumns={2} gap={'1rem'} w={'100%'}></Grid>
      )}
    </Flex>
  );
}
