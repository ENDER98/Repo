// abrir y cerrar el drawer
const drawer = document.getElementById('drawer');
const menuToggle = document.getElementById('menu-toggle');

menuToggle.addEventListener('click', () => {
    drawer.classList.toggle('open');
})

// Cambiar entre tabs de habilidades
 const tabs = document.querySelectorAll('.tab-link');
 const tabPanes = document.querySelectorAll('.tab-pane');

 tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        //remover de active de todos los tab
        tabs.forEach(t => t.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));

        // agregar active a el tab y pane seleccionado|
        tab.classList.add('active');
        document.getElementById(tab.dataset.tab).classList.add('active');

    });
 })



 // consultar lista de categorias por API

 function consultarCategorias() {
    fetch('http://localhost:5000/categorias')
        .then(respuesta => respuesta.json())
        .then(data => {
            const listaCategorias = document.getElementById('categorias-lista');
            listaCategorias.innerHTML = '';
            data.forEach(categoria => {
                const li = document.createElement('li');
                li.textContent = categoria.nombre;
                listaCategorias.appendChild(li);
            });
        })
        .catch(error => console.error('Error al consultar categorías:', error));
 }

 consultarCategorias();


 // crear categoria
 // abrir modal

 const modal = document.getElementById('modal');
 const abrirModalBtn = document.getElementById('abrirModal');
 const cerrarModalBtn = document.querySelector('.close');

 abrirModalBtn.addEventListener('click', () => {
     modal.style.display = 'flex';
 });

cerrarModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});


// funcion para traer valores de cookies
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

//agregar categoria por api

document.getElementById('agregarCategoria').addEventListener('click', () => {
    const nuevaCategoria = document.getElementById('nuevaCategoria').value;

    const formDataAdd = new FormData();
    formDataAdd.append("nombre", nuevaCategoria);
    const csrftoken = getCookie("csrftoken");

    if (nuevaCategoria) {

        fetch('http://localhost:5000/categorias/agregar', {
            method: 'POST',
            headers :{
                "X-CSRFToken": csrftoken,
            },
            body: formDataAdd,
        })
        .then(respuesta => respuesta.json())
        .then(() => {
            consultarCategorias();
            modal.style.display = 'none';
        })
        .catch(error => console.error('Error al agregar categoría:', error));

    } else {
        alert('Por favor, ingrese un nombre para la categoría');
    }


})