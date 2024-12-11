import {Component, ReactNode, SyntheticEvent} from 'react'
import AccountPageLogo from '../AccountPageLogo'
import AccountPageInput from '../AccountPageInput'
import './index.css'

class LoginPage extends Component {
    public constructor(props: any) {
        super(props)
    }

    private formSubmit(e: React.FormEvent<HTMLInputElement>): void {
        
    }
    public render(): ReactNode {
        async function formAction(e: any) {
            e.preventDefault()
            console.log(e)

        }
        return (
            <div className='box-border px-4 lg:w-2/5 md:w-4/5 sm:w-full flex flex-col items-center justify-center'>
                <AccountPageLogo />
                <form
                    className='flex flex-col items-center justify-center w-full gap-4 min-w-96 max-w-lg'
                    onSubmit={async (e: React.SyntheticEvent) => {
                        e.preventDefault();
                        const target = e.target as typeof e.target & {
                            username: {value: string},
                            password: {value: string}
                        }
                        const username = target.username.value
                        const password = target.password.value
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
                                switch (resText) {
                                    case "OK":
                                        break
                                    default:
                                }
                            } else
                                throw new Error(resText)
                        } catch (error) {
                            
                        }
                    }}
                >
                    <AccountPageInput name='username' type='input' placeholder='Username or email' required/>
                    <AccountPageInput name='password' type='password' placeholder='Password' required/>
                    <AccountPageInput type='submit' value='Log in'/>
                    <div className='container grid grid-cols-3'>
                        <a className='col-start-1' href="#">Forgot Password?</a>
                        <a className='col-start-3' href="#" target='_blank'>Need an account? Register now!</a>
                    </div>
                </form>
            </div>
        );
    }
}

export default LoginPage;