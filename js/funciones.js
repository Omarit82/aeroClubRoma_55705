/*CARGA Y MUESTRA EN EL DOM LA TABLA DE AERONAVES.*/ 
function muestraHome(){
    flota.classList.remove('d-none');

    /*CARGO LAS AERONAVES POR DEFECTO DESDE LA API EN MOCKAPI Y LOS GUARDO EN EL LOCAL STORAGE.*/
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
        let contador=1;
        for(const avion of aviones) {
            let index = document.createElement('th');
            index.setAttribute('scope','col');
            index.innerHTML=contador;
            let tr = document.createElement('tr');
            //boton de seleccion inicialmente invisible
            let bn = document.createElement('button');
            bn.textContent='Seleccionar';
            bn.classList.add('btn','btn-primary','d-none','mb-1');
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
/**FUNCION PARA ELIMINAR AVINOES DE LA LISTA**/
function erase(id){
    let ident = id.split('_');
    (parseInt(ident[1]) <= 3) ?  alertaEraseDefault() : eraseAvion(parseInt(ident[1]));
}
/**FUNCION QUE DISPARA EL ALERT POR INTENTAR ELIMINAR LAS AERONAVES POR DEFECTO**/
function alertaEraseDefault(){
    Swal.fire({
        icon: "error",
        title: "No pueden eliminarse las aeronaves por defecto",
        timer: 2500
    });
}
/**ELIMINA UN AVION SEGUN SU INDEX**/
function eraseAvion(index){
    index = index-4;
    let hangar =JSON.parse(localStorage.getItem('aeronavesLS'));
    hangar = hangar.filter((_,i)=> i !== index);
    localStorage.setItem('aeronavesLS',JSON.stringify(hangar));
    Swal.fire({
        icon: "success",
        title: "Aeronave Eliminada!",
        timer: 2000
    });
    setTimeout(() => {
        window.location.assign('index.html');
    }, 2000);
}
/**FUNCION QUE TRUNCA A DOS DECIMALES UN VALOR INGRESADO**/
function truncaDosDecimales(valor){
    let resultado = 100*valor;
    resultado = Math.floor(resultado)/100;
    return resultado;
}

