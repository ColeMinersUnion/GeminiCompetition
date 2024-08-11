// src/components/JobPostingReview.jsx
import React, { useState } from 'react';
import axios from 'axios';
import JobLinkInput from '/workspaces/GeminiCompetition/Frontend/src/components/JobLinkInput.jsx'; // Adjust path as needed
import ResumeInput from '/workspaces/GeminiCompetition/Frontend/src/components/ResumeInput.jsx'; // Adjust path as needed
import '/workspaces/GeminiCompetition/Frontend/src/pages/css/JopPrep.css';

export default function JobPostingReview() {
    const [jobUrl, setJobUrl] = useState('');
    const [resume, setResume] = useState(null);
    const [resp, setResp] = useState('');
    const [fit, setFit] = useState('');
    const [questions, setQuestions] = useState('');
    const [error, setError] = useState('');
    const uri = '/api/v1/match'; // Updated API endpoint

    const handleJobUrlChange = (url) => {
        setJobUrl(url);
    };

    const handleResumeChange = (file) => {
        setResume(file);
    };

    const handleSubmit = async () => {
        if (!resume && !jobUrl) {
            setError('Please provide a job link and a resume or only a resume.');
            return;
        }

        setError('');

        const formData = new FormData();
        if (jobUrl) formData.append("Joburl", jobUrl);
        if (resume) formData.append("Resume", resume);

        try {
            const response = await axios.post(uri, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setResp(response.data["Feedback"]);
            setFit(response.data["Fit"]);
            setQuestions(response.data["Questions"]);
            setJobUrl('');
            setResume(null);
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while processing your request. Please try again.');
        }
    };

    return (
        <div className="container">
            <h2 className="subtitle">Here we can see if you're a fit for a job you found!</h2>
            <form>
                <JobLinkInput onJobUrlChange={handleJobUrlChange} />
                <ResumeInput onResumeChange={handleResumeChange} />
                <button type="button" className="submit-button" onClick={handleSubmit}>
    Submit
</button>

            </form>
            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}
            <div className="main-feedback-container">
                <div className="feedback-section">
                    <textarea
                        readOnly
                        value={resp}
                        className="feedback-textarea"
                        placeholder="AI feedback will be displayed here..."
                    />
                </div>
                <div className="info-sections">
                    {fit && (
                        <div className="fit-section">
                            <h3 className="subtitle">Fit for the Job</h3>
                            <p>{fit}</p>
                        </div>
                    )}
                    {questions && (
                        <div className="questions-section">
                            <h3 className="subtitle">Possible Questions</h3>
                            <p>{questions}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}