import React, { useEffect, useState } from "react";
import Banner from "../comps/banner";
import Jobs from "../comps/Jobs";
import Card from "../comps/Card";
import Newsletter from "../comps/Newsletter";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  
  useEffect(() => {
    fetch("http://localhost:3000/all-jobs")
      .then(res => res.json())
      .then(data => {
        setJobs(data);
      });
  }, []);
  
  const [query, setQuery] = useState("");
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const filtered = jobs.filter((job) => 
    job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );
  
  // Button filters
  const handlechange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleclick = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filtereddata = (jobs, selected, query) => {
    let filteredJobs = jobs;

    if (query) {
      filteredJobs = filtered;
    }

    if (selected) {
      filteredJobs = filteredJobs.filter(
        ({ jobLocation, maxPrice, experienceLevel, salaryType, employmentType }) => 
          jobLocation.toLowerCase() === selected.toLowerCase() ||
          parseInt(maxPrice) <= parseInt(selected) ||
          salaryType.toLowerCase() === selected.toLowerCase() ||
          employmentType.toLowerCase() === selected.toLowerCase()
      );
      console.log(filteredJobs);
    }
    return filteredJobs.map((data, i) => <Card key={i} data={data} />);
  };

  const result = filtereddata(jobs, selectedCategory, query);

  return (
    <div className='bg-black'>
      <Banner query={query} handleInputChange={handleInputChange} />
      <div className="bg-black md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
      <div className="bg-[#434343] rounded p-5">
        <h2 className="text-4xl text-yellow-300 justify-center">Hi ! ..</h2>
      </div>
      <div className="p-4 bg-[#434343] col-span-2 rounded">
        <Jobs result={result} />
      </div>
      <div className="bg-[#434343] rounded p-5">
        <Newsletter/>
      </div>
      </div>
    </div>
  );
};

export default Home;
