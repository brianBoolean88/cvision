import React from "react";

const Results = ({ results }) => {

    console.log("Results component rendered with results:", results);
    if (!results) {
        return (
            <section className="py-20 bg-slate-500 text-slate-200 text-center">
                <p className="text-xl font-medium font-geist">No results to display yet. Please upload a resume.</p>
            </section>
        );
    }

    return (
        <section className="py-20 bg-gray-100 text-gray-800 scroll-smooth">
            <div className="container mx-auto px-6 md:px-12 lg:px-24">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center font-geist">
                    Resume Analysis Results
                </h2>

                <div className="bg-white rounded-xl shadow-lg p-6 md:p-10 space-y-6">
                    <div>
                        <h3 className="text-xl font-semibold mb-2 font-geist">Score</h3>
                        <p className="text-2xl font-bold text-purple-600">{results.score}/100</p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-2 font-geist">Summary</h3>
                        <p className="text-gray-700">{results.summary}</p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-2 font-geist">Keyword Matches</h3>
                        <ul className="list-disc list-inside text-gray-700">
                            {results.keywords.map((keyword, idx) => (
                                <li key={idx}>{keyword}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-2 font-geist">Suggestions</h3>
                        <ul className="list-decimal list-inside text-red-500">
                            {results.suggestions.map((tip, idx) => (
                                <li key={idx}>{tip}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Results;
