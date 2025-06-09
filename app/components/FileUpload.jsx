"use client";
import React, { useState } from 'react';

const FileUpload = () => {
    const [fileName, setFileName] = useState(null);
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/pdf') {
            setFileName(file.name);
            setFile(file);
        } else {
            alert("Please upload a valid PDF file.");
        }
    };

    const uploadPDF = async (file) => {
        const res = await fetch(`/api/upload-url?fileName=${file.name}`);

        console.log("Received upload URL response:", res);
        const { url } = await res.json();

        console.log("Uploading to S3:", url);
        if (!url) {
            throw new Error("Failed to get upload URL");
        }

        console.log("Uploading file:", file.name);

        await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/pdf",
            },
            body: file,
        });

        console.log("File uploaded successfully:", file.name);

        return file.name; // key used to retrieve it later
    };

    const handleSubmit = async () => {

        /*
        const response = await fetch('/api/analyze', {
            method: 'POST',
            body: JSON.stringify({ fileName }),
            headers: { 'Content-Type': 'application/json' },
        });
        const result = await response.json();

        router.push(`/results?score=${result.score}`);
        */

        if (!file) {
            alert("Please select a file to upload.");
            return;
        }

       uploadPDF(file)
        .then((key) => {
            console.log("File uploaded successfully:", key);
            // Here you can redirect to results or show a success message
            // router.push(`/results?fileName=${key}`);
        })
        //router.push('/results');
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

                <button
                    onClick={handleSubmit}
                    className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-full mx-auto font-semibold hover:bg-purple-700 transition duration-300"
                >Submit</button>
            </div>

        </section>
    );
};

export default FileUpload;