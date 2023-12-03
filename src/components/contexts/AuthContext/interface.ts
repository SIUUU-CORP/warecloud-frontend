import { ReactNode } from 'react'

export interface AuthContextInterface {
  user?: UserInterface
  setUser: React.Dispatch<React.SetStateAction<UserInterface | undefined>>
}

export interface AuthContextProviderProps {
  children: ReactNode
}

export interface UserInterface {
  id: string
  name: string
  email: string
  address: string
  phoneNumber: string
  role: 'CUSTOMER' | 'VENDOR'
}

export interface BaseResponseInterface {
  responseCode: number
  responseMessage: string
  responseStatus: string
}
