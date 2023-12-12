import { SetStateAction } from 'react'
import { BaseResponseInterface } from 'src/components/contexts/AuthContext/interface'
import { PaginationInterface } from 'src/components/elements/Pagination/interface'

export interface GetItemsProps {
  items: ItemProps[]
  pagination: PaginationInterface
}

export interface NewItemProps extends BaseResponseInterface {
  responseData: ItemProps
}

export interface ItemProps {
  id: string
  name: string
  description: string
  price: number
  weight: number
  stock: number
  createdAt: string
}

export type ItemModalInterface = Omit<ItemProps, 'createdAt' | 'id'>

export interface ItemFormModalProps {
  isOpen: boolean
  setIsOpen: (value: SetStateAction<boolean>) => void
  item?: ItemProps
  createItem?: (item: ItemModalInterface) => Promise<void>
  updateItem?: (item: ItemModalInterface, itemId: string) => Promise<void>
}
