// Función mejorada para generar el HTML de una tarjeta de juegos
const generateJuegoCard = ({ img, name, descrip ,precio,fecha ,stock }) => {
  return `
    <div class="card col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12 mb-5">
        <img src="${img}" class="card-img-top" alt="">
        <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <h5 class="card-title">${descrip}</h5>
            <h5 class="card-title">${precio}</h5>
            <h5 class="card-title">${fecha}</h5>
            <h5 class="card-title">${stock}</h5>
            <button class="btn btn-primary"><i class="fa-solid fa-cart-shopping"></i>&nbsp;Comprar</button>
        </div>
    </div>
  `;
};

// Función para obtener los juegos desde la API y renderizar las tarjetas
const obtenerYRenderizarJuegos = async () => {
  try {
    const response = await fetch('https://run.mocky.io/v3/8f3b2231-c749-4d57-8219-b781359919ae');
    if (!response.ok) {
      throw new Error('La solicitud falló');
    }
    const juegos = await response.json();
    console.log('Data de la API:', juegos); // Mostrar los datos de la API en la consola
    renderJuegos(juegos); // Llama a la función renderJuegos para mostrar las tarjetas
  } catch (error) {
    console.error('Error:', error);
  }
};

// Función para renderizar las tarjetas de juegos y almacenarlas en localStorage
const renderJuegos = (juegos) => {
  const contenedor = document.getElementById("contenedorJuego");
  contenedor.innerHTML = ""; // Limpiar el contenedor antes de renderizar las tarjetas
  juegos.forEach((juego) => {
    const cardHTML = generateJuegoCard(juego); // Genera el HTML de la tarjeta para cada juego
    contenedor.innerHTML += cardHTML; // Agrega la tarjeta al contenedor

    // Almacenar el juego en localStorage con una clave única
    localStorage.setItem(juego.name + Math.random(), JSON.stringify(juego));
  });
};

// Mostrar todos los juegos al cargar la página
obtenerYRenderizarJuegos();

