import React, { useState } from 'react'
import { ItemModalInterface, ItemProps } from '../interface'
import { ItemFormModal } from './ItemFormModal'

export const ItemCard: React.FC<{
  item: ItemProps
  onDelete: (itemId: string) => Promise<void>
  updateItem: (item: ItemModalInterface, itemId: string) => Promise<void>
}> = ({ item, onDelete, updateItem }) => {
  const [showOrderModal, setShowOrderModal] = useState<boolean>(false)
  const { id, name, description, price, stock, weight, createdAt } = item

  const formattedPrice = Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(price as number)

  return (
    <div className="bg-teal-50 shadow-xl scale-95 hover:scale-100 transition ease-linear rounded-md p-4 mb-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-teal-600">Item ID: {id}</h3>
        <p className="text-teal-700 mb-2">
          Created At: {new Date(createdAt).toLocaleString()}
        </p>
      </div>
      <p className="text-teal-700 mb-2">Name: {name}</p>
      <p className="text-teal-700 mb-2">Description: {description}</p>
      <p className="text-teal-700 mb-2">Stock: {stock}</p>
      <p className="text-teal-700 mb-2">Price: {formattedPrice}</p>
      <p className="text-teal-700 mb-2">Weight: {weight}</p>

      <div className="flex justify-end">
        <button
          onClick={() => setShowOrderModal(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-2"
        >
          Update
        </button>
        <button
          onClick={() => onDelete(item.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
        >
          Delete
        </button>
      </div>

      <ItemFormModal
        isOpen={showOrderModal}
        setIsOpen={setShowOrderModal}
        item={item}
        updateItem={updateItem}
      />
    </div>
  )
}
