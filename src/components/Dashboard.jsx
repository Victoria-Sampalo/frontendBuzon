import { useLogin } from "../hooks/useLogin";
import { useState, useEffect } from "react";
// import styles from "../styles/Login.module.css";
import { useNavigate } from 'react-router-dom';
import TablaNormal from "./TablaNormal";
import GestionFacturasAdmin from "./GestionFacturasAdmin";
import style from '../styles/Dashboard.module.css';
import GestionUsuarios from "./GestionUsuarios";


const Dashboard = () =>{
    const {cambiarLogged, logged, logout}=useLogin()
    const [mostrar, setMostrar]=useState(null)
    const navigate=useNavigate()
    useEffect(()=>{
       // console.log(logged)
       if(!logged.estaLogueado) navigate('/login');
      },[logged])
    //console.log("logged " + logged)

    const vista=(tipo)=>{
        setMostrar(tipo)

    }

    const mostrarComponente=()=>{
     return (mostrar=="facturas") 
     ? <GestionFacturasAdmin></GestionFacturasAdmin> 
     : (mostrar=="usuarios") 
        ? <GestionUsuarios></GestionUsuarios> 
        : null
    }
    return(
        <>
        {/* {logged.user.type=="admin" && <GestionFacturasAdmin></GestionFacturasAdmin>} */}
        {logged.user.type=="admin" && <div>
            <h2>PORTAL ADMINISTRADOR</h2>
            <button onClick={()=>vista("facturas")}>GESTIÓN DE FACTURAS</button>
            <button onClick={()=>vista("usuarios")}>GESTIÓN DE USUARIOS</button>
            <div>
                {mostrarComponente()}
            </div>
            </div>}

        {logged.user.type=="normal" && <TablaNormal></TablaNormal>}
        </>

    )
}



export default Dashboard;