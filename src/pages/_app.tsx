import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { ToastContainer } from 'react-toastify'

import { UserProvider } from '../contexts/UserContext'
import { SidebarDrawerProvider } from '../contexts/SidebarDrawerContext'

import { theme } from '../styles/theme'
import 'react-toastify/dist/ReactToastify.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>  
      <UserProvider>
        <SidebarDrawerProvider>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />

          <Component {...pageProps} />
        </SidebarDrawerProvider>
      </UserProvider>
    </ChakraProvider>
  )
}

export default MyApp
