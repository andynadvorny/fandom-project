import Head from 'next/head'
import NextLink from 'next/link'
import { Flex, Box, Heading, Divider, Button, Text, Spinner, Avatar } from "@chakra-ui/react"
import { RiBubbleChartLine } from "react-icons/ri"

import { withSSRAuth } from '../utils/withSSRAuth'
import { usePostsFeed } from '../hooks/usePostsFeed'
import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'
import { Post } from '../components/Post'

export default function Following() {
  const { data, isLoading, isSuccess, isFetching, error } = usePostsFeed()

  return (
    <>
      <Head>
          <title>fandom project | feed</title>
      </Head>

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
              <Heading size="lg" fontWeight="normal">
                Posts Feed {isSuccess && `(${data?.posts.length})`}
                {!isLoading && isFetching && <Spinner size="sm" color="grey-500" ml="4" />}
              </Heading>
            </Flex>

            <Divider my="6" borderColor="gray.700" />
            
            <Flex direction="column" gap={2}>
              {isLoading ? (
                <Flex justify="center" h="full" align="center">
                  <Spinner />
                </Flex>
              ) : error ? (
                <Flex justify="center" h="full" align="center">
                  <Text>Failed to fetch communities data.</Text>
                </Flex>
              ) : isSuccess && data.posts.length === 0 ? (
                <Flex
                  align="center"
                  direction="column"
                  gap={4}
                  mt={10}
                >
                  <RiBubbleChartLine fontSize="60" />
                  <Text>
                    Looks like your feed is empty
                  </Text>
                  <NextLink href="/communities" passHref>
                    <Button
                      as="a" 
                      fontSize="sm" 
                      colorScheme="orange"
                      mt={6}
                    >
                      Browse fandoms
                    </Button>
                  </NextLink>
                </Flex>
              ) : (isSuccess && data.posts) && (
                <Flex 
                  direction="column"
                  gap={4}
                  maxHeight="500px"
                  overflowY="auto"
                >
                  {data.posts.map(post => (
                    <Flex direction="column" gap={2}>
                      <Flex ml="auto" align="center" gap={2}>
                        <Text fontSize="sm" color="gray.200">@ {post.communityName}</Text>
                        <Avatar 
                          icon={<RiBubbleChartLine fontSize="2rem" />} 
                          src={post.communityCoverImageUrl}  
                          width="40px"
                          height="40px"
                        />
                      </Flex>
                      <Post
                        type={post.type}
                        title={post.title}
                        author={post.authorName}
                        content={post.text}
                        coverImage={post.coverImage}
                        eventDate={post.eventDate}
                        key={post.title}
                      />
                    </Flex>
                  ))}
                </Flex>
              )}
            </Flex>  
          </Box>
        </Flex>
      </Flex>
    </>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {}
  }
})