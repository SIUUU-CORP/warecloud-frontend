import { ItemCard } from '@elements'
import { SearchBar } from './module-elements/SearchBar'
import { useToast } from '@chakra-ui/react'
import { showToast } from '@utils'
import { useEffect, useState } from 'react'
import { useDebounce } from 'usehooks-ts'
import axios from 'axios'
import { GetItemsResponseInterface, PaginationInterface } from './interface'
import { ItemInterface } from 'src/components/elements/ItemCard/interface'
import { PaginationSection } from './sections/PaginationSection'
import { Loader } from './module-elements/Loader'

export const ItemModule: React.FC = () => {
  const DEBOUNCE_DELAY = 500
  const [search, setSearch] = useState<string>('')
  const debouncedSearch = useDebounce(search, DEBOUNCE_DELAY)
  const toast = useToast()
  const [items, setItems] = useState<ItemInterface[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [pagination, setPagination] = useState<PaginationInterface>()

  const getAllItems = async () => {
    try {
      const page = currentPage === 0 ? 1 : currentPage
      setIsLoading(true)

      const response = await axios({
        method: 'GET',
        url: `${process.env.NEXT_PUBLIC_APP_API_URL}/item?page=${page}&search=${debouncedSearch}`,
      })

      const { items, pagination }: GetItemsResponseInterface = response?.data
      setItems(items)
      setPagination(pagination)
      setIsLoading(false)
    } catch (error) {
      showToast({ title: 'Something went wrong', status: 'error', toast })
    }
  }

  const handlePageChange = (value: string) => {
    let page = parseInt(value)
    if (page > (pagination?.pages ?? 1)) {
      return
    }

    if (Number.isNaN(page)) {
      page = 0
    }
    setCurrentPage(page)
  }

  useEffect(() => {
    getAllItems()
  }, [debouncedSearch, currentPage])

  return (
    <>
      <section className="max-w-[1440px] flex flex-col mx-auto items-center py-8 min-h-screen">
        <SearchBar search={search} setSearch={setSearch} />

        <div className="pt-8 flex flex-wrap gap-5 justify-center">
          {isLoading ? (
            <Loader />
          ) : items.length === 0 ? (
            <p>Barang yang Anda cari tidak tersedia di Warecloud</p>
          ) : (
            items.map((item) => <ItemCard item={item} key={item.id} />)
          )}
        </div>

        {pagination && pagination.pages !== 0 && (
          <PaginationSection
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            pagination={pagination}
          />
        )}
      </section>
    </>
  )
}
