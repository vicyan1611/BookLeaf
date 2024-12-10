import {Component, ReactNode} from 'react'
import AccountPageLogo from '../AccountPageLogo'
import AccountPageInput from '../AccountPageInput'
import './index.css'

class LoginPage extends Component {
    public constructor(props: any) {
        super(props)
    }
    public render(): ReactNode {
        function formAction(formData: any): any {
            
        }
        return (
            <div className='box-border lg:w-2/5 md:w-4/5 sm:w-full flex flex-col items-center justify-center'>
                <AccountPageLogo />
                <form className='flex flex-col items-center justify-center w-full gap-4 min-w-96 max-w-lg' action='formAction'>
                    <AccountPageInput type='input' placeholder='Username or email' required/>
                    <AccountPageInput type='password' placeholder='Password' required/>
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