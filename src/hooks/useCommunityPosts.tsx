import axios from '../api/axios'
import { useQuery } from 'react-query'

type Post = {
  userId: number;
  authorName: string;
  title: string;
  type: string;
  text: string;
}

type GetPostsResponse = {
  posts: Post[];
}

export async function getCommunityPosts(id: number): Promise<GetPostsResponse> {
  const { data } =  await axios.get(`/communities/${id}/posts`)
  
  const posts = data.body

  return { 
    posts 
  }
}

export function useCommunityPosts(communityId: number) {
  return useQuery(['community posts', communityId], () => getCommunityPosts(communityId), {
    staleTime: 1000 * 60 * 10,
    enabled: communityId != undefined
  })
}