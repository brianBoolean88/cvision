import React from 'react';
const FeaturesSection = () => {
    return (
        <section id="features" className="py-20 bg-slate-500 text-slate-200">
            <div className="container mx-auto px-6 md:px-12 lg:px-24 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-12">Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="p-6 border rounded-xl shadow hover:shadow-lg transition">
                        <h3 className="text-xl font-semibold mb-2">AI Resume Analysis</h3>
                        <p>Instant feedback on your resume’s strengths and weaknesses using cutting-edge NLP models.</p>
                    </div>
                    <div className="p-6 border rounded-xl shadow hover:shadow-lg transition">
                        <h3 className="text-xl font-semibold mb-2">AWS Integration</h3>
                        <p>Scalable, secure infrastructure powered by S3, Lambda, and API Gateway.</p>
                    </div>
                    <div className="p-6 border rounded-xl shadow hover:shadow-lg transition">
                        <h3 className="text-xl font-semibold mb-2">Seamless Upload</h3>
                        <p>Easily upload your resume and receive detailed reports on performance and keyword matching.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};


export default FeaturesSection;