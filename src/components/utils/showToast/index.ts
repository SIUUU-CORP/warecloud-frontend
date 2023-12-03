import { ShowToastInterface } from './interface'

export const showToast = ({ status, title, toast }: ShowToastInterface) => {
  toast({
    status,
    title,
    duration: 5000,
    isClosable: true,
    position: 'top',
  })
}
