import React, { useState, useEffect } from 'react';
import authService from '../backendAppwrite/auth';
import { useLocation, useNavigate } from 'react-router-dom';

const Profile = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get('userId');
    const secret = searchParams.get('secret');
    
    console.log("Outside UserId from URL: ", userId);
    console.log("Outside Secret: ", secret);

    const [user, setUser] = useState({});
    const navigate = useNavigate();

    // State to track whether the email verification has been confirmed
    const [emailVerified, setEmailVerified] = useState(false);

    useEffect(() => {
        // Check if email verification has been confirmed
        if (emailVerified) return;

        const user = authService.getCurrentUser();
        if (user) {
            setUser(user);
            console.log("UserId from user: ", user.$id);
        }

        if (userId && secret) {
            handleConfirmEmailVerification();
        }
    }, [emailVerified, userId, secret]);

    const handleConfirmEmailVerification = async () => {
        try {
            await authService.confirmEmailVerification(userId, secret);
            setEmailVerified(true); // Mark email verification as confirmed
            // alert("Email verified successfully");
            // navigate("/profile");
        } catch (error) {
            console.log("Not verified ", error);
        }
    }

    return (
        <div className='flex items-center justify-center text-white gap-3'>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
        </div>
    );
};

export default Profile;
