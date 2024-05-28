import React, { useState, useEffect } from "react";
import style from "../styles/FilterComponent.module.css"; // Asegúrate de tener este archivo de estilos
import { getAllDevelopment } from "../lib/data";
import { obtenerToken } from '../lib/serviceToken.js'
import { useNavigate } from "react-router-dom";
const FilterComponent = ({ cambiarFiltros }) => {
  const [filters, setFilters] = useState({
    numerofactura: null,
    company: "",
    development: "",
  });
  const [developments, setDevelopments] = useState([]);
  
  useEffect(() => {
    const fetchDevelopments = async () => {
      const token = obtenerToken();
      const devs = await getAllDevelopment(token);
     
      setDevelopments(devs);

    };
    fetchDevelopments();
  }, []);

  const handleChange = (e) => {
    let auxFilters = { ...filters };
    auxFilters[e.target.name] = e.target.value;
    setFilters(auxFilters);
  };

  const modificarFiltros = () => {
    cambiarFiltros(filters);

    console.log(filters);
  };

  return (
    <div className={style.filterContainer}>
      <input
        type="text"
        placeholder="Buscar por Nº de Factura"
        value={filters.numerofactura}
        name="numerofactura"
        onChange={handleChange}
        className={style.input}
      />

      <select
        value={filters.development}
        name="development"
        onChange={handleChange}
        className={style.input}
      >
        <option value="">Seleccione un desarrollo</option>
        {developments.map((dev) => (
          <option key={dev.development} value={dev.development}>
            {dev.development}
          </option>
        ))}
      </select>

      <select
        value={filters.company}
        name="company"
        onChange={handleChange}
        className={style.select}
      >
        <option value="">Nombre Sociedad</option>
        <option value="prime">Prime Invest</option>
        <option value="project">Proyect</option>
      </select>

      <button onClick={() => modificarFiltros()}>buscar</button>
    </div>
  );
};

export default FilterComponent;
