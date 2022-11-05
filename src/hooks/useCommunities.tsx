import axios from '../api/axios'
import { useQuery } from 'react-query'

type Community = {
  categoryName: string;
  communityId: number;
  coverImage: string;
  description: string; 
  memberCount: number;
  name: string;
  slug: string;
}

type GetCommunitiesResponse = {
  communities: Community[];
}

export async function getCommunities(): Promise<GetCommunitiesResponse> {
  const { data } = await axios.get('/communities')

  const communities = data.body

  return {
    communities
  }
}

export function useCommunities() {
  return useQuery('communities', () => getCommunities(), {
    staleTime: 1000 * 60 * 10
  })
}