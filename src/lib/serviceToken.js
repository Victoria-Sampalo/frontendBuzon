export const guardarToken = (token) => {
    try {
        window.localStorage.setItem('token', token);
    } catch (error) {
        return false;
    }
    return true
}

export const obtenerToken = () => {
    return window.localStorage.getItem('token')
}

export const borrarToken=()=>{
    window.localStorage.clear()
}