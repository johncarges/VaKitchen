import React, {useState} from "react"

export default function Login() {

    const [formData,setFormData] = useState({
        email: '',
        password:''
    })

    function onChange(e) {
        const key = e.target.name
        setFormData({
            ...formData,
            [key]: e.target.value
        })
    }

    function onSubmit(e) {
        e.preventDefault()
        console.log(JSON.stringify(formData))
    }

    return (
        <div className='login-container'>
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

                <button type="submit">Log in</button>
            </form>
        </div>
    )


}


