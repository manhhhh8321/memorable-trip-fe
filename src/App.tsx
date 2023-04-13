import { RouterProvider } from 'react-router-dom'
import { ChakraProvider, CSSReset, extendTheme } from '@chakra-ui/react'

import { QueryClient, QueryClientProvider } from 'react-query'
import { router } from './routes'
import { ToastProvider } from '@chakra-ui/toast'
import { themeOverride } from './libs'
import 'react-paginate/theme/basic/react-paginate.css'
import 'react-confirm-alert/src/react-confirm-alert.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

const customTheme = extendTheme(themeOverride)

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={customTheme} toastOptions={{ defaultOptions: { position: 'top-right' } }}>
        <ToastContainer />
        {/* <ToastProvider> */}
        <CSSReset />
        <RouterProvider router={router} />
        {/* </ToastProvider> */}
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default App
