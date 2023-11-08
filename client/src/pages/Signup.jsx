import React, {useRef, useState} from 'react';
import {Link } from 'react-router-dom';
import axios from "axios";
import {publicRequest} from "../request-methods.js";
import {login} from "../store/auth-actions.js";

const Signup = () => {
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const handleSubmitForm = async (e) => {
        e.preventDefault();
        const username = usernameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        if (!password.trim() || !username.trim()) return;
        try {
            const response = await publicRequest.post('/auth/register', {username: username, email:email, password:password})
            if (response.status.toString().startsWith('2')) {
                console.log("Registration successfully")
            } else {
                console.error("Registration failed")
            }
        } catch (error) {
            console.log(error, "Error")
        }
        // usernameRef.current.value = '';
        passwordRef.current.value = '';
        // emailRef.current.value = '';
    }
    return (
        <div className='px-4 w-full h-screen flex justify-center items-center bg-login bg-no-repeat bg-cover'>
            <form
                onSubmit={handleSubmitForm}
                action=''
                className='border bg-white p-6 flex flex-col items-center min-w-[17rem] sm:min-w-[22rem] md:min-w-[35rem] max-w-[25rem]'
            >
                <h1 className='uppercase text-xl mb-4 font-bold'>Sign up</h1>
                <div className='grid gap-4 md:grid-cols-2 mb-4'>
                    <input
                        className='block p-2 border-2 rounded focus:outline-none'
                        type='text'
                        placeholder='Username'
                        ref={usernameRef}
                    />
                    <input
                        className='block p-2 border-2 rounded focus:outline-none'
                        type='email'
                        placeholder='Email'
                        ref={emailRef}
                    />
                </div>
                <div className='grid gap-4 md:grid-cols-2 mb-4'>
                    <input
                        className='block p-2 border-2 rounded focus:outline-none'
                        type='password'
                        placeholder='Password'
                        ref={passwordRef}
                    />
                    <input
                        className='block p-2 border-2 rounded focus:outline-none'
                        type='password'
                        placeholder='Confirm Password'
                    />
                </div>

                <p className='mb-4 '>
                    By Creating an accounct I consent to the processing of my personal
                    data in accordance with the &nbsp;
                    <a href='' className='uppercase font-bold'>
                        Privacy policy
                    </a>
                </p>
                <button className='mb-4 bg-teal-700 text-white p-2'>Create</button>
                <Link to='/login' className='capitalize underline mb-4'>
                    Already have an account
                </Link>
            </form>
        </div>
    );
};

export default Signup;
