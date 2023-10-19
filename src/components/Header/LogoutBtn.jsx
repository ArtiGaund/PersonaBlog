import React from 'react';
// after logout, useDispatch is used to perform some action
import { useDispatch } from 'react-redux'
// logout is in auth service
import authService from '../../backendAppwrite/auth'
// logout individual service from authSlice
import { logout } from '../../store/authSlice'
import { Button } from '@material-tailwind/react'
import { useNavigate } from 'react-router-dom';
const LogoutBtn = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const logoutHandler = () => {
        authService.logout().then(() => {
            //to keep information in store updated
            dispatch(logout())
            navigate("/")
        })
    }
    return (
        <Button color='pink' size='sm' onClick={logoutHandler}>Logout</Button>
    );
};



export default LogoutBtn;