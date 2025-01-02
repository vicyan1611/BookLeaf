import LoginPage from '../../components/LoginPage';

export default function LoginPageAdmin() {
    
    return <LoginPage redirectPath='/admin/delete-user' usertype='admin' />
}