import axios from '../api/axios'
import { useQuery } from 'react-query'

type Community = {
  categoryName: string;
  communityId: number;
  coverImage: string;
  bannerImage: string;
  description: string; 
  memberCount: number;
  name: string;
  slug: string;
}

type GetCommunityResponse = {
  community: Community;
}

export async function getCommunityBySlug(slug: string): Promise<GetCommunityResponse> {
  const { data } =  await axios.get(`/communities/search?slug=${slug}`)
  
  const community = data.body

  console.log(community)

  return { 
    community 
  }
}

export function useCommunityBySlug(slug: string) {
  return useQuery(['community by slug', slug], () => getCommunityBySlug(slug), {
    staleTime: 1000 * 60 * 10,
    enabled: slug.length > 0
  })
}