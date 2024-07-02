const formNuevaAeronave = document.getElementById('nuevaAeronave');
const card = document.querySelector('.card');
card.style.backgroundColor = '#4D658D';
card.style.color = '#FFFFFF';
const fondo = document.body;
fondo.style.backgroundColor ='#051938';
///CREACION DE UNA AERONAVE DESDE EL FORM
formNuevaAeronave.addEventListener('submit',(e)=>{
    e.preventDefault();
    const informacion = new FormData(formNuevaAeronave);
    // convierto en objeto la informacion del FormData
    const objeto = {};
    informacion.forEach((value,key)=>{
        objeto[key]=value;
    });
    //Desestructuro el objeto
    const {modelo,tripulantes, pasajeros,consumo,mtow,vacio,fuel}= objeto;
    //utilizo la clase aeronave para crear el nuevo objeto
    const nuevaAeronave = new Aeronave(modelo,tripulantes,pasajeros,consumo,mtow,vacio,fuel);
    const nueva = JSON.stringify(nuevaAeronave);
    let hangarLS = JSON.parse(localStorage.getItem('aeronavesLS'));
    //UTILIZO EL OPERADOR NULLISH PARA CHEQUEAR SI EL ARREGLO ES NULL
    hangarLS ?? cargaInicial();
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
