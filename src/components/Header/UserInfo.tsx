import { useContext } from "react"
import { Box, Flex, Text, Avatar, useBreakpointValue } from "@chakra-ui/react"

import { UserContext } from "../../contexts/UserContext"

export function UserInfo() {
  const { user } = useContext(UserContext)

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })
  
  return (
    <Flex align="center">
      {isWideVersion && (
        <Box mr="4" textAlign="right">
          <Text>{user?.name}</Text>
          <Text color="gray.300" fontSize="small">{user?.email}</Text>
        </Box>
      )}

      <Avatar size="md" name={user?.name} src={user?.avatar} />
    </Flex>
  )
}