/*CARGA Y MUESTRA EN EL DOM LA TABLA DE AERONAVES.*/ 
function muestraHome(){
    flota.classList.remove('d-none');
    /*CARGO LAS AERONAVES POR DEFECTO DESDE EL ARCHIVO aeronaves.json Y LOS GUARDO EN EL LOCAL STORAGE.*/
    const avionesJson = async function fetchAviones(){
        try {
            const response = await fetch('https://66804c6456c2c76b495bb799.mockapi.io/aeronaves/aviones');
            if (response.ok){
                let data = await response.json();
                for (const avion of data) {
                    aeronaves.push(avion);
                }
                loadAeronavesLocalStorage(aeronaves);
            }
        } catch (error) {
            Swal.fire(
                'Aviso',
                'Error en el fetch al JSON',
                'error'
            )
        }
    }
    avionesJson();
    function loadAeronavesLocalStorage(aviones){
            /*CARGO LAS AERONAVES EN LOCALSTORE*/
        let av = JSON.parse(localStorage.getItem('aeronavesLS'));
        if(av !== null){
            for (const item of av) {
                aeronaves.push(JSON.parse(item));
            }
        }
        tabla.innerHTML=""; //limpio la tabla
        let contador=1;
        for(const avion of aviones) {
            let index = document.createElement('th');
            index.setAttribute('scope','col');
            index.innerHTML=contador;
            let tr = document.createElement('tr');
            //boton de seleccion inicialmente invisible
            let bn = document.createElement('button');
            bn.textContent='Seleccionar';
            bn.classList.add('btn','btn-primary','d-none');
            bn.setAttribute('id','seleccion_'+contador);
            //boton de erase inicialmente visible
            let bnErase = document.createElement('button');
            bnErase.setAttribute('class','erase');
            bnErase.setAttribute('id','erase_'+contador);
            let imgErase = document.createElement('img');
            imgErase.setAttribute('src','./assets/img/not.png');
            bnErase.appendChild(imgErase);
            bnErase.style.border = 'none';
            bnErase.addEventListener('click',()=>{
                erase(bnErase.id);
            });
            tr.appendChild(index);
            for(let i=0;i<Object.keys(avion).length;i++){
                let th = document.createElement('th');
                th.setAttribute('scope','col');
                th.innerHTML = Object.values(avion)[i];
                tr.appendChild(th);
                tr.appendChild(bn);
                tr.appendChild(bnErase);
            }
            tabla.appendChild(tr);
            contador++;
        }
    }
    
}

function erase(id){
    let ident = id.split('_');
    (parseInt(ident[1]) <= 3) ?  alertaEraseDefault() : eraseAvion(parseInt(ident[1]));
    function alertaEraseDefault(){
        Swal.fire({
            icon: "error",
            title: "No pueden eliminarse las aeronaves por defecto",
            footer: '<a href="index.html">HOME</a>',
            timer: 3000
        });
    }
    function eraseAvion(index){
        index = index-4;
        let hangar =JSON.parse(localStorage.getItem('aeronavesLS'));
        hangar = hangar.filter((_,i)=> i !== index);
        localStorage.setItem('aeronavesLS',JSON.stringify(hangar));
        Swal.fire({
            icon: "success",
            title: "Aeronave Eliminada!",
            footer: '<a href="index.html">HOME</a>',
            timer: 3000
        });
        setTimeout(() => {
            window.location.assign('index.html');
        }, 3500);
    }
}
/******CAPTURA DE FORMULARIO DE CARGA DE LA AERONAVE************/
function inicioSeleccion(){
    //Utilizo SessionStorage porque, aunque la info no es sensible. No quiero que persista 
    sessionStorage.removeItem('despacho');
    sessionStorage.removeItem('seleccionado');
    sessionStorage.removeItem('equipaje');
    eleccion.addEventListener('click',()=>{
        elegirAeronave();
    });
    const formulario = document.getElementById('carga');
    formulario.addEventListener('submit',(e)=>{
        e.preventDefault();
        const form = new FormData(formulario);
        //Analizo si todos los pasajeros ingresados tienen un peso asignado
        const nombres = form.getAll('nombre');
        const pesos = form.getAll('peso');
        for(let i=0;i<nombres.length;i++){
            let nuevaPersona = new Persona(nombres[i],pesos[i]);
            personas.push(nuevaPersona);
        };
        let despacho = JSON.stringify(personas);
        let equipaje = JSON.stringify(form.get('pesoEquipaje'));
        sessionStorage.removeItem('despacho');
        sessionStorage.setItem('despacho',despacho);
        sessionStorage.setItem('equipaje',equipaje);
        checkAeronave();
    });
}

/*OCULTA EL MENU Y AGREGA UN BOTON DE SELECCION A CADA AERONAVE. */
function elegirAeronave(){
    //oculto el menu y agrego un boton de seleccion a cada aeronave existente.
    //ademas remuevo el boton eliminar.
    const botonesErase = document.querySelectorAll('.erase');
    botonesErase.forEach(element => {
        element.classList.add('d-none');
    });
    contenedor.classList.add('d-none');
    const btns = document.querySelectorAll('.btn-primary');
    btns.forEach(element => {
        element.setAttribute('data-bs-toggle',"modal");
        element.setAttribute('data-bs-target',"#modalCarga");
        element.classList.remove('d-none');
        element.addEventListener('click',()=>{
            let index = (element.id).split('_');
            avion = (aeronaves[index[1]-1]);
            let saved = JSON.stringify(avion);
            sessionStorage.setItem('seleccionado',saved);
            formJs(avion);
        })
    });
}
function checkAeronave(){ // Realiza el calculo de peso total y controla cuanto remane para combustible.
    let avion = sessionStorage.getItem('seleccionado');
    let despacho = sessionStorage.getItem('despacho');
    let equipaje = sessionStorage.getItem('equipaje');
    avion = JSON.parse(avion);
    despacho = JSON.parse(despacho);
    equipaje = JSON.parse(equipaje);
    // SE CONSIDERA 0 EL PESO DE CUALQUIER PASAJERO O TRIPULANTE SIN NOMBRE
    for (const pax of despacho) {
        if((pax.nombre === "")||((pax.nombre !=="")&&(pax.peso === ""))){
            pax.peso = 0;
        }
    }
    if(equipaje === ""){
        equipaje = 0;
    }
    let totalPax = despacho.reduce((acumulador, persona) => acumulador + parseFloat(persona.peso), 0);
    let total = totalPax + parseFloat(equipaje);
    const resultado = document.querySelector('.resultado');
    //Muestro el div del resultado
    resultado.classList.toggle('d-none');
    //Operador Ternario
    (avion.ew+total > avion.mtow) ? showOverWeight(resultado) : showWeight(resultado);
    //oculto la tabla
    flota.classList.add('d-none');
    //cierro el modal
    modal.hide();
    //aplico funcionalidad al boton de precomputada
    document.querySelector('.precomp').addEventListener('click',()=>{
        //creamos el formulario
        const formulario = document.createElement('form');
        formulario.classList.add('card','m-2');
        //creamos el titulo
        const indicaciones = document.createElement('h3');
        indicaciones.innerHTML = 'Ingrese el aeropuerto/ciudad de partida y el aeropuerto/ciudad de llegada';
        //creamos el casillero para insertar el aeropuerto de origen -- de donde parte el vuelo
        const origen = document.createElement('input');
        origen.setAttribute('name','origen');
        origen.setAttribute('type','text');
        origen.setAttribute('placeholder','ORIGEN / PARTIDA');
        origen.classList.add('w-50','m-auto','mt-5','mb-2');
        //creamos el casillero para insertar el aeropuerto de arrivo
        const destino = document.createElement('input');
        destino.setAttribute('name','destino')
        destino.setAttribute('type','text');
        destino.setAttribute('placeholder','DESTINO / ARRIVO');
        destino.classList.add('w-50','m-auto','mt-2','mb-2');
        const envio = document.createElement('button');
        envio.classList.add('w-50','m-auto','btn','btn-success','mb-5');
        envio.setAttribute('type','submit');
        envio.innerHTML ='Consultar!';
        formulario.appendChild(indicaciones);
        formulario.appendChild(origen);
        formulario.appendChild(destino);
        formulario.appendChild(envio);
        resultado.appendChild(formulario);

        formulario.addEventListener('submit',(evento)=>{
            evento.preventDefault();
            //capturo la informacion del formulario!
            const info = new FormData(formulario);
            //le paso la info a una funciona asincronica que consulta a una api por los aeropuertos y devuelve la info para imprimir
            aeropuertosApi(info.get('origen'),info.get('destino'));
        })
    })
    
    function showOverWeight(){
        resultado.innerHTML = `<h4 class="bolder">Con un total de : ${truncaDosDecimales(total + avion.ew)} kgr, se supera el peso maximo de despegue de: ${avion.mtow} kgr</h4>
                               <p class="text-end">Resumen: Peso pasajeros: ${totalPax} kgr </p>
                               <p class="text-end">Peso equipaje: ${parseFloat(equipaje)} kgr</p>
                               <a href="index.html"><button class="btn btn-info">Volver al Home</button></a>
                               <button class="btn btn-success precomp w-50 m-auto mt-2">Acceder a Precomputada</button>`;

    }
    function showWeight(){
        let fuel = (avion.mtow-avion.ew-total)*1.70/3.8 // Convierto peso de combustible a galones de combustible
        if(fuel > avion.maxfuel){
            resultado.innerHTML= `<h4 class="bolder">Con ${truncaDosDecimales(avion.maxfuel)} galones, puede volar: ${truncaDosDecimales(avion.maxfuel/avion.gph)} horas | Puede completar el tanque</h4>
                                    <p class="text-end">Resumen: Peso pasajeros: ${totalPax} kgr </p>
                                    <p class="text-end">Peso equipaje: ${parseFloat(equipaje)} kgr</p>
                                    <a href="index.html"><button class="btn btn-info">Volver al Home</button></a>
                                    <button class="btn btn-success precomp w-50 m-auto mt-2">Acceder a Precomputada</button>`;
        }else{
            resultado.innerHTML= `<h4 class="bolder">Con ${truncaDosDecimales(fuel)} galones, puede volar: ${truncaDosDecimales(fuel/avion.gph)} horas</h4>
                                    <p class="text-end">Resumen: Peso pasajeros: ${totalPax} kgr </p>
                                    <p class="text-end">Peso equipaje: ${parseFloat(equipaje)} kgr</p>                     
                                    <a href="index.html"><button class="btn btn-info">Volver al Home</button></a>
                                    <button class="btn btn-success precomp w-50 m-auto mt-2">Acceder a Precomputada</button>`;
        }
    }
    
}

async function aeropuertosApi(origen, destino){
    const url1 = 'https://api.api-ninjas.com/v1/airports?city='+origen;
    const url2 = 'https://api.api-ninjas.com/v1/airports?city='+destino;
    const consulta1 = await fetch(url1,{
        method: 'get',
        headers: {
            'X-Api-Key': 'ZcQlRSHpI86oCTxDmvbG/Q==6UYm4cSJQc4jOvFC',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify() 
    });
    const primeraConsulta = await consulta1.json();
    
    const consulta2 = await fetch(url2,{
        method:'get',
        headers: {
            'X-Api-Key': 'ZcQlRSHpI86oCTxDmvbG/Q==6UYm4cSJQc4jOvFC',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify()
    });
    const segundaConsulta = await consulta2.json();
    console.log(primeraConsulta);
    console.log(segundaConsulta);
    const resultado = document.querySelector('.resultado');
    //creo una lista con los aeropuertos de destino y arribo con un checkbox?
    
    function analizaConsulta(consulta,texto){
        const subtitulo1 = document.createElement('h4');
        subtitulo1.innerHTML = texto;
        const ul = document.createElement('ul');
        ul.classList.add('list-group');
        if(consulta.length > 1){
            let contador=0;
            for (const partida of consulta) {
                console.log(partida.icao);
                const li = document.createElement('li');
                li.classList.add('d-flex','justify-content-between','list-group-item');
                li.innerHTML = `Icao: ${partida.icao} |Nombre: ${partida.name} |Elevacion(ft): ${partida.elevation_ft}
                                <button id="seleccion_consulta_${contador}" class="btn w-25 btn-info m-2">Seleccionar</button>`;
                ul.appendChild(li);
                contador++;
            }
        }else{
            const li = document.createElement('li');
            li.classList.add('d-flex','justify-content-between','list-group-item');
            li.innerHTML = `Icao: ${consulta[0].icao} |Nombre: ${consulta[0].name} |Elevacion(ft): ${consulta[0].elevation_ft}
                            <button id="seleccion_consulta" class="btn w-25 btn-info m-2">Seleccionar</button>`;
            ul.appendChild(li);
        }
        resultado.appendChild(subtitulo1)
        resultado.appendChild(ul);
    }
    analizaConsulta(primeraConsulta,'Aeropuerto de partida: ');
    analizaConsulta(segundaConsulta,'Aeropuerto de arribo: ');
}

function truncaDosDecimales(valor){
    let resultado = 100*valor;
    resultado = Math.floor(resultado)/100;
    return resultado;
}

