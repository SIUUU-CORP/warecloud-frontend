export interface ItemCardProps {
  item: ItemInterface
}

export interface ItemInterface {
  id: string
  name: string
  description?: string
  price: number
  weight: number
  stock: number
  createdAt: Date
  userId: string
  user: {
    name: string
  }
}
