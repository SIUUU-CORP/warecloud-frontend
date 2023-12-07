import React, { createContext, useContext, useState } from 'react'
import {
  ItemFormModalContextInterface,
  ItemFormModalContextProviderProps,
} from './interface'

const ItemFormModalContext = createContext({} as ItemFormModalContextInterface) // TODO: Declare interface of contextValue

export const useItemFormModalContext = () => useContext(ItemFormModalContext)

export const ItemFormModalContextProvider: React.FC<
  ItemFormModalContextProviderProps
> = ({ children, isOpen, setIsOpen, createItem, updateItem, item }) => {
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [price, setPrice] = useState<number>(0)
  const [weight, setWeight] = useState<number>(0)
  const [stock, setStock] = useState<number>(0)

  const handleModal = () => {
    setIsOpen(!isOpen)
  }

  const contextValue = {
    isOpen,
    handleModal,
    name,
    setName,
    description,
    setDescription,
    price,
    setPrice,
    weight,
    setWeight,
    stock,
    setStock,
    createItem,
    updateItem,
    item,
    // setItem,
  }

  return (
    <ItemFormModalContext.Provider value={contextValue}>
      {children}
    </ItemFormModalContext.Provider>
  )
}
