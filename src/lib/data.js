export const getPrueba = async ()=>{
    const url=`${import.meta.env.VITE_API}/users`
    console.log(url)
    const response = await fetch(url, {
        method: 'GET',
       
    });
    console.log(response)
}

export const loggear = async (email, password) => {
    const datos = {
        email,
        password,
    };

   // let prueba=JSON.stringify(datos)
    
    //console.log(prueba)
   
    const url=`${import.meta.env.VITE_API}/login`
    //console.log(url)
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(datos)
    });

    if(response.status !=200) return {error:true,message:'Usuario o contraseña incorrecta'}
    const data = await response.json();
    return data.data
}

export const tokenUser = async (token) => {
    const datos = {
        token,
    };
    const url=`${import.meta.env.VITE_API}/validtoken`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });
    if(response.status==403) return {error:true,message:'Token no valido'}
    const data = await response.json();
    // console.log("----------------------------------------------")
    // console.log(data.data)
    // console.log("----------------------------------------------")

    return data.data
}

// export const historyOrders = async (token, id) => {
//     const datos = {
//         id:id,
//     };
//     const url=`${import.meta.env.VITE_API}/orders`
//     const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//         },
//         body:JSON.stringify(datos)
//     });
//     if(response.status==409) return {error:true,message:'Token no valido'}
//     const data = await response.json();
//     return data.data
// }


export const getAllInvoicesNormal = async (token, id,limit, offset) => {
    const datos = {
        id,
        limit,
        offset
    };
    const url=`${import.meta.env.VITE_API}/invoicesfromuser`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body:JSON.stringify(datos)
    });
    if(response.status==409) return {error:true,message:'Token no valido'}
    const data = await response.json();
    return data.data
}


export const getAllInvoicesAdmin = async (token,limit, offset, filtros) => {
    const datos = {
        limit,
        offset,
        numerofactura: filtros.numerofactura,
        company: filtros.company
    };


   
    const url=`${import.meta.env.VITE_API}/allinvoicesadminlimitfilters`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body:JSON.stringify(datos)
    });
    if(response.status==409) return {error:true,message:'Token no valido'}
    const data = await response.json();
    return data.data
}



export const getCountInvoicesNormal = async (token,id) => {
    const datos = {
        id,
    };
    const url=`${import.meta.env.VITE_API}/countinvoices`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body:JSON.stringify(datos)
        
    });
    if(response.status==409) return {error:true,message:'Token no valido'}
    const data = await response.json();
    return data.data
}


export const getCountInvoicesAdminFilters = async (token,filtros) => {
    const datos = {
        numerofactura: filtros.numerofactura,
        company: filtros.company
    };
    const url=`${import.meta.env.VITE_API}/countinvoicesadminfilters`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body:JSON.stringify(datos)

    });
    if(response.status==409) return {error:true,message:'Token no valido'}
    const data = await response.json();
    return data.data
}