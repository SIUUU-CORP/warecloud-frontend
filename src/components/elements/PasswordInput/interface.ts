export interface PasswordInputInterface {
  placeholder?: string
  label?: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  isInvalid?: boolean
  value: string
  errorMessage?: string
}
