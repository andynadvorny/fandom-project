import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'

import { UserProvider } from '../contexts/UserContext'

import { theme } from '../styles/theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>  
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </ChakraProvider>
  )
}

export default MyApp
