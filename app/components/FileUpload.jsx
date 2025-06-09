"use client";
import React, { useState } from 'react';
import UploadSection from './UploadSection.jsx';

const FileUpload = () => {
    const [fileName, setFileName] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/pdf') {
            setFileName(file.name);
            // You can later upload this file to AWS S3 or process it
        } else {
            alert("Please upload a valid PDF file.");
        }
    };

    return (
        <section className="py-20 bg-slate-400 text-slate-200 scroll-smooth">
            <div className="container mx-auto px-6 md:px-12 lg:px-24 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 font-geist">Upload Your Resume</h2>
                <p className="mb-8 text-lg">Submit your resume in PDF format to get started with analysis.</p>
                <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    className="block mx-auto mb-4 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                />
                {fileName && <p className="text-slate-100">Selected File: {fileName}</p>}

                <UploadSection />
            </div>

        </section>
    );
};

export default FileUpload;