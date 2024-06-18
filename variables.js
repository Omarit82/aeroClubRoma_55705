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
const personas = [];
const tabla = document.getElementById('tabla');
const C172 = new Aeronave('Cessna 172',2,2,7.2,1050,645,43); //AERONAVE POR DEFECTO
const C206 = new Aeronave('Cessna 206',2,4,19.2,1600,876,92); //AERONAVE POR DEFECTO
const PA11 = new Aeronave('Piper PA-11',1,1,4,554,340,15);  //AERONAVE POR DEFECTO
const modal = new bootstrap.Modal('#modalCarga'); // Modal para la carga de pasajeros.-
const opciones = document.querySelector('.opciones');
const eleccion = document.createElement('button');
const creacion = document.createElement('button');
const contenedor = document.createElement('div');

/********************MENU DE OPCIONES*******************/
contenedor.classList.add('d-flex','justify-content-around','pb-2','pt-2','m-auto','mb-2','w-75');
contenedor.style.border = ('1px solid gray');
contenedor.style.borderRadius = ('15px');
eleccion.classList.add('btn','btn-success');
creacion.classList.add('btn','btn-success');

opciones.appendChild(contenedor);

creacion.textContent ='Nueva Aeronave';
eleccion.textContent = 'Elegir Aeronave';
contenedor.appendChild(eleccion);
contenedor.appendChild(creacion);
