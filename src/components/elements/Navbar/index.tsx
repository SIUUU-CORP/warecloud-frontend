import React from 'react'
import Link from 'next/link'
import { useAuthContext } from '@contexts'
import { Button, useToast } from '@chakra-ui/react'
import { CustomLink, Logo } from '@elements'
import { showToast } from '@utils'

const Navbar: React.FC = () => {
  const { user, setUser } = useAuthContext()
  const toast = useToast()

  const onLogout = () => {
    localStorage.removeItem('Access Token')
    setUser(undefined)
    showToast({ status: 'success', title: 'Successfully logout!', toast })
  }

  return (
    <header className="flex items-center justify-between px-32 py-3 font-bold shadow-lg ">
      <Logo />
      <nav className="flex items-center justify-between">
        <CustomLink
          href="/"
          title="Home"
          className="mx-2 text-teal-600 text-xl"
        />
        <CustomLink
          href="/item"
          title="Item"
          className="mx-2 text-teal-600 text-xl"
        />
        {user?.role === 'VENDOR' && (
          <CustomLink
            href="/manage-item"
            title="Management"
            className="mx-2 text-teal-600 text-xl"
          />
        )}

        {!!user ? (
          <CustomLink
            href="/profile"
            title="Profile"
            className="mx-2 text-teal-600 text-xl"
          />
        ) : null}
      </nav>
      {!!user ? (
        <Link href="/">
          <Button colorScheme="red" variant="outline" onClick={onLogout}>
            Logout
          </Button>
        </Link>
      ) : (
        <Link href="/login">
          <Button colorScheme="blue" variant="solid">
            Login
          </Button>
        </Link>
      )}
    </header>
  )
}

export default Navbar
