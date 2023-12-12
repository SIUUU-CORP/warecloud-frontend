import { useItemFormModalContext } from '@contexts'
import React from 'react'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Textarea,
} from '@chakra-ui/react'

export const FormSection: React.FC = () => {
  const {
    name,
    setName,
    description,
    setDescription,
    price,
    setPrice,
    weight,
    setWeight,
    stock,
    setStock,
    handleModal,
    createItem,
    updateItem,
    item,
  } = useItemFormModalContext()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setName('')
    setDescription('')
    setPrice(0)
    setWeight(0)
    setStock(0)
    handleModal()

    if (createItem) {
      await createItem({ name, description, price, weight, stock })
    }

    if (updateItem && item) {
      await updateItem({ name, description, price, weight, stock }, item.id)
    }
  }

  return (
    <>
      <ModalHeader>
        {createItem ? `Create New Item` : `Update Item`}
      </ModalHeader>
      <ModalCloseButton />
      <form onSubmit={handleSubmit}>
        <ModalBody>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              value={name}
              onChange={({ target }) => setName(target.value)}
              placeholder="item name"
            />
          </FormControl>

          <FormControl mt={2}>
            <FormLabel>Price</FormLabel>
            <NumberInput>
              <NumberInputField
                value={price === 0 ? '' : price}
                onChange={({ target }) => setPrice(parseInt(target.value))}
                required={createItem === null}
                placeholder="item price"
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <FormControl mt={2}>
            <FormLabel>Weight</FormLabel>
            <NumberInput>
              <NumberInputField
                value={weight === 0 ? '' : weight}
                onChange={({ target }) => setWeight(parseInt(target.value))}
                required={createItem === null}
                placeholder="item weight"
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <FormControl mt={2}>
            <FormLabel>Stock</FormLabel>
            <NumberInput>
              <NumberInputField
                value={stock === 0 ? '' : stock}
                onChange={({ target }) => setStock(parseInt(target.value))}
                required={createItem === null}
                placeholder="item stock"
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <FormControl mt={1}>
            <FormLabel>Description</FormLabel>
            <Textarea
              value={description}
              onChange={({ target }) => setDescription(target.value)}
              placeholder="item description"
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            isDisabled={price < 0 || weight < 0 || stock < 1}
            type="submit"
            colorScheme="blue"
            mr={3}
          >
            Save
          </Button>
          <Button colorScheme="red" onClick={handleModal}>
            Close
          </Button>
        </ModalFooter>
      </form>
    </>
  )
}
