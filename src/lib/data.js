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