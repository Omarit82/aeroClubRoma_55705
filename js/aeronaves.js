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

function checkAeronave(){
    // Realiza el calculo de peso total y controla cuanto remane para combustible.
    indicaciones.innerHTML='';
    let avion = sessionStorage.getItem('seleccionado');
    let despacho = sessionStorage.getItem('despacho');
    let equipaje = sessionStorage.getItem('equipaje');
    avion = JSON.parse(avion);
    console.log(avion);
    despacho = JSON.parse(despacho);
    equipaje = JSON.parse(equipaje);
    // SE CONSIDERA 0 EL PESO DE CUALQUIER PASAJERO O TRIPULANTE SIN NOMBRE
    for (const pax of despacho) {
        if((pax.nombre === "")||((pax.nombre !=="")&&(pax.peso === ""))){
            pax.peso = 0;
        }
    };
    //EN CASO DE NO HABER CARGADO EQUIPAJE SE COLOCA UN 0 POR DEFECTO
    if(equipaje === ""){
        equipaje = 0;
    };
    //inserto el boton de retorno al home
    const home = document.getElementById('home');
    const homeButton = document.createElement('a');
    homeButton.setAttribute('href','index.html');
    homeButton.classList.add('btn','btn-info','m-auto');
    homeButton.innerHTML='Volver al Home';
    home.appendChild(homeButton);
    /*******************************/
    //CALCULO EL PESO TOTAL DE LA CARGA
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
        //Reinicio ORIGEN Y DESTINO
        localStorage.removeItem('origen');
        localStorage.removeItem('destino');
        const formulario = document.createElement('form');
        formulario.classList.add('card','m-2');
        //creamos el titulo
        const indicaciones = document.createElement('h3');
        indicaciones.innerHTML = 'Ingrese la ciudad de partida y la ciudad de llegada';
        //creamos el casillero para insertar el aeropuerto de origen -- de donde parte el vuelo
        const origen = document.createElement('input');
        origen.setAttribute('name','origen');
        origen.setAttribute('type','text');
        origen.setAttribute('placeholder','ORIGEN');
        origen.classList.add('w-50','m-auto','mt-5','mb-2');
        //creamos el casillero para insertar el aeropuerto de arrivo
        const destino = document.createElement('input');
        destino.setAttribute('name','destino')
        destino.setAttribute('type','text');
        destino.setAttribute('placeholder','DESTINO');
        destino.classList.add('w-50','m-auto','mt-2','mb-2');
        const envio = document.createElement('button');
        envio.classList.add('w-50','m-auto','btn','btn-success','mb-2');
        envio.setAttribute('type','submit');
        envio.innerHTML ='Consultar!';
        formulario.appendChild(indicaciones);
        formulario.appendChild(origen);
        formulario.appendChild(destino);
        formulario.appendChild(envio);
        resultado.appendChild(formulario);
        envio.scrollIntoView({ behavior: "smooth" });
        formulario.addEventListener('submit',(evento)=>{
            evento.preventDefault();
            //capturo la informacion del formulario!
            const info = new FormData(formulario);
            //le paso la info a una funciona asincronica que consulta a una api por los aeropuertos y devuelve la info para imprimir
            aeropuertosApi(info.get('origen'),info.get('destino'));
            espera.src = '../assets/img/wait.png';
            espera.classList.add('m-auto');
            espera.style.position ='relative';
            espera.style.transition ='transform 3s ease-out';
            setTimeout(() => {
                espera.style.transform = 'rotate(720deg)';
            }, 100);
            formulario.appendChild(espera);
        });
    })    
    function showOverWeight(){
        resultado.innerHTML = `<h4 class="fs-5 text-danger fw-bold">Con un total de : ${truncaDosDecimales(total + avion.ew)} kgr, se supera el peso maximo de despegue de: ${avion.mtow} kgr</h4>
                               <h5 class="fs-5 text-danger fw-bolder">NO PUEDE REALIZARSE EL VUELO</h5> 
                                <div class="d-flex">
                                    <ul class="col-6 list-group">
                                        <li class="text-start list-group-item">Modelo: ${avion.nombre}</li>
                                        <li class="text-start list-group-item">Maximo peso: ${avion.mtow}</li>
                                        <li class="text-start list-group-item">Peso vacio: ${avion.ew}</li>
                                        <li class="text-start list-group-item">Maximo fuel: ${avion.maxfuel}</li>
                                    </ul>
                                    <ul class="col-6 list-group">
                                        <li class="text-start list-group-item">Peso pasajeros: ${totalPax} kgr </li>
                                        <li class="text-start list-group-item">Peso equipaje: ${parseFloat(equipaje)} kgr</li>
                                    </ul>
                                </div>
                                `;
        //Agrego informacion del despacho
        const unorderList = document.createElement('ul');
        unorderList.classList.add('list-group');
        const btnPre = document.createElement('button');
        btnPre.classList.add('btn','btn-success','precomp','w-50','m-auto','mt-2');
        btnPre.innerHTML='Acceder a Precomputada';
        for (const it of despacho) {
            const item = document.createElement('li');
            item.classList.add('list-group-item','d-flex','justify-content-center');
            item.innerHTML=`Nombre: ${it.nombre} - Peso: ${it.peso}`;
            unorderList.appendChild(item);
        };
        resultado.appendChild(unorderList);
        resultado.appendChild(btnPre);
    }
    function showWeight(){
        let fuel = (avion.mtow-avion.ew-total)*1.70/3.8 // Convierto peso de combustible a galones de combustible
        if(fuel > avion.maxfuel){
            resultado.innerHTML= `<h4 class="fs-5">Con ${truncaDosDecimales(avion.maxfuel)} galones, puede volar: ${truncaDosDecimales(avion.maxfuel/avion.gph)} horas | Puede completar el tanque y recorrer: <span class="alcance text-primary">${truncaDosDecimales(avion.maxfuel/avion.gph*(avion.crucero))}</span> millas nauticas</h4>
                                    <div class="d-flex">
                                        <ul class="list-group col-6">
                                            <li class="text-start list-group-item">Modelo: ${avion.nombre}</li>
                                            <li class="text-start list-group-item">Maximo peso: ${avion.mtow}</li>
                                            <li class="text-start list-group-item">Peso vacio: ${avion.ew}</li>
                                            <li class="text-start list-group-item">Maximo fuel: ${avion.maxfuel}</li>
                                        </ul>
                                        <ul class="col-6 list-group">
                                            <li class="text-start list-group-item">Peso pasajeros: ${totalPax} kgr </li>
                                            <li class="text-start list-group-item">Peso equipaje: ${parseFloat(equipaje)} kgr</li>
                                        </ul>
                                    </div>`;
            //Agrego informacion del despacho
            const unorderList = document.createElement('ul');
            unorderList.classList.add('list-group');
            const btnPre = document.createElement('button');
            btnPre.classList.add('btn','btn-success','precomp','w-50','m-auto','mt-2');
            btnPre.innerHTML='Acceder a Precomputada';
            for (const it of despacho) {
                const item = document.createElement('li');
                item.classList.add('list-group-item','d-flex','justify-content-center');
                item.innerHTML=`Nombre: ${it.nombre} - Peso: ${it.peso}`;
                unorderList.appendChild(item);
            };
            resultado.appendChild(unorderList);
            resultado.appendChild(btnPre);
        }else{
            resultado.innerHTML= `<h4 class="fs-5">Con ${truncaDosDecimales(fuel)} galones, puede volar: ${truncaDosDecimales(fuel/avion.gph)} horas y recorrer: <span class="alcance text-primary">${truncaDosDecimales(fuel/avion.gph*(avion.crucero))}</span> millas nauticas</h4>
                                    <div class="d-flex">
                                        <ul class="list-group col-6">
                                            <li class="text-start list-group-item">Modelo: ${avion.nombre}</p>
                                            <li class="text-start list-group-item">Maximo peso: ${avion.mtow}</p>
                                            <li class="text-start list-group-item">Peso vacio: ${avion.ew}</p>
                                            <li class="text-start list-group-item">Maximo fuel: ${avion.maxfuel}</p>
                                        </ul>
                                        <ul class="col-6 list-group">
                                            <li class="text-start list-group-item">Peso pasajeros: ${totalPax} kgr </p>
                                            <li class="text-start list-group-item">Peso equipaje: ${parseFloat(equipaje)} kgr</p>
                                        </ul>
                                    </div>`;
            //Agrego informacion del despacho
            const unorderList = document.createElement('ul');
            unorderList.classList.add('list-group');
            const btnPre = document.createElement('button');
            btnPre.classList.add('btn','btn-success','precomp','w-50','m-auto','mt-2');
            btnPre.innerHTML='Acceder a Precomputada';
            for (const it of despacho) {
                const item = document.createElement('li');
                item.classList.add('list-group-item','d-flex','justify-content-center');
                item.innerHTML=`Nombre: ${it.nombre} - Peso: ${it.peso}`;
                unorderList.appendChild(item);
            };
            resultado.appendChild(unorderList);
            resultado.appendChild(btnPre);
        }
    }
}


