import { Dispatch, ReactNode, SetStateAction } from 'react'
import {
  ItemModalInterface,
  ItemProps,
} from 'src/components/modules/ManageItemModule/interface'

export interface ItemFormModalContextInterface {
  name: string
  setName: Dispatch<SetStateAction<string>>
  description: string
  setDescription: Dispatch<SetStateAction<string>>
  price: number
  setPrice: Dispatch<SetStateAction<number>>
  weight: number
  setWeight: Dispatch<SetStateAction<number>>
  stock: number
  setStock: Dispatch<SetStateAction<number>>
  isOpen: boolean
  handleModal: () => void
  isCreate?: boolean
  createItem?: (item: ItemModalInterface) => Promise<void>
  isUpdate?: boolean
  updateItem?: (item: ItemModalInterface, itemId: string) => Promise<void>
  item?: ItemProps
}

export interface ItemFormModalContextProviderProps {
  children: ReactNode
  isOpen: boolean
  setIsOpen: (value: SetStateAction<boolean>) => void
  isCreate?: boolean
  createItem?: (item: ItemModalInterface) => Promise<void>
  isUpdate?: boolean
  updateItem?: (item: ItemModalInterface, itemId: string) => Promise<void>
  item?: ItemProps
}
