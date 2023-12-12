import React, { useState } from 'react'
import { Input } from '@chakra-ui/react'

interface ProfileFormProps {
  label: string
  value: string
  user: any
  setUser: React.Dispatch<React.SetStateAction<any>>
  onUpdate: (updatedUser: any) => void
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  label,
  value,
  user,
  setUser,
  onUpdate,
}) => {
  const [updatedValue, setUpdatedValue] = useState(user[value])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedValue(e.target.value)
  }

  const handleBlur = () => {
    setUser({ ...user, [value]: updatedValue })
    onUpdate({ ...user, [value]: updatedValue })
  }

  return (
    <div className="mb-3 w-full">
      <p className="font-bold text-xl text-teal-600">{label}</p>
      <Input
        variant="filled"
        placeholder={user[value] || ''}
        value={updatedValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        className=""
      />
    </div>
  )
}

export default ProfileForm
