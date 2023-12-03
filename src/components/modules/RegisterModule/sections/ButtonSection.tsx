import React from 'react'
import { ButtonSectionInterface } from './interfaces'
import { Button } from '@chakra-ui/react'

export const ButtonSection: React.FC<ButtonSectionInterface> = ({
  activeStep,
  onNext,
  onPrev,
  isDisabled,
}) => {
  return (
    <div className="pt-3 w-full flex gap-3">
      {activeStep !== 0 && (
        <Button
          width={'full'}
          onClick={onPrev}
          variant={'outline'}
          colorScheme="teal"
        >
          {'Previous'}
        </Button>
      )}
      <Button
        width={'full'}
        onClick={onNext}
        colorScheme="teal"
        isDisabled={isDisabled()}
      >
        {activeStep !== 2 ? 'Next' : 'Register'}
      </Button>
    </div>
  )
}
