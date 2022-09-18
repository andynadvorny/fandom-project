import { ReactNode, createContext, useState } from "react"
import axios from '../api/axios'

type UserContextData = {
  user: User | undefined;
  signIn: (user: string, password: string) => void;
}

type User = {
  name: string;
  id: string;
  email: string;
  bio: string;
  avatar: string;
  slug: string;
}

type UserContextProviderProps = {
  children: ReactNode;
}

export const UserContext = createContext({} as UserContextData)

export function UserProvider({ children }: UserContextProviderProps) {
  const [user, setUser] = useState<User>()

  async function signIn(email: string, password: string) {
    const url = '/user/authentication'

    try {
      const response = await axios.post(url, {
        email: email,
        password: password,
      })
  
      if (response.status === 200) {
  
        const userData = {
          name: response.data.body.fullName,
          id: response.data.body.userId,
          email: response.data.body.email,
          bio: response.data.body.bio,
          avatar: response.data.body.profileAvatar,
          slug: response.data.body.slug
        }
  
        setUser(userData)
      } 
    } catch (e: any) {
        
      console.error(e)
    }
  }

  return (
    <UserContext.Provider value={{
      user,
      signIn,
    }}>
      {children}
    </UserContext.Provider>
  )
}