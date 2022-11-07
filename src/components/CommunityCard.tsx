import NextLink from 'next/link'
import { Avatar, Flex, Text, Badge, Image, Button } from "@chakra-ui/react"
import { motion } from 'framer-motion'
import { RiBubbleChartLine, RiGroupLine } from "react-icons/ri"

interface CommunityCardProps {
  name: string;
  categoryName: string;
  coverImage: string;
  bannerImage: string;
  description: string;
  slug: string;
  memberCount: number;
}

export function CommunityCard({ name, categoryName, coverImage, bannerImage, description, slug, memberCount }: CommunityCardProps) {
  return (
    <NextLink href={`/communities/${slug}`} key={name}>
      <Flex 
        as={motion.div}
        cursor="pointer"
        flexDirection="column"
        bg="gray.900" 
        boxShadow="dark-lg"
        borderRadius={6} 
        p={4} 
        alignItems="center"
        gap={4}
        whileHover={{
          scale: 1.03,
          transition: { duration: 0.5 },
        }}
      >
        <Image
          src={bannerImage}
          maxW="100%"
          borderRadius="xl"
          alt={name}
        />
        
        <Avatar 
          icon={<RiBubbleChartLine fontSize="2rem" />} 
          src={coverImage}  
          width="100px"
          height="100px"
          mt="-65px"
          border="3px solid #181B23"
        />

        <Flex direction="column">
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
            color="gray.200"
            height="65px" 
            overflow="hidden"
            textAlign="center"
            verticalAlign="top"
          >
            {description}
          </Text>
        </Flex>

        <Flex justify="space-between" align="center" width="100%">
          <Flex align="center">
            <RiGroupLine />
            <Text ml="1">{memberCount}</Text>
          </Flex>

          <Badge 
            colorScheme='orange' 
            variant="solid" 
          >
            {categoryName}
          </Badge>
        </Flex>
      </Flex>
    </NextLink>
  )
}