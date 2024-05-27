import { useLogin } from "../hooks/useLogin";
import { useState, useEffect } from "react";
// import styles from "../styles/Login.module.css";
import { useNavigate } from 'react-router-dom';
import { obtenerToken } from "../lib/serviceToken";
import { getAllInvoicesNormal } from "../lib/data";


 const TablaNormal = ()=>{
    const [invoices,setInvoices]=useState(null)
    const { logged } = useLogin()
    const navigate = useNavigate()

    useEffect(()=>{
    if (!logged.estaLogueado) navigate('/')
    const cargarDatos = async () => {
        const id = logged.user.id
        const token = obtenerToken();
        const respuesta = await getAllInvoicesNormal(token, id)
        setInvoices(respuesta); // Actualiza el estado con los datos recibidos
      };
      cargarDatos();
    }, [logged]);

    console.log(invoices)

    if (invoices != null) return (
        <div >
          <h2>HISTORIAL PEDIDOS</h2>
          {invoices.length == 0 && <p>TODAVÍA NO HAS HECHO NINGÚN PEDIDO</p>}
          {invoices.map((order) => {
            return (
                <div  >
                  <p>Nº PEDIDO: {order.id}</p>
                  
                  <p>{order.company}</p>
                </div>          
            )
          })}
        </div>
      )
      else {
        <p>No hay pedidos</p>
      }

}


export default TablaNormal;
