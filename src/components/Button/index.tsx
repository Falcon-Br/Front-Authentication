import './style.css'

interface ButtonProps{
    label: String
}

function Button({label}: ButtonProps){
    return  <button className='button' type='submit'>{label}</button>
}

export default Button