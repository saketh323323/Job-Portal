import React from 'react'
import { FiMapPin } from 'react-icons/fi';
 
    import { Link } from 'react-router-dom';

const Card = ({data}) => {
    const {_id,companyName , companyLogo , minPrice ,maxPrice, salaryType,jobLocation,employmentType,postingDate,jobTitle, description} = data;
  return (
    <div>
        <h3 className="text-yellow-300 ">{data.jobTitle}</h3>
        <section className='jobcards'>
<Link to={`/job/${_id}`} className='flex gap-4 flex-col sm:flex-row items-start'>
<img src={companyLogo} alt=""/>
<div className='jobcard-details'>
          <h4 className='text-yellow-300 text-3xl mb-1'>{companyName}</h4>
          <h3 className='text-white  font-semibold text-lgmb-2'>{jobTitle}</h3>
          <div className='text-white/70 text-base flex-col flex-wrap gap-3 mb-2'>
            <span className='flex items-centre gap-1'><FiMapPin/>{jobLocation}</span>
            <span className='flex items-centre gap-3'>estimated salary-{maxPrice}</span>

            <p className='text-white , text-base'>{description}</p>
          </div>
</div>
</Link>
        </section>
  </div>
  )
}

export default Card