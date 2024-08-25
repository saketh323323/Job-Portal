import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/all-jobs/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch job details');
        }
        const data = await response.json();
        setJob(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchJobDetails();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!job) {
    return <div>Loading...</div>;
  }

  const handleApply = async () => {
    const { value: url } = await Swal.fire({
      input: 'url',
      inputLabel: 'Upload Your Resume URL',
      inputPlaceholder: 'Enter the URL ',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      customClass: {
        popup: 'bg-[#434343] text-yellow-300',
        confirmButton: 'bg-yellow-300 text-black font-bold py-2 px-4 rounded',
        cancelButton: 'text-yellow-300 bg-black',
        input: 'bg-black text-yellow-300 border border-yellow-300',
      },
      inputAttributes: {
        'aria-label': 'URL input'
      }
    });

    if (url) {
      Swal.fire({
        title: 'URL Submitted',
        text: `Entered URL: ${url}`,
        icon: 'success',
        customClass: {
          popup: 'bg-black text-yellow-300',
          confirmButton: 'bg-yellow-300 text-black font-bold py-2 px-4 rounded',
        }
      });
    }
  };

  return (
    <div className="bg-black min-h-screen xl:px-16 px-2 text-white flex flex-col items-center justify-center">
      <div className="max-w-screen-2xl container mx-auto xl:px-22 px-4">
        <h2 className="text-2xl font-bold mb-4">{job.companyName}</h2>
        <h1 className="text-4xl font-bold mb-6"> {job.jobTitle}</h1>
        <button className="bg-yellow-300 py-3 px-9 text-black font-semibold rounded mb-6" onClick={handleApply}>
          Apply now
        </button>
        <h1 className="text-1xl text-yellow-300 font-bold mb-6"> job details :-</h1>
        <h1 className="text-1xl font-bold mb-6">
  CTC : {job.maxPrice} 
  <span className="ml-4">LOCATION : {job.jobLocation}</span>
</h1>
        <p className="text-lg leading-relaxed">{job.description}</p>
      </div>
    </div>
  );
};

export default JobDetails;
