import type { NextPage } from 'next'
import NextLink from 'next/link'
import { Flex, Stack, Link, Text, Button} from '@chakra-ui/react'

import { Input } from '../components/Form/Input'

const Home: NextPage = () => {
  return (
    <Flex 
      w="100vw" 
      h="100vh" 
      align="center" 
      justify="center"
      p="2"
    >
      <Flex
        as="form"
        w="full"
        maxW={380}
        bg="gray.800"
        p="8"
        borderRadius={4}
        flexDir="column"
      >
        <Stack spacing="4">
          <Input 
            name="email" 
            type="email" 
            label="E-mail" 
          />
          <Input 
            name="password" 
            type="password" 
            label="Password"
          />
          <NextLink href="/forgot-password" passHref>
            <Link fontSize="xs" textAlign="right">Forgot your password?</Link>
          </NextLink>
        </Stack>
        <Button 
          type="submit" 
          mt="6" 
          colorScheme="orange" 
        >
          Login
        </Button>
        <NextLink href="/register">
          <Text fontSize="xs" textAlign="center" mt="4">
            Don&apos;t have an account?{' '}
            <Link color="orange.500" href="/register">
              Register
            </Link>
          </Text>
        </NextLink>
      </Flex>
    </Flex>
  )
}

export default Home
