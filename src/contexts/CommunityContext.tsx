import { ReactNode, createContext, useState, useEffect } from "react"
import Router from 'next/router'
import { toast } from 'react-toastify'

import axios from '../api/axios'

type CommunitiesContextData = {
  communities: Community[] | undefined;
  createCommunity: (name: string, category:string, coverimage:string, description: string) => void;
  editCommunity: (community: Community) => void;
  deleteCommunity: (community: Community) => void;
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
}

type CommunitiesContextProviderProps = {
  children: ReactNode;
}

export const CommunitiesContext = createContext({} as CommunitiesContextData)

export function CommunitiesProvider({ children }: CommunitiesContextProviderProps) {
  const [communities, setCommunities] = useState<Community[]>([])

  useEffect(() => {
    getCommunities()
  }, []);

  async function getCommunities() {
    try {
      const response = await axios.get('/communities')

      if (response.status === 200) {
  
        const communitiyList = response.data.body
  
        setCommunities(communitiyList)
      }
    } catch (e: any) {
      const errorMessage = e.response.data == undefined ? e.message : e.response.data.message       

      toast.error(errorMessage)
    }
  }

  async function createCommunity(name: string, category:string, coverimage:string, description: string) {
    const url = '/communities'

    try {
      const response = await axios.post(url, {
        name,
        coverImage: coverimage,
        categoryId: Number(category),
        description
      })
  
      if (response.status === 201) {
  
        toast.success(response.data.message)
      } 
    } catch (e: any) {
        
      const errorMessage = e.response.data.message       

      toast.error(errorMessage)
    }
  }

  async function editCommunity(updatedCommunity: Community) {
    const url = `/community/${updatedCommunity.communityId}`

    try {
      const response = await axios.put(url, {
        name: updatedCommunity.name,
        slug: updatedCommunity.slug,
        coverImage: updatedCommunity.coverImage,
        description: updatedCommunity.description,
        categoryId: updatedCommunity.categoryId,
      })
  
      if (response.status === 200) {
        toast.success("Community created!")

        getCommunities()

        Router.push('/communities')
      } 
    } catch (e: any) {
        
      const errorMessage = e.response.data.message       

      toast.error(errorMessage)
    }
  }

  async function deleteCommunity(updatedCommunity: Community) {
    const url = `/community/${updatedCommunity.communityId}`

    try {
      const response = await axios.delete(url)
  
      if (response.status === 200) {
        toast.success("Your community was deleted.")

        getCommunities()

        Router.push('/communities')
      } 
    } catch (e: any) {
        
      const errorMessage = e.response.data.message       

      toast.error(errorMessage)
    }
  }

  return (
    <CommunitiesContext.Provider value={{
      communities,
      createCommunity,
      editCommunity,
      deleteCommunity
    }}>
      {children}
    </CommunitiesContext.Provider>
  )
}