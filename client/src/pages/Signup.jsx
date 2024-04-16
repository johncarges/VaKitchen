import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate, useSearchParams, useLoaderData } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { jwtDecode } from "jwt-decode";
import Cookies from 'universal-cookie'

import { UserContext } from "../userContext";

export default function Signup() {
    
    const cookies = new Cookies()
    const navigate = useNavigate()
    const {login} = useContext(UserContext)
    const [searchParams, setSearchParams] = useSearchParams()

    const planData = useLoaderData()

    const initialForm = {
        plan: searchParams.get('plan') || planData[0].id,
        email:'',
        password:'',
        passwordCheck:''
    }

    const [formData, setFormData] = useState(initialForm)
    const [error, setError] = useState(null)


    const onChange = (e) => {
        const key = e.target.name
        setFormData({
            ...formData,
            [key]: e.target.value
        })
        setError(null)
    }    

    const onSubmit = async (e) => {
        e.preventDefault()
        if (formData.password !== formData.passwordCheck) {
            setError('Passwords must match')
        }
        const body = {
            email: formData.email,
            password: formData.password,
            plan_id: parseInt(formData.plan)
        }
        console.log(body)
        const res = await fetch('/signup',{
            method: 'POST',
            body: JSON.stringify(body),
            headers:{
                'accepts':'application/json',
                'content-type':'application/json'
            }
        })

        if (!res.ok) {
            const err = await res.json()
            setError(err.detail)
            return null
        }

        const data = await res.json()
        const jwt_token = data.token
        const jwt_data = jwtDecode(jwt_token)
        cookies.set('jwt_authorization',jwt_token, {
            expires: new Date(jwt_data.exp*1000)
        })
        login(data.user)
        navigate('/account')
    }
    
    const renderedPlans = planData.map(plan => {
        return (
            <option value={plan.id}>{plan.name}</option>
        )
    })    

    return (
        <div className='signup-container page'>
            <Form onChange={onChange} className='signup-form'>
                <Form.Select 
                    name='plan' 
                    value={formData.plan}
                    className='signup-plan-select'>
                    {renderedPlans}    
                </Form.Select>
                
                <input 
                    name='email'
                    value={formData.email}
                    placeholder='Email Address'
                />
                
                <input 
                    name='password'
                    value={formData.password}
                    placeholder='Password'
                    type='password'
                />
                
                <input 
                    name='passwordCheck'
                    value={formData.passwordCheck}
                    placeholder='Re-enter Password'
                    type='password'
                />
                
                <p style={{border: 'none'}}>{error}</p>
                
                <button onClick={onSubmit}>Sign Up</button>
            </Form>
        </div>
    )
}

export async function loader() {
    const res = await fetch('/plans')
    const data = await res.json()

    return data
}