import NextLink from 'next/link'
import { Avatar, Flex, Text, Badge, Image } from "@chakra-ui/react"
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
          borderRadius="xl"
          alt={name}
          objectFit="cover"
          h="175px"
          w="full"
          fallbackSrc='https://img.freepik.com/free-photo/yellow-watercolor-paper_95678-446.jpg?w=1380&t=st=1668261837~exp=1668262437~hmac=214ee1a747a0c025424c3bda7fe63e6109322fa1960f40c0c0a7f2aadcf93c78'
        />
        
        <Avatar 
          icon={<RiBubbleChartLine fontSize="2rem" />} 
          src={coverImage}  
          width="100px"
          height="100px"
          mt="-65px"
          border="3px solid #181B23"
        />

        <Flex direction="column" w="full">
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