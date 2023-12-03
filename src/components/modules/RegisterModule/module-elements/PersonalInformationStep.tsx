import { Input, InputGroup, InputLeftAddon } from '@chakra-ui/react'
import { CustomInput, CustomTextArea } from '@elements'
import React from 'react'
import { PersonalInformationInterface } from './interface'

export const PersonalInformationStep: React.FC<
  PersonalInformationInterface
> = ({
  onNameChange,
  name,
  onAddressChange,
  address,
  onPhoneNumberChange,
  phoneNumber,
}) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <CustomInput
        label="Name"
        placeholder="Enter name"
        onChange={onNameChange}
        value={name}
      />
      <div className="w-full flex flex-col gap-1">
        <label>Phone Number</label>
        <InputGroup>
          <InputLeftAddon>+62</InputLeftAddon>
          <Input
            type="tel"
            placeholder="phone number"
            onChange={onPhoneNumberChange}
            value={phoneNumber}
          />
        </InputGroup>
      </div>
      <CustomTextArea
        placeholder="Enter address"
        label="Address"
        onChange={onAddressChange}
        value={address}
      />
    </div>
  )
}
