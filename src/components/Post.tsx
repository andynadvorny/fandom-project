import { useEffect, useState } from "react"
import { Flex, Box, Text, Image } from "@chakra-ui/react"

interface PostProps {
  type: string;
  title: string;
  content: string;
  author: string;
  eventDate?: Date;
  coverImage?: string;
}

export function Post( props : PostProps) {
  const { type, title, content, author, eventDate, coverImage } = props

  const [day, setDay] = useState<number>()
  const [month, setMonth] = useState<string>()

  useEffect(() => {
    if (eventDate) {
      const date = new Date(eventDate)
      setDay(date.getDay())
      setMonth(date.toLocaleString('default', { month: 'short' }))
    }
  }, [eventDate])

  return (
    <Flex 
      as="article"
      cursor="pointer"
      flexDir="column"
      bg="gray.900" 
      boxShadow="2xl"
      borderRadius={6} 
      p={type === "event" ? 4 : 0} 
      borderLeft={type === "news" ? "5px solid orange" : "none"}
      borderColor="orange.500"
    >
      {type === "event" ? (
        <Flex 
          flexDir={{ base: 'column', md: 'row' }}
          align={{ base: 'flex-end', md: 'flex-start' }}
        >
          <Flex 
            flexDir="column"
            borderRadius={8}
            bgColor="orange.500"
            h="100px"
            w="100px"
            align="center"
            mb={{ base: '2', md: '0' }}
          >
            <Text fontSize="6xl" fontWeight="bold" lineHeight="1" mt="10px">
              {day}
            </Text>
            <Box 
              mt="auto"
              bgColor="orange.600"
              w="full"
              textAlign="center"
              borderBottomRadius={8}
            >
              <Text textTransform="uppercase" fontWeight="extrabold">
                {month}
              </Text>
            </Box>
          </Flex>
          <Flex flexDir="column" ml="4" flex="1">
            <Text fontSize="lg" fontWeight="bold" mb={1}>{title}</Text>
            {content}
          </Flex>
        </Flex>
      ) : (
        <>
          {(type === "post" && coverImage) && (
            <Image
              src={coverImage}
              borderTopRadius={8}
              alt={title}
              objectFit="cover"
              h="350px"
              w="full"
            />
          )}
          
          <Flex flexDir="column" p={4}>
            <Text fontSize="lg" fontWeight="bold">{title}</Text>
            <Text fontSize="sm" color="gray.200" mb={4}>by {author}</Text>

            {content}
          </Flex>
        </>
      )}
    </Flex>
  )
}
