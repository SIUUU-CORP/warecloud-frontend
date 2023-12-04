import React from 'react'
import { Input, InputGroup } from '@chakra-ui/react'
import { CustomInputInterface } from './interface'

export const CustomInput: React.FC<CustomInputInterface> = ({
  label,
  placeholder,
  onChange,
  value,
  className,
  children,
}) => {
  return (
    <div className={`flex flex-col gap-1 items-start w-full ${className}`}>
      {!!label && <label>{label}</label>}
      <InputGroup>
        {children}
        <Input placeholder={placeholder} onChange={onChange} value={value} />
      </InputGroup>
    </div>
  )
}
