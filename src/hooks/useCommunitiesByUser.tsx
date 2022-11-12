import { useQuery } from 'react-query'
import { parseCookies } from 'nookies';
import axios from '../api/axios'

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

type GetCommunitiesByUserResponse = {
  communities: Community[];
}

export async function getCommunitiesByUser(): Promise<GetCommunitiesByUserResponse> {
  const { 'fandomproject.user': loggedUser } = parseCookies()

  const user = JSON.parse(loggedUser);
  
  const { data } = await axios.get(`/users/${user.id}/communities`)

  const communities = data.body

  return {
    communities
  }
}

export function useCommunitiesByUser() {
  return useQuery('communities by user', () => getCommunitiesByUser(), {
    staleTime: 1000 * 60 * 10
  })
}