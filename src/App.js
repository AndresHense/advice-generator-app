import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '@fontsource/manrope';
import {
  Center,
  ChakraProvider,
  Stack,
  Text,
  extendTheme,
  Circle,
  IconButton,
} from '@chakra-ui/react';
import MobileDivider from './svgs/MobileDivider';
import DeskDivider from './svgs/DeskDivider';
import DiceSVG from './svgs/DiceSVG';

const theme = extendTheme({
  fonts: {
    body: ' sans-serif, "Manrope"',
  },
});

function App() {
  const [advice, setAdvice] = useState('');
  const [restart, setRestart] = useState(true);
  const [width, setWidth] = React.useState(window.innerWidth);

  const handleRestart = () => {
    window.location.reload();
    setRestart(!restart);
  };

  useEffect(() => {
    const getAdvice = async () => {
      try {
        const { data } = await axios.get('https://api.adviceslip.com/advice');
        console.log(data.slip.advice);

        setAdvice(data.slip);
      } catch (error) {
        console.log(error);
      }
    };
    getAdvice();

    const handleResizeWindow = () => setWidth(window.innerWidth);
    // subscribe to window resize event "onComponentDidMount"
    window.addEventListener('resize', handleResizeWindow);
    return () => {
      // unsubscribe "onComponentDestroy"
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, [restart]);

  return (
    <ChakraProvider theme={theme}>
      <Center bg="#202632" h="100vh">
        <Stack
          bg="#313a49"
          p={{ base: '1rem', md: '2rem', lg: '4rem' }}
          borderRadius="1rem"
          paddingTop="2rem"
          paddingBottom="-1"
          w={{ base: '90%', md: '70%', lg: '55%', xl: '38%' }}
          spacing="2rem"
        >
          <Text
            as="p"
            fontSize="sm"
            color="#56fdab"
            fontWeight="semibold"
            align="center"
          >
            ADVICE #{advice.id}
          </Text>
          <Text align="center" color="#d3e1ee" fontSize="2xl" fontWeight="bold">
            "{advice.advice}"
          </Text>
          <Center>{width <= 640 ? <MobileDivider /> : <DeskDivider />}</Center>
          <Circle>
            <IconButton
              bg="#56fdab"
              isRound="true"
              _hover={{
                boxShadow: '0 0 25px 10px #56fdab;',
              }}
              icon={<DiceSVG />}
              onClick={handleRestart}
              size="lg"
              marginBottom={{
                base: '-1.5rem',
                md: '-4rem',
                lg: '-8rem',
                xl: '-8rem',
              }}
            ></IconButton>
          </Circle>
        </Stack>
      </Center>
    </ChakraProvider>
  );
}

export default App;
