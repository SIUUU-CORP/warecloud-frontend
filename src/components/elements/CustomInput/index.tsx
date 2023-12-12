import React from 'react'
import { Input, InputGroup } from '@chakra-ui/react'
import { CustomInputInterface } from './interface'

export const CustomInput: React.FC<CustomInputInterface> = ({
  label,
  placeholder,
  onChange,
  value,
  children,
}) => {
  return (
    <div className="flex flex-col gap-1 items-start w-full">
      {!!label && <label>{label}</label>}
      <InputGroup>
        <Input placeholder={placeholder} onChange={onChange} value={value} />
        {children}
      </InputGroup>
    </div>
  )
}
