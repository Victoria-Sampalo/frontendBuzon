import { useLogin } from "../hooks/useLogin";
import { useState, useEffect } from "react";
// import styles from "../styles/Login.module.css";
import { useNavigate } from 'react-router-dom';




const Dashboard = () =>{
    const {cambiarLogged, logged, logout}=useLogin()
    
    const navigate=useNavigate()


    useEffect(()=>{
        console.log(logged)
       if(!logged.estaLogueado) navigate('/login');
      },[logged])
console.log(logged)
    return(
        <>
        <h2>Dashboard</h2>
        {logged.user.type=="admin" && <h2>Soy admin</h2>}
        {logged.user.type=="normal" && <h2>Soy normal</h2>}

        </>

    )
}



export default Dashboard;