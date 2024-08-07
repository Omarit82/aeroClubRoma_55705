/**FUNCION ASINCRONA QUE CONSULTA LA METEOROLOGIA DEL AEROPUERTO SEGUN SU CODIGO ICAO**/
async function consultaMeteo(icao){
    const meteo = await fetch(`https://avwx.rest/api/metar/${icao}`,{
        method:'get',
        headers:{
            'Authorization': 'BEARER ' + 'I1fMwwT9RM_EWbiA_jEM2yq3MG9wXaL8PCfGgCDz5J4',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify()
    });
    switch (meteo.status ) {
        case 200:
            let info = await meteo.json();
            impresion(info);
            break;
        case 204:
            alerta('info','No existe informacion meteorologia de: ',`<strong>${icao} </strong>`,2500);
            wait.removeAttribute('style');
            wait.src="";
            break;
        default:
            alerta('error',`${meteo.status}`,'',2500);
            wait.removeAttribute('style');
            wait.src="";
        break;
    }    
}
/***MUESTRA EN EL DOM LA METEOROLOGIA OBTENIDA**/
function impresion(info){
    const ul = document.createElement('ul');
    const nombre = document.createElement('li');
    nombre.classList.add('list-group-item');
    nombre.innerHTML='Informacion Meteorológica: '+info.raw;
    ul.classList.add('list-group','mb-2','mt-2');
    const tiempo = document.createElement('li');
    tiempo.classList.add('list-group-item');
    tiempo.innerHTML='Horario: '+info.time.dt;
    const altimetro = document.createElement('li');
    altimetro.classList.add('list-group-item');
    altimetro.innerHTML='Altimetro: '+info.altimeter.repr;
    const temperatura = document.createElement('li');
    temperatura.classList.add('list-group-item');
    temperatura.innerHTML = 'Temperatura: '+info.temperature.repr+'/Punto de rocio: '+info.dewpoint.repr;
    const visibilidad = document.createElement('li');
    visibilidad.classList.add('list-group-item');
    visibilidad.innerHTML = 'Visibilidad: '+info.visibility.repr;
    const viento = document.createElement('li');
    viento.classList.add('list-group-item');
    viento.innerHTML = 'Viento: '+info.wind_direction.repr+'@'+info.wind_speed.repr+' kts';
    ul.appendChild(nombre);
    ul.appendChild(tiempo);
    ul.appendChild(altimetro);
    ul.appendChild(temperatura);
    ul.appendChild(visibilidad);
    ul.appendChild(viento);
    precomputada.appendChild(ul);
    wait.removeAttribute('style');
    wait.src="";
    //MUEVO LA VISTA HASTA LA UL DE LA METEOROLOGIA
    ul.scrollIntoView({ behavior: "smooth" });
}