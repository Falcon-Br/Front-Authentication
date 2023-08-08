import { createContext, useEffect, useState } from "react";
import { Api } from "../services/api";

interface AuthContextData {
    isLoggedIn: boolean
    login: (email: string, password: string) => void
    logout: () => void
}


const AuthContext = createContext<AuthContextData>({
    isLoggedIn: false,
    login: () => { },
    logout: () => { }
})

const AuthProvider = ({ children }: { children: JSX.Element }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsLoggedIn(true)
        }
    }, [])

    async function login(email: string, password: string) {
            const response = await Api.post('/auth/login', { email, password })
            const token = response.data.token
            const user = response.data.user
            localStorage.setItem('token', token)

            setIsLoggedIn(true)
            console.log(`Logado: ${isLoggedIn}`)
            console.log(user)
            console.log(`Token: ${token}`)

            return response.data
      
    }

    async function logout() {
        setIsLoggedIn(false)
        localStorage.removeItem('token')
        console.log(`Logado: ${isLoggedIn}`);
    }

    const authContextValue: AuthContextData = {
        isLoggedIn,
        login,
        logout,
    }

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider };

