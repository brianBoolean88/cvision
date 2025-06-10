'use client';
import React, { useState, useEffect } from "react";
import Results from '../components/Results';

export default function ResultsPage() {
  const [results, setResults] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('resumeResults');
    if (stored) setResults(JSON.parse(stored));
  }, []);

  return <Results results={results} />;
}