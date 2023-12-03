import React, { createContext, useContext, useMemo } from 'react'
import { AuthContextProviderProps, AuthContextInterface } from './interface'

const AuthContext = createContext({} as AuthContextInterface)

export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const contextValue = useMemo(() => {
    return {}
  }, [])

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
