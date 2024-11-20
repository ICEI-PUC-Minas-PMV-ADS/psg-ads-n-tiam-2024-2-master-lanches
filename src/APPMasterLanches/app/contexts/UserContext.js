import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
    const [ADM, setADM] = useState(false);

    return (
        <UserContext.Provider value={{ ADM, setADM }}>
            {children}
        </UserContext.Provider>
    );
}

// Hook para usar o contexto
export function accessUser() {
    return useContext(UserContext);
}