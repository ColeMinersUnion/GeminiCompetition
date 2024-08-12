import '../pages/css/Footer.css';
import { Link } from 'react-router-dom';
export default function Footer() {
    return (
        <>
            <footer>
                <div className="footer-container mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
                    <div className="footer-brand">
                        <img 
                            src="/images/logo.jpeg" 
                            alt="Icon" 
                            className="footer-icon" 
                        />
                        <div className="footer-text">
                            Sprout
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
                        <div>
                            <p className="section-title">Features</p>
                            <ul className="mt-6 space-y-4 text-sm">
                                <li><Link to="/Career" className="text-white transition hover:opacity-75">Career Discussion and Exploration</Link></li>
                                <li><Link to="/Job" className="text-white transition hover:opacity-75">Job Posting Review</Link></li>
                                <li><Link to="/Job" className="text-white transition hover:opacity-75">Resume Review and Job Matching</Link></li>
                            </ul>
                        </div>

                        <div>
                            <p className="section-title">Company</p>
                            <ul className="mt-6 space-y-4 text-sm">
                                <li><Link to="/" className="text-white transition hover:opacity-75">About</Link></li>
                                <li><Link to="/Contact" className="text-white transition hover:opacity-75">Meet the Team</Link></li>
                            </ul>
                        </div>

                        <div>
                            <p className="section-title">Tech Stack</p>
                            <ul className="mt-6 space-y-4 text-sm">
                                <li><a href="https://flask.palletsprojects.com/en/3.0.x/" className="text-white transition hover:opacity-75">Backend: Flask</a></li>
                                <li><a href="https://vitejs.dev/" className="text-white transition hover:opacity-75">Frontend: Vite</a></li>
                                <li><a href="https://react.dev/" className="text-white transition hover:opacity-75">Frontend: React</a></li>
                            </ul>
                        </div>

                        <div>
                            <p className="section-title">Legal</p>
                            <ul className="mt-6 space-y-4 text-sm">
                                <li><a href="https://github.com/ColeMinersUnion/GeminiCompetition/blob/main/LICENSE" className="text-white transition hover:opacity-75">License</a></li>
                                <li><a href="https://ai.google.dev/gemini-api/terms" className="text-white transition hover:opacity-75">Google Gemini Policy</a></li>
                                <li><a href="https://ai.google.dev/competition" className="text-white transition hover:opacity-75">Terms of the Competition</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <p className="footer-copy text-xs text-gray-500">&copy; 2024. Sprout. All rights reserved.</p>
            </footer>
        </>
    );
}
