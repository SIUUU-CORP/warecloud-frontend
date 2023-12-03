import React from 'react'
import { CustomTextAreaInterface } from './interface'
import { Textarea } from '@chakra-ui/react'

export const CustomTextArea: React.FC<CustomTextAreaInterface> = ({
  label,
  placeholder,
  onChange,
  value,
}) => {
  // TODO: Write element's logic

  return (
    <div className="flex flex-col gap-1 w-full">
      {!!label && <label>{label}</label>}
      <Textarea placeholder={placeholder} onChange={onChange} value={value} />
    </div>
  )
}
