import { ItemCard } from '@elements'
import { SearchBar } from './module-elements/SearchBar'
import { useToast } from '@chakra-ui/react'
import { showToast } from '@utils'
import { useEffect, useState } from 'react'
import { useDebounce } from 'usehooks-ts'
import axios from 'axios'
import { GetItemsResponseInterface } from './interface'
import { ItemInterface } from 'src/components/elements/ItemCard/interface'
import { Pagination } from '@elements'
import { Loader } from './module-elements/Loader'
import { PaginationInterface } from 'src/components/elements/Pagination/interface'

export const ItemModule: React.FC = () => {
  const DEBOUNCE_DELAY = 500
  const [search, setSearch] = useState<string>('')
  const debouncedSearch = useDebounce(search, DEBOUNCE_DELAY)
  const toast = useToast()
  const [items, setItems] = useState<ItemInterface[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const debouncedPage = useDebounce(currentPage, DEBOUNCE_DELAY)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [pagination, setPagination] = useState<PaginationInterface>()

  const getAllItems = async () => {
    try {
      setIsLoading(true)
      const page = currentPage === 0 ? 1 : currentPage

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
    if (page > (pagination?.records ?? 1)) {
      return
    }

    if (Number.isNaN(page)) {
      page = 0
    }
    setCurrentPage(page)
  }

  useEffect(() => {
    getAllItems()

    if (!isLoading && items.length === 0) {
      setCurrentPage(0)
    }
  }, [debouncedSearch, debouncedPage])

  return (
    <>
      <section
        className={`max-w-[1440px] flex flex-col mx-auto items-center py-8 ${
          !isLoading && items.length === 0 && 'min-h-screen'
        }`}
      >
        <SearchBar search={search} setSearch={setSearch} />

        <div className="pt-8 flex flex-wrap gap-5 justify-center">
          {isLoading ? (
            <Loader />
          ) : items.length === 0 ? (
            <p>The item you are looking for is not available on Warecloud</p>
          ) : (
            items.map((item) => <ItemCard item={item} key={item.id} />)
          )}
        </div>

        {pagination && pagination.records !== 0 && (
          <Pagination
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            pagination={pagination}
          />
        )}
      </section>
    </>
  )
}
