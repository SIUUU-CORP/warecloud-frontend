import { SetStateAction } from 'react'
import { BaseResponseInterface } from 'src/components/contexts/AuthContext/interface'
import { ItemInterface } from 'src/components/elements/ItemCard/interface'

export interface DetailItemModuleProps {
  item: ItemInterface
}

export interface GetDetailItemResponseInterface extends BaseResponseInterface {
  item: ItemInterface
}

export interface DetailItemInterface {
  key: string
  label: string
  value: string | number
}

export interface GetDetailItemListProps {
  description: string
  price: string
  weight: number
}

export interface OrderModalProps {
  isOpen: boolean
  setIsOpen: (value: SetStateAction<boolean>) => void
  item: ItemInterface
  orderSuccess: boolean
  setOrderSuccess: React.Dispatch<React.SetStateAction<boolean>>
}

export interface GetOrderDetailsProps {
  itemName: string
  vendorName: string
  amount: string
  subtotal: string
  shippingCost: string
  totalPurchase: string
}
