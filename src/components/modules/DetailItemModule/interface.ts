import { BaseResponseInterface } from 'src/components/contexts/AuthContext/interface'
import { ItemInterface } from 'src/components/elements/ItemCard/interface'

export interface GetDetailItemResponseInterface extends BaseResponseInterface {
  item: ItemInterface
}

export interface DetailItemInterface {
  label: string
  value: string | number
}

export interface GetDetailItemListProps {
  description: string
  price: string
  weight: number
  stock: number
}
