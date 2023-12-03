import { Inter } from 'next/font/google'
import { Button } from '@chakra-ui/react'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex gap-10 flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <h1>WARECLOUD OAWKAOWK :V</h1>
      <Link href={'/login'}>
        <Button>Login</Button>
      </Link>
      <Link href={'/register'}>
        <Button>Register</Button>
      </Link>
    </main>
  )
}
