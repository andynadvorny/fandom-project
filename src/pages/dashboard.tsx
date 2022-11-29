import Head from "next/head"
import { Flex, SimpleGrid, Spinner, Text } from "@chakra-ui/react"

import { useCommunitiesFollowed } from "../hooks/useCommunitiesFollowed"
import { useCommunitiesByUser } from "../hooks/useCommunitiesByUser"
import { withSSRAuth } from "../utils/withSSRAuth"

import { Header } from "../components/Header"
import { Sidebar } from "../components/Sidebar"
import { CommunityCard } from "../components/CommunityCard"
import { CommunityRow } from "../components/CommunityRow"

export default function Dashboard() {
  const { data:followedCommunities, isLoading: followedCommunitiesLoading, isSuccess: followedCommunitiesSuccess } = useCommunitiesFollowed()
  const { data:userCommunities, isLoading: userCommunitiesLoading, isSuccess: userCommunitiesSuccess } = useCommunitiesByUser()
  
  return (
    <>
      <Head>
          <title>fandom project | fandom made easy</title>
      </Head>
      
      <Flex direction="column" h="100vh">
        <Header />

        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Sidebar />

          <Flex as="main" flexDir="column" w="100%" gap={4}>
            { followedCommunitiesLoading ? (
                <Flex justify="center" align="center">
                  <Spinner />
                </Flex>
            ) : (followedCommunitiesSuccess && followedCommunities.communities) && (
              <>
                <Text>Following</Text>
                
                <SimpleGrid 
                  minChildWidth='200px'
                  spacing={5}
                >
                  {followedCommunities?.communities.slice(0, 3).map((community) => (
                    <CommunityCard
                      name={community.name}
                      categoryName={community.categoryName}
                      coverImage={community.coverImage}
                      bannerImage={community.bannerImage}
                      description={community.description}
                      slug={community.slug}
                      memberCount={community.memberCount}
                      key={community.communityId}
                    />
                  ))}
                </SimpleGrid>
              </>
            )}

            { userCommunitiesLoading ? (
                <Flex justify="center" align="center">
                  <Spinner />
                </Flex>
            ) : (userCommunitiesSuccess && userCommunities.communities) && (
              <>
                <Text>My Communities</Text>
                
                <Flex 
                  flexDir="column"
                  gap={5}
                >
                  {userCommunities?.communities.slice(0, 3).map((community) => (
                    <CommunityRow 
                      name={community.name}
                      communityId={community.communityId}
                      categoryName={community.categoryName}
                      coverImage={community.coverImage}
                      description={community.description}
                      slug={community.slug}
                      memberCount={community.memberCount}
                      key={community.communityId}
                    />
                  ))}
                </Flex>
              </>
            )}
          </Flex>
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