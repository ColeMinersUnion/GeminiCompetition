// src/components/ResumeInput.jsx
import React, { useState } from 'react';

export default function ResumeInput({ onResumeChange }) {
    const [resume, setResume] = useState(null);

    const handleChange = (e) => {
        setResume(e.target.files[0]);
        onResumeChange(e.target.files[0]);
    };

    return (
        <div className="resume-section">
            <h2 className="subtitle">Input your resume to be evaluated here:</h2>
            <input
                type="file"
                onChange={handleChange}
            />
        </div>
    );
}