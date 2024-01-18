import React from "react";
import { useState } from "react";
import { Link, useSearchParams, useLoaderData } from "react-router-dom";
import Form from 'react-bootstrap/Form';


export default function Signup() {
    
    const [searchParams, setSearchParams] = useSearchParams()

    const planData = useLoaderData()

    const initialForm = {
        plan: searchParams.get('plan'),
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

    const onSubmit = (e) => {
        e.preventDefault()
        if (formData.password !== formData.passwordCheck) {
            setError('Passwords must match')
        }
        
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