'use client';
import React, { useEffect, useState } from 'react';

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

const mockJobs: Job[] = [
    {
        _id: "1",
        name: "Job 1",
        address: "123 Main Street",
        website: "www.example.com/job1",
        image: "https://assets.baanfinder.com/gz6hk3s7d3dqfdq67t75t5ovsr4uuj7rr6xs46qd1rk0n0xmwlzcp9l1tj5g9zdvzjcbgl1fh1midovjai1k9zhlquuykebscnesbfw41tje2fizrvzat1hcsqiyhx4w.jpg",
        description: "Description of job 1",
        telephoneNumber: "123-456-7890",
        __v: 0,
        id: "1"
    },
    {
        _id: "2",
        name: "Job 2",
        address: "456 Elm Street",
        website: "www.example.com/job2",
        image: "https://assets.baanfinder.com/gz6hk3s7d3dqfdq67t75t5ovsr4uuj7rr6xs46qd1rk0n0xmwlzcp9l1tj5g9zdvzjcbgl1fh1midovjai1k9zhlquuykebscnesbfw41tje2fizrvzat1hcsqiyhx4w.jpg",
        description: "Description of job 2",
        telephoneNumber: "456-789-0123",
        __v: 0,
        id: "2"
    },
    {
        _id: "3",
        name: "Job 3",
        address: "456 Elm Street",
        website: "www.example.com/job2",
        image: "https://assets.baanfinder.com/gz6hk3s7d3dqfdq67t75t5ovsr4uuj7rr6xs46qd1rk0n0xmwlzcp9l1tj5g9zdvzjcbgl1fh1midovjai1k9zhlquuykebscnesbfw41tje2fizrvzat1hcsqiyhx4w.jpg",
        description: "Description of job 2",
        telephoneNumber: "456-789-0123",
        __v: 0,
        id: "2"
    },
    {
        _id: "4",
        name: "Job 4",
        address: "123 Main Street",
        website: "www.example.com/job1",
        image: "https://assets.baanfinder.com/gz6hk3s7d3dqfdq67t75t5ovsr4uuj7rr6xs46qd1rk0n0xmwlzcp9l1tj5g9zdvzjcbgl1fh1midovjai1k9zhlquuykebscnesbfw41tje2fizrvzat1hcsqiyhx4w.jpg",
        description: "Description of job 1",
        telephoneNumber: "123-456-7890",
        __v: 0,
        id: "1"
    },
    {
        _id: "5",
        name: "Job 5",
        address: "456 Elm Street",
        website: "www.example.com/job2",
        image: "https://assets.baanfinder.com/gz6hk3s7d3dqfdq67t75t5ovsr4uuj7rr6xs46qd1rk0n0xmwlzcp9l1tj5g9zdvzjcbgl1fh1midovjai1k9zhlquuykebscnesbfw41tje2fizrvzat1hcsqiyhx4w.jpg",
        description: "Description of job 2",
        telephoneNumber: "456-789-0123",
        __v: 0,
        id: "2"
    },
    {
        _id: "6",
        name: "Job 6",
        address: "456 Elm Street",
        website: "www.example.com/job2",
        image: "https://assets.baanfinder.com/gz6hk3s7d3dqfdq67t75t5ovsr4uuj7rr6xs46qd1rk0n0xmwlzcp9l1tj5g9zdvzjcbgl1fh1midovjai1k9zhlquuykebscnesbfw41tje2fizrvzat1hcsqiyhx4w.jpg",
        description: "Description of job 2",
        telephoneNumber: "456-789-0123",
        __v: 0,
        id: "2"
    },
    
    // Add more mock data as needed
];
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
    // useEffect(() => {
    //     // Assuming the data is fetched from your own API endpoint '/api/jobs'
    //     fetch('/api/explore')
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log('Fetched jobs:', data);
    //             setJobs(data.data);

    //         })
    //         .catch(error => console.error('Error fetching jobs:', error));
    // }, []);

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
                    <div key={job._id} className="max-w-sm overflow-hidden shadow-lg p-5 rounded">
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{job.name}</div>
                            <p className="text-gray-700 text-base">{job.description}</p>
                        </div>
                        <img src={job.image} alt={job.name} className="w-full" />
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-8 mb-5">
                {/* Pagination buttons */}
                {Array.from({ length: Math.ceil(jobs.length / jobsPerPage) }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => paginate(i + 1)}
                        className={`mx-1 px-4 py-2 border border-gray-300 rounded-md ${
                            currentPage === i + 1 ? 'bg-primary text-white' : 'bg-white text-primary'
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
