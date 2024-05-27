import React, { useState } from "react";
import style from '../styles/FilterComponent.module.css'; // Asegúrate de tener este archivo de estilos

const FilterComponent = ({cambiarFiltros}) => {
  const [filters, setFilters] = useState({
    numerofactura: null,
    company: "prime",
  });

  const handleChange = (e) => {
    let auxFilters= {...filters}
    auxFilters[e.target.name] =e.target.value;
    setFilters(auxFilters)

   
    
  };

  const modificarFiltros = () =>{
    cambiarFiltros(filters)
  }

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
      
      <select value={filters.company}
        name="company"
        onChange={handleChange}
        className={style.select}>
        <option value="">Nombre Sociedad</option>
        <option value="prime">Prime Invest</option>
        <option  value="project">Proyect</option>
         
      </select>

      <button onClick={()=>modificarFiltros()}>buscar</button>
    </div>
  );
};

export default FilterComponent;
