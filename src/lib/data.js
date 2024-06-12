export const getPrueba = async () => {
  const url = `${import.meta.env.VITE_API}/users`;
  console.log(url);
  const response = await fetch(url, {
    method: "GET",
  });
  console.log(response);
};

export const loggear = async (email, password) => {
  const datos = {
    email,
    password,
  };

  // let prueba=JSON.stringify(datos)

  //console.log(prueba)

  const url = `${import.meta.env.VITE_API}/login`;
  //console.log(url)
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  });

  if (response.status == 403)
      return { error: true, message: "Usuario inactivo, un administrador debe activarlo"};


  if (response.status != 200)
  return { error: true, message: "Usuario o contraseña incorrecta" };
  const data = await response.json();
  return data.data;
};

export const tokenUser = async (token) => {
  if (token == null) return { error: true, message: "Token no valido" };
  else {
    const datos = {
      token,
    };

    const url = `${import.meta.env.VITE_API}/validtoken`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    });
    if (response.status == 403)
      return { error: true, message: "Token no valido" };
    const data = await response.json();
    // console.log("----------------------------------------------")
    // console.log(data.data)
    // console.log("----------------------------------------------")

    return data.data;
  }
};

export const getAllInvoicesNormal = async (token, id, limit, offset, filtros) => {
  const datos = {
    id,
    limit,
    offset,
    numerofactura: filtros.numerofactura,
    company: filtros.company,
    development: filtros.development,
  };
  const url = `${import.meta.env.VITE_API}/invoicesfromuser`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(datos),
  });
  if (response.status == 409)
    return { error: true, message: "Token no valido" };
  const data = await response.json();
  return data.data;
};

export const getAllInvoicesAdmin = async (token, limit, offset, filtros) => {
  const datos = {
    limit,
    offset,
    numerofactura: filtros.numerofactura,
    company: filtros.company,
    development: filtros.development,
  };

  const url = `${import.meta.env.VITE_API}/allinvoicesadminlimitfilters`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(datos),
  });
  if (response.status == 409)
    return { error: true, message: "Token no valido" };
  const data = await response.json();
  return data.data;
};

export const getCountInvoicesNormal = async (token, id, filtros ) => {
  const datos = {
    id,
    numerofactura: filtros.numerofactura,
    company: filtros.company,
    development: filtros.development,
  };
  const url = `${import.meta.env.VITE_API}/countinvoices`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(datos),
  });
  if (response.status == 409)
    return { error: true, message: "Token no valido" };
  const data = await response.json();
  return data.data;
};

export const getCountInvoicesAdminFilters = async (token, filtros) => {
  const datos = {
    numerofactura: filtros.numerofactura,
    company: filtros.company,
    development: filtros.development,
  };
  const url = `${import.meta.env.VITE_API}/countinvoicesadminfilters`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(datos),
  });
  if (response.status == 409)
    return { error: true, message: "Token no valido" };
  const data = await response.json();
  return data.data;
};

//Función que sube una factura 
export const createInvoice = async (token, datos) => {
  const factura = {
      user_id: datos.user_id,
      invoice_number: datos.invoice_number,
      development: datos.development,
      company: datos.company,
      invoice_date: datos.invoice_date,
      status: datos.status,
      concept: datos.concept,
      amount: datos.amount,
  };
  const url = `${import.meta.env.VITE_API}/createinvoice`;
  const response = await fetch(url, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(factura),
  });
  if (response.status === 409)
      return { error: true, message: "Token no válido" };

  const data = await response.json();
  console.log(data);
  if (data.error) return data;
  return data.data;
};

//Función que sube un archivo pdf 
export const uploadFile = async (token, file, invoiceNumber) => {
  const url = `${import.meta.env.VITE_API}/upload`;
  const formData = new FormData();
  formData.append('file', file);
  formData.append('invoice_number', invoiceNumber); // Agregar invoice_number al FormData

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'File upload failed');
  } else {
    console.log(response.json());
  }

  const data = await response.json();
  return data;
};


//Función que descarga un archivo 
export const downloadFile = async (token, invoiceNumber) => {
  console.log("en lib/data "+invoiceNumber)
  const url = `${import.meta.env.VITE_API}/downloadfile`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nombreArchivo: invoiceNumber })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error al descargar el archivo');
  }

  const data = await response.json();
  return data;
};

export const getAllDevelopment = async (token) => {
  const url = `${import.meta.env.VITE_API}/alldevelopment`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 409)
    return { error: true, message: "Token no válido" };
  const data = await response.json();
  return data.data;
};

export const crearUsuarioAdmin = async (token, datos) => {
  const usuario = {
    name: datos.nombre,
    company: datos.empresa,
    CIF: datos.cif,
    phone: datos.telefono,
    email: datos.email,
    password: datos.password,
    user_type: datos.type == null ? "normal" : datos.type,
    user_status: datos.status == null ? false : datos.status,
  };
  const url = `${import.meta.env.VITE_API}/createuser`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(usuario),
  });
  if (response.status == 409)
    return { error: true, message: "Token no valido" };

  const data = await response.json();
  console.log(data);
  if (data.error) return data;
  return data.data;
};

//Función que me traiga todos los usuarios registrados
export const getCountUsersFilters = async (token) => {
  // const datos = {
  //   limit,
  //   offset,
  // };

  const url = `${import.meta.env.VITE_API}/countusers`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    // body: JSON.stringify(datos),
  });
  if (response.status == 409)
    return { error: true, message: "Token no valido" };
  const data = await response.json();
  return data.data;
};

//Función que me traiga todos los usuarios registrados
export const getAllUsersLimitFilters = async (token, limit, offset) => {
  const datos = {
    limit,
    offset,
  };

  const url = `${import.meta.env.VITE_API}/userslimitfilters`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(datos),
  });
  if (response.status == 409)
    return { error: true, message: "Token no valido" };
  const data = await response.json();
  return data.data;
};

//Función que actualiza un usuario
export const updateUser = async (token, user) => {
  const datos = {
    id: user.id,
    name: user.name,
    company: user.company,
    cif: user.cif,
    phone: user.phone,
    email: user.email,
    password: user.password,
    type: user.type,
    user_status: user.user_status,
  };

  const url = `${import.meta.env.VITE_API}/updateuser`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(datos),
  });
  if (response.status == 409)
    return { error: true, message: "Token no valido" };
  const data = await response.json();
  return data.data;
};


export const updateInvoice = async (token, datos) => {
  const auxDatos = {
      id:datos.id,
      user_id: datos.user_id,
      invoice_number: datos.invoice_number,
      development: datos.development,
      company: datos.company,
      invoice_date: datos.invoice_date,
      status: datos.status,
      concept: datos.concept,
      amount: datos.amount,
  };

  const url = `${import.meta.env.VITE_API}/updateinvoice`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(auxDatos),
  });
  if (response.status == 409)
    return { error: true, message: "Token no valido" };
  const data = await response.json();
  return data.data;
};

