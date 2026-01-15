import React from 'react'
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Button = ({label,type,loading}) => {
  return (
    <button type={type || "button" } disabled={loading} className={`p-2 bg-black text-white rounded-md w-full text-center cursor-pointer ` }>
        { loading ?<AiOutlineLoading3Quarters  className='animate-spin  m-auto' /> : label}
    </button>
  )
}

export default Button