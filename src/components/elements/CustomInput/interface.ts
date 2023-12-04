import { ReactNode } from 'react'

export interface CustomInputInterface {
  placeholder?: string
  label?: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  value: string
  className?: string
  children?: ReactNode
}
