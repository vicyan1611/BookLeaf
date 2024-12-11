// import { Component, ReactNode, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AccountPageLogo from '../AccountPageLogo'
import AccountPageInput from '../AccountPageInput'
import './index.css'

function LoginPage(props: any) {
    const navigate = useNavigate();
    const redirectPath = props.redirectPath
    return (
        <div className='box-border px-4 lg:w-2/5 md:w-4/5 sm:w-full flex flex-col items-center justify-center'>
            <AccountPageLogo />
            <form
                className='flex flex-col items-center justify-center w-full gap-4 min-w-96 max-w-lg'
                onSubmit={async (e: any) => {
                    
                    e.preventDefault();
                    const username = e.target.username.value
                    const password = e.target.password.value
                    try {
                        console.log('send')
                        const res = await fetch('http://localhost:3000/login', {
                            method:  'POST',
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({username, password})
                        })
                        const resText = await res.text()
                        if (res.status === 200) {
                            navigate(redirectPath)
                        } else
                            alert(resText)
                    } catch (error) {
                        alert(error.message)
                    }
                }}
            >
                <AccountPageInput
                    name='username' type='input' placeholder='Username or email' required
                />
                <AccountPageInput
                    name='password' type='password' placeholder='Password' required
                />
                <AccountPageInput type='submit' value='Log in'/>
                <div className='container grid grid-cols-3'>
                    <a className='col-start-1' href="#">Forgot Password?</a>
                    <a className='col-start-3' href="#" target='_blank'>Need an account? Register now!</a>
                </div>
            </form>
        </div>
    );
}

// class LoginPage extends Component {
//     public constructor(props: any) {
//         super(props)
//     }
//     public render(): ReactNode 
// }

export default LoginPage;