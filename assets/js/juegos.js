// Función mejorada para generar el HTML de una tarjeta de juegos
const generateJuegoCard = ({ img, name, descrip, precio, fecha, stock }) => {
  return `
    <div class="card col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12 mb-5">
        <img src="${img}" class="card-img-top" alt="${name}">
        <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text">${descrip}</p>
            <p class="card-text">Precio: ${precio}</p>
            <p class="card-text">Fecha: ${fecha}</p>
            <p class="card-text">Stock: ${stock}</p>
            <button class="btn btn-primary comprar-btn" data-name="${name}">Ver juego</button>
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

  // Agregar event listeners a los botones de comprar
  document.querySelectorAll('.comprar-btn').forEach((button) => {
    button.addEventListener('click', (event) => {
      const juegoName = event.currentTarget.getAttribute('data-name');
      // Redireccionar al detalle del juego seleccionado
      window.location.href = `juego-unico.html?name=${encodeURIComponent(juegoName)}`;
    });
  });
};

// Mostrar todos los juegos al cargar la página
obtenerYRenderizarJuegos();

// Listener de evento para el campo de búsqueda
const searchInput = document.getElementById("nombre");
searchInput.addEventListener("input", async () => {
  const searchTerm = searchInput.value.trim().toLowerCase();
  try {
    const response = await fetch('https://run.mocky.io/v3/8f3b2231-c749-4d57-8219-b781359919ae');
    if (!response.ok) {
      throw new Error('La solicitud falló');
    }
    const juegos = await response.json();
    const filteredJuegos = juegos.filter((juego) =>
      juego.name.toLowerCase().includes(searchTerm)
    );
    renderJuegos(filteredJuegos); // Renderiza las tarjetas filtradas
  } catch (error) {
    console.error('Error:', error);
  }
});


