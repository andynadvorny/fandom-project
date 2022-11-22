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

export async function getCommunityPosts(slug: string): Promise<GetPostsResponse> {
  const { data } =  await axios.get(`/communities/${slug}/posts`)
  
  const posts = data.body

  return { 
    posts 
  }
}

export function useCommunityPosts(slug: string) {
  return useQuery(['community posts', slug], () => getCommunityPosts(slug), {
    staleTime: 1000 * 60 * 10,
    enabled: slug.length > 0
  })
}