import { Inter } from 'next/font/google'
import { Button } from '@chakra-ui/react'
import Link from 'next/link'
import { useAuthContext } from '@contexts'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { user } = useAuthContext()

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
      <div className="text-black flex flex-col gap-1">
        <span>{`Nama: ${!!user ? user?.name : 'login dulu'}`}</span>
        <span>{`Email: ${!!user ? user?.email : 'login dulu'}`}</span>
        <span>{`Role: ${!!user ? user?.role : 'login dulu'}`}</span>
      </div>
    </main>
  )
}
