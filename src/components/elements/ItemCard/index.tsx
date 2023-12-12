import React from 'react'
import { ItemCardProps } from './interface'
import { AiOutlineShopping } from 'react-icons/ai'
import Link from 'next/link'
import { getCurrency } from '@utils'

export const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const { id, name, price, user } = item
  const lowerCasedName = user.name.toLowerCase()
  const vendorNamePath = lowerCasedName.replaceAll(' ', '-')
  const formattedPrice = getCurrency({ price: price })

  return (
    <Link href={`/${vendorNamePath}/${id}`}>
      <div className="w-64 bg-teal-600 rounded-lg hover:-translate-y-1.5 duration-200 ease-in-out">
        <div className="px-6 py-5 flex flex-col gap-1">
          <p className="text-white font-bold text-lg">{name}</p>
          <p className="text-white font-semibold">{user.name}</p>
          <p className="text-white">{formattedPrice}</p>

          <div className="pt-3">
            <AiOutlineShopping className="text-white w-8 h-8" />
          </div>
        </div>
      </div>
    </Link>
  )
}
