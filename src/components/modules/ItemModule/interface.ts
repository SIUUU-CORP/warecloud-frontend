import { Dispatch, SetStateAction } from 'react'
import { BaseResponseInterface } from 'src/components/contexts/AuthContext/interface'
import { ItemInterface } from 'src/components/elements/ItemCard/interface'
import { PaginationInterface } from 'src/components/elements/Pagination/interface'

export interface SearchBarProps {
  search: string
  setSearch: Dispatch<SetStateAction<string>>
}

export interface GetItemsResponseInterface extends BaseResponseInterface {
  items: ItemInterface[]
  pagination: PaginationInterface
}
