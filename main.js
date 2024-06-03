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
/**CLASE PERSONA PARA TRIPULANTES Y PASAJEROS. */
class Persona{
    constructor(nombre,peso){
        this.nombre = nombre,
        this.peso = peso
    }
}
/**INICIALIZACION DE VALORES POR DEFECTO. */
const aeronaves = [];
const tabla = document.getElementById('tabla');
const C172 = new Aeronave('Cessna 172',2,2,7.2,2300,1419,43); //AERONAVE POR DEFECTO
const C182 = new Aeronave('Cessna 182',2,2,9.2,3500,1819,55); //AERONAVE POR DEFECTO
const PA11 = new Aeronave('Piper PA-11',1,1,4,1600,750,15);  //AERONAVE POR DEFECTO
aeronaves.push(C172);
aeronaves.push(C182);
aeronaves.push(PA11);


mostrarAeronaves();
setTimeout(() => {
    menuInicial(); 
}, 1000);

//*****************************************************************************//
/*CARGA Y MUESTRA EN EL DOM LA TABLA DE AERONAVES.*/ 
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
/* FUNCION QUE MUESTRA EL MENU INICIAL*/
function menuInicial(){
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
}
/**FUNCION QUE CREA Y AGREGA AL ARRAY DE AERONAVES UNA NUEVA AERONAVE CARGADA POR EL USUARIO.- */
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
/**FUNCION QUE CONTROLA QUE LOS VALORES INGRESADOS AL CREAR LA AERONAVE SEAN VALIDOS. */
function check(valor){
    let check = parseFloat(valor);
    if(check >= 0){
        return true;
    }else{
        return false;
    }
}
/**FUNCION QUE A PARTIR DE LA AERONAVE ELEGIDA CARGA DOS ARREGLOS - UNO DE TRIPULANTES Y UNO DE PASAJEROS CON SUS NOMBRES Y PESOS. */
function seleccion(){
    const pax =[];
    const trip = [];
    let seleccion = prompt('Elija una aeronave por su indice');
    let avion;
    if(parseInt(seleccion)>=0 && parseInt(seleccion)<=aeronaves.length){
        avion = (aeronaves[seleccion-1]);
    }else{
        alert('Dato ingresado erroneo');
        menuInicial();
    }
    let cantidadTripulantes = tripulantes(avion.tripulacion);
    for(let i=0; i<cantidadTripulantes;i++){
        trip.push(ingresoPersona());
    }
    let cantidadPasajeros = pasajeros(avion.pax);
    for(let i=0; i<cantidadPasajeros; i++){
        pax.push(ingresoPersona());
    }
    let pesoPasajeros = pesoArreglo(pax);
    console.log('Peso total de los pax: '+pesoPasajeros);
    let pesoTripulacion = pesoArreglo(trip);
    console.log('Peso total de la tripulacion: '+pesoTripulacion);
    let equipaje = pesoEquipaje();
    let pesoTotKgr = pesoTripulacion + pesoPasajeros + equipaje;
    console.log('Peso total: '+pesoTotKgr);
    let pesoTotLbs = pesoTotKgr*2.2;
    const resultado = document.getElementById('resTripulacion');
    const resultado2 = document.getElementById('resPasajeros');
    const oculta = document.getElementById('oculta');
    for(let i=0; i<cantidadTripulantes;i++){
        let tr = document.createElement('tr');
        let th1 = document.createElement('th');
        let th2 = document.createElement('th');
        th1.innerHTML = trip[i].nombre;
        th2.innerHTML = trip[i].peso;
        tr.appendChild(th1);
        tr.appendChild(th2);
        resultado.appendChild(tr);
    };
    for(let i=0; i<cantidadPasajeros;i++){
        let tr = document.createElement('tr');
        let th1 = document.createElement('th');
        let th2 = document.createElement('th');
        th1.innerHTML = pax[i].nombre;
        th2.innerHTML = pax[i].peso;
        tr.appendChild(th1);
        tr.appendChild(th2);
        resultado2.appendChild(tr);
    }
    oculta.classList.toggle('d-none');
    checkAeronave(pesoTotLbs,avion);
}

/**FUNCION QUE, A PARTIR DE UN ARREGLO DE PERSONAS DEVUELVE LA SUMA TOTAL DEL PESO DE TODAS */
function pesoArreglo(array){
    let total = 0;
    for(let i=0;i<array.length;i++){
        console.log(array[i]);
        total += array[i].peso; 
    }
    return total;
}
/**FUNCION QUE RETORNA LA CANTIDAD DE TRIPULANTES( AL MENOS 1) */
function tripulantes(tripMax){
    let trips = prompt("Ingrese la cantidad de tripulantes");
    if(trips<1){
        alert('Se debe ingresar al menos un tripulante');
        let trips = tripulantes(tripMax);
        return parseInt(trips);
    }else{
        let res = checkMax(tripMax, trips);
        if(res){
            return parseInt(trips);
        }else{
            let trips = tripulantes(tripMax);
            return parseInt(trips);
        }
    }
}
/**FUNCION QUE RETORNA LA CANTIDAD DE PASAJEROS */
function pasajeros(paxMax){
    let pax = prompt("Ingrese la cantidad de pasajeros");
    let res = checkMax(paxMax,pax);
    if(res){
        return parseInt(pax);
    }else{
        pax = pasajeros(paxMax);
        return parseInt(pax);
    };
}
/**FUNCION QUE CONTROLA A PARTIR DE UN VALOR MAXIMO DE PERSONAS PASADO POR PARAMETRO QUE EL OTRO VALOR PASADO POR PARAMETRO NO SEA MAYOR */
function checkMax(valorMax,valor){
    if((valor>=0) && (valor<=valorMax)){
        return true;
    }else{
        alert("Error al ingresar el numero");
        return false;
    }
}
/**FUNCION QUE RETORNA UNA NUEVA PERSONA A PARTIR DE LOS DATOS PASADOS POR PARAMETRO. */
function ingresoPersona(){ 
    let nombre = prompt("Ingrese el nombre: ");
    let peso = prompt("Ingrese el peso de: "+nombre);
    let res = checkPeso(peso);
    if(res){
        return new Persona(nombre,parseFloat(peso));
    }else{
        alert("Debe recargar los datos");
    }
}

/*FUNCION QUE CONTROLA QUE EL VALOR DE PESO INGRESADO EN PERSONA SEA UN VALOR VALIDO. */
function checkPeso(peso) { //Chequea que el peso ingresado sea valido
    if(parseFloat(peso) > 0){
        return true;
    }else{
        alert('No se ingreso un peso correcto');
        return false;
    }
}
/**FUNCION QUE CONTROLA QUE EL VALOR DE PESO DE EQUIPAJE INGRESADO SEA UN VALOR VALIDO. */
function pesoEquipaje(){
    let total = prompt("Ingrese el peso del equipaje total en kgr.");
    if(isNaN(total)|| total<0){
        alert("Valor ingresado incorrecto");
    }else{
        return parseFloat(total);
    }
}

function checkAeronave(total, avion){ // Realiza el calculo de peso total y controla cuanto remane para combustible.
    if(avion.ew+total >= avion.mtow){ // Si es igual significa que no se puede cargar combustible
        alert("Maximo peso de despegue superado");
    } else{
        let fuel = (avion.mtow-avion.ew-total)*1.70/3.8 // Convierto peso de combustible a galones de combustible
        if(fuel > avion.maxfuel){
            alert("Con: "+truncaDosDecimales(avion.maxfuel)+" galones, puede volar: "+truncaDosDecimales(avion.maxfuel/avion.gph)+" horas | Puede completar el tanque");
        }else{
            alert("Con: "+truncaDosDecimales(fuel)+" galones, puede volar: "+truncaDosDecimales(fuel/avion.gph)+ " horas");
        }
    }
}

function truncaDosDecimales(valor){
    let resultado = 100*valor;
    resultado = Math.floor(resultado)/100;
    return resultado;
}
