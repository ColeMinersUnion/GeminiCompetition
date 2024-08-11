// src/components/JobLinkInput.jsx
import React, { useState } from 'react';

export default function JobLinkInput({ onJobUrlChange }) {
    const [jobUrl, setJobUrl] = useState('');

    const handleChange = (e) => {
        setJobUrl(e.target.value);
        onJobUrlChange(e.target.value);
    };

    return (
        <div className="job-link-section">
            <input
                type="text"
                placeholder="Enter job link"
                value={jobUrl}
                onChange={handleChange}
            />
        </div>
    );
}
