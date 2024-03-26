// pages/detail/[id].js (or [id].tsx)

import { useRouter } from 'next/router';

const Detail = () => {
    const router = useRouter();
    const { id } = router.query;

    // You can use the ID here as needed

    return (
        <div className='text-black bg-white min-h-screen mx-auto'>
            <main>
                <h1>Detail Page</h1>
                <p>ID: {id}</p>
            </main>
        </div>
    );
};

export default Detail;
