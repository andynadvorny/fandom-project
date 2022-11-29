import { useQuery } from 'react-query'
import { parseCookies } from 'nookies';
import axios from '../api/axios'

type Post = {
  userId: number;
  authorName: string;
  title: string;
  type: string;
  text: string;
  coverImage: string;
  eventDate: Date;
  communityName: string;
  communityCoverImageUrl: string;
}

type GetPostsFeedResponse = {
  posts: Post[];
}

export async function getPostsFeed(): Promise<GetPostsFeedResponse> {
  const { 'fandomproject.user': loggedUser } = parseCookies()

  const user = JSON.parse(loggedUser);
  
  const { data } = await axios.get(`/users/${user.id}/feed`)

  const posts = data.body

  return {
    posts
  }
}

export function usePostsFeed() {
  return useQuery('posts feed', () => getPostsFeed(), {
    staleTime: 1000 * 60 * 10
  })
}