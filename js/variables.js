/**INICIALIZACION DE VALORES POR DEFECTO. */
const aeronaves = [];
const personas = [];
const tabla = document.getElementById('tabla');
const flota = document.getElementById('flota');
const modal = new bootstrap.Modal('#modalCarga'); // Modal para la carga de pasajeros.-
const opciones = document.querySelector('.opciones'); // Dom donde colocar las opciones
const eleccion = document.createElement('button'); //boton de eleccion de aeronave
const creacion = document.createElement('button'); // boton de creacion de aeronave
const contenedor = document.createElement('div'); // contenedor de botones
const link = document.createElement('a');
const precomputada = document.querySelector('.precomputada');
const resultado = document.createElement('li');
/********************MENU DE OPCIONES*******************/
contenedor.classList.add('d-flex','justify-content-around','pb-2','pt-2','m-auto','mb-2','w-75');
contenedor.style.border = ('1px solid gray');
contenedor.style.borderRadius = ('15px');
eleccion.classList.add('btn','btn-success');
creacion.classList.add('btn','btn-success');
link.appendChild(creacion);
link.setAttribute('href','nueva.html');
resultado.classList.add('list-group-item');

opciones.appendChild(contenedor);

creacion.textContent ='Nueva Aeronave';
eleccion.textContent = 'Elegir Aeronave';
contenedor.appendChild(eleccion);
contenedor.appendChild(link);
