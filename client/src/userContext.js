import React, { useState, createContext, useContext } from 'react'


const UserContext = createContext()

export default function UserProvider({children}){
    const [user, setUser] = useState(null)
    const changeUser = (newUser) => setUser(newUser)

    return (
        <UserContext.Provider value={{user, changeUser}}>{children}</UserContext.Provider>
    )
}

export {UserContext}