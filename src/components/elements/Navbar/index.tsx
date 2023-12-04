import React from 'react'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import Logo from '../NavbarLogo'
import { useAuthContext } from '@contexts'
import { Button } from '@chakra-ui/react'

interface CustomLinkProps extends LinkProps {
  title: string
  className?: string
  href: string
}

const CustomLink: React.FC<CustomLinkProps> = ({
  href,
  title,
  className = '',
}) => {
  const router = useRouter()
  return (
    <Link href={href}>
      <div className={`${className} relative group cursor-pointer`}>
        <span>
          {title}
          <span
            className={`h-[3px] inline-block bg-teal-600
            absolute left-0 -bottom-0.5
            group-hover:w-full transition-[width] ease duration-300 
            ${router.asPath === href ? 'w-full' : 'w-0'}`}
          >
            &nbsp;
          </span>
        </span>
      </div>
    </Link>
  )
}

const Navbar: React.FC = () => {
  const router = useRouter()
  const { user } = useAuthContext()
  // List of paths where Navbar should not be displayed
  const hideNavbarPaths = ['/login', '/register']

  // Check if the current route matches any of the paths where Navbar should be hidden
  const hideNavbar = hideNavbarPaths.includes(router.pathname)

  if (hideNavbar) {
    return null // Do not render Navbar if the current route is in the hideNavbarPaths list
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
          href="/login"
          title="Order"
          className="mx-2 text-teal-600 text-xl"
        />
        <CustomLink
          href="/register"
          title="Profile"
          className="mx-2 text-teal-600 text-xl"
        />
      </nav>
      {!!user ? (
        <Link href="/logout">
          <Button colorScheme="red" variant="outline">
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
      {/* <Link href={!!user ? '/logout' : '/login'}>
        <Button>{!!user ? 'Logout' : 'Login'}</Button>
      </Link> */}
    </header>
  )
}

export default Navbar
