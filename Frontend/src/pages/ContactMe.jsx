import React, { useState } from 'react';
import '/workspaces/GeminiCompetition/Frontend/src/pages/css/ContactMe.css';

function Contact() {
    const [inquiry, setInquiry] = useState('');
    const [bugDescription, setBugDescription] = useState('');

    const handleSubmitInquiry = () => {
        // Handle general inquiry submission
    };

    const handleSubmitBug = () => {
        // Handle bug report submission
    };

    return (
        <div className="contact-container">
            <h1 className="contact-title">Contact Us</h1>

            <div className="section developers-info">
                <h3>About the Developers</h3>
                <div className="developers-images">
                    <img src="/images/colePic.jpeg" alt="Cole Hansen" className="developer-image" />
                    <img src="/images/morganPic.JPG" alt="Morgan Noonan" className="developer-image" />
                </div>
                <div className="developers-contacts">
                    <div className="developer">
                        <h4><strong>Cole Hansen</strong></h4>
                        <p>Email: <a href="mailto:colehansen018@gmail.com">Colehansen018@gmail.com</a></p>
                        <button className="linkedin-button">
                            <a href="https://www.linkedin.com/in/cole-hansen-551a56251/" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
                        </button>
                        <div>
                        <button className="portfolio-button">
                            <a href="https://colehansen.netlify.app/" target="_blank" rel="noopener noreferrer">Portfolio</a>
                        </button>
                        </div>
                    </div>
                    <div className="developer">
                        <h4><strong>Morgan Noonan</strong></h4>
                        <p>Email: <a href="mailto:men83@pitt.edu">men83@pitt.edu</a></p>
                        <button className="linkedin-button">
                            <a href="https://www.linkedin.com/in/morganenoonan" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
                        </button>
                    </div>
                </div>
            </div>

            <div className="section general-inquiry">
                <h2>General Inquiry</h2>
                <textarea
                    value={inquiry}
                    onChange={e => setInquiry(e.target.value)}
                    placeholder="Enter your inquiry here..."
                ></textarea>
                <button onClick={handleSubmitInquiry}>Submit Inquiry</button>
            </div>
            <div className="section bug-report">
                <h2>Report a Bug</h2>
                <textarea
                    value={bugDescription}
                    onChange={e => setBugDescription(e.target.value)}
                    placeholder="Describe the issue you're experiencing..."
                ></textarea>
                <button onClick={handleSubmitBug}>Submit Bug Report</button>
            </div>
        </div>
    );
}

export default Contact;
