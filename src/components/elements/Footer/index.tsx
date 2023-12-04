import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full border-t-2 border-dark font-medium text-lg bg-light h-full bg-light p-10 flex items-center justify-between">
      <span>{new Date().getFullYear()} &copy; All Rights Reserved.</span>
      <span>SIUUU Corp.</span>
    </footer>
  )
}

export default Footer
