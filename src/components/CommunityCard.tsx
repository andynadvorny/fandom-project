import NextLink from 'next/link'
import { Avatar, Flex, Text, Badge } from "@chakra-ui/react"
import { motion } from 'framer-motion'
import { RiBubbleChartLine } from "react-icons/ri"

interface CommunityCardProps {
  name: string;
  categoryName: string;
  coverImage: string;
  description: string;
  slug: string;
}

export function CommunityCard({ name, categoryName, coverImage, description, slug }: CommunityCardProps) {
  return (
    <NextLink href={`/communities/${slug}`} key={name}>
      <Flex 
        as={motion.div}
        cursor="pointer"
        flexDirection="column"
        bg="gray.900" 
        borderWidth="2px"
        borderColor="gray.700"
        borderRadius={6} 
        p={4} 
        alignItems="center"
        gap={4}
        whileHover={{
          scale: 1.03,
          transition: { duration: 0.5 },
        }}
      >
        <Badge colorScheme='orange' variant="solid" marginLeft="auto">
          {categoryName}
        </Badge>
        
        <Avatar 
          icon={<RiBubbleChartLine fontSize="2rem" />} 
          src={coverImage} 
          borderRadius={4} 
          width="250px"
          height="250px"
        />

        <Text 
          fontWeight='bold' 
          fontSize="xl" 
          textOverflow="ellipsis"
          textAlign="center"
          overflow="hidden"
          whiteSpace="nowrap"
          width="100%"
        >
          {name}
        </Text>

        <Text 
          fontSize='sm' 
          height="65px" 
          overflow="hidden"
          textAlign="center"
        >
          {description}
        </Text>
      </Flex>
    </NextLink>
  )
}