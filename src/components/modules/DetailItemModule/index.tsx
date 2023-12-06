import { Button, useToast } from '@chakra-ui/react'
import { getCurrency, showToast } from '@utils'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { BsArrowLeftSquare } from 'react-icons/bs'
import { ItemInterface } from 'src/components/elements/ItemCard/interface'
import {
  DetailItemInterface,
  GetDetailItemResponseInterface,
} from './interface'
import { LoginModal, Skeleton } from '@elements'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { getDetailItemList } from './constant'
import { useAuthContext } from '@contexts'
import { OrderModal } from './sections/OrderModal'

export const DetailItemModule: React.FC = () => {
  const {
    query: { itemId },
  } = useRouter()
  const { user } = useAuthContext()
  const router = useRouter()
  const toast = useToast()
  const [item, setItem] = useState<ItemInterface>()
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false)
  const [showOrderModal, setShowOrderModal] = useState<boolean>(false)
  const [orderSuccess, setOrderSuccess] = useState<boolean>(false)

  const getDetailitem = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${process.env.NEXT_PUBLIC_APP_API_URL}/item/${itemId}`,
      })

      const { item }: GetDetailItemResponseInterface = response?.data
      setItem(item)
    } catch (error) {
      showToast({ title: 'Item not available', status: 'error', toast })
      router.push('/')
    }
  }

  useEffect(() => {
    getDetailitem()
  }, [orderSuccess])

  const formattedPrice = getCurrency({ price: item?.price as number })

  const detailItemList: DetailItemInterface[] = getDetailItemList({
    description: item?.description as string,
    price: formattedPrice,
    weight: item?.weight as number,
  })

  const handleLoginModal = () => setShowLoginModal(!showLoginModal)

  const handleOrderButton = () => {
    if (!user) handleLoginModal()
    else setShowOrderModal(true)
  }

  return (
    <>
      <section className="w-[87%] md:w-[400px] lg:w-[450px] flex flex-col mx-auto py-10 min-h-screen">
        <div className="outline outline-2 outline-teal-600 px-5 md:px-7 lg:px-8 py-5 md:py-6 flex flex-col gap-3 md:gap-4 rounded-md">
          <Link href={'/item'} className="w-fit h-fit group">
            <BsArrowLeftSquare className="text-teal-600 w-7 lg:w-8 h-7 lg:h-8 group-hover:text-teal-400 duration-150 ease-in-out" />
          </Link>

          {item ? (
            <>
              <div className="flex flex-col gap-2 lg:gap-3">
                <div className="flex flex-col md:gap-1">
                  <p className="text-center font-bold text-xl text-teal-600">
                    {item.name}
                  </p>
                  <p className="text-center font-semibold text-lg text-teal-600">
                    {item.user.name}
                  </p>
                </div>
                {detailItemList.map(
                  ({ label, value }) =>
                    value && (
                      <div className="flex flex-col md:gap-1">
                        <p className="font-semibold">{label}</p>
                        <p>{value}</p>
                      </div>
                    )
                )}
              </div>
              <Button
                leftIcon={
                  item.stock > 0 ? (
                    <AiOutlineShoppingCart className="text-white w-5 h-5" />
                  ) : (
                    <></>
                  )
                }
                colorScheme="teal"
                isDisabled={item?.stock === 0}
                onClick={handleOrderButton}
              >
                {item.stock === 0
                  ? 'Item out of stock'
                  : user?.role === 'CUSTOMER'
                    ? 'Order'
                    : 'Request'}
              </Button>
            </>
          ) : (
            <div className="flex">
              <Skeleton height={400} />
            </div>
          )}
        </div>
      </section>

      <LoginModal isOpen={showLoginModal} onClose={handleLoginModal} />
      <OrderModal
        isOpen={showOrderModal}
        setIsOpen={setShowOrderModal}
        item={item as ItemInterface}
        orderSuccess={orderSuccess}
        setOrderSuccess={setOrderSuccess}
      />
    </>
  )
}
