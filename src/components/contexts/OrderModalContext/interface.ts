import { Dispatch, ReactNode, SetStateAction } from 'react'
import { ItemInterface } from 'src/components/elements/ItemCard/interface'

export type OrderSectionType = 'ORDER' | 'DETAIL' | 'SUCCESS'

export interface OrderModalContextInterface {
  orderSection: OrderSectionType
  setOrderSection: Dispatch<SetStateAction<OrderSectionType>>
  amount: string
  setAmount: Dispatch<SetStateAction<string>>
  subtotal: string
  setSubtotal: Dispatch<SetStateAction<string>>
  orderSuccess: boolean
  setOrderSuccess: React.Dispatch<React.SetStateAction<boolean>>
  isOpen: boolean
  handleModal: () => void
  item: ItemInterface
}

export interface OrderModalContextProviderProps {
  children: ReactNode
  isOpen: boolean
  setIsOpen: (value: SetStateAction<boolean>) => void
  orderSuccess: boolean
  setOrderSuccess: React.Dispatch<React.SetStateAction<boolean>>
  item: ItemInterface
}
