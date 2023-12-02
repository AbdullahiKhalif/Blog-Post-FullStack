import { createContext, useContext, useState } from "react";

export const authContext = createContext();

export const UseAuth = () =>{
    return useContext(authContext);
}

const ContextProvider = ({children}) => {
    const [currentUser, setcurrentUser] = useState(null);
    const value = {currentUser, setcurrentUser};

    return <authContext.Provider value={value}>{children}</authContext.Provider>
}

export default ContextProvider;