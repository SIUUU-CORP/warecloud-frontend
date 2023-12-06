import React from 'react'

interface ProfileDetailProps {
  label: string
  value: string | undefined
}

const ProfileDetail: React.FC<ProfileDetailProps> = ({ label, value }) => {
  return (
    <div className="mb-3">
      <p className="font-bold text-xl text-teal-600">{label}</p>
      <p className="font-bold text-lg text-teal-700 text-opacity-40">{value}</p>
    </div>
  )
}

export default ProfileDetail
