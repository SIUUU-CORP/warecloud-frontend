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
} from './interface'
import axios from 'axios'

const AuthContext = createContext({} as AuthContextInterface)

export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<UserInterface>()

  const loadUser = async () => {
    const token = localStorage.getItem('Access Token')

    if (!token) {
      return
    }

    const headers = {
      authorization: `Bearer ${token}`,
    }

    const response = await axios({
      url: `${process.env.NEXT_PUBLIC_APP_API_URL}/auth/user`,
      headers,
    })
    const { user } = response.data
    setUser(user)
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
