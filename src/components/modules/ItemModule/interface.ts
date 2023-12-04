import { Dispatch, SetStateAction } from 'react'
import { BaseResponseInterface } from 'src/components/contexts/AuthContext/interface'
import { ItemInterface } from 'src/components/elements/ItemCard/interface'

export interface SearchBarProps {
  search: string
  setSearch: Dispatch<SetStateAction<string>>
}

export interface GetItemsResponseInterface extends BaseResponseInterface {
  items: ItemInterface[]
  pagination: PaginationInterface
}

export interface PaginationInterface {
  pages: number
  hasPrev: boolean
  hasNext: boolean
}

export interface PaginationProps {
  currentPage: number
  handlePageChange: (value: string) => void
  pagination?: PaginationInterface
}
