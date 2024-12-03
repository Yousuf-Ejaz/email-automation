import React, { useEffect, useState } from 'react';
import sampleEmails from '../data/sampleEmails'; // Adjust the path as necessary
import EmailAnalysisResults from './EmailAnalysisResults'; // Import the new component

const ApiDataFetcher = () => {
    const [results, setResults] = useState([]); // Store results of processed emails
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchData = async () => {
            try {
                const allResults = []; // Array to hold results of all emails

                for (const email of sampleEmails) {
                    const response = await fetch(`http://localhost:3000/api/emails/analyze`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(email), // Send the current email
                    });

                    if (!response.ok) {
                        const errorText = await response.text();
                        throw new Error(`Network response was not ok: ${errorText}`);
                    }

                    const result = await response.json();
                    allResults.push(result); // Store the result for this email
                }

                setResults(allResults); // Update state with all results
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false); // Set loading to false after processing
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>Data from API</h1>
            <EmailAnalysisResults results={results} /> {/* Use the new component to display results */}
        </div>
    );
};

export default ApiDataFetcher;