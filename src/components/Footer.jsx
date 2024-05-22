import React from 'react';
import style from '../styles/Footer.module.css'; // Usar ruta relativa

export default function Footer() {
  return (
    <footer className={style.footer}>
      <div>
        <a href='https://www.primeinvest.es/es/legal'>Información legal</a>
        <a href='https://www.primeinvest.es/es/policy'>Política de privacidad</a>
        <a href='https://www.primeinvest.es/es/cookies'>Política de cookies</a>
      </div>
      <img
        src="/images/logo_prime_blanco.png" // Asegúrate de que esta ruta sea correcta
        width={1897 / 9} // Define el ancho de la imagen como 1/9 del ancho original (1897px)
        height={1168 / 9} // Define el alto de la imagen como 1/9 del alto original (1168px)
        alt="logotipo prime invest" // Define el texto alternativo para accesibilidad
      />
    </footer>
  );
}
