import { InputLeftElement } from '@chakra-ui/react'
import { CustomInput } from '@elements'
import { AiOutlineSearch } from 'react-icons/ai'
import { SearchBarProps } from '../interface'

export const SearchBar: React.FC<SearchBarProps> = ({ search, setSearch }) => (
  <div className="w-[80%] md:w-[75%] lg::w-[60%] xl:w-[50%]">
    <CustomInput
      placeholder="Search on Warecloud"
      onChange={(event) => setSearch(event.target.value)}
      value={search}
    >
      <InputLeftElement>
        <AiOutlineSearch className="text-teal-600 w-6 h-6" />
      </InputLeftElement>
    </CustomInput>
  </div>
)
