import {
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
  useToast,
} from '@chakra-ui/react'
import { DetailItemInterface } from '../interface'
import { BsArrowLeftSquare } from 'react-icons/bs'
import { SHIPPING_RATE, getOrderDetailsList } from '../constant'
import { getCurrency, showToast } from '@utils'
import { useState } from 'react'
import { AiOutlineLoading } from 'react-icons/ai'
import axios, { AxiosError } from 'axios'
import { BaseResponseInterface } from 'src/components/contexts/AuthContext/interface'
import { useAuthContext, useOrderModalContext } from '@contexts'

export const DetailSection: React.FC = () => {
  const { user } = useAuthContext()
  const {
    item,
    subtotal,
    amount,
    setOrderSection,
    orderSection,
    setOrderSuccess,
    orderSuccess,
  } = useOrderModalContext()
  const toast = useToast()
  const { id, name, weight, price, userId } = item
  const shippingCost = parseInt(amount) * weight * SHIPPING_RATE
  const formattedShippingCost = getCurrency({ price: shippingCost })
  const [isLoading, setIsLoading] = useState<boolean>(false)

  let totalPurchase = price * parseInt(amount)
  if (user?.role === 'CUSTOMER') totalPurchase += shippingCost

  const formattedTotalPurchase = getCurrency({ price: totalPurchase })

  const handlePrevSectionButton = () => {
    setOrderSection('ORDER')
  }

  const orderDetailsList: DetailItemInterface[] = getOrderDetailsList({
    itemName: name,
    vendorName: item.user.name,
    amount: amount,
    subtotal: subtotal,
    shippingCost: formattedShippingCost,
    totalPurchase: formattedTotalPurchase,
  })

  const handleNextButton = async () => {
    setIsLoading(true)

    try {
      const token = localStorage.getItem('Access Token')
      const headers = {
        authorization: `Bearer ${token}`,
      }

      const data = {
        itemId: id,
        amount: parseInt(amount),
        vendorId: userId,
      }

      await axios({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_APP_API_URL}/order`,
        data,
        headers,
      })

      setOrderSuccess(!orderSuccess)
      setOrderSection('SUCCESS')
    } catch (error) {
      if (error instanceof AxiosError) {
        const { responseCode, responseMessage }: BaseResponseInterface =
          error.response?.data

        if (
          responseCode === 400 &&
          responseMessage === 'Amount must be greater than or equal to 1'
        ) {
          showToast({
            title: 'Amount must be greater than or equal to 1',
            status: 'error',
            toast,
          })
        } else if (responseCode === 404) {
          showToast({ title: 'Item not found', status: 'error', toast })
        } else if (responseCode === 403) {
          if (responseMessage === 'Cannot order your own item') {
            showToast({
              title: 'Cannot order your own item',
              status: 'error',
              toast,
            })
          } else if (responseMessage === 'Item out of stock') {
            showToast({ title: 'Item out of stock', status: 'error', toast })
          } else if (responseMessage === 'Stock is not sufficient') {
            showToast({
              title: 'Stock is not sufficient',
              status: 'error',
              toast,
            })
          } else {
            showToast({ title: 'Something went wrong', status: 'error', toast })
          }
        } else {
          showToast({ title: 'Something went wrong', status: 'error', toast })
        }
      } else {
        showToast({ title: 'Something went wrong', status: 'error', toast })
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (orderSection !== 'DETAIL') return <></>

  return (
    <>
      <ModalHeader>
        <button
          onClick={handlePrevSectionButton}
          className="group"
          disabled={isLoading}
        >
          <BsArrowLeftSquare
            className={`text-teal-600 w-7 lg:w-8 h-7 lg:h-8 duration-150 ease-in-out ${
              isLoading ? 'text-white' : 'group-hover:text-teal-400'
            }`}
          />
        </button>
        <p className="text-center font-bold">{`${
          user?.role === 'CUSTOMER' ? 'ORDER' : 'REQUEST'
        } DETAILS`}</p>
      </ModalHeader>
      <ModalBody className="flex flex-col gap-3">
        {orderDetailsList.map(({ key, label, value }) => {
          if (key === 'shippingCost' && user?.role === 'VENDOR') return <></>

          return (
            <div className="flex flex-col gap-1">
              <p className="font-semibold">{label}</p>
              <p>{value}</p>
            </div>
          )
        })}
      </ModalBody>
      <ModalFooter>
        <Button
          className="w-full"
          colorScheme="teal"
          onClick={handleNextButton}
          leftIcon={
            isLoading ? <AiOutlineLoading className="animate-spin" /> : <></>
          }
          isDisabled={isLoading}
        >
          {isLoading ? 'Processing the order' : 'Next'}
        </Button>
      </ModalFooter>
    </>
  )
}
