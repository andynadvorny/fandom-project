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

type GetCommunitiesFollowedResponse = {
  communities: Community[];
}

export async function getCommunitiesFollowed(): Promise<GetCommunitiesFollowedResponse> {
  const { 'fandomproject.user': loggedUser } = parseCookies()

  const user = JSON.parse(loggedUser);
  
  const { data } = await axios.get(`/users/${user.id}/communities?returnType=follower`)

  const communities = data.body

  return {
    communities
  }
}

export function useCommunitiesFollowed() {
  return useQuery('communities followed', () => getCommunitiesFollowed(), {
    staleTime: 1000 * 60 * 10
  })
}