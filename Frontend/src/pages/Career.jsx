import React, { useState } from 'react';
import './css/Career.css'; // Adjust path as needed

function CareerPage() {
    const [careerTitle, setCareerTitle] = useState('');
    const [chatContent, setChatContent] = useState('');
    const [salary, setSalary] = useState('');
    const [lineOfBusiness, setLineOfBusiness] = useState('');
    const [qualifications, setQualifications] = useState('');
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false); // New state for loading

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        // Handle file upload logic here
    };

    const handleSubmit = async () => {
        setIsLoading(true); // Show spinner
        // Handle submit logic here
        console.log('Submitted:', userInput);
        setUserInput('');
        
        // Simulate an API call
        setTimeout(() => {
            setIsLoading(false); // Hide spinner after simulation
        }, 2000);
    };

    return (
        <div className="career-container">
            <div className="chat-section">
                <input
                    type="text"
                    className="career-title-input"
                    value={careerTitle}
                    onChange={e => setCareerTitle(e.target.value)}
                    placeholder="Enter a career title to get started"
                />
                <h2 className="section-title">Career Chat</h2>
                <textarea
                    className="chat-textarea"
                    value={chatContent}
                    onChange={e => setChatContent(e.target.value)}
                    placeholder="Ask about careers..."
                ></textarea>
                <div className="input-bar">
                    <input
                        type="text"
                        value={userInput}
                        onChange={e => setUserInput(e.target.value)}
                        placeholder="Type your message..."
                    />
                    <label htmlFor="file-upload" className="file-upload-label">
                        📎
                    </label>
                    <input
                        id="file-upload"
                        type="file"
                        onChange={handleFileUpload}
                    />
                    <button className="submit-button" onClick={handleSubmit}>
                        ↑
                    </button>
                </div>
                {isLoading && <div className="spinner"></div>} {/* Spinner here */}
            </div>
            <div className="info-sections">
                <div className="info-box">
                    <h3 className="info-title">Estimated Salary</h3>
                    <textarea
                        className="info-textarea"
                        value={salary}
                        readOnly
                    ></textarea>
                </div>
                <div className="info-box">
                    <h3 className="info-title">Line of Business</h3>
                    <textarea
                        className="info-textarea"
                        value={lineOfBusiness}
                        readOnly
                    ></textarea>
                </div>
                <div className="info-box">
                    <h3 className="info-title">Qualifications</h3>
                    <textarea
                        className="info-textarea"
                        value={qualifications}
                        readOnly
                    ></textarea>
                </div>
            </div>
        </div>
    );
}

export default CareerPage;
