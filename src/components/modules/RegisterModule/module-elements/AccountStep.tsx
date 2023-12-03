import { CustomInput, PasswordInput } from '@elements'
import React from 'react'
import { AccountStepInterface } from './interface'

export const AccountStep: React.FC<AccountStepInterface> = ({
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
  email,
  password,
  confirmationPassword,
}) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <CustomInput
        label="Email"
        placeholder="Enter email"
        onChange={onEmailChange}
        value={email}
      />
      <PasswordInput
        placeholder="Enter password"
        label="Password"
        onChange={onPasswordChange}
        value={password}
        isInvalid={password !== '' && password.length < 8}
        errorMessage={'Password must contains at least 8 characters!'}
      />
      <PasswordInput
        placeholder="Enter confirmation password"
        label="Confirmation Password"
        onChange={onConfirmPasswordChange}
        isInvalid={
          password !== confirmationPassword &&
          password !== '' &&
          confirmationPassword !== ''
        }
        errorMessage="Password is not match!"
        value={confirmationPassword}
      />
    </div>
  )
}
