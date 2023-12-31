import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import authService from '../backendAppwrite/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



function PasswordRecovery(){
    const { register, handleSubmit } = useForm();
    const [ error, setError ] = useState();
     // email verification
   const location = useLocation();
   const searchParams = new URLSearchParams(location.search)
   const userId = searchParams.get('userId')
   const secret = searchParams.get('secret')

   const [ user, setUser ] = useState({})
   const [ passwordChange, setPasswordChange ] = useState(false);
   const navigate = useNavigate();
   
    const passwordRecover = async(data) => {
        console.log("User Id ",userId)
        console.log("Secret ",secret);
        console.log("data ",data);
        const new_password = data.password;
        const confirm_password = data.confirm_password
        console.log("New_password ",new_password)
        console.log("Confirm password ",confirm_password)
        console.log("Password in recovery ",new_password)
        console.log("Confirm password in recovery ",confirm_password)
        if(userId && secret && new_password && confirm_password){
            if(new_password === confirm_password){
                 await authService.confirmPasswordRecovery({userId,secret,new_password,confirm_password})

            }else{
                toast.warn("Password is not same. ",{
                    position: toast.POSITION.TOP_RIGHT
                })
            }
         navigate("/login")
            
        }else{
            toast.warn("Not verified from gmail", {
                position: toast.POSITION.TOP_RIGHT
            })
        }
    }
    return (
        <div className='grid grid-flow-row items-center justify-center gap-6'>
            <form className='grid grid-flow-row gap-4 mt-8 md:grid-flow-row items-center justify-center'
                        onSubmit={handleSubmit(passwordRecover)}
                        >
                            <div>
                                <input
                                type="password"
                                placeholder="Password"
                                className="block w-[20rem] md:w-[30rem] px-5 py-3 mt-2 text-gray-700
                                placeholder-gray-600 bg-white border border-gray-200 rounded-md
                                dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300
                                dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400
                                focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                {...register("password",{ required:true, })}
                                />
                            </div>
                            <div>
                                <input
                                type="password"
                                placeholder="Confirm Password"
                                className="block w-[20rem] md:w-[30rem] px-5 py-3 mt-2 text-gray-700
                                placeholder-gray-600 bg-white border border-gray-200 rounded-md
                                dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300
                                dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400
                                focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                {...register("confirm_password",{ required:true, })}
                                />
                            </div>
                            <div>
                                <button
                                    className="flex items-center justify-center w-[20rem] md:w-[30rem] px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 text-center">
                                    <span>Change password </span>
                                </button>
                            </div>
                           
                            
                        </form>
        </div>
    );
};



export default PasswordRecovery;