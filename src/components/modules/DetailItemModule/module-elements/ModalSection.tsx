import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react'
import { useOrderModalContext } from '@contexts'
import { OrderSection } from './OrderSection'
import { DetailSection } from './DetailSection'
import { SuccessSection } from './SuccessSection'

export const ModalSection = () => {
  const { isOpen, handleModal } = useOrderModalContext()

  return (
    <Modal isOpen={isOpen} onClose={handleModal}>
      <ModalOverlay />
      <ModalContent className="py-1">
        <ModalCloseButton />
        <OrderSection />
        <DetailSection />
        <SuccessSection />
      </ModalContent>
    </Modal>
  )
}
