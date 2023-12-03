import { ReactNode } from 'react'

export interface AuthContextInterface {
  user?: UserInterface
}

export interface AuthContextProviderProps {
  children: ReactNode
}

export interface UserInterface {
  id: string
  name: string
  email: string
}
