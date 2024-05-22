import { useState, useEffect } from "react";
import styles from "../styles/Login.module.css";
import { useNavigate } from 'react-router-dom';
import { validEmail, validPassword } from '../lib/valid';
import { textErrors } from '../lib/textErrors';
import { getPrueba, loggear } from '../lib/data';
import { useLogin } from '../hooks/useLogin';
import { guardarToken } from '../lib/serviceToken';
const Login = () => {
    const {logged, cambiarLogged}=useLogin()
    const [email, setEmail]=useState(null)
    const [pass,setPass]=useState(null)
    const [errores,setError]=useState({
        email:null,
        password:null
    })
   
    const navigate=useNavigate()
    useEffect(()=>{
        console.log(logged)
       if(logged.estaLogueado) navigate('/');
      },[logged])

    const handleChange=(e)=>{
        let auxErrores={...errores}
        auxErrores['mensajeError']=null
        if(e.target.name=='email') 
        {   
            if(!validEmail(e.target.value)){            
                auxErrores['email']=textErrors('email')
                setError(auxErrores)
            } else {
                auxErrores['email']=null
                setError(auxErrores)
            }

            setEmail(e.target.value)
        }
        if(e.target.name=='pass') 
            {
                if(!validPassword(e.target.value)){            
                    auxErrores['password']=textErrors('password')
                    setError(auxErrores)
                } else {
                    auxErrores['password']=null
                    setError(auxErrores)
                }
                setPass(e.target.value)
            }
    }

    const loguear=async ()=>{
        if(errores.email==null && errores.password==null){
            if(email==null || pass==null) {
                let auxErrores={...errores}
                if(email==null) auxErrores['email']=textErrors('vacio')
                if(pass==null) auxErrores['password']=textErrors('vacio')
                setError(auxErrores)
            } else{
                const login= await loggear(email,pass);
               //const login= await getPrueba();

                console.log(login)
                if(login.error){
                    let auxErrores={...errores}
                    auxErrores['mensajeError']=login.message;
                    setError(auxErrores)
                } else {
                    cambiarLogged(login.usuario)
                    guardarToken(login.token)
                    navigate('/')
                }
            }
            
        }
    }

  return (
    <div className={styles.loginContainer}>
      <h2>LOGIN</h2>
      <div className={styles.inputGroup}>
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={(e) => handleChange(e)}
          value={email}
        />
        <span className="errorSpan">{errores.email}</span>
      </div>
      <div className={styles.inputGroup}>
        <label for="pass">Contraseña</label>
        <input
          type="password"
          id="pass"
          name="pass"
          onChange={(e) => handleChange(e)}
          value={pass}
        />
        <span className="errorSpan">{errores.password}</span>
      </div>
      <p className="fuenteCourier enlace">¿Has olvidado tu contraseña?</p>
      <button onClick={() => loguear()}>Entrar</button>
      <p className="enlace">CREAR CUENTA</p>
      <span className="errorSpan">{errores.mensajeError}</span>
    </div>
  );
};

export default Login;
