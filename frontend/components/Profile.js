import React, { useEffect, useState } from 'react';

const Profile = ({ userId }) => {
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch(`/api/user/${userId}`);
                const data = await response.json();
                setUserProfile(data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, [userId]);

    if (!userProfile) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>User Profile</h1>
            <p>Name: {userProfile.name}</p>
            <p>Email: {userProfile.email}</p>
            {/* Add more user info as needed */}
        </div>
    );
};

export default Profile;
