import React from "react";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Form from 'react-bootstrap/Form';


export default function Signup() {
    
    let [searchParams, setSearchParams] = useSearchParams()

    const initialForm = {
        name: '',
        username:'',
        email:'',
        password:''
    }

    const [formData, setFormData] = useState({

    })

    console.log(JSON.stringify(searchParams))
    
    return (
        <div className='signup-container'>
            <Form>
                <label>Name</label>
                <input 
                    name='name'
                />
                <Form.Select aria-label="Default select example">
                    <option>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </Form.Select>

            </Form>
        </div>
    )
}