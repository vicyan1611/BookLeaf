import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountPageLogo from '../AccountPageLogo'
import AccountPageInput from '../AccountPageInput'
import './index.css'
import { toast } from 'react-toastify';
import axios from 'axios';
import { FC } from 'react';

type UserType = 'admin' | 'normal';
interface LoginPageProps {
    redirectPath: string;
    usertype: UserType;
}

const LoginPage: FC<LoginPageProps> = ({
    redirectPath,
    usertype = 'normal'
}) => {
    const navigate = useNavigate();
    const verifyPath = usertype === 'normal'? 'http://localhost:3000/api/auth/verify' : 'http://localhost:3000/api/admin/verify';
    const postLoginPath = usertype === 'normal'? 'http://localhost:3000/api/auth/login' : 'http://localhost:3000/api/admin/login';
    useEffect(() => {
        axios.post(verifyPath, {}, {withCredentials: true}).then((res: any) => {
            if (res.status === 200) {
                navigate(redirectPath)
            }
        })
    }, [])

    function handleLogin(e: any) { 
        e.preventDefault()
        const username = e.target.username.value
        const password = e.target.password.value
        const toaster = toast.loading('Logging in...')
        fetch(postLoginPath, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify({username, password})
        })
        .then(res => {
            if (res.status === 200) {
                toast.update(toaster, {
                    render: 'Logged in successfully',
                    type: 'success',
                    isLoading: false,
                    autoClose: 3000
                })
                setTimeout(() => navigate(redirectPath), 3000) // Redirect to redirectPath after 3 seconds
            } else {
                res.text().then(text => toast.update(toaster, {
                    render: 'Error ' + res.status + ': ' + text,
                    type: 'error',
                    isLoading: false,
                    autoClose: 3000
                }))
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
                    <a className='col-start-1' href="/reset-password">Forgot Password?</a>
                    <a className='col-start-3' href="/register">Need an account? Register now!</a>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;