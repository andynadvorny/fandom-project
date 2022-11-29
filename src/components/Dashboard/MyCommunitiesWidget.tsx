import NextLink from 'next/link'
import { Box, Flex, Spinner, Heading, Text, Button } from "@chakra-ui/react"
import { useCommunitiesByUser } from "../../hooks/useCommunitiesByUser"
import { CommunityRow } from "../Communities/CommunityRow"

export function MyCommunitiesWidget() {
  const { data, isLoading, isSuccess } = useCommunitiesByUser()

  return (
    <Box minHeight="150px">
      <Heading size="sm" textTransform="uppercase" color="gray.200">
        My Communities
      </Heading>

      <Flex align="center" justify="center" h="full">
        { isLoading ? (
            <Spinner />
        ) : (isSuccess && !data.communities) ? (
          <Text>
            Looks like you haven&apos;t created any communities yet
          </Text>
        ) : (isSuccess && data.communities) && (
          <Flex 
            flexDir="column"
            gap={5}
            bg="gray.800"
            p={4}
            w="full"
            borderRadius={6}
          >
            {data.communities.slice(0, 3).map((community) => (
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

            {data.communities.length > 3 && (
              <NextLink href="/my-communities">
                <Button colorScheme="orange" variant="outline">
                  View all
                </Button>
              </NextLink>
            )}
          </Flex>
        )}
      </Flex>
    </Box>
  )
}