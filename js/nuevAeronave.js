//Creacion del formulario de carga de Nueva Aeronave
const contenedorNuevaAeronave = document.getElementById('cargaAeronave');
//Titulo del fomulario
const encabezado = document.createElement('h3');
encabezado.classList.add('text-center');
encabezado.innerHTML='Carga de una nueva aeronave:';
//Formulario de creacion de una nueva aeronave
const formDinamico = document.createElement('form');
formDinamico.classList.add('d-flex','flex-column','w-50','m-auto');
formDinamico.setAttribute('id','nuevaAeronave');
//input de modelo
const model = document.createElement('label');
model.setAttribute('for','modelo');
model.classList.add('text-center');
model.innerHTML='Modelo de la aeronave';
const modelInput = document.createElement('input');
modelInput.setAttribute('type','text');
modelInput.setAttribute('name','modelo');
modelInput.setAttribute('required','true');
//input de tripulantes
const trip = document.createElement('label');
trip.setAttribute('for','tripulantes');
trip.classList.add('text-center');
trip.innerHTML='Ingrese la cantidad de tripulantes';
const tripInput = document.createElement('input');
tripInput.setAttribute('type','number');
tripInput.setAttribute('name','tripulantes');
tripInput.setAttribute('required','true');
tripInput.setAttribute('min','1');
//input de pasajeros
const pasajeros = document.createElement('label');
pasajeros.setAttribute('for','pasajeros');
pasajeros.classList.add('text-center');
pasajeros.innerHTML='Ingrese la cantidad de pasajeros';
const paxInput = document.createElement('input');
paxInput.setAttribute('type','number');
paxInput.setAttribute('name','pasajeros');
paxInput.setAttribute('required','true');
paxInput.setAttribute('min','0');
//input de Consumo
const consumoForm = document.createElement('label');
consumoForm.setAttribute('for','consumo');
consumoForm.classList.add('text-center');
consumoForm.innerHTML='Ingrese el consumo en GPH(galones por hora)';
const consumoFormInput = document.createElement('input');
consumoFormInput.setAttribute('type','number');
consumoFormInput.setAttribute('name','consumo');
consumoFormInput.setAttribute('required','true');
consumoFormInput.setAttribute('step','0.1');
consumoFormInput.setAttribute('min','0');
//input de Consumo
const cruceroForm = document.createElement('label');
cruceroForm.setAttribute('for','crucero');
cruceroForm.classList.add('text-center');
cruceroForm.innerHTML='Ingrese la velocidad crucero';
const cruceroInput = document.createElement('input');
cruceroInput.setAttribute('type','number');
cruceroInput.setAttribute('name','crucero');
cruceroInput.setAttribute('required','true');
cruceroInput.setAttribute('step','0.1');
cruceroInput.setAttribute('min','0');
//input de Maximum Takeoff Weight
const mtowForm = document.createElement('label');
mtowForm.setAttribute('for','mtow');
mtowForm.classList.add('text-center');
mtowForm.innerHTML='Ingrese el peso maximo de despegue en Kgr.';
const mtowFormInput = document.createElement('input');
mtowFormInput.setAttribute('type','number');
mtowFormInput.setAttribute('name','mtow');
mtowFormInput.setAttribute('required','true');
mtowFormInput.setAttribute('step','0.1');
mtowFormInput.setAttribute('min','0');
//input de Peso Vacio
const emptyForm = document.createElement('label');
emptyForm.setAttribute('for','vacio');
emptyForm.classList.add('text-center');
emptyForm.innerHTML='Ingrese el peso vacio de la aeronave';
const emptyFormInput = document.createElement('input');
emptyFormInput.setAttribute('type','number');
emptyFormInput.setAttribute('name','vacio');
emptyFormInput.setAttribute('required','true');
emptyFormInput.setAttribute('step','0.1');
emptyFormInput.setAttribute('min','0');
//input de Peso Fuel
const fuelForm = document.createElement('label');
fuelForm.setAttribute('for','fuel');
fuelForm.classList.add('text-center');
fuelForm.innerHTML='Ingrese la capacidad de combustible maxima';
const fuelFormInput = document.createElement('input');
fuelFormInput.setAttribute('type','number');
fuelFormInput.setAttribute('name','fuel');
fuelFormInput.setAttribute('required','true');
fuelFormInput.setAttribute('step','0.1');
fuelFormInput.setAttribute('min','0');
//boton de submit
const botonSubmit = document.createElement('button');
botonSubmit.setAttribute('type','submit');
botonSubmit.classList.add('btn','btn-success','m-auto','mt-3','w-50');
botonSubmit.innerHTML ='Guardar';
//Agrego todo los elementos al form y al contenedor
formDinamico.appendChild(model);
formDinamico.appendChild(modelInput);
formDinamico.appendChild(trip);
formDinamico.appendChild(tripInput);
formDinamico.appendChild(pasajeros);
formDinamico.appendChild(paxInput);
formDinamico.appendChild(consumoForm);
formDinamico.appendChild(consumoFormInput);
formDinamico.appendChild(cruceroForm);
formDinamico.appendChild(cruceroInput);
formDinamico.appendChild(mtowForm);
formDinamico.appendChild(mtowFormInput);
formDinamico.appendChild(emptyForm);
formDinamico.appendChild(emptyFormInput);
formDinamico.appendChild(fuelForm);
formDinamico.appendChild(fuelFormInput);
formDinamico.appendChild(botonSubmit);
contenedorNuevaAeronave.appendChild(encabezado);
contenedorNuevaAeronave.appendChild(formDinamico);

const card = document.querySelector('.card');
card.style.backgroundColor = '#4D658D';
card.style.color = '#FFFFFF';
const fondo = document.body;
fondo.style.backgroundColor ='#21376A';
///CREACION DE UNA AERONAVE DESDE EL FORM
const formNuevaAeronave = document.getElementById('nuevaAeronave');
formNuevaAeronave.addEventListener('submit',(e)=>{
    e.preventDefault();
    const informacion = new FormData(formNuevaAeronave);
    // convierto en objeto la informacion del FormData
    const objeto = {};
    informacion.forEach((value,key)=>{
        objeto[key]=value;
    });
    //Desestructuro el objeto
    const {modelo,tripulantes,pasajeros,consumo,crucero,mtow,vacio,fuel} = objeto;
    //utilizo la clase aeronave para crear el nuevo objeto
    const nuevaAeronave = new Aeronave(modelo,parseInt(tripulantes),parseInt(pasajeros),parseFloat(consumo),parseFloat(crucero),parseFloat(mtow),parseFloat(vacio),parseFloat(fuel));
    const nueva = JSON.stringify(nuevaAeronave);
    let hangarLS = JSON.parse(localStorage.getItem('aeronavesLS'));
    //UTILIZO EL OPERADOR NULLISH PARA CHEQUEAR SI EL ARREGLO ES NULL
    hangarLS ?? cargaInicial();
    //en caso de que no exista(porque aun no se cargo ninguna aeronave, ejecuto la funcion a continuacion que crea el arreglo y lo sube al localStorage)
    function cargaInicial(){
        const aeronavesLS = [];
        localStorage.setItem('aeronavesLS',JSON.stringify(aeronavesLS));
        hangarLS= JSON.parse(localStorage.getItem('aeronavesLS'));
    }
        
    hangarLS.push(nueva);
    localStorage.setItem('aeronavesLS',JSON.stringify(hangarLS));
    formNuevaAeronave.reset()
    Swal.fire({
        icon: "success",
        title: "Aeronave Guardada!",
        html: `<p> A guardado la aeronave: ${informacion.get('modelo')} en LocalStorage</p>`,
        timer: 3000
    });
    setTimeout(() => {
        window.location.assign('index.html');
    }, 3000);
})
