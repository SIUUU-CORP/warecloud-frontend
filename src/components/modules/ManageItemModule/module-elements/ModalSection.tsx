import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react'
import { useItemFormModalContext } from '@contexts'
import { FormSection } from './FormSection'
import { useWindowSize } from 'usehooks-ts'

export const ModalSection = () => {
  const { isOpen, handleModal } = useItemFormModalContext()
  const { width } = useWindowSize()

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleModal}
      size={width < 768 ? 'xs' : 'md'}
    >
      <ModalOverlay />
      <ModalContent>
        <FormSection />
      </ModalContent>
    </Modal>
  )
}
