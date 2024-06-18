function inicio(){
    sessionStorage.removeItem('despacho');
    sessionStorage.removeItem('seleccionado');
    eleccion.addEventListener('click',()=>{
        elegirAeronave();
    });
    const formulario = document.getElementById('carga');
    formulario.addEventListener('submit',(e)=>{
        e.preventDefault();
        const form = new FormData(formulario);
        console.log(form);
        const nombres = form.getAll('nombre');
        const pesos = form.getAll('peso');
        for(let i=0;i<nombres.length;i++){
            let nuevaPersona = new Persona(nombres[i],pesos[i]);
            personas.push(nuevaPersona);
        };
        let despacho = JSON.stringify(personas);
        sessionStorage.removeItem('despacho');
        sessionStorage.setItem('despacho',despacho);
        checkAeronave();

    });
}

/*OCULTA EL MENU Y AGREGA UN BOTON DE SELECCION A CADA AERONAVE. */
function elegirAeronave(){
    //oculto el menu y agrego un boton de seleccion a cada aeronave existente.
    contenedor.classList.add('d-none');
    const btns = document.querySelectorAll('.btn-primary');
    btns.forEach(element => {
        element.setAttribute('data-bs-toggle',"modal");
        element.setAttribute('data-bs-target',"#modalCarga");
        element.classList.remove('d-none');
        element.addEventListener('click',()=>{
            let index = (element.id).split('_');
            const pax =[];
            const trip = [];
            avion = (aeronaves[index[1]-1]);
            let saved = JSON.stringify(avion);
            sessionStorage.setItem('seleccionado',saved);
            formJs(avion);
        })
    });
}

/*CARGA Y MUESTRA EN EL DOM LA TABLA DE AERONAVES.*/ 
function mostrarAeronaves(){
    tabla.innerHTML=""; //limpio la tabla
    let contador=1;
    for(const avion of aeronaves) {
        let index = document.createElement('th');
        index.setAttribute('scope','col');
        index.innerHTML=contador;
        let tr = document.createElement('tr');
        let bn = document.createElement('button');
        bn.textContent='Seleccionar';
        bn.classList.add('btn','btn-primary','d-none');
        bn.setAttribute('id','seleccion_'+contador);
        tr.appendChild(index);
        for(let i=0;i<Object.keys(avion).length;i++){
            let th = document.createElement('th');
            th.setAttribute('scope','col');
            th.innerHTML = Object.values(avion)[i];
            tr.appendChild(th);
        }
        tabla.appendChild(tr);
        tabla.appendChild(bn);
        contador++;
    }
}

function checkAeronave(){ // Realiza el calculo de peso total y controla cuanto remane para combustible.
    let avion = sessionStorage.getItem('seleccionado');
    let despacho = sessionStorage.getItem('despacho');
    avion = JSON.parse(avion);
    despacho = JSON.parse(despacho);
    console.log(avion);
    console.log(despacho);
    for (const pax of despacho) {
        if(pax.nombre === ""){
            pax.peso = 0;
        }
    }
    let total = despacho.reduce((acumulador, persona) => acumulador + parseFloat(persona.peso), 0);
    console.log(total);
    const resultado = document.querySelector('.resultado');
    resultado.classList.toggle('d-none');
    if(avion.ew+total >= avion.mtow){ // Si es igual significa que no se puede cargar combustible
        resultado.innerHTML = `Con un total de : ${truncaDosDecimales(total)} kgr, se supera el peso maximo de despegue de: ${avion.mtow} kgr`
    } else{
        let fuel = (avion.mtow-avion.ew-total)*1.70/3.8 // Convierto peso de combustible a galones de combustible
        if(fuel > avion.maxfuel){
            resultado.innerHTML= `Con ${truncaDosDecimales(avion.maxfuel)} galones, puede volar: ${truncaDosDecimales(avion.maxfuel/avion.gph)} horas | Puede completar el tanque`;
        }else{
            resultado.innerHTML= `Con ${truncaDosDecimales(fuel)} galones, puede volar: ${truncaDosDecimales(fuel/avion.gph)} horas`;
        }
    }
    modal.hide();
}
