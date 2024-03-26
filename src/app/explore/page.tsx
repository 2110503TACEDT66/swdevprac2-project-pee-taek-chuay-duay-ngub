import React from 'react';
import JobList from '@/components/explore/Joblist';

const HomePage = () => {
    return (
        <div className='text-black bg-white min-h-screen bg-white mx-auto'>
            <main>
                <JobList />
            </main>
        </div>
    );
};

export default HomePage;
