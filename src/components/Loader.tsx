import { Flex, Spinner } from "@chakra-ui/react"

export function Loader() {
  return (
    <Flex 
      w="100vw" 
      h="100vh" 
      align="center" 
      justify="center"
    >
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.800'
        color='orange.500'
        size='xl'
      />
    </Flex>
  )
}