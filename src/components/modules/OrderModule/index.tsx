import { useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { showToast } from '@utils'
import axios, { AxiosError } from 'axios'
import { GetOrdersProps, OrderProps } from './interface'
import { OrderDetail } from './sections/OrderDetail'
import { BaseResponseInterface } from 'src/components/contexts/AuthContext/interface'
import { PaginationInterface } from 'src/components/elements/Pagination/interface'
import { Pagination } from '@elements'

export const OrderModule: React.FC = () => {
  const [orders, setOrders] = useState<OrderProps[]>([])
  const [pagination, setPagination] = useState<PaginationInterface>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const toast = useToast()

  const handleAccept = (order: OrderProps) => {
    updateStatusOrder(order.id, 1)
  }

  const handleReject = (order: OrderProps) => {
    updateStatusOrder(order.id, 0)
  }

  const handlePageChange = (value: string) => {
    let page = parseInt(value)
    if (page > (pagination?.records ?? 1)) {
      return
    }

    if (Number.isNaN(page)) {
      page = 0
    }
    setCurrentPage(page)
  }

  const updateStatusOrder = async (orderId: string, isApproved: number) => {
    try {
      const token = localStorage.getItem('Access Token')
      const response = await axios({
        method: 'PATCH',
        url: `${process.env.NEXT_PUBLIC_APP_API_URL}/profile/request/${orderId}`,
        data: { isApproved },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const responseData: OrderProps = response?.data

      showToast({
        title: 'Successfully update status',
        status: 'success',
        toast,
      })
      const updatedOrders = orders.map((order) => {
        if (order.id === responseData.id) {
          return { ...order, orderStatus: responseData.orderStatus }
        }
        return order
      })

      setOrders(updatedOrders)
    } catch (error) {
      if (error instanceof AxiosError) {
        const { responseMessage }: BaseResponseInterface = error.response?.data
        showToast({ title: responseMessage, status: 'error', toast })
      } else {
        showToast({ title: 'Something went wrong', status: 'error', toast })
      }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('Access Token')
      try {
        const page = currentPage === 0 ? 1 : currentPage
        const response = await axios({
          method: 'GET',
          url: `${process.env.NEXT_PUBLIC_APP_API_URL}/profile/request?page=${page}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const { orders, pagination }: GetOrdersProps = response?.data
        pagination.records /= 2

        setPagination(pagination)
        setOrders(orders)
      } catch (error) {
        if (error instanceof AxiosError) {
          const { responseMessage }: BaseResponseInterface =
            error.response?.data
          showToast({ title: responseMessage, status: 'error', toast })
        } else {
          showToast({ title: 'Something went wrong', status: 'error', toast })
        }
      }
    }

    fetchData()
  }, [currentPage])

  return (
    <div className="flex flex-col items-center py-8 min-h-screen container mx-auto p-4 ">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-teal-500 dark:text-teal-400">
        {orders.map((order) => (
          <OrderDetail
            order={order}
            onAccept={handleAccept}
            onReject={handleReject}
            key={order.id}
          />
        ))}
      </div>
      {pagination && pagination.records !== 0 && (
        <Pagination
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          pagination={pagination}
        />
      )}
    </div>
  )
}
