import React from 'react'
import { useForm } from "react-hook-form"

const Postjob = () => {
  const {
    register,
    handleSubmit,reset,
    
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    fetch("http://localhost:3000/post-job",{
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(result => {
      console.log(result);
      if(result.acknowledged === true){
        alert("job posting is successful:)")
      }
      reset()
    });
  };

  
  return (
    <div className='bg-black min-h-screen'>
    <div className=' max-w-screen-2xl container mx-auto xl:px-24 px-4'>
      <div className='bg-[#434343] py-10 px-4 lg:px-17'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='job-flexed'>
            <div className='lg:w-1/2 w-full'>
            <label className='text-white mb-2 block text-lg'>
              JobTitle :
              </label>
              <input type="text" placeholder={"title"} {...register("jobTitle")}  className='job-input'/>
            </div>
            <div className='lg:w-1/2 w-full'>
            <label className=' text-white mb-2 block text-lg'>
              CompanyName :
              </label>
              <input type="text" placeholder={"Ex : Google"} {...register("companyName")}  className='block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-black placeholder-slate-400 focus:outline-none sm:text-sm sm:leading-6'/>
            </div>
            
        </div>

        <div className='job-flexed'>
            <div className='lg:w-1/2 w-full'>
            <label className='text-white mb-2 block text-lg'>
              maximum salary :
              </label>
              <input type="text" placeholder={"in rupees"} {...register("maxPrice")}  className='block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-black placeholder-slate-400 focus:outline-none sm:text-sm sm:leading-6'/>
            </div>
            <div className='lg:w-1/2 w-full'>
            <label className='text-white mb-2 block text-lg'>
              salary is in :
              </label>
              <select {...register("salaryType", { required: true })}>
        <option value="">choose</option>
        <option value="rupees-monthly">rupees-monthly</option>
        <option value="rupees-yearly">rupees-yearly</option>
        <option value="dollars-mothly">dollars-mothly</option>
        <option value="dollars-yearly">dollars-yearly</option>
           </select>
            </div>

        </div>

        <div className='job-flexed'>
            <div className='lg:w-1/2 w-full'>
            <label className=' text-white mb-2 block text-lg'>
             location :
              </label>
              <input type="text" placeholder={"city"} {...register("jobLocation")}  className='block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-black placeholder-slate-400 focus:outline-none sm:text-sm sm:leading-6'/>
            </div>
            <div className='lg:w-1/2 w-full'>
            <label className='text-white mb-2 block text-lg'>
              joining time :
              </label>
              <select {...register("joiningTime", { required: true })}>
        <option value="">choose</option>
        
        <option value="immediately">immediately</option>
        <option value="after some time">after some time</option>
        <option value="remote">remote</option>
           </select>
            </div>

        </div>

        <div className='job-flexed'>
            <div className='lg:w-1/2 w-full'>
            <label className='text-white mb-2 block text-lg'>
             logo of company :
              </label>
              <input type="url" placeholder={"paste URL"} {...register("companyLogo")}  className='block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-black placeholder-slate-400 focus:outline-none sm:text-sm sm:leading-6'/>
            </div>
            <div className='lg:w-1/2 w-full'>
            <label className='text-white mb-2 block text-lg'>
              mandotary skillsets (if required) :
              </label>
              <input type="text" placeholder={"skills?"} {...register("skillSet")}  className='block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-black placeholder-slate-400 focus:outline-none sm:text-sm sm:leading-6'/>
            </div>

        </div>

        <div className='job-flexed'>
            <div className=' w-full'>
            <label className='text-white mb-2 block text-lg'>
             Job role Description :
              </label>
              <textarea className='w-full focus:outline-none pl-3 py-2 placeholder:text-gray-500' placeholder='we are thrilled to invite you' rows={7} {...register("description")}/>
             
            </div>
        </div>
        <div className='w-full'>
          <label className='text-white block mb-2 text-lg'>Your contact :  </label>
          <input
          type="email"
          placeholder='your contact' 
          {...register("skillSet")}
          className='job-input'
          />
         
        </div>
     
      

      <input type="submit" className='block mt-12 bg-black text-yellow-300 px-8 py-4 rounded-sm cursor-pointer font-semibold'/>
    </form>
      </div>
    </div>
    </div>
  )
}

export default Postjob