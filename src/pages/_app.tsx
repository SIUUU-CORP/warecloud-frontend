import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthContextProvider } from '@contexts'
import Navbar from 'src/components/elements/Navbar'
import Footer from 'src/components/elements/Footer'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AuthContextProvider>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </AuthContextProvider>
    </ChakraProvider>
  )
}
