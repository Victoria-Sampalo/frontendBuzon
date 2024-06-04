import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link, Router, Routes } from 'react-router-dom';
import Footer from './components/Footer'; 
import Header from './components/Header';
import Login from './components/Login';
import { useLogin } from './hooks/useLogin.jsx';
import Dashboard from './components/Dashboard';
import { obtenerToken } from './lib/serviceToken.js'
import { tokenUser } from './lib/data';
import Crearcuenta from './components/CrearCuenta';
const App = () => {
  const {cambiarLogged, logged, logout}=useLogin()
  useEffect(()=>{
    const cargarDatos = async () => {
     // console.log(logged)
      logged.estaLogueado;
      const token= obtenerToken();
      //console.log(token);
      if(token!=null) {
        const user= await tokenUser(token)
       console.log(user)
        if(!user.error){
          cambiarLogged(user)
        } else {
         logout()
        }
      } else {
      logout()
      }
    };
    cargarDatos();
  },[])


  return (
    // <div id='contenedorglobal'>
      <BrowserRouter id='contenedorglobal'>
       <Header />
       <main>
        <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/crearcuenta" element={<Crearcuenta/>} />
        </Routes>

       </main> 
       <Footer />
      </BrowserRouter>
     
      
     
    // </div>
  );
};

export default App
