import { Avatar, Flex, Text, Image, Heading } from "@chakra-ui/react"
import { RiBubbleChartLine } from "react-icons/ri"

interface CommunityPreviewProps {
  name: string;
  coverImage: string;
  bannerImage: string;
  description: string;
}

export function CommunityPreview({ name, coverImage, bannerImage, description }: CommunityPreviewProps) {
  return (
    <Flex 
      bg="gray.900" 
      borderRadius={6} 
      mb={8}
      mx="auto"
      direction="column"
      gap={4}
    >
      <Image
        src={bannerImage}
        alt={name}
        borderRadius="4"
        maxHeight="250px"
        objectFit="cover"
        w="100%"
        fallbackSrc='https://img.freepik.com/free-photo/yellow-watercolor-paper_95678-446.jpg?w=1380&t=st=1668261837~exp=1668262437~hmac=214ee1a747a0c025424c3bda7fe63e6109322fa1960f40c0c0a7f2aadcf93c78'
      /> 

      <Avatar 
        icon={<RiBubbleChartLine fontSize="2rem" />} 
        src={coverImage}  
        width="125px"
        height="125px"
        ml="58px"
        border="5px solid #181B23"
        mt="-75px"
      />

      <Flex flexDir="column" p={4}>
        <Heading size="md" fontWeight="normal">
          {name}
        </Heading>

        <Text mt="4">
          {description}
        </Text>
      </Flex>
    </Flex>
  )
}