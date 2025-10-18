import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white mt-16 print:hidden">
            {/* Main Footer Content */}
           

            {/* Bottom Bar */}
            <div className="border-t border-gray-700">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
                        <p className="text-gray-400 text-sm">
                            <span>Made with ❤️ for better financial management</span> |
                            © {currentYear} ExpenseTracker. All rights reserved.
                        </p>
                        <div className="flex items-center space-x-6 text-sm text-gray-400">
                            {/* <span>Made with ❤️ for better financial management</span> */}
                            <span>Developed by <a href="http://ataher.vercel.app" target="_blank" rel="noopener noreferrer"> <b>Ataher Ali</b> </a> </span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;