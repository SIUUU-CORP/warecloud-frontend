import { LoginModalProps } from './interface'
import {
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Image,
} from '@chakra-ui/react'
import Link from 'next/link'
import { useWindowSize } from 'usehooks-ts'

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  content = 'Excited to make a purchase? Secure your order by logging in first!',
}) => {
  const { width } = useWindowSize()

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={width < 768 ? 'xs' : 'md'}>
      <ModalOverlay />
      <ModalContent className="items-center py-2">
        <ModalCloseButton />
        <ModalHeader className="flex flex-col items-center gap-4 lg:gap-5">
          <Image
            src="/login.png"
            boxSize={width < 768 ? '160px' : width < 1024 ? '200px' : '225px'}
          />
          <p className="text-center font-semibold text-base md:text-lg lg:text-xl text-teal-800">
            {content}
          </p>
        </ModalHeader>
        <ModalFooter>
          <Link href={'/login'}>
            <Button colorScheme="teal">Login Now</Button>
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
