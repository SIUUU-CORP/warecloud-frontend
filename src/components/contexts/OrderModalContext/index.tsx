import React, { createContext, useContext, useState } from 'react'
import {
  OrderModalContextInterface,
  OrderModalContextProviderProps,
  OrderSectionType,
} from './interface'

const OrderModalContext = createContext({} as OrderModalContextInterface) // TODO: Declare interface of contextValue

export const useOrderModalContext = () => useContext(OrderModalContext)

export const OrderModalContextProvider: React.FC<
  OrderModalContextProviderProps
> = ({ children, isOpen, setIsOpen, item, orderSuccess, setOrderSuccess }) => {
  const [orderSection, setOrderSection] = useState<OrderSectionType>('ORDER')
  const [amount, setAmount] = useState<string>('1')
  const [subtotal, setSubtotal] = useState<string>('')

  const handleModal = () => {
    setIsOpen(!isOpen)
    if (orderSection === 'SUCCESS') setOrderSection('ORDER')
  }

  const contextValue = {
    isOpen,
    handleModal,
    orderSection,
    setOrderSection,
    amount,
    setAmount,
    subtotal,
    setSubtotal,
    item,
    orderSuccess,
    setOrderSuccess,
  }

  return (
    <OrderModalContext.Provider value={contextValue}>
      {children}
    </OrderModalContext.Provider>
  )
}
