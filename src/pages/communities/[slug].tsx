import { useRouter } from "next/router"
import { Flex, Image, Button, Heading, Spinner, Text, Divider } from "@chakra-ui/react"

import { useCommunityBySlug } from "../../hooks/useCommunityBySlug"
import { Header } from "../../components/Header"

export default function Community() {
  const router = useRouter()
  const slug = typeof router.query?.slug === "string" ? router.query.slug : ""
  
  const { data, isSuccess, isLoading, isFetching, error } = useCommunityBySlug(slug)
  
  return (
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
            <Image
              src="https://cdn.pixabay.com/photo/2017/04/11/15/55/animals-2222007__480.jpg"
              alt={data.community.name}
              borderRadius="4"
            />

            <Flex mt="-75px" align="center">
              <Image
                src={data.community.coverImage}
                alt={data.community.name}
                border="5px solid white"
                borderColor="gray.900"
                ml="58px"
                width="150px"
                height="150px"
                borderRadius="50%"
              />

              <Button ml="auto" mt="75px" colorScheme="orange">
                Follow
              </Button>
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

            <Divider my="6" borderColor="gray.700" />

            content goes here
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}