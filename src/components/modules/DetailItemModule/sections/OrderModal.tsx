import { OrderModalProps } from '../interface'
import { OrderModalContextProvider } from '@contexts'
import { ModalSection } from '../module-elements/ModalSection'

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  setIsOpen,
  item,
  orderSuccess,
  setOrderSuccess,
}) => (
  <OrderModalContextProvider
    isOpen={isOpen}
    setIsOpen={setIsOpen}
    item={item}
    orderSuccess={orderSuccess}
    setOrderSuccess={setOrderSuccess}
  >
    <ModalSection />
  </OrderModalContextProvider>
)
