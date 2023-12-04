import React from 'react'
import { ItemCardProps } from './interface'
import { Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'

export const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const router = useRouter()
  const { id, name, price, user } = item
  const formattedPrice = Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(price)

  const handleDetailItemButton = () => {
    const lowerCasedName = user.name.toLowerCase()
    const vendorNamePath = lowerCasedName.replaceAll(' ', '-')
    router.push(`/${vendorNamePath}/${id}`)
  }

  return (
    <div className="w-64 bg-teal-600 rounded-lg hover:-translate-y-1.5 duration-300 ease-in-out">
      <div className="px-6 py-5 flex flex-col gap-1">
        <p className="text-white font-bold text-lg">{name}</p>
        <p className="text-white font-semibold">{user.name}</p>
        <p className="text-white">{formattedPrice}</p>

        <div className="pt-3">
          <Button className="w-fit" onClick={handleDetailItemButton}>
            Lihat Detail
          </Button>
        </div>
      </div>
    </div>
  )
}
