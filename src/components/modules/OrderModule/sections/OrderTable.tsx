import React from 'react'
import { OrderProps } from '../interface'
import { getCurrency } from '@utils'

export const OrderTable: React.FC<{
  orders: OrderProps[]
  onAccept: (order: OrderProps) => Promise<void>
  onReject: (order: OrderProps) => Promise<void>
}> = ({ orders, onAccept, onReject }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-teal-300">
        <thead>
          <tr className="bg-teal-100">
            <th className="border border-teal-300 px-4 py-2">Order ID</th>
            <th className="border border-teal-300 px-4 py-2">Total Cost</th>
            <th className="border border-teal-300 px-4 py-2">Created At</th>
            <th className="border border-teal-300 px-4 py-2">Item Name</th>
            <th className="border border-teal-300 px-2 py-2">Order Status</th>
            <th className="border border-teal-300 px-4 py-2">Vendor Name</th>
            <th className="border border-teal-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="border border-teal-300 px-4 py-2">{order.id}</td>
              <td className="border border-teal-300 px-4 py-2">
                {getCurrency({ price: order.cost as number })}
              </td>
              <td className="border border-teal-300 px-4 py-2">
                {new Date(order.createdAt).toLocaleString()}
              </td>
              <td className="border border-teal-300 px-4 py-2">
                {order.item.name}
              </td>
              <td className="border border-teal-300 px-4 py-2">
                {order.orderStatus}
              </td>
              <td className="border border-teal-300 px-4 py-2">
                {order.user.name}
              </td>
              <td className="border border-teal-300 px-4 py-2">
                {order.orderStatus === 'PENDING' ? (
                  <>
                    <button
                      onClick={() => onAccept(order)}
                      className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md mr-2"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => onReject(order)}
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md"
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <div className="h-8 w-8">-</div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default OrderTable
