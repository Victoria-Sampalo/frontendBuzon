import { useState, useEffect } from "react";
import styles from "../styles/Login.module.css";
import { Link, useNavigate } from 'react-router-dom';
import { validEmail, validPassword } from '../lib/valid';
import { textErrors } from '../lib/textErrors';
import { getPrueba, loggear } from '../lib/data';
import { useLogin } from '../hooks/useLogin';
import { guardarToken } from '../lib/serviceToken';
const Login = () => {
     // Obtener el estado de login y la función para cambiarlo del hook useLogin
     const {logged, cambiarLogged} = useLogin();
     // Definir los estados locales para email y password
     const [email, setEmail] = useState(null);
     const [pass, setPass] = useState(null);
     // Definir el estado local para errores
     const [errores, setError] = useState({
         email: null,
         password: null,
         user_status: null,
         mensajeError: null,
     });
    
     // Inicializar el hook de navegación
     const navigate = useNavigate();
   // useEffect para redirigir si el usuario ya está logueado
    useEffect(()=>{
        console.log(logged)
       if(logged.estaLogueado) navigate('/');
      },[logged])
// Manejar cambios en los inputs de email y password
    const handleChange=(e)=>{
        let auxErrores={...errores}
        auxErrores['mensajeError']=null
          // Validar el email y actualizar el estado de errores
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
          // Validar la contraseña y actualizar el estado de errores
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
   // Función para manejar el login
    const loguear=async ()=>{
       // Verificar que no haya errores de validación
        if(errores.email==null && errores.password==null){
           // Verificar que email y password no sean nulos
            if(email==null || pass==null) {
                let auxErrores={...errores}
                if(email==null) auxErrores['email']=textErrors('vacio')
                if(pass==null) auxErrores['password']=textErrors('vacio')
                setError(auxErrores)
            } else{
               // Intentar loguear con el email y password proporcionados
                const login= await loggear(email,pass);
               //const login= await getPrueba();
              console.log("-.-----------------------------------------");
                console.log(login)
                if(login.error){
                  // Si hay un error en el login, actualizar el estado de errores
                    let auxErrores={...errores}
                    console.log(auxErrores);
                    auxErrores['mensajeError']=login.message;
                    setError(auxErrores)
                } else {
                  console.log("login "+ login.usuario)
                   // Si el login es exitoso, cambiar el estado de login y guardar el token
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
      <Link to="/crearcuenta"><p className="enlace">CREAR CUENTA</p></Link>
      
      <span className="errorSpan">{errores.mensajeError}</span>
    </div>
  );
};

export default Login;
