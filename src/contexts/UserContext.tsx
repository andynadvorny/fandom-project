import { ReactNode, createContext, useState, useEffect } from "react"
import axios from '../api/axios'
import { toast } from 'react-toastify'

type UserContextData = {
  user: User | undefined;
  signIn: (user: string, password: string) => void;
  signOut: () => void;
  createUser: (name: string, email:string, password:string) => void;
  editUser: (user: UpdatedUser) => void;
}

type User = {
  name: string;
  id: string;
  email: string;
  bio: string;
  avatar: string;
  slug: string;
}

type UpdatedUser = {
  name: string;
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

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");

    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, [])

  /*
  {
    name: 'Andy Nadvorny',
    id: '1',
    email: 'andy@email.com',
    bio: '',
    avatar: '',
    slug: ''
  }
  */

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
        localStorage.setItem('user', JSON.stringify(userData))
      } 
    } catch (e: any) {

      const errorMessage = e.response.data.message       

      toast.error(errorMessage)
    }
  }

  function signOut() {
    setUser(undefined)
    localStorage.removeItem('user')
  }

  async function createUser(name: string, email:string, password:string) {
    const url = '/user'

    try {
      const response = await axios.post(url, {
        fullName: name,
        email: email,
        password: password,
      })
  
      if (response.status === 201) {
  
        const userData = {
          name: response.data.body.fullName,
          id: response.data.body.userId,
          email: response.data.body.email,
          bio: response.data.body.bio,
          avatar: response.data.body.profileAvatar,
          slug: response.data.body.slug
        }
  
        setUser(userData)  
        localStorage.setItem('user', JSON.stringify(userData))   

        toast.success(response.data.message)
      } 
    } catch (e: any) {
        
      const errorMessage = e.response.data.message       

      toast.error(errorMessage)
    }
  }

  async function editUser(updatedUser: UpdatedUser) {
    const url = `/user/${user?.id}`

    try {
      const response = await axios.put(url, {
        fullName: updatedUser.name,
        email: updatedUser.email,
        bio: updatedUser.bio,
        profileAvatar: updatedUser.avatar,
        slug: updatedUser.slug
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
        localStorage.setItem('user', JSON.stringify(userData))  

        toast.success("Your profile data was updated!")
      } 
    } catch (e: any) {
        
      const errorMessage = e.response.data.message       

      toast.error(errorMessage)
    }
  }

  return (
    <UserContext.Provider value={{
      user,
      signIn,
      signOut,
      createUser,
      editUser
    }}>
      {children}
    </UserContext.Provider>
  )
}