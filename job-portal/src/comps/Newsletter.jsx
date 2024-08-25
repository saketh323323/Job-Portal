import React from 'react'
import  {FaEnvelopeOpenText, FaRocket} from "react-icons/fa6"

const Newsletter = () => {
  return (
    <div >
    <div >
        <h3 className='text-yellow-300 text-lg font-bold flex items-center gap-3 mb-2'>
            <FaEnvelopeOpenText/>
            Email for more job notifications</h3>
            <p className='text-white text-base mb-4'></p>

            <div className='w-full flex-col space-y-3'>
                <input type="email" name = "email" id="email" placeholder='your email ID' className='w-full block py-2 pl-3 border focus:outline-yellow-300'/>
                <input type="submit" value={"subscribe"}  className='w-full bg-yellow-300 text-black cursor-pointer block py-2 pl-3 border focus:outline-yellow-300'/>
            </div>

    </div>

    <div className='mt-16'>
        <h3 className='text-yellow-300 text-lg font-bold flex items-center gap-3 mb-2'>
            <FaRocket/>
            resume uploading</h3>
            <p className='text-white text-base mb-4'></p>

            <div className='w-full flex-col space-y-3'>
                
                <input type="submit" value={"upload your resume"}  className='w-full bg-yellow-300 text-black cursor-pointer block py-2 pl-3 border focus:outline-yellow-300'/>
            </div>

    </div>
    </div>
  )
}

export default Newsletter