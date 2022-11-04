import { Flex, SimpleGrid } from '@chakra-ui/react'
import axios from '../../api/axios'

import { Header } from '../../components/Header'
import { CommunityCard } from '../../components/CommunityCard'

type Community ={
  name: string;
  communityId: number;
  slug: string;
  categoryName: string;
  categoryId: number;
  coverImage: string;
  description: string; 
  memberCount: number;
  userId: string;
}

interface CommunityProps {
  communities: Community[]
}

export default function Communities({communities} : CommunityProps) {
  return (
    <Flex direction="column" h="100vh">
      <Header />
      <SimpleGrid 
        as="main"
        w="100%"
        maxWidth={1480}
        h="full"
        mt="10"
        px="6"
        mx="auto"
        minChildWidth='300px'
        spacing={10}
      >
        {communities.map((community) => (
          <CommunityCard
            name={community.name}
            categoryName={community.categoryName}
            coverImage={community.coverImage}
            description={community.description}
            slug={community.slug}
            key={community.name}
          />
        ))}
      </SimpleGrid>
    </Flex>
  )
}

export async function getServerSideProps() {
  const response = await axios.get('/communities')

  const communities = response.data.body
  
  return {
    props: { communities },
  };
}