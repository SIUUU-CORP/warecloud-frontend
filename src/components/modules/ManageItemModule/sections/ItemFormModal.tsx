import { ItemFormModalProps } from '../interface'
import { ItemFormModalContextProvider } from '@contexts'
import { ModalSection } from '../module-elements/ModalSection'

export const ItemFormModal: React.FC<ItemFormModalProps> = ({
  isOpen,
  setIsOpen,
  createItem,
  updateItem,
  item,
}) => (
  <ItemFormModalContextProvider
    isOpen={isOpen}
    setIsOpen={setIsOpen}
    createItem={createItem}
    updateItem={updateItem}
    item={item}
  >
    <ModalSection />
  </ItemFormModalContextProvider>
)
