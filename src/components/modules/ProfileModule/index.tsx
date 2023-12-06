import { useToast } from '@chakra-ui/react'
import { showToast } from '@utils'
import { useEffect, useState } from 'react'
import { UserInterface } from 'src/components/contexts/AuthContext/interface'
import axios from 'axios'
import ProfileDetail from './sections/ProfileDetail'
import EditIcon from './module-elements/EditIcon'
import { motion } from 'framer-motion'

export const ProfileModule: React.FC = () => {
  const toast = useToast()
  const [user, setUser] = useState<UserInterface>()

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
    } catch (error) {
      showToast({ title: 'Something went wrong', status: 'error', toast })
    }
  }

  useEffect(() => {
    getAllItems()
  }, [])

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="flex flex-col gap-3 p-4 md:p-6 lg:p-10 shadow-lg w-full max-w-screen-sm border border-teal-600 rounded-xl">
        <div className="flex items-center relative">
          <span className="font-bold text-3xl text-teal-600 flex-grow text-center">
            My Profile
          </span>
          <motion.a
            href="/edit-profile"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-0.3 right-2"
          >
            <EditIcon />
          </motion.a>
        </div>

        <div className="flex flex-col items-start">
          <ProfileDetail label="Email" value={user?.email} />
          <ProfileDetail label="Name" value={user?.name} />
          <ProfileDetail label="Address" value={user?.address} />
          <ProfileDetail label="Phone Number" value={user?.phoneNumber} />
          <ProfileDetail label="Role" value={user?.role} />
        </div>
      </div>
    </div>
  )
}
