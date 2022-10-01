import NextLink from 'next/link'
import { Flex, Box, Heading, Divider, Button, Icon, Text, Avatar, Badge } from "@chakra-ui/react"
import { motion } from 'framer-motion'
import { RiAddLine, RiBubbleChartLine } from "react-icons/ri"

//import { withSSRAuth } from "../../utils/withSSRAuth"
import { Header } from "../../components/Header"
import { Sidebar } from "../../components/Sidebar"

const communities = [
  {
    id: 1,
    slug: "bts",
    name: "BTS",
    category: "music",
    members: 37,
    cover: "https://portalpopline.com.br/wp-content/uploads/2022/08/bts-fas-obsessao-2.jpg"
  },{
    id: 2,
    slug: "bts",
    name: "BTS",
    category: "music",
    members: 37,
    cover: ""
  }
]

export default function Communities() {
  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box 
          flex="1" 
          borderRadius={8} 
          bg="gray.800" 
          p="6"
          maxW={800}
        >
          <Flex align="center" justify="space-between">
            <Heading size="lg" fontWeight="normal">My Communities</Heading>

            <NextLink href="/communities/create" passHref>
              <Button
                as="a" 
                size="sm" 
                fontSize="sm" 
                colorScheme="orange"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Add new
              </Button>
            </NextLink>
          </Flex>

          <Divider my="6" borderColor="gray.700" />
          
          <Flex direction="column" gap={2}>
            {communities.length > 0 ? (
              communities.map(community => (
                <NextLink href={`/community/${community.slug}`} key={community.id} passHref>
                  <Box as ="a">
                    <Flex 
                      as={motion.div}
                      bg="gray.900" 
                      borderRadius={6} 
                      p={2} 
                      alignItems="center"
                      whileHover={{
                        scale: 1.03,
                        transition: { duration: 0.5 },
                      }}
                    >
                      <Avatar 
                        icon={<RiBubbleChartLine fontSize="2rem" />} 
                        src={community.cover} 
                        borderRadius={4} 
                        size="lg" 
                      />
                      
                      <Box ml='3'>
                        <Flex align="center" gap={2}>
                          <Text fontWeight='bold' fontSize="xl">
                            {community.name}
                          </Text>
                          <Badge colorScheme='orange' variant="solid">
                            {community.category}
                          </Badge>
                        </Flex>
                        <Text fontSize='sm'>{community.members} members</Text>
                      </Box>
                    </Flex>
                  </Box>
                </NextLink>
              ))
            ) : (
              <Flex
                align="center"
                direction="column"
                gap={4}
                mt={10}
              >
                <RiBubbleChartLine fontSize="60" />
                <Text>
                  Looks like you don&apos;t have any fandom communities yet
                </Text>
                <NextLink href="/communities/create" passHref>
                  <Button
                    as="a" 
                    fontSize="sm" 
                    colorScheme="orange"
                    mt={6}
                  >
                    Create community
                  </Button>
                </NextLink>
              </Flex>
            )}
          </Flex>  
        </Box>
      </Flex>
    </Flex>
  )
}

// export const getServerSideProps = withSSRAuth(async (ctx) => {
//   return {
//     props: {}
//   }
// })