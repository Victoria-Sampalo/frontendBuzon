import React, { useState, useEffect } from "react";
import styles from "../styles/Login.module.css";
import {
  validText,
  validEmpresa,
} from "../lib/valid";
import { textErrors } from "../lib/textErrors";
import { useNavigate } from "react-router-dom";
import { obtenerToken } from "../lib/serviceToken";
import { createInvoice, uploadFile } from "../lib/data";

const Crearfactura = ({ user_id }) => {
  const [mensaje, setMensaje] = useState(null);
  const [datos, setDatos] = useState({
    user_id: user_id,
    invoice_number: null,
    development: null,
    company: null,
    invoice_date: null,
    status: null,
    concept: null,
    amount: null,
  });
  const [errores, setErrores] = useState({
    user_id: null,
    invoice_number: null,
    development: null,
    company: null,
    invoice_date: null,
    status: null,
    concept: null,
    amount: null,
  });
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setDatos((prevDatos) => ({ ...prevDatos, user_id: user_id }));
  }, [user_id]);

  const handleChange = (e) => {
    let auxErrores = { ...errores };
    let auxDatos = { ...datos };
    auxErrores["mensajeError"] = null;
    let valido = false;

    if (e.target.name === "invoice_number") valido = validText(e.target.value, 1, 50, false);
    if (e.target.name === "development") valido = validEmpresa(e.target.value, 1, 50);
    if (e.target.name === "company") valido = validEmpresa(e.target.value, 1, 50);
    if (e.target.name === "concept") valido = validText(e.target.value, 1, 200, false);

    auxDatos[e.target.name] = e.target.value;
    setDatos(auxDatos);

    if (!valido) {
      auxErrores[e.target.name] = textErrors(e.target.name);
    } else {
      auxErrores[e.target.name] = null;
    }
    setErrores(auxErrores);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setFileError(null);
    } else {
      setFileError('Please upload a valid PDF file.');
    }
  };

  const crearfactura = async () => {
    let valido = true;
    let auxErrores = { ...errores };
    for (const key in datos) {
      if (datos[key] == null) {
        auxErrores[key] = textErrors("vacio");
        setErrores(auxErrores);
        valido = false;
      }
    }

    if (valido) {
      console.log("--------------------------------------");
      console.log(datos);
      const token = obtenerToken();
      
      // Llama a la función createInvoice con los datos de la factura
      const nuevaFactura = await createInvoice(token, datos);
      console.log("Factura creada: ", nuevaFactura);

      if (nuevaFactura.error) {
        auxErrores["mensajeError"] = nuevaFactura.message;
        setErrores(auxErrores);
      } else {
        setMensaje("Factura creada con éxito.");

        if (file) {
          try {
            await uploadFile(token, file);
            setMensaje("Factura y archivo subidos con éxito.");
          } catch (err) {
            setErrores({ ...errores, mensajeError: 'Error uploading file' });
          }
        }

        setTimeout(() => navigate("/"), 2000); // Redirige después de 2 segundos
      }
    }
  };

  return (
    <div className={styles.cajaForm}>
      <h2>CREAR FACTURA</h2>
      <div className={styles.cajaInputs}>
        <label htmlFor="user_id">ID Cliente</label>
        <input
          type="number"
          id="user_id"
          name="user_id"
          value={datos.user_id}
          disabled
        />
        <span className="errorSpan">{errores.user_id}</span>
      </div>
      <div className={styles.cajaInputs}>
        <label htmlFor="invoice_number">Número de Factura</label>
        <input
          type="text"
          id="invoice_number"
          name="invoice_number"
          onChange={handleChange}
          value={datos.invoice_number}
        />
        <span className="errorSpan">{errores.invoice_number}</span>
      </div>
      <div className={styles.cajaInputs}>
        <label htmlFor="development">Desarrollo</label>
        <input
          type="text"
          id="development"
          name="development"
          onChange={handleChange}
          value={datos.development}
        />
        <span className="errorSpan">{errores.development}</span>
      </div>
      <div className={styles.cajaInputs}>
        <label htmlFor="company">Empresa</label>
        <select name="company" onChange={handleChange} value={datos.company}>
          <option value="">Seleccione una empresa</option>
          <option value="prime">Prime</option>
          <option value="proyect">Proyect</option>
        </select>
        <span className="errorSpan">{errores.company}</span>
      </div>
      <div className={styles.cajaInputs}>
        <label htmlFor="invoice_date">Fecha de Factura</label>
        <input
          type="date"
          id="invoice_date"
          name="invoice_date"
          onChange={handleChange}
          value={datos.invoice_date}
        />
        <span className="errorSpan">{errores.invoice_date}</span>
      </div>
      <div className={styles.cajaInputs}>
        <label htmlFor="status">Estado</label>
        <select name="status" onChange={handleChange} value={datos.status}>
          <option value="">Seleccione un estado</option>
          <option value="sent">Enviada</option>
          <option value="pending">Pendiente</option>
          <option value="paid">Pagada</option>
          <option value="error">Error</option>
          <option value="rejected">Rechazada</option>
        </select>
        <span className="errorSpan">{errores.status}</span>
      </div>
      <div className={styles.cajaInputs}>
        <label htmlFor="concept">Concepto</label>
        <textarea
          id="concept"
          name="concept"
          onChange={handleChange}
          value={datos.concept}
        />
        <span className="errorSpan">{errores.concept}</span>
      </div>
      <div className={styles.cajaInputs}>
        <label htmlFor="amount">Importe</label>
        <input
          type="number"
          id="amount"
          name="amount"
          onChange={handleChange}
          value={datos.amount}
        />
        <span className="errorSpan">{errores.amount}</span>
      </div>
      <div className={styles.cajaInputs}>
        <label htmlFor="file">Subir Archivo (PDF)</label>
        <input
          type="file"
          id="file"
          name="file"
          accept="application/pdf"
          onChange={handleFileChange}
        />
        <span className="errorSpan">{fileError}</span>
      </div>
      <button onClick={crearfactura}>CREAR FACTURA</button>
      {mensaje && <p>{mensaje}</p>}
      <span className="errorSpan">{errores.mensajeError}</span>
    </div>
  );
};

export default Crearfactura;
