//imports
import { useContext, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { AxiosError } from 'axios'

//Icons
import googleIcon from '../../assets/Google.svg'
import githubIcon from '../../assets/Github.svg'

//Components
import Button from '../../components/Button'

//styles
import './style.css'

function Login() {

    interface ErrorResponse {
        msg: string;
    }

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)

    const { login, isLoggedIn } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        try {
            await login(email, password)
            navigate('/user')        
        } catch (err) {
            const errorAxios = err as AxiosError
            if (errorAxios.response) {
                const errorMessage = errorAxios.response.data as ErrorResponse
                setError(errorMessage.msg)
                console.log(errorMessage);
            } else if (errorAxios.request) {
                setError('Erro de requisição. Por favor, tente novamente mais tarde.');
            } else {
                setError('Ocorreu um erro. Por favor, tente novamente mais tarde.');
            }
        }
    }

    if (isLoggedIn) {
        return <Navigate to='/user'/>
    } else {

        return (
            <>
                <div className='login-container'>
                    <div className='login-box-container'>
                        <div >
                        {error && <div className="error-message">{error}</div>}
                            <form className='login-box' onSubmit={handleSubmit}>
                                <h2>Login</h2>
                                <input type="email"
                                    placeholder='Email'
                                    value={email}
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                <input type="password"
                                    placeholder='Password'
                                    value={password}
                                    required
                                    onChange={(e) => setPassword(e.target.value)} />

                                <Button label={"Login"} />

                                <p className='p-discret'> Ou continue com um dessas redes sociais</p>

                                <div className='login-box-icons'>
                                    <img src={googleIcon} alt="Ícone do Google" />
                                    <img src={githubIcon} alt="Ícone do Google" />
                                </div>

                                <p className='p-discret'> Não tem uma conta ainda?
                                    <Link to="/register"><span className='links'> Registre-se</span></Link>
                                </p>
                            </form>
                            <div className='login-box-description'>
                                <p className='p-discret'> Criado por: <span>Ádrio Falcão</span></p>
                                <p className='p-discret'>Devchallenger.io</p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Login