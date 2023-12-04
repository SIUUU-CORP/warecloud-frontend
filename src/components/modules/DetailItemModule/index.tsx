import { Button, useToast } from '@chakra-ui/react'
import { showToast } from '@utils'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { BsArrowLeftSquare } from 'react-icons/bs'
import { ItemInterface } from 'src/components/elements/ItemCard/interface'
import { DetailItemInterface, GetDetailItemResponseInterface } from './interface'
import { Skeleton } from '@elements'
import { AiOutlineShoppingCart } from "react-icons/ai"
import { getDetailItemList } from './constant'

export const DetailItemModule: React.FC = () => {
  const {
    query: { itemId },
  } = useRouter()
  const router = useRouter()
  const toast = useToast()
  const [item, setItem] = useState<ItemInterface>()

  const getDetailitem = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${process.env.NEXT_PUBLIC_APP_API_URL}/item/${itemId}`,
      })

      const { item }: GetDetailItemResponseInterface = response?.data
      setItem(item)
    } catch (error) {
      showToast({ title: 'Item tidak tersedia', status: 'error', toast })
      router.push('/')
    }
  }

  useEffect(() => {
    getDetailitem()
  }, [])

  const formattedPrice = Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(item?.price as number)

  const detailItemList: DetailItemInterface[] = getDetailItemList({
    description: item?.description as string,
    price: formattedPrice,
    weight: item?.weight as number,
    stock: item?.stock as number
  })

  return (
    <>
      <section className="max-w-[450px] flex flex-col mx-auto py-5 h-fit">
        <div className="outline outline-2 outline-teal-600 px-8 py-6 flex flex-col gap-4">
          <Link href={'/'} className='w-fit h-fit group'>
            <BsArrowLeftSquare className="text-teal-600 w-8 h-8 group-hover:text-teal-400 duration-150 ease-in-out" />
          </Link>
          
          {item? (
            <>
              <div className='flex flex-col gap-3'>
                <div className='flex flex-col gap-1'>
                  <p className='text-center font-bold text-xl text-teal-600'>{item.name}</p>
                  <p className='text-center font-semibold text-lg text-teal-600'>{item.user.name}</p>
                </div>
                {detailItemList.map(({ label, value }) => (
                  value && (
                    <div className='flex flex-col gap-1'>
                      <p className='font-semibold'>{label}</p>
                      <p>{value}</p>
                    </div>
                  )
                ))}
            </div>
            <Button leftIcon={<AiOutlineShoppingCart className='text-white w-5 h-5' />} colorScheme="teal" isDisabled={item?.stock === 0}>
              Pesan
            </Button>
            </>
          ) : (<div className='flex'><Skeleton height={400} /></div>)}
          
        </div>
      </section>
    </>
  )
}
