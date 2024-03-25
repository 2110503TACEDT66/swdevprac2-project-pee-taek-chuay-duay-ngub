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

const JobList = () => {
    const [jobs, setJobs] = useState<Job[]>([]);

    useEffect(() => {
        // Assuming the data is fetched from your own API endpoint '/api/jobs'
        fetch('/api/explore')
            .then(response => response.json())
            .then(data => {
                console.log('Fetched jobs:', data);
                setJobs(data.data);

            })
            .catch(error => console.error('Error fetching jobs:', error));
    }, []);

    return (
        <div className="flex mx-auto flex-wrap gap-3 max-w-[70vw]">
            {jobs.map(job => (
                <div key={job._id} className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                    <div className="md:flex">
                        <div className="md:flex-shrink-0">
                            <img className="h-48 w-full object-cover md:w-48" src={job.image} alt="Company logo" />
                        </div>
                        <div className="p-8">
                            <a href={job.website} className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{job.name}</a>
                            <p className="mt-2 text-gray-500">{job.description}</p>
                            <div className="mt-4">
                                <div className="text-sm text-gray-900">
                                    Address: <span className="text-gray-600">{job.address}</span>
                                </div>
                                <div className="text-sm text-gray-900">
                                    Tel: <span className="text-gray-600">{job.telephoneNumber}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default JobList;
