import { createContext, useState } from "react";
import { borrarToken, obtenerToken } from "../lib/serviceToken.js";

export const LoggedContext = createContext();

export function LoggedProvider({ children }) {
    const [logged, setLogged] = useState({
        estaLogueado: false,
        user: {}
    })

    const cambiarLogged=(user)=>{
        const auxLogged= structuredClone(logged)
        auxLogged['estaLogueado']=true
        auxLogged['user']=user
        setLogged(auxLogged)
    }

    const logout=()=>{
        const auxLogged= {}
        auxLogged['estaLogueado']=false
        auxLogged['user']={}
        borrarToken()
        setLogged(auxLogged)
    }

    return (
        <LoggedContext.Provider value={{
            logged,
            cambiarLogged,
            logout
        }}>
            {children}
        </LoggedContext.Provider>
    )
}