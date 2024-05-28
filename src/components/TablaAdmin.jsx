import { useLogin } from "../hooks/useLogin";
import { useState, useEffect } from "react";
// import styles from "../styles/Login.module.css";
import { useNavigate } from "react-router-dom";
import { obtenerToken } from "../lib/serviceToken";
import {
  getAllInvoicesAdmin,
  getCountInvoicesAdminFilters,
  tokenUser,
} from "../lib/data";
import style from "../styles/TablaAdmin.module.css";
import { FaFileDownload, FaEdit, FaTrash } from "react-icons/fa";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import FilterComponent from "./FilterComponent";

const TablaAdmin = () => {
  const [invoices, setInvoices] = useState(null);
  const { logged,logout } = useLogin();
  const navigate = useNavigate();
  const [offset, setOffset] = useState(0); //offset
  const [cantidad, setCantidad] = useState(null);
  const [limit, setLimit] = useState(10);
  const [filtros, setFiltros] = useState({});

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

  const cambiarFiltros = (f) => {
    setFiltros(f);
  };
  console.log(filtros);

  useEffect(() => {
    if (!logged.estaLogueado) navigate("/login");
    const cargarDatos = async () => {
      const id = logged.user.id;
      const token = obtenerToken();
      let esTokenValid = await tokenUser(token);
      //console.log(esTokenValid);
      if (esTokenValid.error) {
       logout()
      } else {
        const numeroRegistros = await getCountInvoicesAdminFilters(
          token,
          filtros
        );

        setCantidad(numeroRegistros.total_filas);
        //cantidad/limit
        const facturas = await getAllInvoicesAdmin(
          token,
          limit,
          offset,
          filtros
        );

        setInvoices(facturas); // Actualiza el estado con los datos recibidos
        console.log(facturas);
      }
    };
    cargarDatos();
  }, [logged, offset, limit, filtros]);

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  return (
    <div className={style.tablacontenedor}>
      <button>SUBIR FACTURA</button>

      <FilterComponent cambiarFiltros={(f) => cambiarFiltros(f)}>
        {" "}
      </FilterComponent>

      {invoices && invoices.length === 0 && (
        <p>TODAVÍA NO HAY FACTURAS REGISTRADAS</p>
      )}

      {invoices && invoices.length > 0 && (
        <table className={style.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nº FACTURA</th>
              <th>PROVEEDOR</th>
              <th>SOCIEDAD</th>
              <th>FECHA FACTURA</th>
              <th>FECHA REGISTRO</th>
              <th>CONCEPTO</th>
              <th>IMPORTE</th>
              <th>ESTADO</th>
              <th>REPORTAR ERROR</th>
              <th>OPCIONES</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.invoice_number}</td>
                <td>{order.development}</td>
                <td>{order.company}</td>
                <td>{formatDate(order.invoice_date)}</td>
                <td>{formatDate(order.registration_date)}</td>
                <td>{order.concept}</td>
                <td>{order.amount} €</td>
                <td>
                  <span
                    className={`${style.spanstatus} ${
                      style[order.status.toLowerCase()]
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td>
                  <button className={style.btnError}>Reportar</button>
                </td>
                <td className={style.iconos}>
                  <FaFileDownload className={style.icono} />
                  <FaEdit className={style.icono} />
                  <FaTrash className={style.icono} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {invoices && invoices.length > 0 && (
        <div className={style.pagination}>
          {limit > 0 && (
            <>
              <span className={style.itemlimit}>Líneas por página</span>
              <select onChange={handleLimitChange} value={limit}>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </>
          )}
          <p>
            {offset / limit + 1} de {Math.ceil(cantidad / limit)} página
          </p>
          {offset > 0 && (
            <button
              onClick={() => cambiarPagina("-")}
              className={style.btnsinestilo}
            >
              <GrFormPrevious />
            </button>
          )}
          {offset + limit < cantidad && (
            <button
              onClick={() => cambiarPagina("+")}
              className={style.btnsinestilo}
            >
              <GrFormNext />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default TablaAdmin;
