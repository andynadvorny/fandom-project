import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { ToastContainer } from 'react-toastify'

import { UserProvider } from '../contexts/UserContext'

import { theme } from '../styles/theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>  
      <UserProvider>
        <Component {...pageProps} />

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
      </UserProvider>
    </ChakraProvider>
  )
}

export default MyApp
