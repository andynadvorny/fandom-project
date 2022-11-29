import { Box, Flex, Spinner, Heading, Text, Avatar } from "@chakra-ui/react"
import { usePostsFeed } from "../../hooks/usePostsFeed"
import { RiBubbleChartLine } from 'react-icons/ri'
import { Post } from '../Post'

export function FeedWidget() {
  const { data, isLoading, isSuccess } = usePostsFeed()

  return (
    <Box minHeight="150px">
      <Heading size="sm" textTransform="uppercase" color="gray.200">
        Recent Posts
      </Heading>

      <Flex align="center" justify="center" h="full">
        { isLoading ? (
            <Spinner />
        ) : (isSuccess && !data.posts) ? (
          <Text>
            Your posts feed will show here
          </Text>
        ) : (isSuccess && data.posts) && (
          <Flex 
            flexDir="column"
            gap={5}
            bg="gray.800"
            p={4}
            w="full"
            borderRadius={6}
            maxHeight="300px"
            overflowY="auto"
          >
            {data.posts.slice(0,3).map(post => (
              <Flex direction="column" gap={2} key={post.title}>
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
                />
              </Flex>
            ))}
          </Flex>
        )}
      </Flex>
    </Box>
  )
}