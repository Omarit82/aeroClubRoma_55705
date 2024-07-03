/*****PAGINA DE AEROCLUB ROMA****/
/*
El script calcula a partir de los datos entregados la cantidad de combustible necesaria a cargar para realizar la navegacion 
y si es posible cargar la aeronave con ese peso sin superar el peso maximo de despegue-

Permite tambien seleccionar los aeropuertos de partida y destino y calcular la distancia entre ambos.

Como tambien muestra (si existe esa informacion) la informacion meteorologica
*/

/*MUESTRA LAS AERONAVES CARGADAS EN LA TABLA DEL DOM */

muestraHome();
/*INICIA LA FUNCION QUE PERMITE SELECCIONAR UNA AERONAVE */
inicioSeleccion();
/*ESTETICA PARA EL HOME */
const cuerpo = document.body;
cuerpo.style.backgroundColor ='#4D658D';
const indicaciones = document.getElementById('indicaciones');
const tit = document.createElement('h2');
const subTit = document.createElement('p');
subTit.classList.add('text-center','fs-5');
const mensaje = document.createElement('p');
mensaje.classList.add('text-center');
subTit.innerHTML='En esta pagina puede seleccionar la aeronave con la cual podrá planificar su vuelo o <span class="fw-bold">crear</span> una nueva aeronave';
mensaje.innerHTML ='(Solo pueden eliminarse aquellas aeronaves creadas por el usuario, no las aeronaves por defecto.)';
tit.classList.add('text-center');
tit.style.color='#FFFFFF';
subTit.style.color = '#FFFFFF';
mensaje.style.color = '#FFFF00';
tit.innerHTML='Seleccion de aeronaves:';
indicaciones.appendChild(tit);
indicaciones.appendChild(subTit);
indicaciones.appendChild(mensaje);

