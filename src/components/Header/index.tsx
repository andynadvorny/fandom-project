import { useContext } from "react"
import NextLink from 'next/link'
import { Button, Flex, Icon, IconButton, Text, useBreakpointValue } from "@chakra-ui/react"
import { RiMenuLine } from 'react-icons/ri'

import { UserInfo } from "./UserInfo";

import { UserContext } from "../../contexts/UserContext"
import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext'

export function Header() {
  const { user } = useContext(UserContext)
  const { onOpen } = useSidebarDrawer()

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  return (
    <Flex 
      as="header"
      w="100%"
      maxWidth={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      {(!isWideVersion && user) && (
        <IconButton
          aria-label="Open navigation"
          icon={<Icon as={RiMenuLine} />}
          fontSize="24"
          variant="unstyled"
          onClick={onOpen}
          mr="2"
          display="flex"
        />
      )}
      <Text 
        fontSize={{ base: '2xl', md: '3xl' }}
        fontWeight="bold" 
        letterSpacing="tight" 
        w="64"
      >
        fandom
        <Text as="span" ml="1" color="orange.400">project</Text>
      </Text>

      <Flex align="center" ml="auto">
        {user ? (
          <UserInfo/>
        ) : (
          <NextLink href="/login" passHref>
            <Button
              colorScheme="orange" 
            >
              Login
            </Button>
          </NextLink>
        )}
      </Flex>
    </Flex>
  )
}