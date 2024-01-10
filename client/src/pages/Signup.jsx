import React from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function Signup() {
    
    let [searchParams, setSearchParams] = useSearchParams()

    const initialForm = {
        name: '',
        username:'',
        email:'',
        password:''
    }

    console.log(JSON.stringify(searchParams))
    
    return (
        <div className='signup-container'>
            <form>
                <label>Name</label>
                <input 
                    name='name'
                />
            </form>
        </div>
    )
}