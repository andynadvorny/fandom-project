import { ReactNode, createContext, useState } from "react"

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
    if (email && password) {
      setUser({
        name: 'Andy Nadvorny',
        id: '1',
        email: 'andy@email.com',
        bio: '',
        avatar: '',
        slug: ''
      })
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