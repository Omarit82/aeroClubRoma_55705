async function consultaMeteo(origen, destino){
    const meteoOrigen = await fetch(`https://avwx.rest/api/metar/${origen.icao}`,{
        method:'get',
        headers:{
            'Authorization': 'BEARER ' + 'I1fMwwT9RM_EWbiA_jEM2yq3MG9wXaL8PCfGgCDz5J4',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify()
    });
    if(meteoOrigen.ok){
        let info = await meteoOrigen.json();
        console.log(info);
    }
    
}