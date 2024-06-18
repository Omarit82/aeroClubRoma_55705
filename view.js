function formJs(avion){   
    let titulo = document.getElementById('formCargaTitle')
    titulo.innerHTML='Formulario de carga de: '+avion.nombre;
    const primeraFila = document.getElementById('trip');
    const pax = document.getElementById('pax');
    const equipaje = document.getElementById('equipaje');
    const tituloEquipaje = document.createElement('h4');
    tituloEquipaje.innerText = 'Equipaje';
    tituloEquipaje.classList.add('text-center');
    const paxMaxima = parseInt(avion.pax);
    const tripMaxima = parseInt(avion.tripulacion);
    const tituloTrip = document.createElement('h3');
    tituloTrip.classList.add('text-center');
    tituloTrip.innerHTML = "Tripulacion";
    const tituloPax = document.createElement('h3');
    tituloPax.innerHTML = 'Pasajeros';
    tituloPax.classList.add('text-center');
    /*AGREGO UN ASIENTO POR CADA TRIPULANTE POSIBLE*/
    primeraFila.innerHTML="";
    primeraFila.appendChild(tituloTrip);
    for(let i=1;i<=tripMaxima;i++){
        primeraFila.classList.add('row','justify-content-center');
        const trip = document.createElement('div');
        trip.classList.add('col-5','m-1');
        const nameT = document.createElement('input');
        const pesoT = document.createElement('input');
        nameT.setAttribute('type','text');
        nameT.setAttribute('name','nombre')
        nameT.setAttribute('placeholder','NOMBRE TRIPULANTE '+i);
        nameT.classList.add('d-none','m-1');
        pesoT.setAttribute('type','number');
        pesoT.setAttribute('name','peso')
        pesoT.setAttribute('placeholder','PESO TRIPULANTE '+i);
        pesoT.classList.add('d-none','m-1');
        const seat = document.createElement('img');
        const boton = document.createElement('button');
        boton.appendChild(seat);
        boton.classList.add('w-100','m-auto','btn','btn-info');
        seat.classList.add('p-1');
        seat.setAttribute('src','./assets/img/seat.png');
        trip.appendChild(boton);
        trip.appendChild(nameT);
        trip.appendChild(pesoT);
        primeraFila.appendChild(trip);
        boton.addEventListener('click',(e)=>{
            e.preventDefault();
            pesoT.classList.toggle('d-none');
            nameT.classList.toggle('d-none');
        });
    }
    pax.innerHTML = "";
    pax.appendChild(tituloPax);
    for(let i=1;i<=paxMaxima;i++){
        pax.classList.add('row','justify-content-center');
        const paxRow = document.createElement('div');
        paxRow.classList.add('col-5','m-1');
        const nameP = document.createElement('input');
        const pesoP = document.createElement('input');
        nameP.setAttribute('type','text');
        nameP.setAttribute('placeholder','NOMBRE PASAJERO '+i);
        nameP.setAttribute('name','nombre');
        nameP.classList.add('d-none','m-1');
        pesoP.setAttribute('type','number');
        pesoP.setAttribute('placeholder','PESO PASAJERO '+i);
        pesoP.setAttribute('name','peso');
        pesoP.classList.add('d-none','m-1');
        const seat = document.createElement('img');
        const boton = document.createElement('button');
        boton.appendChild(seat);
        boton.classList.add('w-100','m-auto','btn','btn-warning');
        seat.classList.add('p-1');
        seat.setAttribute('src','./assets/img/seat.png');
        paxRow.appendChild(boton);
        paxRow.appendChild(nameP);
        paxRow.appendChild(pesoP);
        pax.appendChild(paxRow);
        boton.addEventListener('click',(e)=>{
            e.preventDefault();
            pesoP.classList.toggle('d-none');
            nameP.classList.toggle('d-none');
        });
    }
    equipaje.innerHTML="";
    equipaje.appendChild(tituloEquipaje);
    const pesoE = document.createElement('input');
    pesoE.setAttribute('type','number');
    pesoE.setAttribute('placeholder','PESO EQUIPAJE');
    pesoE.setAttribute('name','pesoEquipaje');
    pesoE.classList.add('d-none','m-1','w-50');
    const valija = document.createElement('img');
    const btn = document.createElement('button');
    btn.appendChild(valija);
    btn.classList.add('w-50','m-auto','btn','btn-warning');
    valija.classList.add('p-1');
    valija.setAttribute('src','./assets/img/bag.png');
    equipaje.appendChild(btn);
    equipaje.appendChild(pesoE);
    btn.addEventListener('click',(e)=>{
        e.preventDefault();
        pesoE.classList.toggle('d-none');
    })
}


