import { useContext, useEffect } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { Flex, Image, Box, Text, Button, Heading} from '@chakra-ui/react'

import { UserContext } from '../contexts/UserContext'
import { Header } from '../components/Header'

export default function Home() {
  const { user } = useContext(UserContext)
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/dashboard')
    }
  }, [user])
  
  return (
    <Flex direction="column" h="100vh">
      <Header />
      <Flex 
        as="main"
        w="100%"
        maxWidth={1480}
        h="full"
        px="6"
        mx="auto"
        align="center"
        justify={{ base: 'flex-end', md: 'space-between' }}
        direction={{ base: 'column', md: 'row' }}
      >
        <Flex
          maxW={400}
          w="full"
          direction="column"
          align={{ base: 'center', md: 'flex-start' }}
          my={{ base: '8' }}
        >
          <Text>👏 Hey, welcome to</Text>
          <Heading mt="2">
            the <Text as="span" ml="1" color="orange.400">fandom</Text> project
          </Heading>
          <Text mt="2">
            fandom made easy
          </Text>
          <NextLink href="/register" passHref>
            <Button
              colorScheme="orange" 
              mt="6"
            >
              Get started
            </Button>
          </NextLink>
        </Flex>
        <Box w="100%" flex="1">
          <Image 
            src="/hero.svg" 
            alt="illustration of a girl viewing multiple media forms in computer"
          />
        </Box>
      </Flex>
    </Flex>
  )
}
