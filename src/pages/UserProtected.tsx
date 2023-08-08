import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom';

export function UserProtected({children}: {children: JSX.Element}) {

    const context = useContext(AuthContext)

 if (!context.isLoggedIn) {
        console.log(context.isLoggedIn);
        alert("Você não tem permissão para acessar a página.")

        return <Navigate to='/'/>
    }

    return children
}