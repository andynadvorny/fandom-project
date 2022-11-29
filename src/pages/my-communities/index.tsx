import Head from 'next/head'
import NextLink from 'next/link'
import { Flex, Box, Heading, Divider, Button, Icon, Text, Spinner } from "@chakra-ui/react"
import { RiAddLine, RiBubbleChartLine } from "react-icons/ri"

import { withSSRAuth } from "../../utils/withSSRAuth"
import { useCommunitiesByUser } from '../../hooks/useCommunitiesByUser'

import { Header } from "../../components/Header"
import { Sidebar } from "../../components/Sidebar"
import { CommunityRow } from '../../components/CommunityRow'

export default function MyCommunities() {
  const { data, isLoading, isSuccess, error } = useCommunitiesByUser()

  return (
    <>
      <Head>
          <title>fandom project | my communities</title>
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
              <Heading size="lg" fontWeight="normal">My Communities</Heading>

              <NextLink href="/my-communities/create" passHref>
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
                    Looks like you don&apos;t have any fandom communities yet
                  </Text>
                  <NextLink href="/my-communities/create" passHref>
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
              ) : isSuccess && data.communities.map(community => (
                <CommunityRow 
                  name={community.name}
                  communityId={community.communityId}
                  categoryName={community.categoryName}
                  coverImage={community.coverImage}
                  description={community.description}
                  slug={community.slug}
                  memberCount={community.memberCount}
                />
              ))}
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