import { Box, Flex, Spinner, Heading, Text, SimpleGrid } from "@chakra-ui/react"
import { useCommunitiesFollowed } from "../../hooks/useCommunitiesFollowed"
import { CommunityLink } from '../Communities/CommunityLink'

export function FollowingWidget() {
  const { data, isLoading, isSuccess } = useCommunitiesFollowed()

  return (
    <Box minHeight="150px">
      <Heading size="sm" textTransform="uppercase" color="gray.200">
        Following
      </Heading>

      <Flex align="center" justify="center" h="full">
        { isLoading ? (
            <Spinner />
        ) : (isSuccess && !data.communities) ? (
          <Text>
            Your followed communities will show here
          </Text>
        ) : (isSuccess && data.communities) && (
          <SimpleGrid 
            columns={[2, 4, 5]}
            spacing={5}

          >
            {data.communities.slice(0, 5).map((community) => (
              <CommunityLink
                name={community.name}
                coverImage={community.coverImage}
                slug={community.slug}
                key={community.communityId}
              />
            ))}
          </SimpleGrid>
        )}
      </Flex>
    </Box>
  )
}