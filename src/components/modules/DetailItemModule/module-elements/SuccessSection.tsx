import { Button, Image, ModalFooter, ModalHeader } from '@chakra-ui/react'
import { useAuthContext, useOrderModalContext } from '@contexts'
import { useWindowSize } from 'usehooks-ts'

export const SuccessSection: React.FC = () => {
  const { user } = useAuthContext()
  const { handleModal, orderSection } = useOrderModalContext()
  const { width } = useWindowSize()

  if (orderSection !== 'SUCCESS') return <></>

  return (
    <>
      <ModalHeader className="flex justify-center">
        <Image src="/order-successful.png" boxSize={width < 1024? '225px' : '250px'} />
      </ModalHeader>
      <ModalFooter>
        <Button colorScheme="teal" onClick={handleModal} className="w-full">
          {`Continue ${user?.role === 'CUSTOMER' ? 'Shopping' : ''}`}
        </Button>
      </ModalFooter>
    </>
  )
}
