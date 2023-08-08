//imports
import { useContext, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { Api } from '../../services/api'

//Components
import Button from "../../components/Button"

//Icons
import githubIcon from '../../assets/Github.svg'
import googleIcon from '../../assets/Google.svg'

//Styles
import { AuthContext } from '../../contexts/AuthContext'
import './styles.css'
import { AxiosError } from 'axios'

function Register() {

    interface ErrorResponse {
        msg: string;
    }

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState<string | null>(null)

    const { login } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault()

        try {
            debugger
            const response = await Api.post('/auth/register', { name, email, password, confirmPassword })

            alert(response.data.msg)
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

    return (
        <>
            <div className='login-container'>

                <div className='login-box-container'>
                    <div >
                        {error && <div className="error-message">{error}</div>}
                        <form className='login-box-register' onSubmit={handleRegister} >
                            <h2>Cadastro</h2>

                            <input type="name"
                                placeholder='Nome'
                                value={name}
                                required
                                onChange={(e) => setName(e.target.value)}
                            />

                            <input type="email"
                                placeholder='Email'
                                value={email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <input type="password"
                                placeholder='Senha'
                                value={password}
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <input type="password"
                                placeholder='Confirme a senha'
                                value={confirmPassword}
                                required
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />

                            <Button label={"Cadastrar"} />

                            <p className='p-discret'> Ou continue com um dessas redes sociais</p>

                            <div className='login-box-icons'>
                                <img src={googleIcon} alt="Ícone do Google" />
                                <img src={githubIcon} alt="Ícone do Google" />
                            </div>

                            <p className='p-discret'> Já tem uma conta?
                                <Link to="/"><span> Login</span></Link>
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

export default Register