import React from 'react'
import { useRouteError } from 'react-router-dom'


export default function Error() {
    const error = useRouteError()

    console.log(error)
    
    const message = error.message ?? "Unspecified error"

    return (
        <>
            <h1>Error: {message}</h1>
        </>

    )
}