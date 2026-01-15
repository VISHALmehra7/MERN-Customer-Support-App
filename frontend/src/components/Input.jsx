import React from 'react'

const Input = ({...props}) => {
  return (
    <div className='rounded-md w-64'>
        <input {...props} className= {`w-full border  border-[#E5E5E5] p-2 rounded-md focus:outline-none focus:border-b-black placeholder:text-sm `} />
    </div>
  )
}

export default Input