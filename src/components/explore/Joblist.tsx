'use client';
import React, { useEffect, useState } from 'react';
import Link from "next/link";
interface Job {
    _id: string;
    name: string;
    address: string;
    website: string;
    image: string;
    description: string;
    telephoneNumber: string;
    __v: number;
    id: string;
}

const mockJobs: Job[] = [];
const JobList = () => {
    const [jobs, setJobs] = useState<Job[]>(mockJobs);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [jobsPerPage] = useState<number>(12);

    // Get current jobs based on pagination
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

    // Change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    // Filtered jobs based on search term
    const filteredJobs = currentJobs.filter(job =>
        job.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    useEffect(() => {
        // Assuming the data is fetched from your own API endpoint '/api/jobs'
        fetch('/api/company')
            .then(response => response.json())
            .then(data => {
                console.log('Fetched jobs:', data);
                setJobs(data.data);

            })
            .catch(error => console.error('Error fetching jobs:', error));
    }, []);

    return (
        <div>
            <div className="flex justify-center">
                <input
                    type="text"
                    placeholder="Search companies..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-1/2 px-4 py-3 border border-gray-300 rounded-3xl my-[60px]"
                />
            </div>
            <div className="flex mx-auto flex-wrap gap-3 max-w-[80vw]">
                {filteredJobs.map(job => (
                    <Link href={"/company/" + String(job._id)}>
                        <div key={job._id} className="max-w-sm overflow-hidden shadow-lg p-5 rounded">
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">{job.name}</div>
                                <p className="text-gray-700 text-base">{job.description}</p>
                            </div>
                            <img src={job.image} alt={job.name} className="w-full" />
                        </div>
                    </Link>

                ))}
            </div>
            <div className="flex justify-center mt-8 mb-5">
                {/* Pagination buttons */}
                {Array.from({ length: Math.ceil(jobs.length / jobsPerPage) }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => paginate(i + 1)}
                        className={`mx-1 px-4 py-2 border border-gray-300 rounded-md ${currentPage === i + 1 ? 'bg-primary text-white' : 'bg-white text-primary'
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default JobList;
