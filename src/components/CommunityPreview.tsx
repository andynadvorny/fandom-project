import { Avatar, Flex, Text, Badge } from "@chakra-ui/react"
import { RiBubbleChartLine } from "react-icons/ri"

interface CommunityPreviewProps {
  name: string;
  categoryName: string;
  coverImage: string;
  description: string;
}

export function CommunityPreview({ name, categoryName, coverImage, description }: CommunityPreviewProps) {
  return (
    <Flex 
      bg="gray.900" 
      borderWidth="2px"
      borderStyle="dashed"
      borderColor="gray.700"
      borderRadius={6} 
      p={4} 
      alignItems="center"
      mb={8}
      maxWidth="500px"
      mx="auto"
      direction={{ base: 'column', md: 'row' }}
      gap={4}
    >
      <Avatar 
        icon={<RiBubbleChartLine fontSize="2rem" />} 
        src={coverImage} 
        borderRadius={4} 
        width="150px"
        height="150px"
      />

      <Flex 
        direction="column" 
        justify="space-between" 
        height={{ base: 'auto', md: '150px' }}>
        <Flex 
          gap={2}
          justify="space-between"
          direction={{ base: 'column', md: 'row' }}
          align={{ base: 'center', md: 'start' }}
        >
          <Text 
            fontWeight='bold' 
            fontSize="xl" 
            align={{ base: 'center', md: 'start' }}
          >
            {name}
          </Text>
          <Badge colorScheme='orange' variant="solid">
            {categoryName}
          </Badge>
        </Flex>
        <Text fontSize='sm' mt={2} textAlign={{ base: 'center', md: 'left' }}>{description}</Text>
      </Flex>
    </Flex>
  )
}