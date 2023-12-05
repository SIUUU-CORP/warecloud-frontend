import React from 'react'
import { OrderProps } from '../interface'

export const OrderDetail: React.FC<{
  order: OrderProps
  onAccept: (order: OrderProps) => void
  onReject: (order: OrderProps) => void
}> = ({ order, onAccept, onReject }) => {
  const { id, createdAt, item, amount, cost, orderStatus, user } = order

  const formattedCost = Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(cost as number)

  return (
    <div className="bg-teal-50 shadow-xl scale-95 hover:scale-105 transition ease-linear rounded-md p-4 mb-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-teal-600">Order ID: {id}</h3>
        <p className="text-teal-500">Status: {orderStatus}</p>
      </div>
      <p className="text-teal-700 mb-2">Item: {item.name}</p>
      <p className="text-teal-700 mb-2">Vendor Name: {user.name}</p>
      <p className="text-teal-700 mb-2">
        Created At: {new Date(createdAt).toLocaleString()}
      </p>
      <p className="text-teal-700 mb-2">Amount: {amount}</p>
      <p className="text-teal-700 mb-2">Total Cost: {formattedCost}</p>

      {orderStatus === 'PENDING' && (
        <div className="flex justify-end">
          <button
            onClick={() => onAccept(order)}
            className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md mr-2"
          >
            Accept
          </button>
          <button
            onClick={() => onReject(order)}
            className="bg-red-700 hover:bg-teal-800 text-white px-4 py-2 rounded-md"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  )
}
