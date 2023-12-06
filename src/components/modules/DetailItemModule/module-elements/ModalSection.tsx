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
import { useWindowSize } from 'usehooks-ts'

export const ModalSection = () => {
  const { isOpen, handleModal } = useOrderModalContext()
  const { width } = useWindowSize()

  return (
    <Modal isOpen={isOpen} onClose={handleModal} size={width < 768 ? 'xs' : 'md'}>
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
