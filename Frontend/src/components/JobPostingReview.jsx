import React, { useState } from 'react';
import axios from 'axios';
import JobLinkInput from './JobLinkInput.jsx';
import ResumeInput from './ResumeInput.jsx';
//import '/workspaces/GeminiCompetition/Frontend/src/pages/css/JopPrep.css';
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
    const [chatted, setChatted] = useState(false);
    let uri = '/api/v1/jobMatch'; // Updated API endpoint

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
                // Authorization: `Bearer ${getLocalStorageToken()}`,
                "Content-Type": 'multipart/form-data',
            },
        };

        try {
            if(file && jobUrl){
                const response = await axios.post(uri, formData, customHeader);
                //console.log(response);
                //setResp(response.data["Feedback"]);
                setFit(response.data["Fit"]);
                setResp(response.data["Res"]);
                setQuestions(response.data["Questions"]);
            } else if(file){
                uri = '/api/v1/resume';
                const response = await axios.post(uri, formData, customHeader);
                setResp(response.data["Res"]);
            } else if(jobUrl){
                uri = '/api/v1/jobposting';
                const response = await axios.post(uri, formData, customHeader);
                setResp(response.data["Res"]);
                setQuestions(response.data["Questions"]);
            }

            
            setJobUrl('');
            setFile(null);
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while processing your request. Please try again.');
        } finally {
            setIsLoading(false); // Hide spinner
        }
    };

    const handleChatSubmit = async(event) => {
        setIsLoading(true);
        setError('');
        event.preventDefault();
        const initUrl = '/api/v1/startChat';
        if(!chatted){
            try{
                const initChat = await axios.post(initUrl, {
                    lastMsg: resp,
                });
                console.log(initChat)
            } catch (error) {
                console.error('Error:', error);
                setError('An error occurred while processing your request. Please try again.');
            } finally {
                setIsLoading(false); // Hide spinner
            }
        }

        let chatUrl = '/api/v1/chat';
        try{
            const response = await axios.post(chatUrl, {
                message: userInput,
            })
            console.log(response.data['Res'])
            setResp(response.data['Res'])
            setUserInput('');
        } catch (error) {
            console.error('Error:', error);
            setError('An error ocurrrend while processing chat. Please try again');
        } finally {
            setIsLoading(false);
        }


    };

    return (
        <div className="container">
            <h2 className="subtitle">Here we can see if you're a fit for a job you found!</h2>
            <div className="main-content">
                <div className="form-section">
                    <form>
                        <JobLinkInput onJobUrlChange={handleJobUrlChange} />
                        <ResumeInput onResumeChange={handleResumeChange} />
                        <button type="button" className="submit-button" onClick={handleSubmit}>
                            Submit
                        </button>
                    </form>
                </div>
                <div className="info-sections">
                    <div className="fit-section">
                        <h3 className="subtitle">Are you fit for the Job?</h3>
                        <p>{fit || "Fit details will be displayed here..."}</p>
                    </div>
                    <div className="questions-section">
                        <h3 className="subtitle">Possible Interview Questions:</h3>
                        <p>{questions || "Possible interview questions will be displayed here..."}</p>
                    </div>
                </div>
            </div>

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            <div className="main-feedback-container">
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
                            <input
                                id="file-upload"
                                type="file"
                                onChange={handleFileUpload}
                                className="file-upload-input"
                            />
                        </label>
                        <button className="submit-button" onClick={handleChatSubmit}>Send</button>
                    </div>
                    {isLoading && <div className="spinner"></div>} {/* Spinner here */}
                </div>
            </div>
        </div>
    );
}
