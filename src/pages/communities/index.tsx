import { Flex, SimpleGrid, Spinner, Text } from '@chakra-ui/react'

import { useCommunities } from '../../hooks/useCommunities'
import { Header } from '../../components/Header'
import { CommunityCard } from '../../components/CommunityCard'

export default function Communities() {
  const { data, isLoading, error } = useCommunities()

  return (
    <Flex direction="column" h="100vh">
      <Header />
      <SimpleGrid 
        as="main"
        w="100%"
        maxWidth={1480}
        h="full"
        mt="10"
        px="6"
        mx="auto"
        minChildWidth='300px'
        spacing={10}
      >
        { isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
        ) : error ? (
          <Flex justify="center">
            <Text>Failed to fetch communities data.</Text>
          </Flex>
        ) : (
          <>
            {data?.communities.map((community) => (
              <CommunityCard
                name={community.name}
                categoryName={community.categoryName}
                coverImage={community.coverImage}
                description={community.description}
                slug={community.slug}
                key={community.name}
              />
            ))}
          </>
        )}
      </SimpleGrid>
    </Flex>
  )
}