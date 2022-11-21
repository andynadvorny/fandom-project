import Head from "next/head"
import { Flex } from "@chakra-ui/react"

import { withSSRAuth } from "../utils/withSSRAuth"
import { Header } from "../components/Header"
import { Sidebar } from "../components/Sidebar"

export default function Dashboard() {
  return (
    <>
      <Head>
          <title>fandom project | fandom made easy</title>
      </Head>
      
      <Flex direction="column" h="100vh">
        <Header />

        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Sidebar />

          main
        </Flex>
      </Flex>
    </>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {}
  }
})