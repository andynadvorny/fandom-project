import NextLink from 'next/link'
import { Flex, Text, Image } from "@chakra-ui/react"
import { motion } from 'framer-motion'

interface CommunityLinkProps {
  name: string;
  coverImage: string;
  slug: string;
}

export function CommunityLink({ name, coverImage, slug }: CommunityLinkProps) {
  return (
    <NextLink href={`/communities/${slug}`} key={name}>
      <Flex 
        as={motion.div}
        cursor="pointer"
        boxShadow="dark-lg"
        borderRadius={6} 
        position="relative"
        whileHover={{
          scale: 1.03,
          transition: { duration: 0.5 },
        }}
        minHeight="150px"
      >
        <Image
          src={coverImage}
          borderRadius={6}
          alt={name}
          objectFit="cover"
          h="full"
          w="full"
          fallbackSrc='https://img.freepik.com/free-photo/yellow-watercolor-paper_95678-446.jpg?w=1380&t=st=1668261837~exp=1668262437~hmac=214ee1a747a0c025424c3bda7fe63e6109322fa1960f40c0c0a7f2aadcf93c78'
        />

        <Text 
          fontWeight='bold' 
          fontSize="sm" 
          textOverflow="ellipsis"
          textAlign="center"
          overflow="hidden"
          whiteSpace="nowrap"
          width="100%"
          position="absolute"
          bottom={0}
          bg="rgba(0,0,0,0.8)"
          borderBottomRadius={6}
        >
          {name}
        </Text>
      </Flex>
    </NextLink>
  )
}