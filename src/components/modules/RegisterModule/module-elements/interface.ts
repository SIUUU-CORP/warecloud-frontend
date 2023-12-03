export interface RoleCardInterface {
  selectedRole?: number
  isCustomer?: boolean
}

export interface AccountStepInterface {
  onEmailChange: React.ChangeEventHandler<HTMLInputElement>
  onPasswordChange: React.ChangeEventHandler<HTMLInputElement>
  onConfirmPasswordChange: React.ChangeEventHandler<HTMLInputElement>
  email: string
  password: string
  confirmationPassword: string
}

export interface PersonalInformationInterface {
  onNameChange: React.ChangeEventHandler<HTMLInputElement>
  name: string
  onPhoneNumberChange: React.ChangeEventHandler<HTMLInputElement>
  phoneNumber: string
  onAddressChange: React.ChangeEventHandler<HTMLTextAreaElement>
  address: string
}
