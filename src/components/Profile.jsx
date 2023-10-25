import React, { useState, useEffect } from 'react';
import authService from '../backendAppwrite/auth';
import { useLocation } from 'react-router-dom';
const Profile = () => {
    // for account verification
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)
    const userId = searchParams.get('userId')
    const secret = searchParams.get('secret')

    const [ user, setUser ] = useState({})
    const [ emailVerified, setEmailVerified ] = useState(false);
    const handleConfirmEmailVerification = async({ userId, secret }) => {
        try {
            return await authService.confirmEmailVerification({userId,secret}).then((response) => {
                setEmailVerified(true)
                console.log("Email verified by confirm Email verification method ")
            })
            .catch((error) => {
                console.log("Error in verification method in authService ")
            })
        } catch (error) {
            console.log("Error in handle function ",error)
        }
    }

  

    useEffect(() => {
        // Check if email verification has been confirmed
        if (emailVerified) return;

        if(userId && secret && !emailVerified){
            handleConfirmEmailVerification({userId,secret});
            const user = authService.getCurrentUser();
            if(user) setUser(user)
        }
        if(!emailVerified){
            const user = authService.getCurrentUser();
            if(user){
                setUser(user)
            }
        }

       
    }, [emailVerified, userId, secret]);

    return (
        <div className='flex items-center justify-center text-white gap-3'>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
        </div>
    );
};

export default Profile;
