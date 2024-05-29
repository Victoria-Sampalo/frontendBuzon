import { useLogin } from "../hooks/useLogin";
import { useState, useEffect } from "react";
// import styles from "../styles/Login.module.css";
import { useNavigate } from "react-router-dom";
import {
    getCountUsersFilters,
    getAllUsersLimitFilters,
    tokenUser,
    updateUser,
  } from "../lib/data";
import { obtenerToken } from "../lib/serviceToken";


import style from "../styles/GestionUsuarios.module.css";
import { FaEdit, FaTrash,FaSave } from "react-icons/fa";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

const GestionUsuarios =()=>{
  const[users,setUsers]=useState(null);
  const { logged,logout } = useLogin();
  const navigate = useNavigate();
  const [offset, setOffset] = useState(0); //offset
  const [cantidad, setCantidad] = useState(null);
  const [limit, setLimit] = useState(10);
  const [filtros, setFiltros] = useState({});
  const [editingUser, setEditingUser] = useState(null);



  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
    setOffset(0); // Reset the offset to 0 when limit changes
  };

  const cambiarPagina = (operador) => {
    if (operador == "+") {
      setOffset(offset + limit);
    } else {
      setOffset(offset - limit);
    }
  };

   useEffect(() => {
    if (!logged.estaLogueado) navigate("/login");
    const cargarDatos = async () => {
      const id = logged.user.id;
      const token = obtenerToken();
      let esTokenValid = await tokenUser(token);
      console.log("TOKEN:  "+ token);
      if (esTokenValid.error) {
       logout()
      } else {
        const numeroRegistros = await getCountUsersFilters(
          token
        );

        setCantidad(numeroRegistros.total_filas);
        console.log("filas "+ numeroRegistros.total_filas)
        //cantidad/limit
        const usuarios = await getAllUsersLimitFilters(
          token,
          limit,
          offset
        );

        setUsers(usuarios); // Actualiza el estado con los datos recibidos
        console.log(usuarios);
      }
    };
    cargarDatos();
  }, [logged, offset, limit]);

  const handleEditClick = (user) => {
    setEditingUser({ ...user });
  };

  const handleSaveClick = async (userId) => {
    // Lógica para guardar los cambios del usuario
    const token = obtenerToken();
    const usuarioEditado = await updateUser(token, editingUser);
    console.log("Editando..........");
    console.log(usuarioEditado);
    //ACtualiza la lista de usuaros 
    const usuariosActualizados = users.map((user) =>
      user.id === userId ? usuarioEditado : user
    );

      // Ordenar los usuarios actualizados por ID numérico
      usuariosActualizados.sort((a, b) => parseInt(a.id) - parseInt(b.id));


    setUsers(usuariosActualizados);
    setEditingUser(null);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditingUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

 

    return(
        <div className={`contendor-tabla ${style.gestionusuarioscontendor}`}>
          <h2>GESTIÓN DE USUARIOS</h2>

          {users && users.length === 0 && (
            <p>TODAVÍA NO HAY USURIOS REGISTRADOS</p>
          )}

            {users && users.length > 0 && (
              <table className={`table table-striped table-hover ${"tabla"}`}>
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">NOMBRE</th>
                <th scope="col">EMPRESA</th>
                <th scope="col">CIF</th>
                <th scope="col">TELÉFONO</th>
                <th scope="col">EMAIL</th>
                <th scope="col">TIPO</th>
                <th scope="col">ESTADO</th>
                <th scope="col">CONTRASEÑA</th>
                <th scope="col">OPCIONES</th>
              </tr>
            </thead>
            <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <th scope="row">{u.id}</th>
                <td>
                  {editingUser && editingUser.id === u.id ? (
                    <input
                      type="text"
                      name="name"
                      value={editingUser.name}
                      onChange={handleInputChange}
                    />
                  ) : (
                    u.name
                  )}
                </td>
                <td>
                  {editingUser && editingUser.id === u.id ? (
                    <input
                      type="text"
                      name="company"
                      value={editingUser.company}
                      onChange={handleInputChange}
                    />
                  ) : (
                    u.company
                  )}
                </td>
                <td>
                  {editingUser && editingUser.id === u.id ? (
                    <input
                      type="text"
                      name="cif"
                      value={editingUser.cif}
                      onChange={handleInputChange}
                    />
                  ) : (
                    u.cif
                  )}
                </td>
                <td>
                  {editingUser && editingUser.id === u.id ? (
                    <input
                      type="text"
                      name="phone"
                      value={editingUser.phone}
                      onChange={handleInputChange}
                    />
                  ) : (
                    u.phone
                  )}
                </td>
                <td>
                  {editingUser && editingUser.id === u.id ? (
                    <input
                      type="text"
                      name="email"
                      value={editingUser.email}
                      onChange={handleInputChange}
                    />
                  ) : (
                    u.email
                  )}
                </td>
                <td>
                  {editingUser && editingUser.id === u.id ? (
                    <input
                      type="text"
                      name="type"
                      value={editingUser.type}
                      onChange={handleInputChange}
                    />
                  ) : (
                    u.type
                  )}
                </td>
                <td>
                  {editingUser && editingUser.id === u.id ? (
                    <select
                      name="user_status"
                      value={editingUser.user_status}
                      onChange={handleInputChange}
                    >
                      <option value="true">Activo</option>
                      <option value="false">Inactivo</option>
                    </select>
                  ) : (
                    u.user_status ? 'Activo' : 'Inactivo'
                  )}
                </td>
                <td>*******</td>
                <td className={style.iconos}>
                  {editingUser && editingUser.id === u.id ? (
                    <FaSave
                      className={style.icono}
                      onClick={() => handleSaveClick(u.id)}
                    />
                  ) : (
                    <FaEdit
                      className={style.icono}
                      onClick={() => handleEditClick(u)}
                    />
                  )}
                  <FaTrash className={style.icono} />
                </td>
              </tr>
            ))}
          </tbody>
          </table>
          )}
        {users && users.length > 0 && (
        <div className="pagination">
          {limit > 0 && (
            <>
              <span className="itemlimit">Líneas por página</span>
              <select onChange={handleLimitChange} value={limit}>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </>
          )}
          <p>
            {offset / limit + 1} de {Math.ceil(cantidad / limit)} páginas
          </p>
          {offset > 0 && (
            <button
              onClick={() => cambiarPagina("-")}
              className="btnsinestilo"
            >
              <GrFormPrevious />
            </button>
          )}
          {offset + limit < cantidad && (
            <button
              onClick={() => cambiarPagina("+")}
              className="btnsinestilo"
            >
              <GrFormNext />
            </button>
          )}
        </div>
      )}


        </div>
       

    )
}


export default GestionUsuarios;