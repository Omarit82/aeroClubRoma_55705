/*CARGA Y MUESTRA EN EL DOM LA TABLA DE AERONAVES.*/ 
function muestraHome(){
    flota.classList.remove('d-none');
    /*CARGO LAS AERONAVES POR DEFECTO */
    aeronaves.push(C172);
    aeronaves.push(C206);
    aeronaves.push(PA11);
    /*CARGO LAS AERONAVES EN LOCALSTORE*/
    let qtySaved = localStorage.length;
    for (let i=0; i< qtySaved; i++){
        let av = JSON.parse(localStorage.getItem('avion_'+i))
        aeronaves.push(av);
    }
    tabla.innerHTML=""; //limpio la tabla
    let contador=1;
    for(const avion of aeronaves) {
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
       // tabla.appendChild(bn);
        contador++;
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
        console.log('avion_'+index);
        localStorage.removeItem('avion_'+index);
        Swal.fire({
            icon: "success",
            title: "Aeronave Eliminada!",
            footer: '<a href="index.html">HOME</a>',
            timer: 3000
        });
        setTimeout(() => {
            window.location.assign('index.html');
        }, 4000);
    }
}

/******CAPTURA DE FORMULARIO DE CARGA DE LA AERONAVE************/
function inicioSeleccion(){
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
        console.log(form);
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
        if(pax.nombre === ""){
            pax.peso = 0;
        }
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
    
    function showOverWeight(){
        resultado.innerHTML = `<h4 class="bolder">Con un total de : ${truncaDosDecimales(total + avion.ew)} kgr, se supera el peso maximo de despegue de: ${avion.mtow} kgr</h4>
                               <p class="text-end">Resumen: Peso pasajeros: ${totalPax} kgr </p>
                               <p class="text-end">Peso equipaje: ${parseFloat(equipaje)} kgr</p>`;

    }
    function showWeight(){
        let fuel = (avion.mtow-avion.ew-total)*1.70/3.8 // Convierto peso de combustible a galones de combustible
        if(fuel > avion.maxfuel){
            resultado.innerHTML= `<h4 class="">Con ${truncaDosDecimales(avion.maxfuel)} galones, puede volar: ${truncaDosDecimales(avion.maxfuel/avion.gph)} horas | Puede completar el tanque</h4>
                                    <p class="text-end">Resumen: Peso pasajeros: ${totalPax} kgr </p>
                                    <p class="text-end">Peso equipaje: ${parseFloat(equipaje)} kgr</p>`;
        }else{
            resultado.innerHTML= `Con ${truncaDosDecimales(fuel)} galones, puede volar: ${truncaDosDecimales(fuel/avion.gph)} horas`;
        }
    }
}
function truncaDosDecimales(valor){
    let resultado = 100*valor;
    resultado = Math.floor(resultado)/100;
    return resultado;
}

