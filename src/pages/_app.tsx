import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { ToastContainer } from 'react-toastify'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import { queryClient } from '../services/queryClient'
import { UserProvider } from '../contexts/UserContext'
import { CategoriesProvider } from '../hooks/useCategories'
import { CommunitiesProvider } from '../contexts/CommunityContext'
import { SidebarDrawerProvider } from '../contexts/SidebarDrawerContext'

import { theme } from '../styles/theme'
import 'react-toastify/dist/ReactToastify.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>  
        <UserProvider>
          <CategoriesProvider>
            <CommunitiesProvider>
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
            </CommunitiesProvider>
          </CategoriesProvider>
        </UserProvider>
      </ChakraProvider>

      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default MyApp
