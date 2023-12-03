import React from 'react'
import { Input } from '@chakra-ui/react'
import { CustomInputInterface } from './interface'

export const CustomInput: React.FC<CustomInputInterface> = ({
  label,
  placeholder,
  onChange,
  value,
}) => {
  return (
    <div className="flex flex-col gap-1 items-start w-full">
      {!!label && <label>{label}</label>}
      <Input placeholder={placeholder} onChange={onChange} value={value} />
    </div>
  )
}
