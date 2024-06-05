export const formatDateTime = (isoDateTime) => {
    let date='';
    let day='';
    let month = ''; // Los meses en JavaScript son indexados desde 0, por lo que necesitas sumar 1
    let year = '';
    let hours = '';
    let minutes = '';

    try {
        date = new Date(isoDateTime);
        day = date.getDate();
        month = date.getMonth() + 1; // Los meses en JavaScript son indexados desde 0, por lo que necesitas sumar 1
        year = date.getFullYear();
        hours = date.getHours();
        minutes = date.getMinutes();
    } catch (error) {
        return error
    }

    // Formatear los componentes de la fecha con ceros a la izquierda si es necesario
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    // Formatear la fecha y hora en el formato "día-mes-año hora"
    
    return `${formattedDay}-${formattedMonth}-${year} ${formattedHours}:${formattedMinutes}`;

}