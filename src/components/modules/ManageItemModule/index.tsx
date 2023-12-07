import { useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { showToast } from '@utils'
import axios, { AxiosError } from 'axios'
import { BaseResponseInterface } from 'src/components/contexts/AuthContext/interface'
import { PaginationInterface } from 'src/components/elements/Pagination/interface'
import { Pagination } from '@elements'
import {
  GetItemsProps,
  ItemModalInterface,
  ItemProps,
  NewItemProps,
} from './interface'
import { ItemCard } from './sections/ItemCard'
import { useAuthContext } from '@contexts'
import { ItemFormModal } from './sections/ItemFormModal'
import { OrderModule } from '../OrderModule'

export const ManageItemModule: React.FC = () => {
  const [isItem, setIsItem] = useState<boolean>(true)

  const { user } = useAuthContext()
  const [items, setItems] = useState<ItemProps[]>([])
  const [pagination, setPagination] = useState<PaginationInterface>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false)
  const [showOrderModal, setShowOrderModal] = useState<boolean>(false)
  const toast = useToast()

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

  const createItem = async (item: ItemModalInterface) => {
    try {
      const token = localStorage.getItem('Access Token')
      const response = await axios({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_APP_API_URL}/item`,
        data: item,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const { responseData }: NewItemProps = await response?.data

      showToast({
        title: `A new item '${responseData.name}' added`,
        status: 'success',
        toast,
      })
      setItems(items.concat(responseData))
    } catch (error) {
      if (error instanceof AxiosError) {
        const { responseMessage }: BaseResponseInterface = error.response?.data
        showToast({ title: responseMessage, status: 'error', toast })
      } else {
        showToast({ title: 'Something went wrong', status: 'error', toast })
      }
    }
  }

  const updateItem = async (item: ItemModalInterface, itemId: string) => {
    try {
      const token = localStorage.getItem('Access Token')
      const response = await axios({
        method: 'PATCH',
        url: `${process.env.NEXT_PUBLIC_APP_API_URL}/item/${itemId}`,
        data: item,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const { responseData }: NewItemProps = response?.data

      showToast({
        title: 'Successfully update item',
        status: 'success',
        toast,
      })
      setItems(items.map((i) => (i.id === itemId ? responseData : i)))
    } catch (error) {
      if (error instanceof AxiosError) {
        const { responseMessage }: BaseResponseInterface = error.response?.data
        showToast({ title: responseMessage, status: 'error', toast })
      } else {
        showToast({ title: 'Something went wrong', status: 'error', toast })
      }
    }
  }

  const deleteItem = async (itemId: string) => {
    try {
      const token = localStorage.getItem('Access Token')
      await axios({
        method: 'DELETE',
        url: `${process.env.NEXT_PUBLIC_APP_API_URL}/item/${itemId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      showToast({
        title: 'Successfully delete item',
        status: 'success',
        toast,
      })
      setItems(items.filter((i) => i.id !== itemId))
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
          url: `${process.env.NEXT_PUBLIC_APP_API_URL}/item/me?page=${page}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const { items, pagination }: GetItemsProps = response?.data

        setPagination(pagination)
        setItems(items)
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

  const handleLoginModal = () => setShowLoginModal(!showLoginModal)

  const handleModalButton = () => {
    if (!user) handleLoginModal()
    else setShowOrderModal(true)
  }

  return (
    <>
      <div className="flex space-x-4 items-center mx-auto py-4 px-4">
        <button
          onClick={() => setIsItem(true)}
          className={`${
            isItem ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-800'
          } hover:bg-teal-700 hover:text-white font-bold py-2 px-4 rounded focus:outline-none`}
        >
          Manage Items
        </button>
        <button
          onClick={() => setIsItem(false)}
          className={`${
            !isItem ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-800'
          } hover:bg-teal-700 hover:text-white font-bold py-2 px-4 rounded focus:outline-none`}
        >
          Manage Request Orders
        </button>
      </div>

      {/* Render component */}
      {isItem && (
        <div className="border rounded">
          <div className="flex flex-col items-center py-2 min-h-screen container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Items</h1>
            <button
              className="bg-teal-500 text-white active:bg-teal-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={handleModalButton}
            >
              Create Item
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-teal-500 dark:text-teal-400">
              {items.map((item) => (
                <ItemCard
                  item={item}
                  onDelete={() => deleteItem(item.id)}
                  updateItem={updateItem}
                  key={item.id}
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
            <ItemFormModal
              isOpen={showOrderModal}
              setIsOpen={setShowOrderModal}
              createItem={createItem}
            />
          </div>
        </div>
      )}
      {!isItem && (
        <div className="border rounded">
          <OrderModule />
        </div>
      )}
    </>
  )
}
