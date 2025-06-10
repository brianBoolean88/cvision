import React from 'react';

const HeroSection = () => {
    return (
        <section className='bg-gradient-to-b from-indigo-500 to-slate-800 text-white min-h-screen flex items-center justify-center'>
            <div className="text-center px-6 md:px-12 lg:px-24 max-w-3xl">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
                    Welcome to CVision
                </h1>
                <p className="text-lg md:text-xl mb-8 font-medium">
                    Resume grader built with AWS, Python, and NextJS. Make your job application stand out.
                </p>
                <a
                    href="#features"
                    className="inline-block bg-white text-slate-500 hover:bg-gray-100 px-6 py-3 rounded-full font-semibold shadow-md transition duration-300"
                >
                    Learn More
                </a>
            </div>
        </section>
    );
};

export default HeroSection;