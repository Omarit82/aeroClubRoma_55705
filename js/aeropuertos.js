/*****FUNCION ASINCRONA QUE CONSUME DESDE LA API LA INFORMACION DE LOS AEROPUERTOS SOLICITADOS****** */
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
    const consulta2 = await fetch(url2,{
        method:'get',
        headers: {
            'X-Api-Key': 'ZcQlRSHpI86oCTxDmvbG/Q==6UYm4cSJQc4jOvFC',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify()
    });
    const primeraConsulta = await consulta1.json();
    const segundaConsulta = await consulta2.json();
    //CHEQUEO EL STATUS DE LAS CONSULTAS
    if ((consulta1.status != 200)||(consulta2.status != 200)){
        Swal.fire({
            icon: "error",
            title: "Error al realizar la consulta",
            timer: 3000
        });
        espera.removeAttribute('style');
        espera.src="";
    }else if((primeraConsulta.length === 0)||(segundaConsulta.length === 0)){
        if(primeraConsulta.length === 0){
            Swal.fire({
                icon: "error",
                title: `No existe un aeropuerto vinculado a: ${origen}`,
                timer: 3000
            });
            espera.removeAttribute('style');
            espera.src="";
        }else{
            Swal.fire({
                icon: "error",
                title: `No existe un aeropuerto vinculado a: ${destino}`,
                timer: 3000
            });
            espera.removeAttribute('style');
            espera.src="";
        }
    }else{
        precomputada.classList.remove('d-none');
        precomputada.innerHTML="";
        //creo una lista con los aeropuertos de destino y arribo
        analizaConsulta(primeraConsulta,'Aeropuerto de partida :');
        analizaConsulta(segundaConsulta,'Aeropuerto de arribo :');
        /**LLEVA AL RESULTADO DE LOS AEROPUERTOS**/
        precomputada.scrollIntoView({ behavior: "smooth" });
        seleccionAeropuertos(primeraConsulta,segundaConsulta);
        /**REMUEVE LOGO DE ESPERA**/
        espera.removeAttribute('style');
        espera.src="";
    }
}


function analizaConsulta(consulta,texto){
    /**muestra los aeropuertos y agrega botones para seleccion**/
    const identificador = texto.split(" ");
    const subtitulo1 = document.createElement('h4');
    subtitulo1.innerHTML = texto;
    const ul = document.createElement('ul');
    ul.classList.add('list-group');
    if(consulta.length > 1){
        let contador=0;
        for (const item of consulta) {
            const li = document.createElement('li');
            li.classList.add('d-flex','justify-content-between','list-group-item');
            li.innerHTML = `Icao: ${item.icao} |Nombre: ${item.name} |Elevacion(ft): ${item.elevation_ft}
                            <button class="${identificador[2]} btn w-25 btn-info m-2">Seleccionar</button>`;
            ul.appendChild(li);
            contador++;
        }
    }else{
        const li = document.createElement('li');
        li.classList.add('d-flex','justify-content-between','list-group-item');
        li.innerHTML = `Icao: ${consulta[0].icao} |Nombre: ${consulta[0].name} |Elevacion(ft): ${consulta[0].elevation_ft}
                        <button class="${identificador[2]} btn w-25 btn-info m-2">Seleccionar</button>`;
        ul.appendChild(li);
    }
    precomputada.appendChild(subtitulo1)
    precomputada.appendChild(ul);
}

function seleccionAeropuertos(origen,destino){
    //TOMO TODOS LOS BOTONES PARA SELECCIONAR LOS AEROPUERTOS DE ORIGEN Y DESTINO
    //Le agrego a precomputada un casillero donde calculo la distancia entre los aeropuertos.
    const origenSeleccionado = document.createElement('li');
    origenSeleccionado.classList.add('list-group-item');
    const destinoSeleccionado = document.createElement('li');
    destinoSeleccionado.classList.add('list-group-item');
    precomputada.appendChild(origenSeleccionado);
    precomputada.appendChild(destinoSeleccionado);
    const origenes = document.querySelectorAll('.partida');
    const partidas = document.querySelectorAll('.arribo');
    for (let i=0;i<origenes.length;i++) {
        origenes[i].addEventListener('click',()=>{
            origenSeleccionado.innerHTML='Desde: -> '+origen[i].icao;
            //guardo el aeropuerto seleccionado en localstorage y ejecuto calculo de distancia
            const salida = JSON.stringify(origen[i]);
            localStorage.setItem('origen',salida);
            calculoDistancia();
        });
    }
    for (let i=0;i<partidas.length;i++) {
        partidas[i].addEventListener('click',()=>{
            destinoSeleccionado.innerHTML='Hasta: -> '+destino[i].icao;
              //guardo el aeropuerto seleccionado en localstorage y ejecuto calculo de distancia
            const llegada = JSON.stringify(destino[i]);
            localStorage.setItem('destino',llegada);
            calculoDistancia();
        });
    }
   
}
//ESTA FUNCION CALCULA LA DISTANCIA ENTRE LOS AEROPUERTOS GUARDADOS EN EL LOCALSTORAGE Y LA IMPRIME 
function calculoDistancia(){
    const origen = JSON.parse(localStorage.getItem('origen'));
    const destino =JSON.parse(localStorage.getItem('destino'));   
    precomputada.appendChild(resultado);
    if(origen != null && destino != null){
        //paso las longitudes y latitudes a radianes
        resultado.innerHTML=""; // Vacio el resultado
        let lat1 = parseFloat(origen.latitude)*Math.PI/180;
        let lat2 = parseFloat(destino.latitude)*Math.PI/180;
        let long1 = parseFloat(origen.longitude)*Math.PI/180;
        let long2 = parseFloat(destino.longitude)*Math.PI/180;
        let deltaLatitude = lat2 - lat1;
        let deltaLongitude = long2 - long1;
        //usamos la formula de Harversine para obtener la distancia: (con un radio terrestre asumido de: 6371 km o 3440 millas nauticas)
        //... si la tierra es redonda :)
        let intermedio =Math.pow(Math.sin(deltaLatitude/2),2)+(Math.cos(lat1)*Math.cos(lat2)*Math.pow(Math.sin(deltaLongitude/2),2));
        let intermedioDos = 2*Math.atan2(Math.sqrt(intermedio),Math.sqrt(1-intermedio));
        let distancia = intermedioDos * 3440;
        //comparo la distancia con el alcance maximo
        let alcance = document.querySelector('.alcance');
        alcance = parseFloat(alcance.innerHTML);
        if(distancia <= alcance){
            resultado.innerHTML ='Distancia total: -> '+ truncaDosDecimales(distancia)+' millas nauticas, remanente: '+truncaDosDecimales(alcance-distancia)+' nm';
        }else{
            resultado.innerHTML ='Distancia total: -> '+ truncaDosDecimales(distancia)+' nm, supera el alcance de la aeronave por: '+truncaDosDecimales(distancia-alcance)+' nm';
        };
        const clima = document.createElement('button');
        clima.setAttribute('id','meteorologia');
        clima.classList.add('btn','btn-dark','w-25','m-auto','mt-3');
        clima.innerHTML = 'Meteorologia';
        /**AGREGO EL BOTON PARA CONSULTAR LA METEOROLOGIA**/
        const meteo = document.getElementById('meteorologia');
        /**capturo el boton de meteorologia**/
        precomputada.contains(meteo) ? precomputada.removeChild(meteo):false;
        precomputada.appendChild(clima);
        /**CONSULTA DE METEOROLOGIA**/
        clima.addEventListener('click',()=>{
            /**AGREGO EL LOGO DE ESPERA**/
            wait.src = '../assets/img/wait.png';
            wait.classList.add('m-auto');
            wait.style.position ='relative';
            wait.style.transition ='transform 3s ease-out';
            clima.appendChild(wait);
            setTimeout(() => {
                wait.style.transform = 'rotate(720deg)';
            }, 100);
            /**llamo a la funcion de consulta de meteorologia**/
            consultaMeteo(origen.icao);
            consultaMeteo(destino.icao);
            showMap(origen, destino);
        });
        
        /**DESPLAZO EL VIEW HASTA LA METEOROLOGIA**/
        clima.scrollIntoView({ behavior: "smooth" });
    }
}

function showMap(origen, destino){
    //creo el div para el mapa
    const mapa = document.createElement('div');
    mapa.classList.add('mt-2');
    mapa.setAttribute('id','map');
    mapa.style.overflow ='hidden';
    mapa.style.height = '250px';
    mapa.style.border = 'solid 2px gray';
    precomputada.appendChild(mapa);
    /*******************/
    const map = L.map('map').setView([origen.latitude,origen.longitude],10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{ maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);
    L.marker([origen.latitude,origen.longitude]).addTo(map).bindPopup(origen.icao).openPopup();
    L.marker([destino.latitude,destino.longitude]).addTo(map).bindPopup(destino.icao);
    // Dibujo una linea que conecte los dos puntos
    let coordenadas = [[origen.latitude,origen.longitude], [destino.latitude,destino.longitude]];
    var linea = L.polyline(coordenadas, { color: 'red' }).addTo(map);
    // Ajustar el mapa para que muestre la línea completa
    map.fitBounds(linea.getBounds());
}