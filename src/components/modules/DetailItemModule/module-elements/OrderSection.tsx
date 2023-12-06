import {
  Button,
  InputLeftElement,
  InputRightElement,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '@chakra-ui/react'
import { CustomInput } from '@elements'
import { useEffect } from 'react'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { getCurrency } from '@utils'
import { useAuthContext, useOrderModalContext } from '@contexts'

export const OrderSection: React.FC = () => {
  const { user } = useAuthContext()
  const {
    item,
    subtotal,
    setSubtotal,
    amount,
    setAmount,
    orderSection,
    setOrderSection,
  } = useOrderModalContext()
  const { stock, price } = item

  useEffect(() => {
    setSubtotal(getCurrency({ price: price }))
  }, [])

  const handleAmountInput = (value: string) => {
    let amount = parseInt(value)

    if (!amount && value !== '') return

    if (Number.isNaN(amount)) amount = 0

    if (amount > stock) amount = stock

    handleAmountChange(amount)
  }

  const handleReduceAmount = () => handleAmountChange(parseInt(amount) - 1)
  const handleIncreaseAmount = () => handleAmountChange(parseInt(amount) + 1)

  const handleAmountChange = (amount: number) => {
    setAmount(String(amount))
    const subtotal = price * amount
    setSubtotal(getCurrency({ price: subtotal }))
  }

  const handleNextButton = () => {
    setOrderSection('DETAIL')
  }

  if (orderSection !== 'ORDER') return <></>

  return (
    <>
      <ModalHeader className="text-center">
        {user?.role === 'CUSTOMER' ? 'ORDER' : 'REQUEST'}
      </ModalHeader>
      <ModalBody className="flex flex-col gap-3">
        <div className="flex flex-col gap-1 w-full">
          <p>Amount</p>
          <div className="flex flex-row gap-2 items-center">
            <div className="w-[25%]">
              <CustomInput
                onChange={(event) => handleAmountInput(event.target.value)}
                value={amount}
              >
                <InputLeftElement>
                  {parseInt(amount) !== 0 && (
                    <button onClick={handleReduceAmount}>
                      <AiOutlineMinus />
                    </button>
                  )}
                </InputLeftElement>

                <InputRightElement>
                  {parseInt(amount) !== item.stock && (
                    <button onClick={handleIncreaseAmount}>
                      <AiOutlinePlus />
                    </button>
                  )}
                </InputRightElement>
              </CustomInput>
            </div>
            <p>
              {`Stock: `}
              <a className="font-bold">{stock}</a>
            </p>
          </div>
        </div>

        <div className="flex justify-between w-full">
          <p>Subtotal</p>
          <p className="font-bold text-lg">{subtotal}</p>
        </div>
      </ModalBody>

      <ModalFooter>
        <Button
          className="w-full"
          colorScheme="teal"
          onClick={handleNextButton}
          isDisabled={parseInt(amount) === 0}
        >
          Next
        </Button>
      </ModalFooter>
    </>
  )
}
