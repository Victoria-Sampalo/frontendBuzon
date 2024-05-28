export const textErrors=(tipo)=>{
  switch(tipo) {
      case "nombre":
        return "El nombre no es correcto, no debe contener números ni carácteres especiales";
      case "email":
        return "El email no está bien escrito ej: email@gmail.com";
      case "password":
          return "8 carácteres, una minúscula, una mayúscula, un número y un carácter especial";
      case "direccion":
          return "La dirección no es correcta, no debe contener carácteres especiales ni tener mas de 200 carácteres";
      case "passwordR":
          return "La contraseña debe ser la misma"
      case "vacio":
          return "No puedes dejar el campo vacio";
      case "nombreDuplicado":
          return "El nombre de usuario ya existe, porfavor introduzca otro nombre";
      case "emailDuplicado":
          return "El email ya existe, porfavor inicie sesión";
      default:
        return null;
    }
}

