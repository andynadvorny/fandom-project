import { ReactNode, createContext, useState, useEffect, useContext } from "react"
import Router from 'next/router'
import { toast } from 'react-toastify'

import axios from '../api/axios'
import { UserContext } from './UserContext'

type CommunitiesContextData = {
  allCommunities: Community[] | undefined;
  userCommunities: Community[] | undefined;
  getCommunityBySlug: (slug: string) => Community | undefined;
  createCommunity: (name: string, category:string, coverimage:string, description: string, userId: string) => void;
  editCommunity: (name: string, slug: string, categoryId:string, coverimage:string, description: string, communityId: number) => void;
  deleteCommunity: (communityId: number) => void;
}

type Community = {
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

type CommunitiesContextProviderProps = {
  children: ReactNode;
}

export const CommunitiesContext = createContext({} as CommunitiesContextData)

export function CommunitiesProvider({ children }: CommunitiesContextProviderProps) {
  const { user } = useContext(UserContext)
  const [allCommunities, setAllCommunities] = useState<Community[]>([])
  const [userCommunities, setUserCommunities] = useState<Community[]>([])

  useEffect(() => {
    getAllCommunities()
  }, []);

  useEffect(() => {
    getCommunitiesByUser()
  }, [user]);

  async function getAllCommunities() {
    try {
      const response = await axios.get('/communities')

      if (response.status === 200) {
  
        const communitiyList = response.data.body
  
        setAllCommunities(communitiyList)

        if (user) {
          getCommunitiesByUser()
        }
      }
    } catch (e: any) {
      const errorMessage = e.response.data == undefined ? e.message : e.response.data.message       

      toast.error(errorMessage)
    }
  }

  async function getCommunitiesByUser() {
    if (user) {
      try {
        const response = await axios.get(`/users/${user.id}/communities`)
  
        if (response.status === 200) {
    
          const communitiyList = response.data.body
    
          setUserCommunities(communitiyList)
        }
      } catch (e: any) {
        const errorMessage = e.response.data == undefined ? e.message : e.response.data.message       
  
        toast.error(errorMessage)
      }
    }
  }

  function getCommunityBySlug(slug: string) {
    const community = allCommunities.find(community => community.slug === slug)

    return community
  }

  async function createCommunity(name: string, category:string, coverimage:string, description: string, userId: string) {
    const url = '/communities'

    try {
      const response = await axios.post(url, {
        name,
        coverImage: coverimage,
        categoryId: Number(category),
        description,
        userId
      })
  
      if (response.status === 201) {
  
        toast.success(response.data.message)

        getAllCommunities()

        Router.push('/my-communities')
      } 
    } catch (e: any) {
        
      const errorMessage = e.response.data.message       

      toast.error(errorMessage)
    }
  }

  async function editCommunity(name: string, slug: string, categoryId:string, coverimage:string, description: string, communityId: number) {
    const url = `/communities/${communityId}`

    console.log(name)

    try {
      const response = await axios.put(url, {
        name,
        slug,
        categoryId,
        coverImage: coverimage,
        description,
      })
  
      if (response.status === 200) {
        toast.success("Your community was updated")

        getAllCommunities()

        Router.push('/my-communities')
      } 
    } catch (e: any) {
        
      const errorMessage = e.response.data.message       

      toast.error(errorMessage)
    }
  }

  async function deleteCommunity(communityId: number) {
    const url = `/communities/${communityId}`

    try {
      const response = await axios.delete(url)
  
      if (response.status === 200) {
        toast.success("Your community was deleted.")

        getAllCommunities()

        Router.push('/my-communities')
      } 
    } catch (e: any) {
        
      const errorMessage = e.response.data.message       

      toast.error(errorMessage)
    }
  }

  return (
    <CommunitiesContext.Provider value={{
      allCommunities,
      userCommunities,
      getCommunityBySlug,
      createCommunity,
      editCommunity,
      deleteCommunity
    }}>
      {children}
    </CommunitiesContext.Provider>
  )
}