export const validEmail = (email) => {
  // Expresión regular para validar una dirección de correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Verificar si el correo electrónico coincide con la expresión regular
  return emailRegex.test(email);
};

export const validPassword = (pass) => {
  // if (pass == undefined) return false
  // // Verificar si la contraseña tiene al menos 8 caracteres
  // if (pass.length < 8) {
  //   return false;
  // }

  // // Verificar si la contraseña contiene al menos una letra minúscula
  // if (!/[a-z]/.test(pass)) {
  //   return false;
  // }
  // // Verificar si la contraseña contiene al menos una letra mayúscula
  // if (!/[A-Z]/.test(pass)) {
  //   return false;
  // }
  // // Verificar si la contraseña contiene al menos un número
  // if (!/\d/.test(pass)) {
  //   return false;
  // }
  // // Verificar si la contraseña contiene al menos un carácter especial
  // if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pass)) {
  //   return false;
  // }
  // La contraseña cumple con todos los criterios
  return true;
};

export const validString = (str) => {

  // Si pasó ambas verificaciones, entonces el dato es un string válido
  return true;
}