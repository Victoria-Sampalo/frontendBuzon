import { useState } from "react";
import styles from "../styles/Login.module.css";
import {
  validEmail,
  validPassword,
  validText,
  validPasswordRepeat,
  validEmpresa,
} from "../lib/valid";
import { textErrors } from "../lib/textErrors";

import { useNavigate, Link } from "react-router-dom";
import { validPhone, validCIF } from "../lib/valid";

import { obtenerToken } from "../lib/serviceToken";

const Crearfactura = () => {
  const [mensaje, setMensaje] = useState(null);

  const [datos, setDatos] = useState({
    user_id: null,
    invoice_number: null,
    development: null,
    company: null,
    invoice_date: null,
    status: null,
    // Agrega error_message y rejection_message si los necesitas
    concept: null,
    amount: null,
  });
  const [errores, setError] = useState({
    // Agrega errores para los campos nuevos
    user_id: null,
    invoice_number: null,
    development: null,
    company: null,
    invoice_date: null,
    status: null,
    // Agrega errores para error_message y rejection_message si los necesitas
    concept: null,
    amount: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    let auxErrores = { ...errores };
    let auxDatos = { ...datos };
    auxErrores["mensajeError"] = null;
    let valido = false;

   
    // if (e.target.name == "user_id")
    //   valido = validText(e.target.value, 1, 50, false);
    // if (e.target.name == "invoice_number")
    //   valido = validText(e.target.value, 1, 50, false);
    // if (e.target.name == "development")
    //   valido = validEmpresa(e.target.value, 1, 50);
    // if (e.target.name == "company")
    //   valido = validEmpresa(e.target.value, 1, 50);
    // Agrega validaciones para los campos nuevos
    //if (e.target.name == 'invoice_date') valido = // Función de validación para invoice_date
    // if (e.target.name == 'status') valido = // Función de validación para status
    // Agrega validaciones para error_message y rejection_message si los necesitas
    // if (e.target.name == "concept")
    //   valido = validText(e.target.value, 1, 200, false);
    //if (e.target.name == 'amount') valido = // Función de validación para amount

    auxDatos[e.target.name] = e.target.value;
    setDatos(auxDatos);
    if (!valido) {
      auxErrores[e.target.name] = textErrors(e.target.name);
    } else {
      auxErrores[e.target.name] = null;
    }
    setError(auxErrores);
  };

  const Crearfactura = async () => {
    let valido = true;
    let auxErrores = { ...errores };
    for (const key in datos) {
      if (datos[key] == null) {
        auxErrores[key] = textErrors("vacio");
        setError(auxErrores);
        valido = false;
      }
    }

    if (valido) {
      console.log("--------------------------------------");
      console.log(datos);
      const token = obtenerToken();
      const usuarioNuevo = null;
      //await crearUsuarioAdmin(token,datos)

      console.log("new user " + usuarioNuevo);

      // //const crearUsuario = await loggear(datos.email, datos.password).catch((error) => console.log(error));
      if (usuarioNuevo.error) {
        let auxErrores = { ...errores };
        auxErrores["mensajeError"] = usuarioNuevo.message;
        setError(auxErrores);
      } else {
        const mensajeAux =
          logged.user.type == "admin"
            ? "Usuario creado con éxito."
            : "Usuario creado con éxito. Para iniciar sesión se neccesita autorización de un administrador";
        setMensaje(mensajeAux);
      }
    }
  };
  return (
    <div className={styles.cajaForm}>
      <h2>CREAR FACTURA</h2>
      <div className={styles.cajaInputs}>
        <label for="user_id">ID Cliente</label>
        <input
          type="number"
          id="user_id"
          name="user_id"
          onChange={(e) => handleChange(e)}
          value={datos.user_id}
        />
        <span className="errorSpan">{errores.user_id}</span>
      </div>
      <div className={styles.cajaInputs}>
        <label for="invoice_number">Número de Factura</label>
        <input
          type="text"
          id="invoice_number"
          name="invoice_number"
          onChange={(e) => handleChange(e)}
          value={datos.invoice_number}
        />
        <span className="errorSpan">{errores.invoice_number}</span>
      </div>
      <div className={styles.cajaInputs}>
        <label for="development">Desarrollo</label>
        <input
          type="text"
          id="development"
          name="development"
          onChange={(e) => handleChange(e)}
          value={datos.development}
        />
        <span className="errorSpan">{errores.development}</span>
      </div>
      <div className={styles.cajaInputs}>
        <label for="company">Empresa</label>
        <input
          type="text"
          id="company"
          name="company"
          onChange={(e) => handleChange(e)}
          value={datos.company}
        />
        <span className="errorSpan">{errores.company}</span>
      </div>
      <div className={styles.cajaInputs}>
        <label for="invoice_date">Fecha de Factura</label>
        <input
          type="date"
          id="invoice_date"
          name="invoice_date"
          onChange={(e) => handleChange(e)}
          value={datos.invoice_date}
        />
        <span className="errorSpan">{errores.invoice_date}</span>
      </div>
      <div className={styles.cajaInputs}>
        <label for="status">Estado</label>
        <select name="status" onChange={(e) => handleChange(e)}>
          <option value={"pendiente"}>Pendiente</option>
          <option value={"pagada"}>Pagada</option>
          <option value={"anulada"}>Anulada</option>
        </select>
        <span className="errorSpan">{errores.status}</span>
      </div>
      <div className={styles.cajaInputs}>
        <label for="concept">Concepto</label>
        <textarea
          id="concept"
          name="concept"
          onChange={(e) => handleChange(e)}
          value={datos.concept}
        />
        <span className="errorSpan">{errores.concept}</span>
      </div>
      <div className={styles.cajaInputs}>
        <label for="amount">Importe</label>
        <input
          type="number"
          id="amount"
          name="amount"
          onChange={(e) => handleChange(e)}
          value={datos.amount}
        />
        <span className="errorSpan">{errores.amount}</span>
      </div>
      <button onClick={() => crearFactura()}>CREAR FACTURA</button>
      {mensaje != null && <p>{mensaje}</p>}
      <Link className="enlace" to="/facturas">
        <p className={styles.enlace}>LISTAR FACTURAS</p>
      </Link>
      <span className="errorSpan">{errores.mensajeError}</span>
    </div>
  );
};

export default CrearFactura;
