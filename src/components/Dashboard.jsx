import { useLogin } from "../hooks/useLogin";
import { useState, useEffect } from "react";
// import styles from "../styles/Login.module.css";
import { useNavigate } from 'react-router-dom';
import TablaNormal from "./TablaNormal";
import TablaAdmin from "./TablaAdmin";


const Dashboard = () =>{
    const {cambiarLogged, logged, logout}=useLogin()
    const navigate=useNavigate()
    useEffect(()=>{
        console.log(logged)
       if(!logged.estaLogueado) navigate('/login');
      },[logged])
    //console.log("logged " + logged)
    return(
        <>
        <h2>Dashboard</h2>
        {logged.user.type=="admin" && <TablaAdmin></TablaAdmin>}
        {logged.user.type=="normal" && <TablaNormal></TablaNormal>}

        </>

    )
}



export default Dashboard;