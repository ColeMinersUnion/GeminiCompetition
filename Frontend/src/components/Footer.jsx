import '../pages/css/Footer.css';

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
                            <p className="section-title">Services</p>
                            <ul className="mt-6 space-y-4 text-sm">
                                <li><a href="#" className="text-white transition hover:opacity-75">1on1 Coaching</a></li>
                                <li><a href="#" className="text-white transition hover:opacity-75">Company Review</a></li>
                                <li><a href="#" className="text-white transition hover:opacity-75">Accounts Review</a></li>
                                <li><a href="#" className="text-white transition hover:opacity-75">HR Consulting</a></li>
                                <li><a href="#" className="text-white transition hover:opacity-75">SEO Optimisation</a></li>
                            </ul>
                        </div>

                        <div>
                            <p className="section-title">Company</p>
                            <ul className="mt-6 space-y-4 text-sm">
                                <li><a href="#" className="text-white transition hover:opacity-75">About</a></li>
                                <li><a href="#" className="text-white transition hover:opacity-75">Meet the Team</a></li>
                                <li><a href="#" className="text-white transition hover:opacity-75">Accounts Review</a></li>
                            </ul>
                        </div>

                        <div>
                            <p className="section-title">Helpful Links</p>
                            <ul className="mt-6 space-y-4 text-sm">
                                <li><a href="#" className="text-white transition hover:opacity-75">Contact</a></li>
                                <li><a href="#" className="text-white transition hover:opacity-75">FAQs</a></li>
                                <li><a href="#" className="text-white transition hover:opacity-75">Live Chat</a></li>
                            </ul>
                        </div>

                        <div>
                            <p className="section-title">Legal</p>
                            <ul className="mt-6 space-y-4 text-sm">
                                <li><a href="#" className="text-white transition hover:opacity-75">Accessibility</a></li>
                                <li><a href="#" className="text-white transition hover:opacity-75">Returns Policy</a></li>
                                <li><a href="#" className="text-white transition hover:opacity-75">Refund Policy</a></li>
                                <li><a href="#" className="text-white transition hover:opacity-75">Hiring Statistics</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <p className="footer-copy text-xs text-gray-500">&copy; 2022. Company Name. All rights reserved.</p>
            </footer>
        </>
    );
}
