import Cookies from 'universal-cookie'
import { jwtDecode } from 'jwt-decode'


export async function login(username,password) {
    const cookies = new Cookies()
    

    let form = new FormData()
    form.append('username',username)
    form.append('password',password)
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
        // // login(data.user)
        // navigate('/account')
    })
}

export async function logout() {
    const cookies = new Cookies()

    cookies.remove("jwt_authorization")
}