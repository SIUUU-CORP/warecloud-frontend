import { useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { showToast } from '@utils'
import axios, { AxiosError } from 'axios'
import { GetOrdersProps, OrderProps, UpdateOrderProps } from './interface'
import { BaseResponseInterface } from 'src/components/contexts/AuthContext/interface'
import { PaginationInterface } from 'src/components/elements/Pagination/interface'
import { Pagination } from '@elements'
import OrderTable from './sections/OrderTable'

export const OrderModule: React.FC = () => {
  const [orders, setOrders] = useState<OrderProps[]>([])
  const [pagination, setPagination] = useState<PaginationInterface>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const toast = useToast()

  const handleAccept = async (order: OrderProps) => {
    updateStatusOrder(order.id, 1)
  }

  const handleReject = async (order: OrderProps) => {
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

      const { order }: UpdateOrderProps = response?.data

      showToast({
        title: 'Successfully update status',
        status: 'success',
        toast,
      })

      setOrders(
        orders.map((o) =>
          o.id === orderId ? { ...o, orderStatus: order.orderStatus } : o
        )
      )
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
    <>
      <div className="flex flex-col items-center py-2 min-h-screen container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Request Orders</h1>
        <OrderTable
          orders={orders}
          onAccept={handleAccept}
          onReject={handleReject}
        />
        {pagination && pagination.records !== 0 && (
          <Pagination
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            pagination={pagination}
          />
        )}
      </div>
    </>
  )
}
