import Head from 'next/head'
import NextLink from 'next/link'
import { Flex, Box, Heading, Divider, Button, Text, Spinner, SimpleGrid } from "@chakra-ui/react"
import { RiBubbleChartLine } from "react-icons/ri"

import { withSSRAuth } from "../utils/withSSRAuth"
import { useCommunitiesFollowed } from '../hooks/useCommunitiesFollowed'
import { Header } from "../components/Header"
import { Sidebar } from "../components/Sidebar"
import { CommunityCard } from '../components/Communities/CommunityCard'

export default function Following() {
  const { data, isLoading, isSuccess, isFetching, error } = useCommunitiesFollowed()

  return (
    <>
      <Head>
          <title>fandom project | followed fandoms</title>
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
                Following {isSuccess && data.communities ? `(${data?.communities.length})` : `(0)`}
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
              ) : isSuccess && !data.communities ? (
                <Flex
                  align="center"
                  direction="column"
                  gap={4}
                  mt={10}
                >
                  <RiBubbleChartLine fontSize="60" />
                  <Text>
                    Looks like you&apos;re not following any fandom communities yet
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
              ) : (isSuccess && data.communities) && (
                <SimpleGrid 
                  minChildWidth='300px'
                  spacing={10}
                >
                  {data.communities.map(community => (
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