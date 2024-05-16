

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
tripulantes();

let pasajeros = prompt("Ingrese la cantidad de pasajeros");


function tripulantes(){
    let tripulantes = prompt("Ingrese la cantidad de tripulantes");
    checktrip(tripulantes);
}

function checktrip(tripulantes){
    if(tripulantes <= 0){
        alert("Error al ingresar los tripulantes");
        tripulantes();
    } //no puede ser cero y debe ser un numero
}