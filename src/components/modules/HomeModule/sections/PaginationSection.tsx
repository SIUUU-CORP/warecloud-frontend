import { CustomInput } from '@elements'
import { BsArrowLeftSquare } from 'react-icons/bs'
import { PaginationProps } from '../interface'

export const PaginationSection: React.FC<PaginationProps> = ({
  currentPage,
  handlePageChange,
  pagination,
}) => (
  <div className="pt-10 flex flex-row gap-3">
    {(pagination?.hasPrev ?? false) && (
      <button>
        <BsArrowLeftSquare className="text-teal-600 w-8 h-8" />
      </button>
    )}

    <div className="flex flex-row gap-1 items-center">
      <div className='w-11'>
        <CustomInput
          onChange={(event) => handlePageChange(event.target.value)}
          value={currentPage.toString()}
        />
      </div>
      <p className="text-2xl font-light">{`/ ${pagination?.pages ?? 1}`}</p>
    </div>

    {(pagination?.hasNext ?? false) && (
      <button>
        <BsArrowLeftSquare className="text-teal-600 w-8 h-8 rotate-180" />
      </button>
    )}
  </div>
)
