import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import RateLimitUI from '../components/RateLimitUI';

const HomePage = () => {
    const [isRateLimited, setRateLimited] = useState(false);
    return (
        <div className="min-h-screen">
            <Navbar />
            {isRateLimited && <RateLimitUI />}
        </div>
    )
}

export default HomePage