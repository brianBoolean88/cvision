'use client';
import React from "react";
import Results from '../components/Results';

export default function ResultsPage() {

  const results = {
    score: 85,
    summary: "Your resume is well-structured and highlights your skills effectively.",
    keywords: ["JavaScript", "React", "AWS", "NLP"],
    good: [
      "Strong technical skills in JavaScript and React.",
      "Experience with cloud technologies like AWS.",
      "Good understanding of NLP concepts."
    ],
    suggestions: [
      "Add more quantifiable achievements.",
      "Include specific technologies used in projects."
    ],
    in_depth_scores: [
      { category: "Brevity", score: 90 },
      { category: "Skill Showcase", score: 80 },
      { category: "Soft Skills", score: 75 },
      { category: "Effective", score: 75 }
    ]
  };

  return <Results results={results} />;
}