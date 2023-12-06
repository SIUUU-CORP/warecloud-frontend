import React from 'react'

interface EditIconProps {
  className?: string // Allow for className to be passed as a prop
}

const EditIcon: React.FC<EditIconProps> = ({ className }) => (
  <svg
    fill="#00897b"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 72 72"
    width="40px"
    height="40px"
  >
    <path d="M38.406 22.234l11.36 11.36L28.784 54.576l-12.876 4.307c-1.725.577-3.367-1.065-2.791-2.79l4.307-12.876L38.406 22.234zM41.234 19.406l5.234-5.234c1.562-1.562 4.095-1.562 5.657 0l5.703 5.703c1.562 1.562 1.562 4.095 0 5.657l-5.234 5.234L41.234 19.406z" />
  </svg>
)

export default EditIcon
