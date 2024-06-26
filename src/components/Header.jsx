import React from 'react';
import style from '../styles/Header.module.css';
import { FaPhoneAlt } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { FaRegUserCircle } from "react-icons/fa";

import { FaUserCircle } from "react-icons/fa";
import { useLogin } from '../hooks/useLogin';




export default function Header() {
  const {logged, cambiarLogged, logout}=useLogin()
  // const {btnCerrarSesion, setBtnCerrarSesion} =

 // console.log(logged)
 const icono = ()=>{
  if(logged.estaLogueado){
    return <button onClick={()=>logout()}>CERRAR SESIÓN</button> 
    //<FaUserCircle onClick={()=>logout()}/>
  }else{
    return <FaRegUserCircle />
  }
 }
  return (
    <header className={style.header}>
      <img
        src="/images/logo_prime_blanco.png" // Establece la ruta a la imagen del logo.
        width={1897 / 8} // Define el ancho de la imagen como 1/8 del ancho original (1897px).
        height={1168 / 8} // Define el alto de la imagen como 1/8 del alto original (1168px).
        alt="logotipo prime invest" // Define el texto alternativo para accesibilidad.
      />
      <div>
      <FaPhoneAlt />
      <span>(+34)952 100 077</span>
      <TfiEmail />
      {icono()}
      {/* <FaRegUserCircle />
      <FaUserCircle /> */}
      </div>
      


    </header>
  );
}
