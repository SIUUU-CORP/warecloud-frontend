import { ShowToastInterface } from './interface'

export const showToast = ({
  status,
  title,
  toast,
  description,
}: ShowToastInterface) => {
  toast({
    status,
    title,
    description,
    duration: 5000,
    isClosable: true,
    position: 'top',
  })
}
