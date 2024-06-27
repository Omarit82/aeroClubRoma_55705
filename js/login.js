const login = document.getElementById('login');

login.addEventListener('click',()=>{
    /*CAPTURA EL NOMBRE DE USUARIO Y CONTRASEÑA */
    const usuario = document.getElementById('usuario').value;
    const pass = document.getElementById('usuarioPassword').value;
    /*CHEQUEO QUE NO ESTEN VACIOS*/
    if((usuario != '') && (pass != '')){
        console.log('Campos completos');
        checkUsuario(pass);
    }else{
        console.log('un campo esta vacio');
        Swal.fire({
            icon: "error",
            title: "Falta informacion en los campos",
            timer: 2000
        });
    }
    console.log(usuario+" "+pass);
})
function checkUsuario(pass){
    console.log(salt);
    try {
        const hash = 
        console.log("Hash de la contraseña:", hash.encoded);
    } catch (err) {
        console.error(err);
    }
}