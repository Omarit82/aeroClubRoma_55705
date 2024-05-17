/*****PAGINA DE PESO Y BALANCEO DE LA AERONAVE C206 PARA 6 PERSONAS****/
/* Se solicita el ingreso de cantidad de pasajeros y tripulacion(maximo 2 personas), que en total no pueden superar las 6 personas
Luego se solicita el peso con valijas de cada persona y finalmente la distancia a recorrer
El script calcula a partir de los datos entregados la cantidad de combustible necesaria a cargar para realizar la navegacion 
y si es posible cargar la aeronave con ese peso sin superar el peso maximo de despegue-

AERONAVE CESSNA 206
PESO MAXIMO DE DESPEGUE: 3612 lbs
PESO VACIO: 1989 lbs
COMBUSTIBLE MAXIMO: 92 galones

13.6 gph a 142 kts
*/
let tripulacion = tripulantes();
console.log(tripulacion);
let pas = pasajeros()
console.log(pas);



function tripulantes(){
    let trips = prompt("Ingrese la cantidad de tripulantes");
    if(isNaN(trips)){
        alert("Error al ingresar el numero de tripulantes");
        tripulantes();
        
    } else if(trips <= 0){
        alert("Se debe ingresar al menos un tripulante");
        tripulantes();
    }else if(trips > 2){
        alert("No se pueden ingresar mas de dos tripulantes");
        tripulantes();
    }else{
        return parseInt(trips);
    }
}
function reingresoTrip(){

}

function pasajeros(){
    let pax = prompt("Ingrese la cantidad de pasajeros");
    return checkPax(pax);
}

function checkPax(pax){ // pax debe ser un numero mayor o igual a cero y menor o igual a 4
    if(isNaN(pax)){
        alert("Error al ingresar el numero de pasajeros");
        pasajeros();
    }else if(pax < 0){
        alert("No pueden ingresarse valores negativos");
        pasajeros();
    }else if((tripulacion === 2 && pax >4)||(tripulacion === 1 && pax>5)){
        alert("Se deben ingresar menos pasajeros")
        pasajeros();
    }else{
        return parseInt(pax);
    }
}