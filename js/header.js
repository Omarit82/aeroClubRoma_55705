/*********************TITULO****************************/
const titulo = document.createElement('h1');
const linkTitulo = document.createElement('a');
linkTitulo.style.textDecoration = 'none';
linkTitulo.classList.add('text-center','m-5');
linkTitulo.setAttribute('href','index.html');
linkTitulo.appendChild(titulo);
titulo.innerHTML ='Peso y Balanceo - Aero Club Roma';
const contenedorTitulo = document.querySelector('.header_titulo');
contenedorTitulo.appendChild(linkTitulo);
contenedorTitulo.style.backgroundColor ='#032436';
