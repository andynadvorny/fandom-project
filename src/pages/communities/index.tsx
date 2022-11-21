import Head from 'next/head'
import { Flex, Heading, SimpleGrid, Spinner, Text } from '@chakra-ui/react'

import { useCommunities } from '../../hooks/useCommunities'
import { Header } from '../../components/Header'
import { CommunityCard } from '../../components/CommunityCard'

export default function Communities() {
  const { data, isLoading, isSuccess, isFetching, error } = useCommunities()

  return (
    <>
      <Head>
          <title>fandom project | fandom communities</title>
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
          <Heading size="lg" fontWeight="normal" mb="4 ">
            All Fandoms {isSuccess && `(${data?.communities.length})`}
            {!isLoading && isFetching && <Spinner size="sm" color="grey-500" ml="4" />}
          </Heading>

          { isLoading ? (
              <Flex justify="center" h="full" align="center">
                <Spinner />
              </Flex>
          ) : error ? (
            <Flex justify="center" h="full" align="center">
              <Text>Failed to fetch communities data.</Text>
            </Flex>
          ) : (
            <SimpleGrid 
              minChildWidth='300px'
              spacing={10}
            >
              {data?.communities.map((community) => (
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
      </Flex>
    </>
  )
}