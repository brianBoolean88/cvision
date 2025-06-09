import React from 'react';
const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6 text-center">
            <p className="text-sm">&copy; {new Date().getFullYear()} Brian Wang. All rights reserved.</p>
            <p className="text-sm mt-2">
                Built with <span className="text-red-500">❤️</span> using Next.js, Tailwind CSS, and AWS.
            </p>
        </footer>
    );
};

export default Footer;