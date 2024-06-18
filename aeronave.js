const formNuevaAeronave = document.getElementById('nuevaAeronave');
formNuevaAeronave.addEventListener('submit',(e)=>{
    e.preventDefault();
    const informacion = new FormData(formNuevaAeronave);
    const arreglo = [...informacion ];
    const nuevaAeronave = new Aeronave(arreglo[0][1],parseFloat(arreglo[1][1]),parseFloat(arreglo[2][1]),parseFloat(arreglo[3][1]),parseFloat(arreglo[4][1]),parseFloat(arreglo[5][1]),parseFloat(arreglo[6][1]));
    const nueva = JSON.stringify(nuevaAeronave);
    localStorage.setItem('avion_'+localStorage.length,nueva);
    formNuevaAeronave.reset()
    Swal.fire({
        icon: "success",
        title: "Aeronave Salvada!",
        html: `<p>A guardado la aeronave: ${informacion.get('modelo')} al localStorage</p>`,
        footer: '<a href="index.html">HOME</a>',
        timer: 3000
    });
    setTimeout(() => {
        window.location.assign('index.html');
    }, 4000);
    
})
