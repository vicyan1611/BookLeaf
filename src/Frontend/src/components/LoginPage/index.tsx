// import { Component, ReactNode, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AccountPageLogo from '../AccountPageLogo'
import AccountPageInput from '../AccountPageInput'
import './index.css'
import { toast } from 'react-toastify';

function LoginPage(props: any) {
    const navigate = useNavigate();
    const redirectPath = props.redirectPath
    function handleLogin(e: any) { 
        e.preventDefault()
        const username = e.target.username.value
        const password = e.target.password.value
        fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username, password})
        })
        .then(res => {
            if (res.status === 200) {
                toast.success('User logged in successfully')
                setTimeout(() => navigate(redirectPath), 3000) // Redirect to redirectPath after 3 seconds
            } else {
                res.text().then(text => console.log("Error " + res.status + ': ' + text))
            }
        })
    }
    return (
        <div className='box-border px-4 lg:w-2/5 md:w-4/5 sm:w-full flex flex-col items-center justify-center'>
            <AccountPageLogo />
            <form
                className='flex flex-col items-center justify-center w-full gap-4 min-w-96 max-w-lg' onSubmit={handleLogin}>
                <AccountPageInput
                    name='username' type='input' placeholder='Username or email' required
                />
                <AccountPageInput
                    name='password' type='password' placeholder='Password' required
                />
                <AccountPageInput type='submit' value='Log in'/>
                <div className='container grid grid-cols-3'>
                    <a className='col-start-1' href="#">Forgot Password?</a>
                    <a className='col-start-3' href="/register">Need an account? Register now!</a>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;