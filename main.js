/*****PAGINA DE PESO Y BALANCEO DE LA AERONAVE C172 PARA 4 PERSONAS****/
/* Se solicita el ingreso de cantidad de pasajeros y tripulacion(maximo 2 personas), que en total no pueden superar las 4 personas
Luego se solicita el peso del equipaje
El script calcula a partir de los datos entregados la cantidad de combustible necesaria a cargar para realizar la navegacion 
y si es posible cargar la aeronave con ese peso sin superar el peso maximo de despegue-

AERONAVE CESSNA 172
PESO MAXIMO DE DESPEGUE: 3612 lbs (MTOW)
PESO VACIO: 1989 lbs (EW)
COMBUSTIBLE MAXIMO: 43 galones (MAXFUEL)

13.6 galones por hora a 142 kts (knots)
*/

/*CONSTANTES */
const GPH = 7.2;
const MTOW = 2300;
const EW = 1419;
const MAXFUEL = 43;
/*---------------------------*/
let tripulacion = tripulantes();
let pas = pasajeros()

let pesoTripulacion = peso(tripulacion);
let pesoPasajeros = peso(pas);
let equipaje = pesoEquipaje();

let pesoTotKgr = pesoTripulacion + pesoPasajeros + equipaje;
let pesoTotLbs = pesoTotKgr*2.2;

checkAeronave(pesoTotLbs);


/*******************FUNCIONES***************************/
function tripulantes(){
    let trips = prompt("Ingrese la cantidad de tripulantes");
    let res = checkTripulacion(trips);
    if(res){
        return parseInt(trips);
    }else{
        trips = tripulantes();
        return parseInt(trips);
    }
}

function pasajeros(){
    let pax = prompt("Ingrese la cantidad de pasajeros");
    let res = checkPax(pax);
    if(res){
        return parseInt(pax);
    }else{
        pax = pasajeros();
        return parseInt(pax);
    };
}

function pesoEquipaje(){
    let total = prompt("Ingrese el peso del equipaje total en kgr.");
    if(isNaN(total)|| total<0){
        alert("Valor ingresado incorrecto");
    }else{
        return parseFloat(total);
    }
}

function checkTripulacion(trips){// Chequea el numero de tripulantes
    if(isNaN(trips)){
        alert("Error al ingresar el numero de tripulantes");
        return false;
    } else if(trips <= 0){
        alert("Se debe ingresar al menos un tripulante");
        return false;
    }else if(trips > 2){
        alert("No se pueden ingresar mas de dos tripulantes");
        return false;
    }else{
        return true;
    }
}

function checkPax(pax){ // pax debe ser un numero mayor o igual a cero y menor o igual a 4
    if(isNaN(pax)){
        alert("Error al ingresar el numero de pasajeros");
        return false;
    }else if(pax < 0){
        alert("No pueden ingresarse valores negativos");
        return false;
    }else if((tripulacion === 2 && pax >2)||(tripulacion === 1 && pax>3)){
        alert("Se deben ingresar menos pasajeros")
        return false;
    }else{
        return true;
    }
}

function peso(personas){ // Retorna el peso total de las personas ingresadas
    let total=0;
    for(let i=0; i<personas; i++){
        let parcial = prompt("Ingrese el peso de la persona: "+(i+1));
        let res = checkPeso(parcial);
        if(res){
            total += parseFloat(parcial);
        }else{
            i--;
            alert("Debe recargar los datos");
        }
    }
    return total;
}

function checkPeso(peso) { //Chequea que el peso ingresado sea valido
    if((isNaN(peso)) || (peso<=0)){
        alert('No se ingreso un peso correcto');
        return false;
    }else{
        return true;
    }
}

function checkAeronave(total){ // Realiza el calculo de peso total y controla cuanto remane para combustible.
    if(EW+total >= MTOW){ // Si es igual significa que no se puede cargar combustible
        alert("Maximo peso de despegue superado");
    } else{
        let fuel = (MTOW-EW-total)*1.70/3.8 // Convierto peso de combustible a galones de combustible
        if(fuel > MAXFUEL){
            alert("Con: "+truncaDosDecimales(MAXFUEL)+" galones, puede volar: "+truncaDosDecimales(MAXFUEL/GPH)+" horas | Puede completar el tanque");
        }else{
            alert("Con: "+truncaDosDecimales(fuel)+" galones, puede volar: "+truncaDosDecimales(fuel/GPH)+ " horas");
        }
    }
}

function truncaDosDecimales(valor){
    let resultado = 100*valor;
    resultado = Math.floor(resultado)/100;
    return resultado;
}