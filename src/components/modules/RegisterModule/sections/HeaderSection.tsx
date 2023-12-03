import React from 'react'
import { HeaderSectionInterface } from './interfaces'

export const HeaderSection: React.FC<HeaderSectionInterface> = ({
  activeStep,
}) => {
  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <span className="font-bold text-3xl text-teal-600">
        {activeStep === 0
          ? 'Create an Account'
          : activeStep === 1
            ? 'Select Your Role'
            : 'Personal Information'}
      </span>
      <p className="text-justify">
        Welcome to our bustling warehouse community, where hundreds of customers
        and vendors converge to make logistics seamless and efficient!
      </p>
    </div>
  )
}
