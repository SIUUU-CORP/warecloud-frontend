import { ToastId, UseToastOptions } from '@chakra-ui/react'

export interface ShowToastInterface {
  title: string
  status: 'error' | 'success'
  toast: (options?: UseToastOptions | undefined) => ToastId
}
