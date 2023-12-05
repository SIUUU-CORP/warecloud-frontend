export interface PaginationInterface {
  records: number
  pages: number
  hasPrev: boolean
  hasNext: boolean
}

export interface PaginationProps {
  currentPage: number
  handlePageChange: (value: string) => void
  pagination?: PaginationInterface
}
