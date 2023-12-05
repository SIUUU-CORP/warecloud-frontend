import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  AuthContextProviderProps,
  AuthContextInterface,
  UserInterface,
  BaseResponseInterface,
} from './interface'
import axios, { AxiosError } from 'axios'
import { showToast } from '@utils'
import { useToast } from '@chakra-ui/react'

const AuthContext = createContext({} as AuthContextInterface)

export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<UserInterface>()
  const toast = useToast()

  const loadUser = async () => {
    const token = localStorage.getItem('Access Token')

    if (!token) {
      return
    }

    const headers = {
      authorization: `Bearer ${token}`,
    }

    try {
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_APP_API_URL}/auth/user`,
        headers,
      })
      const { user } = response.data
      setUser(user)
    } catch (error) {
      if (error instanceof AxiosError) {
        const { responseCode }: BaseResponseInterface = error.response?.data
        if (responseCode === 401) {
          localStorage.removeItem('Access Token')
          showToast({
            title: 'Your session has expired',
            status: 'error',
            toast,
            description: 'Please kindly login',
          })
        } else {
          showToast({
            title: 'Something went wrong',
            status: 'error',
            toast,
            description: 'Kindly contact help desk.',
          })
        }
        showToast({
          title: 'Something went wrong',
          status: 'error',
          toast,
          description: 'Kindly contact help desk.',
        })
      }
    }
  }

  useEffect(() => {
    loadUser()
  }, [])

  const contextValue = useMemo(() => {
    return {
      user,
      setUser,
    }
  }, [user, setUser])

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
