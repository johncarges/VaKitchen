import React, { useState, createContext, useContext } from 'react'


const UserContext = createContext()

export default function UserProvider({children}){
    const [user, setUser] = useState(null)
    const login = (newUser) => setUser(newUser)
    const logout = () => setUser(null)

    return (
        <UserContext.Provider value={{user, login, logout}}>{children}</UserContext.Provider>
    )
}

export {UserContext}