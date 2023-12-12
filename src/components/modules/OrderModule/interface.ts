import {
  BaseResponseInterface,
  UserInterface,
} from 'src/components/contexts/AuthContext/interface'
import { PaginationInterface } from 'src/components/elements/Pagination/interface'

export enum OrderStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  DELIVERED = 'DELIVERED',
  REJECTED = 'REJECTED',
}

export interface GetOrdersProps {
  orders: OrderProps[]
  pagination: PaginationInterface
}

export interface UpdateOrderProps extends BaseResponseInterface {
  order: OrderProps
}

export interface OrderProps {
  id: string
  amount: number
  cost: number
  orderStatus: OrderStatus
  createdAt: string
  item: ItemProps
  user: UserInterface
}

export interface ItemProps {
  name: string
}
