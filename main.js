/*****PAGINA DE PESO Y BALANCEO DE LA AERONAVE C172 PARA 4 PERSONAS****/
/* Se solicita el ingreso de cantidad de pasajeros y tripulacion(maximo 2 personas), que en total no pueden superar las 4 personas
Luego se solicita el peso del equipaje
El script calcula a partir de los datos entregados la cantidad de combustible necesaria a cargar para realizar la navegacion 
y si es posible cargar la aeronave con ese peso sin superar el peso maximo de despegue-

ESTA SERA LA AERONAVE DE REFERENCIA

AERONAVE CESSNA 172
PESO MAXIMO DE DESPEGUE: 3612 lbs (MTOW)
PESO VACIO: 1989 lbs (EW)
COMBUSTIBLE MAXIMO: 43 galones (MAXFUEL)

13.6 galones por hora a 142 kts (knots)
*/


// /*CONSTANTES */
// const GPH = 7.2;
// const MTOW = 2300;
// const EW = 1419;
// const MAXFUEL = 43;
// /*---------------------------*/
// menuInicial();
// /******CLASE AERONAVE PARA INSTANCIAR NUEVAS AERONAVES******/
// class Aeronave{
//     constructor(tripulacion,pax,gph,mtow,ew,maxfuel){
//         this.tripulacion = tripulacion,
//         this.pax = pax,
//         this.gph = gph,
//         this.mtow = mtow,
//         this.ew = ew,
//         this.maxfuel = maxfuel,
//     }
// }

// /*******************FUNCIONES***************************/
// function menuInicial(){
//     let respuesta = prompt("Desea utilizar la aeronave por defecto(1) o desea ingresar una nueva(2)?\n1.Aeronave por defecto\n2.Ingresar una nueva");
//     //Validacion del prompt
//     switch(parseInt(respuesta)){
//         case 1:
//             defecto();
//         break;
//         case 2:
//             ingresarNuevaAeronave();
//         break;
//         default:
//             alert('Valor ingresado incorrecto!');
//             menuInicial();
//         break;
//     }
// }
// function seleccion(){
//     let tripulacion = tripulantes();
//     let pas = pasajeros()

//     let pesoTripulacion = peso(tripulacion);
//     let pesoPasajeros = peso(pas);
//     let equipaje = pesoEquipaje();

//     let pesoTotKgr = pesoTripulacion + pesoPasajeros + equipaje;
//     let pesoTotLbs = pesoTotKgr*2.2;

//     checkAeronave(pesoTotLbs);
// }
// function tripulantes(){
//     let trips = prompt("Ingrese la cantidad de tripulantes");
//     let res = checkTripulacion(trips);
//     if(res){
//         return parseInt(trips);
//     }else{
//         trips = tripulantes();
//         return parseInt(trips);
//     }
// }
// function ingresarNuevaAeronave(){
//     let tripulacion = promt('Ingrese cantidad de tripulantes');
//     let gph = promt('Ingrese el consumo de la aeronave en galones por hora');
//     let mtow = promt('Ingrese el peso maximo de despegue de la aeronave');
//     let ew = promt('Ingrese el peso vacio de la aeronave');
//     let maxfuel = promt('Ingrese la capacidad máxima de combustible');
//     if(checkinput(tripulacion)&&checkinput(gph)&&checkinput(mtow)&&checkinput(ew)&&checkinput(maxfuel)){

//     }
    
    
// }
// function pasajeros(){
//     let pax = prompt("Ingrese la cantidad de pasajeros");
//     let res = checkPax(pax);
//     if(res){
//         return parseInt(pax);
//     }else{
//         pax = pasajeros();
//         return parseInt(pax);
//     };
// }

// function pesoEquipaje(){
//     let total = prompt("Ingrese el peso del equipaje total en kgr.");
//     if(isNaN(total)|| total<0){
//         alert("Valor ingresado incorrecto");
//     }else{
//         return parseFloat(total);
//     }
// }

// function checkTripulacion(trips){// Chequea el numero de tripulantes
//     if((trips>0) && (trips<=2)){
//         return true;
//     } else if(trips <= 0){
//         alert("Se debe ingresar al menos un tripulante");
//         return false;
//     }else if(trips > 2){
//         alert("No se pueden ingresar mas de dos tripulantes");
//         return false;
//     }else{
//         alert("Error al ingresar el numero de tripulantes");
//         return false;
//     }
// }

// function checkPax(pax){ // pax debe ser un numero mayor o igual a cero y menor o igual a 4
//     if(((tripulacion === 1)&&(pax < 4)) || ((tripulacion === 2)&&(pax < 3))){
//         return true;
//     }else if(pax < 0){
//         alert("No pueden ingresarse valores negativos");
//         return false;
//     }else if((tripulacion === 2 && pax >2)||(tripulacion === 1 && pax>3)){
//         alert("Se deben ingresar menos pasajeros")
//         return false;
//     }else{
//         alert("Error al ingresar el numero de pasajeros");
//         return false;
//     }
// }

// function peso(personas){ // Retorna el peso total de las personas ingresadas
//     let total=0;
//     for(let i=0; i<personas; i++){
//         let parcial = prompt("Ingrese el peso de la persona: "+(i+1));
//         let res = checkPeso(parcial);
//         if(res){
//             total += parseFloat(parcial);
//         }else{
//             i--;
//             alert("Debe recargar los datos");
//         }
//     }
//     return total;
// }

// function checkPeso(peso) { //Chequea que el peso ingresado sea valido
//     if(peso > 0){
//         return true;
//     }else{
//         alert('No se ingreso un peso correcto');
//         return false;
//     }
// }

// function checkAeronave(total){ // Realiza el calculo de peso total y controla cuanto remane para combustible.
//     if(EW+total >= MTOW){ // Si es igual significa que no se puede cargar combustible
//         alert("Maximo peso de despegue superado");
//     } else{
//         let fuel = (MTOW-EW-total)*1.70/3.8 // Convierto peso de combustible a galones de combustible
//         if(fuel > MAXFUEL){
//             alert("Con: "+truncaDosDecimales(MAXFUEL)+" galones, puede volar: "+truncaDosDecimales(MAXFUEL/GPH)+" horas | Puede completar el tanque");
//         }else{
//             alert("Con: "+truncaDosDecimales(fuel)+" galones, puede volar: "+truncaDosDecimales(fuel/GPH)+ " horas");
//         }
//     }
// }

// function truncaDosDecimales(valor){
//     let resultado = 100*valor;
//     resultado = Math.floor(resultado)/100;
//     return resultado;
// }
//******CLASE AERONAVE PARA INSTANCIAR NUEVAS AERONAVES******/
class Aeronave{
    constructor(nombre,tripulacion,pax,gph,mtow,ew,maxfuel){
        this.nombre = nombre,
        this.tripulacion = tripulacion,
        this.pax = pax,
        this.gph = gph,
        this.mtow = mtow,
        this.ew = ew,
        this.maxfuel = maxfuel
    }
}

const aeronaves = [];
const tabla = document.getElementById('tabla');
const C172 = new Aeronave('Cessna 172',2,2,7.2,2300,1419,43); //AERONAVE POR DEFECTO
aeronaves.push(C172);

mostrarAeronaves();
menuInicial(); 



function mostrarAeronaves(){
    tabla.innerHTML=""; //limpio la tabla
    let contador=1;
    for(const avion of aeronaves) {
        let index = document.createElement('th');
        index.setAttribute('scope','col');
        index.innerHTML=contador;
        let tr = document.createElement('tr');
        tr.appendChild(index);
        for(let i=0;i<Object.keys(avion).length;i++){
            let th = document.createElement('th');
            th.setAttribute('scope','col');
            th.innerHTML = Object.values(avion)[i];
            tr.appendChild(th);
        }
        tabla.appendChild(tr);
        contador++;
    }
}

function menuInicial(){
    setTimeout(() => {
        let respuesta = prompt("Seleccione una aeronave (1) o desea ingresar una nueva (2)?\n1. Seleccione una aeronave\n2. Ingresar una nueva aeronave");
        //Validacion del prompt
        switch(parseInt(respuesta)){
            case 1:
                seleccion();
            break;
            case 2:
                ingresarNuevaAeronave();
                mostrarAeronaves();
                menuInicial();
            break;
            default:
                alert('Valor ingresado incorrecto!');
                menuInicial();
            break;
        }
    }, 1500);
}

function ingresarNuevaAeronave(){
    let modelo = prompt('Ingrese el modelo de la aeronave');
    let tripulacion = prompt('Ingrese cantidad de Tripulantes');
    let pax = prompt('Ingrese cantidad de pasajeros');
    let gph = prompt('Ingrese consumo en GPH');
    let mtow = prompt('Ingrese peso maximo de despegue');
    let ew = prompt('Ingrese peso vacio');
    let maxFuel = prompt('Ingrese combustible maximo');
    if(check(tripulacion)&&check(pax)&&check(gph)&&check(mtow)&&check(ew)&&check(maxFuel)&&(parseInt(tripulacion)>0)){
        const nueva = new Aeronave(modelo,parseInt(tripulacion),parseInt(pax),parseFloat(gph),parseFloat(mtow),parseFloat(ew),parseFloat(maxFuel));
        aeronaves.push(nueva);
    }else{
        alert('Error al ingresar los datos');
        menuInicial();
    }
}

function check(valor){
    let check = parseFloat(valor);
    if(check >= 0){
        return true;
    }else{
        return false;
    }
}

function seleccion(){
    let seleccion = prompt('Elija una aeronave por su indice');
    console.log(aeronaves.length);
    if(parseInt(seleccion)>=0 && parseInt(seleccion)<=aeronaves.length){
        console.log('Aqui');
    }else{
        alert('Dato ingresado erroneo');
        menuInicial();
    }

    // let tripulacion = tripulantes();
    // let pas = pasajeros()

    // let pesoTripulacion = peso(tripulacion);
    // let pesoPasajeros = peso(pas);
    // let equipaje = pesoEquipaje();

    // let pesoTotKgr = pesoTripulacion + pesoPasajeros + equipaje;
    // let pesoTotLbs = pesoTotKgr*2.2;

    // checkAeronave(pesoTotLbs);
}

