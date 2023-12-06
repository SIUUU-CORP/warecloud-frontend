import { Button, Image, ModalFooter, ModalHeader } from '@chakra-ui/react'
import { useAuthContext, useOrderModalContext } from '@contexts'

export const SuccessSection: React.FC = () => {
  const { user } = useAuthContext()
  const { handleModal, orderSection } = useOrderModalContext()

  if (orderSection !== 'SUCCESS') return <></>

  return (
    <>
      <ModalHeader className="flex justify-center">
        <Image src="/order-successful.png" boxSize="250px" />
      </ModalHeader>
      <ModalFooter>
        <Button colorScheme="teal" onClick={handleModal} className="w-full">
          {`Continue ${user?.role === 'CUSTOMER' ? 'Shopping' : ''}`}
        </Button>
      </ModalFooter>
    </>
  )
}
