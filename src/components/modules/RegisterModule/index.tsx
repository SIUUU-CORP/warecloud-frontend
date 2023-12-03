import React, { useState } from 'react'
import {
  PersonalInformationStep,
  RoleCard,
  AccountStep,
} from './module-elements'
import { ButtonSection, HeaderSection } from './sections'

export const RegisterModule: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0)
  const [selectedRole, setSelectedRole] = useState<number>(-1)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [phoneNumber, setPhoneNumber] = useState<string>('')

  const onNext = () => {
    if (activeStep === 0) {
      setActiveStep(1)
    } else if (activeStep === 1) {
      setActiveStep(2)
    } else if (activeStep === 2) {
      // handle register
    }
  }

  const onPrev = () => {
    if (activeStep === 2) {
      setActiveStep(1)
    } else if (activeStep === 1) {
      setActiveStep(0)
    }
  }

  const isDisabled = () => {
    if (
      activeStep === 0 &&
      (email === '' ||
        password === '' ||
        confirmPassword === '' ||
        password !== confirmPassword)
    ) {
      return true
    } else if (activeStep === 1 && selectedRole === -1) {
      return true
    } else if (
      activeStep === 2 &&
      (name === '' || phoneNumber === '' || address === '')
    ) {
      return true
    }
    return false
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col items-center gap-3 p-10 shadow-lg w-[550px]">
        <HeaderSection activeStep={activeStep} />
        {activeStep === 0 ? (
          <AccountStep
            onEmailChange={(event) => setEmail(event.target.value)}
            onPasswordChange={(event) => setPassword(event.target.value)}
            onConfirmPasswordChange={(event) =>
              setConfirmPassword(event.target.value)
            }
            email={email}
            password={password}
            confirmationPassword={confirmPassword}
          />
        ) : activeStep === 1 ? (
          <div className="flex gap-10 py-5">
            <RoleCard
              isCustomer={true}
              onClick={() => setSelectedRole(0)}
              selectedRole={selectedRole}
            />
            <RoleCard
              onClick={() => setSelectedRole(1)}
              selectedRole={selectedRole}
            />
          </div>
        ) : (
          <PersonalInformationStep
            onNameChange={(event) => setName(event.target.value)}
            name={name}
            onPhoneNumberChange={(event) => setPhoneNumber(event.target.value)}
            phoneNumber={phoneNumber}
            onAddressChange={(event) => setAddress(event.target.value)}
            address={address}
          />
        )}
        <ButtonSection
          onNext={onNext}
          onPrev={onPrev}
          activeStep={activeStep}
          isDisabled={isDisabled}
        />
        <span className="text-sm">Already have an account? Login here.</span>
      </div>
    </div>
  )
}
