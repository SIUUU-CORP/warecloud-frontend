import React, { useEffect, useState } from 'react'
import { useToast, Button, Link } from '@chakra-ui/react'
import { BeatLoader } from 'react-spinners'
import { showToast } from '@utils'
import axios from 'axios'
import ProfileForm from './sections/ProfileForm'
import ProfileDetail from '../ProfileModule/sections/ProfileDetail'
import { UserInterface } from 'src/components/contexts/AuthContext/interface'
import { useRouter } from 'next/router'
import { BsArrowLeftSquare } from 'react-icons/bs'

export const EditProfileModule: React.FC = () => {
  const toast = useToast()
  const router = useRouter()
  const [user, setUser] = useState<UserInterface>({
    name: '',
    id: '',
    email: '',
    address: '',
    role: 'CUSTOMER',
    phoneNumber: '',
  })
  const [updatedUser, setUpdatedUser] = useState<UserInterface>({
    name: '',
    id: '',
    email: '',
    address: '',
    role: 'CUSTOMER',
    phoneNumber: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isModified, setIsModified] = useState(false)

  const getAllItems = async () => {
    try {
      const token = localStorage.getItem('Access Token')
      const response = await axios({
        method: 'GET',
        url: `${process.env.NEXT_PUBLIC_APP_API_URL}/profile`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const userData: UserInterface = response?.data.user

      setUser(userData)
      setUpdatedUser(userData)
    } catch (error) {
      showToast({ title: 'Something went wrong', status: 'error', toast })
    }
  }

  const handleProfileUpdate = (updatedUserData: UserInterface) => {
    setUpdatedUser(updatedUserData)
    setIsModified(true)
  }

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      const token = localStorage.getItem('Access Token')
      await axios({
        method: 'PATCH',
        url: `${process.env.NEXT_PUBLIC_APP_API_URL}/profile`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: updatedUser,
      })

      showToast({ title: 'Profile updated', status: 'success', toast })
      setUser(updatedUser)
      router.push('/profile')
    } catch (error) {
      showToast({ title: 'Failed to update profile', status: 'error', toast })
    } finally {
      setIsLoading(false)
      setIsModified(false)
    }
  }

  useEffect(() => {
    getAllItems()
  }, [])

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="flex flex-col gap-3 p-4 md:p-6 lg:p-10 shadow-lg w-full max-w-screen-sm border border-teal-600 rounded-xl">
        <div className="flex items-center relative mb-4">
          <span className="font-bold text-3xl text-teal-600 flex-grow text-center">
            My Profile
          </span>
          <Link
            href={'/profile'}
            className="w-fit h-fit group absolute top-0.5 left-2"
          >
            <BsArrowLeftSquare className="text-teal-600 w-8 h-8 group-hover:text-teal-400 duration-150 ease-in-out" />
          </Link>
        </div>
        <div className="flex flex-col items-start">
          <ProfileDetail label="Email" value={user?.email}></ProfileDetail>
          <ProfileForm
            label="Name"
            value="name"
            user={user}
            setUser={setUser}
            onUpdate={handleProfileUpdate} // Pass a callback prop to handle form updates
          />
          <ProfileForm
            label="Address"
            value="address"
            user={user}
            setUser={setUser}
            onUpdate={handleProfileUpdate} // Pass a callback prop to handle form updates
          />
          <ProfileForm
            label="Phone Number"
            value="phoneNumber"
            user={user}
            setUser={setUser}
            onUpdate={handleProfileUpdate} // Pass a callback prop to handle form updates
          />
          <ProfileDetail label="Role" value={user?.role}></ProfileDetail>
        </div>
        <Button
          colorScheme="teal"
          className="w-full mt-3"
          onClick={handleSubmit}
          isLoading={isLoading}
          spinner={<BeatLoader size={8} color="white" />}
          isDisabled={!isModified}
        >
          Submit
        </Button>
      </div>
    </div>
  )
}
