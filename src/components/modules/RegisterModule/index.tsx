import React, { useState } from 'react'
import {
  PersonalInformationStep,
  RoleCard,
  AccountStep,
} from './module-elements'
import { ButtonSection, HeaderSection } from './sections'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { showToast } from '@utils'
import { useToast } from '@chakra-ui/react'
import { BaseResponseInterface } from 'src/components/contexts/AuthContext/interface'

export const RegisterModule: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0)
  const [selectedRole, setSelectedRole] = useState<number>(-1)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const router = useRouter()
  const toast = useToast()

  const onNext = () => {
    if (activeStep === 0) {
      setActiveStep(1)
    } else if (activeStep === 1) {
      setActiveStep(2)
    } else if (activeStep === 2) {
      register()
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
        password !== confirmPassword ||
        password.length < 8)
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

  const register = async () => {
    try {
      const data = {
        email,
        password,
        name,
        phoneNumber,
        address,
        role: selectedRole === 0 ? 'Customer' : 'Vendor',
      }

      await axios({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_APP_API_URL}/auth/register`,
        data,
      })

      showToast({ title: 'Successfully registered!', status: 'success', toast })
      router.push('/login')
    } catch (e) {
      if (e instanceof AxiosError) {
        const { responseMessage }: BaseResponseInterface = e.response?.data
        showToast({ title: responseMessage, status: 'error', toast })
      } else {
        showToast({ title: 'Something went wrong', status: 'error', toast })
      }
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col items-center gap-3 p-10 shadow-lg w-[550px]">
        <HeaderSection activeStep={activeStep} />
        {/* TODO: Refactor?? */}
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
        <span className="text-sm">
          Already have an account?{' '}
          <a href="/login" className="text-blue-500 underline">
            Login here.
          </a>
        </span>
      </div>
    </div>
  )
}
