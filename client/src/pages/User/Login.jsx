import React, {useState, useContext} from "react"
import Cookies from 'universal-cookie'
import { jwtDecode } from 'jwt-decode'
import { UserContext } from "../../userContext"
import { useNavigate, Link } from "react-router-dom"

export default function Login() {

    const cookies = new Cookies()

    const navigate = useNavigate()

    const [formData,setFormData] = useState({
        email: '',
        password:''
    })

    const [error, setError] = useState(null)

    const {login} = useContext(UserContext)

    function onChange(e) {
        const key = e.target.name
        setFormData({
            ...formData,
            [key]: e.target.value
        })
    }

    function onSubmit(e) {
        e.preventDefault()
        let form = new FormData()
        form.append('username',formData.email) //Expects form with username field
        form.append('password',formData.password)
        fetch('/login', {
            method: 'POST',
            body: form
        })
        .then(r=>r.json())
        .then(data => {
            console.log(data)
            const jwt_token = data.token
            const jwt_data = jwtDecode(jwt_token)
            cookies.set('jwt_authorization',jwt_token, {
                expires: new Date(jwt_data.exp * 1000)
            })
            login(data.user)
            navigate('/account', {replace: true})
        })
        .catch(err => setError(err))
    }

    return (
        <div className='login-container'>
            <h1>Welcome Back!</h1>
            
            <form onSubmit={onSubmit} className='login-form'>
                <input
                    name="email"
                    value={formData.email}
                    onChange={onChange}
                    placeholder='Email address'
                ></input>
                <input
                    name='password'
                    type='password'
                    value={formData.password}
                    onChange={onChange}
                    placeholder='Password'
                ></input>
                <p>{error ? "Could not find user": ''}</p>
                <button type="submit">Log in</button>
            </form>
            <h3 className='signup-question'>New to Kitchen Vacation?</h3>
            <Link to='/signup' className='signup-cta'>
                <div className='signup-cta'>
                    Sign up
                </div>
            </Link>
        </div>
    )


}


