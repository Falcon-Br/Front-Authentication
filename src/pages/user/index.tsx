import { useContext } from 'react'
import { AuthContext } from "../../contexts/AuthContext"
import { useNavigate } from 'react-router-dom'

function User() {

    const { logout } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogout = async (event: React.FormEvent) => {
        event.preventDefault()
        logout()
        navigate('/')
    }

    return (
        <>
            <h2>Tela do usuário logado</h2>
            <p>teste</p>
            <form onSubmit={handleLogout}>

                <button type='submit'>Logout</button>
            </form>
        </>
    )
}

export default User