import React from "react";
import { useRouter } from 'next/navigation';
import { Document, Packer, Paragraph, TextRun } from "docx";

const Results = ({ results }) => {

    const router = useRouter();

    const handleDownload = async () => {
        const doc = new Document({
            sections: [
                {
                    properties: {},
                    children: [
                        new Paragraph({
                            children: [
                                new TextRun({ text: "Resume Analysis Results", bold: true, size: 32 }),
                            ],
                        }),
                        new Paragraph(""),
                        new Paragraph({
                            children: [
                                new TextRun({ text: `Score: ${results.score}/100`, bold: true }),
                            ],
                        }),
                        new Paragraph(""),
                        new Paragraph({
                            children: [
                                new TextRun({ text: "Summary:", bold: true }),
                            ],
                        }),
                        new Paragraph(results.summary),
                        new Paragraph(""),
                        new Paragraph({
                            children: [
                                new TextRun({ text: "Keyword Matches:", bold: true }),
                            ],
                        }),
                        ...results.keywords.map(
                            (kw) => new Paragraph({ text: `• ${kw}` })
                        ),

                        new Paragraph(""),

                        new Paragraph({
                            children: [
                                new TextRun({ text: "In-Depth Category Scores:", bold: true }),
                            ],
                        }),
                        ...(results.in_depth_scores
                            ? results.in_depth_scores.map(
                                (cat) =>
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                text: `${cat.category} - `,
                                                bold: true,
                                            }),
                                            new TextRun({
                                                text: `${cat.score}/100`,
                                            }),
                                        ],
                                    })
                            )
                            : []
                        ),

                        new Paragraph(""),
                        new Paragraph({
                            children: [
                                new TextRun({ text: "Good Attributes:", bold: true }),
                            ],
                        }),
                        ...results.good.map(
                            (s) => new Paragraph({ text: `• ${s}` })
                        ),

                        new Paragraph(""),
                        new Paragraph({
                            children: [
                                new TextRun({ text: "Suggestions:", bold: true }),
                            ],
                        }),
                        ...results.suggestions.map(
                            (s) => new Paragraph({ text: `• ${s}` })
                        ),
                    ],
                },
            ],
        });

        const blob = await Packer.toBlob(doc);
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "resume_analysis_results.docx";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleReturn = () => {
        router.push('/');
    };


    if (!results) {
        return (
            <section className="py-20 bg-slate-500 text-slate-200 text-center">
                <p className="text-xl font-medium font-geist">No results to display yet. Please upload a resume.</p>
            </section>
        );
    }

    console.log("Parsed Results:", results);
    results = results.body; // Ensure results is in the expected format
    console.log("Parsed Results:", results);
    results = JSON.parse(results); // Parse the results if they are in string format
    
    return (
        <section className="py-20 bg-slate-400 text-white scroll-smooth">
            <div className="container mx-auto px-6 md:px-12 lg:px-24">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center font-geist">
                    Resume Analysis Results
                </h2>

                <div className="bg-slate-800 rounded-xl shadow-lg p-6 md:p-10 space-y-6">
                    <div>
                        <h3 className="text-xl font-semibold mb-2 font-geist">Score</h3>
                        <p className="text-2xl font-bold text-purple-600">{results.score}/100</p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-2 font-geist">Summary</h3>
                        <p className="text-slate-300">{results.summary}</p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-2 font-geist">Keyword Matches</h3>
                        <ul className="list-disc list-inside text-slate-300">
                            {results.keywords.map((keyword, idx) => (
                                <li key={idx}>{keyword}</li>
                            ))}
                        </ul>
                    </div>


                    <div>
                        <h3 className="text-xl font-semibold mb-4 font-geist">In-Depth Category Scores</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                            {results.in_depth_scores && results.in_depth_scores.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex flex-col items-center bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl shadow p-4"
                                >
                                    <span className="text-lg font-bold text-purple-700 mb-2">{item.category}</span>
                                    <div className="relative w-20 h-20 flex items-center justify-center mb-2">
                                        <svg className="w-full h-full" viewBox="0 0 40 40">
                                            <circle
                                                cx="20"
                                                cy="20"
                                                r="18"
                                                fill="none"
                                                stroke="#E9D5FF"
                                                strokeWidth="4"
                                            />
                                            <circle
                                                cx="20"
                                                cy="20"
                                                r="18"
                                                fill="none"
                                                stroke="#A21CAF"
                                                strokeWidth="4"
                                                strokeDasharray={113.097} // 2 * PI * 18
                                                strokeDashoffset={113.097 - (113.097 * item.score) / 100}
                                                strokeLinecap="round"
                                            />
                                            <text
                                                x="50%"
                                                y="54%"
                                                textAnchor="middle"
                                                fontSize="14"
                                                fill="#7C3AED"
                                                fontWeight="bold"
                                                dominantBaseline="middle"
                                            >
                                                {item.score}
                                            </text>
                                        </svg>
                                    </div>
                                    <span className="text-sm text-slate-300">/100</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-2 font-geist">Good Attributes</h3>
                        <ul className="list-decimal list-inside text-green-300">
                            {results.good.map((tip, idx) => (
                                <li key={idx}>{tip}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-2 font-geist">Suggestions</h3>
                        <ul className="list-decimal list-inside text-red-300">
                            {results.suggestions.map((tip, idx) => (
                                <li key={idx}>{tip}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 mt-8 justify-center">
                        <button
                            onClick={handleDownload}
                            className="bg-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-700 transition duration-300"
                        >
                            Download Results
                        </button>
                        <button
                            onClick={handleReturn}
                            className="bg-gray-300 text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-gray-400 transition duration-300"
                        >
                            Return
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Results;
