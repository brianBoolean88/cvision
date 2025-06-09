import { useRouter } from 'next/navigation'; // Add this import at the top

const UploadSection = () => {
    const router = useRouter();

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

        const result = {
            score: 85,
            summary: "Your resume is well-structured and highlights your skills effectively.",
            keywords: ["JavaScript", "React", "AWS", "NLP"],
            suggestions: [
                "Add more quantifiable achievements.",
                "Include specific technologies used in projects."
            ]
        };
        router.push('/results', { state: { results: result } });
    };

    return (
        <button
            onClick={handleSubmit}
            className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-full mx-auto font-semibold hover:bg-purple-700 transition duration-300"
        >Submit</button>
    );
};


export default UploadSection;