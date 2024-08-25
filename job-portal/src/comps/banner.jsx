import React , { useState } from "react"
import {FiMapPin, FiSearch} from "react-icons/fi"

const Banner = ({query,handleInputChange}) => {
  
  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 md:py-17 py-14'>
    <h1 className='text-white font-bold mb-3 text-5xl'>This is the <span className='text-yellow-300'>Best Job portal</span></h1>
    <p className='text-white/70 text-1xl'>Hurry up and be the first to apply for your dream jobs</p>
    <form>
        <div className='flex justify-start md:flex-row flex-col md:gap-0 gap-4'>
          <div  className="flex md:rounded-s-md rounded shadow-sm ring-1 ring-inset ring-gray-400 focus-within:ring-2 focus-within:ring-inset focus-within:ring-yellow-400md:w-1/3 w-full">
            <input type="text" name="title" id="title"  className='block flex-1 border-0 bg-transparent py-1.5 pl-8 placeholder:text-gray-400 
              text-white focus:right-0 sm:text-sm sm:leading-6' 
              placeholder="Search jobs..."
              onChange={handleInputChange} 
              value={query || ""} />
              <FiSearch className='absolute mt-2.5 ml-2 text-white'/>
             
          </div>
          <div className="flex md:rounded-s-none rounded shadow-sm ring-1 ring-inset ring-gray-400 focus-within:ring-2 focus-within:ring-inset focus-within:ring-yellow-400md:w-1/3 w-full">
            <input type="text" name="title" id="title"  className='block flex-1 border-0 bg-transparent py-1.5 pl-8 placeholder:text-gray-400 
              text-white focus:right-0 sm:text-sm sm:leading-6' 
              placeholder="and your location"
              />
              <FiMapPin className='absolute mt-2.5 ml-2 text-white'/>
             
          </div>
          <button type='submit' className="bg-yellow-300 py-2 px-8 text-primary md:rounded-s-none rounded"> click </button>
        </div>
    </form>
     </div>
  )
}

export default Banner