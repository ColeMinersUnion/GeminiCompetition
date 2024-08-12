import React, { useState } from 'react';
import axios from 'axios';
import JobLinkInput from './JobLinkInput.jsx';
import ResumeInput from './ResumeInput.jsx';
import '../pages/css/JopPrep.css';

export default function JobPostingReview() {
    const [jobUrl, setJobUrl] = useState('');
    const [file, setFile] = useState(null);
    const [resp, setResp] = useState('');
    const [fit, setFit] = useState('');
    const [questions, setQuestions] = useState('');
    const [error, setError] = useState('');
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false); // New state for loading
    const uri = '/api/v1/jobMatch'; // Updated API endpoint

    const handleJobUrlChange = (url) => {
        setJobUrl(url);
    };

    const handleResumeChange = (thefile) => {
        setFile(thefile);
    };

    const handleFileUpload = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        setError('');
        setIsLoading(true); // Show spinner
        event.preventDefault();

        const formData = new FormData();
        if (file) formData.append('file', file);
        if (jobUrl) formData.append('Joburl', jobUrl);

        const customHeader = {
            headers: {
                "Content-Type": 'multipart/form-data',
            },
        };

        try {
            const response = await axios.post(uri, formData, customHeader);
            console.log(response);
            setResp(response.data["Feedback"]);
            setFit(response.data["Fit"]);
            setQuestions(response.data["Questions"]);
            setJobUrl('');
            setFile(null);
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while processing your request. Please try again.');
        } finally {
            setIsLoading(false); // Hide spinner
        }
    };

    return (
        <div className="container">       
            <div className="main-content">
                <div className="form-section">
                    <h2 className="subtitle">Here we can see if you're a fit for a job you found!</h2>
                    <JobLinkInput onJobUrlChange={handleJobUrlChange} />
                    <ResumeInput onResumeChange={handleResumeChange} />

                    <div className="file-upload-section">
                        <input
                            id="file-upload"
                            type="file"
                            onChange={handleFileUpload}
                            className="file-upload-input"
                        />
                         <button className="submit-button" onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>
                </div>

                <div className="info-sections">
                    <div className="info-box">
                        <h3 className="info-title">Are you fit for the Job?</h3>
                        <textarea
                            className="info-textarea"
                            value={fit}
                            readOnly
                        ></textarea>
                    </div>
                    <div className="info-box">
                        <h3 className="info-title">Possible Interview Questions:</h3>
                        <textarea
                            className="info-textarea"
                            value={questions}
                            readOnly
                        ></textarea>
                    </div>
                </div>
            </div>

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            <div className="feedback-container">
                <div className="feedback-section">
                    <h3 className="subtitle">AI Feedback</h3>
                    <textarea
                        readOnly
                        value={resp}
                        className="feedback-textarea"
                        placeholder="AI feedback will be displayed here..."
                    />
                    <div className="chat-input-bar">
                        <input
                            type="text"
                            value={userInput}
                            onChange={e => setUserInput(e.target.value)}
                            placeholder="Type your message..."
                            className="chat-input"
                        />
                        <label htmlFor="file-upload" className="file-upload-label">
                            📎
                        </label>
                        <input
                            id="file-upload"
                            type="file"
                            onChange={handleFileUpload}
                            className="file-upload-input"
                        />
                        <button className="arrow-icon">↑</button>
                    </div>
                    {isLoading && <div className="spinner"></div>} {/* Spinner here */}
                </div>
            </div>
        </div>
    );
}
