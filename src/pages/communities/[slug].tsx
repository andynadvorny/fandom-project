import { useContext, useState, useEffect, useRef, RefObject } from "react"
import Head from "next/head"
import NextLink from 'next/link'
import { useRouter } from "next/router"
import { Flex, Image, Button, Heading, Spinner, Text, Divider, Avatar, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, useDisclosure, CloseButton
 } from "@chakra-ui/react"
import { RiCheckboxMultipleBlankFill, RiGroupLine, RiBubbleChartLine } from "react-icons/ri"

import { UserContext } from "../../contexts/UserContext"
import { useCommunityBySlug } from "../../hooks/useCommunityBySlug"
import { useCommunitiesFollowed } from "../../hooks/useCommunitiesFollowed"
import { useCommunityPosts } from "../../hooks/useCommunityPosts"
import { Header } from "../../components/Header"
import { Breadcrumbs } from "../../components/Breadcrumbs"
import { Post } from "../../components/Post"

export default function Community() {
  const router = useRouter()
  const slug = typeof router.query?.slug === "string" ? router.query.slug : ""
  
  const { data, isSuccess, isLoading, isFetching, error } = useCommunityBySlug(slug)
  const { data : followedCommunities, isSuccess : followedSuccess } = useCommunitiesFollowed()
  const { data : communityPosts, isSuccess : postsSuccess, isLoading : postsLoading } = useCommunityPosts(slug)
  const { user, followCommunity, unfollowCommunity } = useContext(UserContext)

  const [isFollowing, setIsFollowing] = useState<boolean>()
  const [isOwner, setIsOwner] = useState<boolean>(false)

  const { isOpen, onClose, onOpen } = useDisclosure()
  const cancelRef = useRef() as RefObject<HTMLButtonElement>

  async function handleFollow(communityId: number) {
    if (user) {
      followCommunity.mutateAsync(communityId)

      setIsFollowing(true)
    } else {
      onOpen()
    }
  }

  async function handleUnfollow(communityId: number) {
    unfollowCommunity.mutateAsync(communityId)

    setIsFollowing(false)
  }

  useEffect(() => {
    const follows = followedCommunities?.communities.find(community => community.communityId === data?.community.communityId)
        
    if (follows) {
      setIsFollowing(true)
    } else {
      setIsFollowing(false)
    }
  }, [followedCommunities, followedSuccess, isSuccess])

  useEffect(() => {
    if (user && isSuccess) {
      if (user.id === data.community.ownerId) {
        setIsOwner(true)
      }
    }
  }, [user, isSuccess])
  
  return (
    <>
      <Head>
          <title>{`fandom project | ${isSuccess && data.community.name}`}</title>
      </Head>

      <Flex direction="column" h="100vh">
        <Header />
        <Flex 
          as="main"
          w="100%"
          maxWidth={1480}
          h="full"
          mt="10"
          px="6"
          mx="auto"
          direction="column"
        >
          { isLoading ? (
              <Flex justify="center" h="full" align="center">
                <Spinner />
              </Flex>
          ) : error ? (
            <Flex justify="center" h="full" align="center">
              <Text>Failed to fetch community data.</Text>
            </Flex>
          ) : isSuccess && (
            <Flex direction="column">
              <Breadcrumbs 
                isSecondLevel 
                previousPage="Communities" 
                previousPath="communities"
                currentPage={data.community.name} 
              />

              <Image
                src={data.community.bannerImage}
                alt={data.community.name}
                borderRadius="4"
                maxHeight="400px"
                objectFit="cover"
                fallbackSrc='https://img.freepik.com/free-photo/yellow-watercolor-paper_95678-446.jpg?w=1380&t=st=1668261837~exp=1668262437~hmac=214ee1a747a0c025424c3bda7fe63e6109322fa1960f40c0c0a7f2aadcf93c78'
              />

              <Flex mt="-75px" align="center">
                <Avatar 
                  icon={<RiBubbleChartLine fontSize="2rem" />} 
                  src={data.community.coverImage}  
                  width="150px"
                  height="150px"
                  ml="58px"
                  border="5px solid #181B23"
                />

                { isSuccess && isOwner ? (
                  <NextLink href={`/my-communities/${data.community.slug}`} passHref>
                    <Button 
                      ml="auto" 
                      mt="75px" 
                      colorScheme="orange" 
                    >
                      Add post
                    </Button>
                  </NextLink>
                ) : (isSuccess && followedSuccess) && isFollowing ? (
                  <Button 
                    ml="auto" 
                    mt="75px" 
                    variant="outline" 
                    _hover={{ 
                      color: '#E53E3E', 
                      borderColor: '#E53E3E'
                    }} 
                    onClick={() => handleUnfollow(data.community.communityId)}
                  >
                    Following
                  </Button>
                ) : (
                  <Button 
                    ml="auto" 
                    mt="75px" 
                    colorScheme="orange" 
                    onClick={() => handleFollow(data.community.communityId)}
                  >
                    Follow
                  </Button>
                )}
              </Flex>

              <Heading size="lg" fontWeight="normal" mt="8">
                {data.community.name}
                {!isLoading && isFetching && <Spinner size="sm" color="grey-500" ml="4" />}
              </Heading>

              <Text color="gray.200">
                @{data.community.slug}
              </Text>

              <Text mt="4">
                {data.community.description}
              </Text>

              <Flex mt="4" gap="6">
                <Flex align="center">
                  <RiGroupLine />
                  <Text ml="1">{data.community.memberCount}</Text>
                </Flex>

                <Flex align="center">
                  <RiCheckboxMultipleBlankFill />
                  <Text ml="1">{data.community.postCount}</Text>
                </Flex>
              </Flex>

              <Divider my="6" borderColor="gray.700" />

              <Flex flexDir="column" gap={4}>
                {postsLoading ? (
                  <Flex justify="center" h="full" align="center">
                    <Spinner />
                  </Flex>
                ) : postsSuccess && !communityPosts.posts ? (
                  <Text align="center">It looks like this community doesn&apos;t have any posts yet</Text>
                ) : postsSuccess && communityPosts.posts.map(post => (
                  <Post
                    type={post.type}
                    title={post.title}
                    author={post.authorName}
                    content={post.text}
                    coverImage={post.coverImage}
                    eventDate={post.eventDate}
                    key={post.title}
                  />
                ))}
              </Flex>
            </Flex>
          )}
          <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
          >
            <AlertDialogOverlay>
              <AlertDialogContent bgColor='gray.900'>
                <CloseButton
                  alignSelf='flex-end'
                  position='relative'
                  right={1}
                  top={1}
                  onClick={onClose}
                />
                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                  Login Required
                </AlertDialogHeader>

                <AlertDialogBody>
                  You must be logged in to follow a fandom community
                </AlertDialogBody>

                <AlertDialogFooter>
                  <NextLink href="/login" passHref>
                    <Button colorScheme='orange' ml={3}>
                      Login
                    </Button>
                  </NextLink>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </Flex>
      </Flex>
    </>
  )
}