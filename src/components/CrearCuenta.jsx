import { useState } from 'react';
import styles from '../styles/Login.module.css';
import { validEmail, validPassword, validText, validPasswordRepeat, validEmpresa } from '../lib/valid';
import { textErrors } from '../lib/textErrors';
import { useLogin } from '../hooks/useLogin';

import { useNavigate, Link } from 'react-router-dom';
import { validPhone, validCIF} from '../lib/valid';
import { crearUsuarioAdmin } from '../lib/data';
import { obtenerToken } from '../lib/serviceToken';

 const Crearcuenta = () => {
    const [mensaje,setMensaje]=useState(null)
    const { logged, cambiarLogged } = useLogin()
    const [datos,setDatos]=useState({
        email: null,
        password: null,
        nombre: null,
        telefono: null,
        cif: null,
        empresa: null,
        passwordR: null,
        type:'normal',
        status:'false'
    })
    const [errores, setError] = useState({
      email: null,
      password: null,
      nombre: null,
      telefono: null,
      cif: null,
      empresa: null,
      passwordR: null,
      type:null,
      status:null
    })

    const navigate=useNavigate();

    const handleChange = (e) => {
        let auxErrores = { ...errores }
        let auxDatos= {...datos}
        auxErrores['mensajeError'] = null
        let valido = false;

        if (e.target.name == 'email') valido = validEmail(e.target.value)
        if (e.target.name == 'nombre') valido = validText(e.target.value, 1, 50, false)
        if (e.target.name == 'telefono')valido = validPhone(e.target.value)
        if (e.target.name == 'cif') valido = validCIF(e.target.value)
        if (e.target.name == 'empresa') valido = validEmpresa(e.target.value, 1, 50)  
        if (e.target.name == 'password')valido = validPassword(e.target.value)
        if (e.target.name == 'passwordR') valido = validPasswordRepeat(e.target.value, datos.password)

        auxDatos[e.target.name]=e.target.value
        setDatos(auxDatos)
        if (!valido) {
            auxErrores[e.target.name] = textErrors(e.target.name)
        } else {
            auxErrores[e.target.name] = null
        }
        setError(auxErrores)
    }

    const crearCuenta = async () => {
        let valido = true;
        let auxErrores = { ...errores }
        for (const key in datos) {
            if (datos[key] == null) {
                auxErrores[key] = textErrors('vacio')
                setError(auxErrores)
                valido = false;
            }
        }

        if (valido) {
            console.log("--------------------------------------");
          console.log(datos)
          const token = obtenerToken();
          const usuarioNuevo=await crearUsuarioAdmin(token,datos)

          console.log("new user "+ usuarioNuevo);

            // //const crearUsuario = await loggear(datos.email, datos.password).catch((error) => console.log(error));
             if (usuarioNuevo.error) {
                let auxErrores = { ...errores }
                auxErrores['mensajeError'] = usuarioNuevo.message;
                setError(auxErrores)
            } 
            else {
                const mensajeAux= (logged.user.type=='admin')? "Usuario creado con éxito." : "Usuario creado con éxito. Para iniciar sesión se neccesita autorización de un administrador"
                setMensaje(mensajeAux)

            //     const login = await loggear(datos.email, datos.password).catch((error) => console.log(error));
            //     if (login.error) {
            //         let auxErrores = { ...errores }
            //         auxErrores['mensajeError'] = login.message;
            //         setError(auxErrores)
            //     } else {
            //         cambiarLogged(login.usuario)
            //         guardarToken(login.token)
            //         navigate('/')
            //     }

             }
        }
    }
    return (
        <div className={styles.cajaForm}>
            <h2>CREAR CUENTA</h2>
            <div className={styles.cajaInputs}>
                <label for='nombre'>Nombre Completo</label>
                <input type="nombre" id='nombre' name='nombre' onChange={(e) => handleChange(e)} value={datos.nombre} />
                <span className='errorSpan'>{errores.nombre}</span>
            </div>
            <div className={styles.cajaInputs}>
                <label for='email'>Email</label>
                <input type="email" id='email' name='email' onChange={(e) => handleChange(e)} value={datos.email} />
                <span className='errorSpan'>{errores.email}</span>
            </div>
            <div className={styles.cajaInputs}>
                <label for='telefono'>Teléfono</label>
                <input type="text" id='telefono' name='telefono' onChange={(e) => handleChange(e)} value={datos.telefono} />
                <span className='errorSpan'>{errores.telefono}</span>
            </div>
            <div className={styles.cajaInputs}>
                <label for='cif'>CIF</label>
                <input type="text" id='cif' name='cif' onChange={(e) => handleChange(e)} value={datos.cif} />
                <span className='errorSpan'>{errores.cif}</span>
            </div>
            <div className={styles.cajaInputs}>
                <label for='empresa'>Empresa</label>
                <input type="text" id='empresa' name='empresa' onChange={(e) => handleChange(e)} value={datos.empresa} />
                <span className='errorSpan'>{errores.empresa}</span>
            </div>
            <div className={styles.cajaInputs}>
                <label for='password'>Contraseña</label>
                <input type="password" id='password' name='password' onChange={(e) => handleChange(e)} value={datos.password} />
                <span className='errorSpan'>{errores.password}</span>
            </div>
            <div className={styles.cajaInputs}>
                <label for='passwordR'>Repita la Contraseña</label>
                <input type="password" id='passwordR' name='passwordR' onChange={(e) => handleChange(e)} value={datos.passwordR} />
                <span className='errorSpan'>{errores.passwordR}</span>
            </div>
            {logged.user.type=='admin' && <>
             <div className={styles.cajaInputs}>
                <label for='type'>user_type</label>
                <select name='type' onChange={(e) => handleChange(e)}>
                    <option value={'normal'} >Normal</option>
                    <option value={'admin'}>Admin</option>
                </select>
                <span className='errorSpan'>{errores.type}</span>
            </div>
            <div className={styles.cajaInputs}>
                <label for='status'>user_status</label>
                <select name='status' onChange={(e) => handleChange(e)}>
                    <option value={'false'} >Desactivado</option>
                    <option value={'true'} >Activado</option>
                    
                </select>
                <span className='errorSpan'>{errores.status}</span>
            </div>
            
            </>}
           


            <button onClick={() => crearCuenta()}>GUARDAR</button>
            {mensaje !=null && <p>{mensaje}</p>}
            <Link className='enlace' to="/login">
                <p className={styles.enlace}> {logged.user.type=='admin'? 'PORTAL ADMINISTRADOR':'LOGIN ' }</p>
            </Link>
            <span className='errorSpan'>{errores.mensajeError}</span>
        </div>
    )
}

export default Crearcuenta;