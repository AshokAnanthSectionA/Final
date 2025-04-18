import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

function SearchPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const queryFromURL = searchParams.get('query');

    const handleSearch = useCallback(async (searchQuery = searchTerm) => {
        if (searchQuery) {
            try {
                const response = await fetch(`http://localhost:5000/api/search?query=${searchQuery}`);
                if (!response.ok) {
                    console.error(`HTTP error! status: ${response.status}`);
                    setSearchResults([]);
                    return;
                }
                const data = await response.json();
                console.log('Search Results from Server:', data);
                setSearchResults(data);
            } catch (error) { 
                console.error('Error fetching search results:', error);
                setSearchResults([]);
            }
        } else {
            setSearchResults([]);
        }
    }, [searchTerm]);

    useEffect(() => {
        if (queryFromURL) {
            setSearchTerm(queryFromURL);
            handleSearch(queryFromURL);
        } else {
            setSearchTerm('');
            setSearchResults([]);
        }
    }, [queryFromURL, handleSearch]);

    return (
        <div>
            <h2>Search Books</h2>
            <input
                type="text"
                placeholder="Enter book title, author, etc."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>

            {searchResults.length > 0 && (
                <div>
                    <h3>Search Results:</h3>
                    <ul>
                        {searchResults.map(result => (
                            <li key={result.id}>{result.name} by {result.author}</li>
                        ))}
                    </ul>
                </div>
            )}
            {queryFromURL && searchResults.length === 0 && (
                <p>No results found for "{queryFromURL}"</p>
            )}
        </div>
    );
}

export default SearchPage;