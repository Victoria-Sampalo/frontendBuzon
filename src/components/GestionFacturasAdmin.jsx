import { useLogin } from "../hooks/useLogin";
import { useState, useEffect } from "react";
// import styles from "../styles/Login.module.css";
import { useNavigate } from "react-router-dom";
import { obtenerToken } from "../lib/serviceToken";
import {
  getAllInvoicesAdmin,
  getCountInvoicesAdminFilters,
  tokenUser, 
  downloadFile,
  updateInvoice
} from "../lib/data";
import style from "../styles/GestionFacturasAdmin.module.css";
import { FaFileDownload, FaEdit, FaTrash,FaSave } from "react-icons/fa";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { MdCancel } from "react-icons/md";
import FilterComponent from "./FilterComponent";
import CrearFactura from './CrearFactura';

const getMonthName = (dateString) => {
  const date = new Date(dateString);
  const monthNames = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
  return monthNames[date.getMonth()];
};


const GestionFacturasAdmin = () => {
  const [invoices, setInvoices] = useState(null);
  const { logged,logout } = useLogin();
  const navigate = useNavigate();
  const [offset, setOffset] = useState(0); //offset
  const [cantidad, setCantidad] = useState(null);
  const [limit, setLimit] = useState(10);
  const [filtros, setFiltros] = useState({});
  const [mostrarCrearFactura, setMostrarCrearFactura] = useState(false); 

  const [editingInvoiceId, setEditingInvoiceId] = useState(null);
  const [editedStatus, setEditedStatus] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

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

  const handleOpenCrearFactura = () => {
    console.log("click ");
    setMostrarCrearFactura(true); 
  };

  const handleDownload = async (invoiceNumber, invoiceDate) => {
    const token = obtenerToken();
    const nombreMes = getMonthName(invoiceDate);
    const nombreArchivo = `${invoiceNumber}-${nombreMes}.pdf`;
    console.log("Nombre archivo "+ nombreArchivo );

    try {
      const response = await downloadFile(token, nombreArchivo);
      if (response.error) {
        setErrorMessage(`Factura con id: '${invoiceNumber}' no ha sido encontrada en Dropbox. Consulte manualmente`);
        console.error("Error al descargar el archivo:", response.message);
      } else {
        setErrorMessage(""); // Limpiar el mensaje de error en caso de éxito
        window.open(response.url, "_blank");
      }
    } catch (error) {
      setErrorMessage(`Factura con id: '${invoiceNumber}' no ha sido encontrada`);
      console.error("Error al descargar el archivo:", error);
    }
};
  const handleEditClick = (order) => {
    setEditingInvoiceId(order.id);
    setEditedStatus(order.status);
  };

  
  const handleSaveClick = async (id) => {
    const token = obtenerToken();
    const facturaEditada = invoices.find((invoice) => invoice.id === id);
    facturaEditada.status = editedStatus;

    try {
      const response = await updateInvoice(token, facturaEditada);
      if (response.error) {
        console.error("Error al actualizar la factura:", response.message);
      } else {
        setEditingInvoiceId(null);
        // Recargar las facturas después de guardar
        const facturas = await getAllInvoicesAdmin(token, limit, offset, filtros);
        setInvoices(facturas);
      }
    } catch (error) {
      console.error("Error al actualizar la factura:", error);
    }
  };

  const handleCancelClick = () => {
    setEditingInvoiceId(null);
  };

  return (
    <div className={style.tablacontenedor}>
      <button onClick={handleOpenCrearFactura}>SUBIR FACTURA</button>

      {mostrarCrearFactura && <CrearFactura />}


      <FilterComponent cambiarFiltros={(f) => cambiarFiltros(f)}>
        {" "}
      </FilterComponent>

      {errorMessage && <p className={style.errorMessage}>{errorMessage}</p>}

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
                  {editingInvoiceId === order.id ? (
                    <select
                      value={editedStatus}
                      onChange={(e) => setEditedStatus(e.target.value)}
                    >
                      <option value="sent">Enviada</option>
                      <option value="pending">Pendiente</option>
                      <option value="paid">Pagada</option>
                      <option value="error">Error</option>
                      <option value="rejected">Rechazada</option>
                    </select>
                  ) : (
                    <span
                      className={`${style.spanstatus} ${style[order.status.toLowerCase()]}`}
                    >
                      {order.status}
                    </span>
                  )}
                </td>
                <td>
                  <button className={style.btnError}>Reportar</button>
                </td>
                <td className={style.iconos}>
                  {editingInvoiceId === order.id ? (
                    <>
                      <FaSave className={style.icono} onClick={() => handleSaveClick(order.id)} />
                      <MdCancel className={style.icono} onClick={handleCancelClick} />
                    </>
                  ) : (
                    <>
                       <FaFileDownload className={style.icono} onClick={() => handleDownload(order.invoice_number, order.invoice_date)} />
                      <FaEdit className={style.icono} onClick={() => handleEditClick(order)} />
                      <FaTrash className={style.icono} />
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {invoices && invoices.length > 0 && (
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
            {offset / limit + 1} de {Math.ceil(cantidad / limit)} página
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
  );
};

export default GestionFacturasAdmin;
