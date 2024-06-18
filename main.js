/*****PAGINA DE PESO Y BALANCEO DE LA AERONAVE C172 PARA 4 PERSONAS****/
/* Se solicita el ingreso de cantidad de pasajeros y tripulacion(maximo 2 personas), que en total no pueden superar las 4 personas
Luego se solicita el peso del equipaje
El script calcula a partir de los datos entregados la cantidad de combustible necesaria a cargar para realizar la navegacion 
y si es posible cargar la aeronave con ese peso sin superar el peso maximo de despegue-
*/

/*CARGO LAS AERONAVES POR DEFECTO */
aeronaves.push(C172);
aeronaves.push(C206);
aeronaves.push(PA11);

/*MUESTRA LAS AERONAVES CARGADAS EN LA TABLA DEL DOM */
muestraHome();
inicio();

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


/**FUNCION QUE, A PARTIR DE UN ARREGLO DE PERSONAS DEVUELVE LA SUMA TOTAL DEL PESO DE TODAS */
function truncaDosDecimales(valor){
    let resultado = 100*valor;
    resultado = Math.floor(resultado)/100;
    return resultado;
}
