import { useLogin } from "../hooks/useLogin";
import { useState, useEffect } from "react";
// import styles from "../styles/Login.module.css";
import { useNavigate } from 'react-router-dom';
import { obtenerToken } from "../lib/serviceToken";
import { getAllInvoicesNormal, getCountInvoicesNormal } from "../lib/data";


 const TablaNormal = ()=>{
    const [invoices,setInvoices]=useState(null)
    const { logged } = useLogin()
    const navigate = useNavigate()
    const [offset,setOffset]=useState(0) //offset
    const [cantidad,setCantidad]=useState(null)
    const [limit,setLimit]=useState(10)

    const cambiarPagina=(operador)=>{

      if(operador =='+'){
          setOffset(offset+limit)

      }else{
          setOffset(offset-limit)

      }

  }

    useEffect(()=>{
    if (!logged.estaLogueado) navigate('/')
    const cargarDatos = async () => {
        const id = logged.user.id
        const token = obtenerToken();
        const numeroRegistros = await getCountInvoicesNormal(token,id)

        console.log(numeroRegistros);

        setCantidad(numeroRegistros.total_filas)

        console.log("id" + id + "\nlimit" + limit + "\noffset" + offset)
       
        //cantidad/limit
        const facturas = await getAllInvoicesNormal(token,id, limit, offset);
        setInvoices(facturas); // Actualiza el estado con los datos recibidos
        console.log(facturas)

      };
      cargarDatos();
    }, [logged, offset]);

    console.log(invoices)

       if (invoices != null) return (
        <div >
          <h2>HISTORIAL PEDIDOS NORMAL</h2>
          {invoices.length == 0 && <p>TODAVÍA NO HAS HECHO NINGÚN PEDIDO</p>}
          {invoices.map((order) => {
            return (
                <div  >
                  <p>Nº PEDIDO: {order.id}</p>
                  
                  <p>{order.company}</p>
                </div>          
            )
          })}
          <button onClick={()=>cambiarPagina('+')}>+</button>
          <p>{(offset!=0)?offset/limit:offset}</p>
          <button onClick={()=>cambiarPagina('-')}>-</button>
        </div>
      )
      else {
        <p>No hay pedidos</p>
      }

}


export default TablaNormal;
