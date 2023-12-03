import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import React from 'react'
import { PasswordInputInterface } from './interface'

export const PasswordInput: React.FC<PasswordInputInterface> = ({
  placeholder,
  label,
  onChange,
  isInvalid,
  value,
  errorMessage,
}) => {
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  return (
    <div className="w-full flex flex-col gap-1">
      {!!label && <label>{label}</label>}
      <InputGroup size="md">
        <Input
          pr="4.5rem"
          type={show ? 'text' : 'password'}
          placeholder={placeholder}
          onChange={onChange}
          isInvalid={isInvalid}
          value={value}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? 'Hide' : 'Show'}
          </Button>
        </InputRightElement>
      </InputGroup>
      {isInvalid && (
        <span className="text-red-500">
          {!!errorMessage ? errorMessage : 'Invalid password'}
        </span>
      )}
    </div>
  )
}
