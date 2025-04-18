import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ProfilePage() {
    const { userId } = useParams();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true); // Add a loading state
    const [error, setError] = useState(null);     // Add an error state

    useEffect(() => {
        const fetchUserProfile = async () => {
            setLoading(true); // Set loading to true before the request
            try {
                const response = await fetch(`http://localhost:5000/api/users/${userId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setUserData(data); // Now setUserData is being used
                setError(null);    // Clear any previous errors
            } catch (e) {
                setError(e.message);
                setUserData(null);
            } finally {
                setLoading(false); // Set loading to false after the request (success or failure)
            }
        };

        fetchUserProfile();
    }, [userId]);

    return (
        <div>
            <h2>User Profile</h2>
            {loading && <p>Loading user information...</p>}
            {error && <p>Error loading user information: {error}</p>}
            {userId && !loading && !error && <p>User ID: {userId}</p>}
            {userData && !loading && !error && (
                <div>
                    {/* Display user information here */}
                    {/* Example: <p>Username: {userData.username}</p> */}
                    <p>User data: {JSON.stringify(userData)}</p>
                </div>
            )}
            {!userData && !loading && !error && <p>No user data available.</p>}
        </div>
    );
}

export default ProfilePage;