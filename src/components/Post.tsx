import { Flex, Text } from "@chakra-ui/react"

interface PostProps {
  type: string;
  title: string;
  content: string;
  author: string;
}

export function Post({ type, title, content, author }: PostProps) {
  return (
    <Flex 
      as="article"
      cursor="pointer"
      flexDir="column"
      bg="gray.900" 
      boxShadow="2xl"
      borderRadius={6} 
      p={4} 
    >
      <Flex as="header" flexDir="column" mb={4}>
        <Text fontSize="lg" fontWeight="bold">{title}</Text>
        <Text fontSize="sm" color="gray.200">by {author}</Text>
      </Flex>
      {content}
    </Flex>
  )
}