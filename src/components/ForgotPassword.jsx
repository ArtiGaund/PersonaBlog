import React from 'react';
import { useForm } from 'react-hook-form';
import authService from '../backendAppwrite/auth';
function ForgotPassword() {
    const { register, handleSubmit} = useForm();
    const sendVerificationMail = async(data) => {
        return authService.createPasswordRecovery(data);
    }
    return (
        <form className='grid grid-flow-row gap-4 mt-8 md:grid-flow-row items-center justify-center'
                        onSubmit={handleSubmit(sendVerificationMail)}
                        >
                            <div>
                                <input
                                 type="email" 
                                 placeholder="Email" 
                                 class="block w-[20rem] md:w-[30rem] px-5 py-3 mt-2 text-gray-700
                                placeholder-gray-600 bg-white border border-gray-200 rounded-md
                                dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300
                                dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400
                                focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" 
                                {...register("email", {
                                                required: true,
                                                validate: {
                                                    matchPattern: (value) =>  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                                        "Email address must be a valid address",
                                                    }
                                })}
                                />
                                <button
                                    class="flex items-center justify-center w-[20rem] md:w-[30rem] px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 text-center">
                                    <span>Send Password Reset mail</span>
                                </button>
                            </div>
                           
                            
                        </form>
    );
};


export default ForgotPassword;