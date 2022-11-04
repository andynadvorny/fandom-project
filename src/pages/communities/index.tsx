import { Flex } from '@chakra-ui/react'
import axios from '../../api/axios'

import { Header } from '../../components/Header'

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
      <Flex 
        as="main"
        w="100%"
        maxWidth={1480}
        h="full"
        px="6"
        mx="auto"
        align="center"
      >
        {communities.map((community) => (
          community.name
        ))}
      </Flex>
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