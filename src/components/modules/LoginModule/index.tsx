import { Button, useToast } from '@chakra-ui/react'
import { CustomInput, PasswordInput } from '@elements'
import { showToast } from '@utils'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { BaseResponseInterface } from 'src/components/contexts/AuthContext/interface'
import { LoginResponseInterface } from './interface'
import { useAuthContext } from '@contexts'

export const LoginModule: React.FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const router = useRouter()
  const toast = useToast()
  const { setUser } = useAuthContext()

  const login = async () => {
    try {
      const data = {
        email,
        password,
      }

      const response = await axios({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_APP_API_URL}/auth/login`,
        data,
      })

      const { user, token }: LoginResponseInterface = response?.data
      setUser(user)
      localStorage.setItem('Access Token', token)
      showToast({ title: 'Successfully login!', status: 'success', toast })
      router.push('/')
    } catch (e) {
      if (e instanceof AxiosError) {
        const { responseCode }: BaseResponseInterface = e.response?.data
        if (responseCode === 404) {
          showToast({
            title: 'You are not registered yet',
            status: 'error',
            toast,
          })
        } else if (responseCode === 400) {
          showToast({
            title: 'Invalid email or password',
            status: 'error',
            toast,
          })
        } else {
          showToast({ title: 'Something went wrong', status: 'error', toast })
        }
      } else {
        showToast({ title: 'Something went wrong', status: 'error', toast })
      }
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col items-center gap-3 p-10 shadow-lg w-[550px]">
        <span className="font-bold text-3xl text-teal-600">
          {'Login to your account'}
        </span>
        <p className="text-justify">
          Welcome to our bustling warehouse community, where hundreds of
          customers and vendors converge to make logistics seamless and
          efficient!
        </p>
        <CustomInput
          label="Email"
          placeholder="Enter email"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
        />
        <PasswordInput
          placeholder="Enter password"
          label="Password"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />
        <Button
          colorScheme="teal"
          className="w-full mt-3"
          isDisabled={email === '' || password === ''}
          onClick={login}
        >
          Login
        </Button>
        <span className="text-sm">
          Don&apos;t have an account yet?{' '}
          <a href="/register" className="text-blue-500 underline">
            Register here
          </a>
          .
        </span>
      </div>
    </div>
  )
}
