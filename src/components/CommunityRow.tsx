import NextLink from 'next/link'
import { Avatar, Badge, Box, Button, Flex, Text } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { RiBubbleChartLine, RiPencilLine } from "react-icons/ri"

interface CommunityRowProps {
  name: string;
  communityId: number;
  categoryName: string;
  coverImage: string;
  description: string;
  slug: string;
  memberCount: number;
}

export function CommunityRow({ name, slug, communityId, coverImage, categoryName, memberCount }: CommunityRowProps) {
  return (
    <Flex 
      as={motion.div}
      key={communityId}
      bg="gray.900" 
      borderRadius={6} 
      p={2} 
      alignItems="center"
      whileHover={{
        scale: 1.03,
        transition: { duration: 0.5 },
      }}
    >
      <Avatar 
        icon={<RiBubbleChartLine fontSize="2rem" />} 
        src={coverImage} 
        borderRadius={4} 
        size="lg" 
      />
      
      <NextLink href={`/communities/${slug}`} key={communityId} passHref>
        <Box as='a' ml='3' flex="1">
          <Flex align="center" gap={2}>
            <Text fontWeight='bold' fontSize="xl">
              {name}
            </Text>
            <Badge colorScheme='orange' variant="solid">
              {categoryName}
            </Badge>
          </Flex>
          <Text fontSize='sm'>{memberCount} members</Text>
        </Box>
      </NextLink>

      <NextLink href={`/my-communities/${slug}`} passHref>
        <Button
          as="a" 
          colorScheme="orange"
          variant="ghost"
          ml="auto"
          px={0}
          title="Edit"
        >
          <RiPencilLine size={18} />
        </Button>
      </NextLink>
    </Flex>
  )
}