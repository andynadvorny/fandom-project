import { useContext, useEffect } from "react"
import { useRouter } from "next/router"
import { Flex } from "@chakra-ui/react"

import { UserContext } from "../contexts/UserContext"
import { Header } from "../components/Header"
import { Sidebar } from "../components/Sidebar"
import { Loader } from "../components/Loader"

export default function Dashboard() {
  const { user } = useContext(UserContext)
  const router = useRouter()
  
  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [user])

  return (
    user ? (
      <Flex direction="column" h="100vh">
        <Header />

        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Sidebar />

          main
        </Flex>
      </Flex>
    ) : (
      <Loader />
    )
  )
}