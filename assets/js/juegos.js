const generateJuegoCard = ({ img, name, descrip, precio, fecha, stock }) => {
  return `
    <div class="col">
      <div class="card">
        <img src="${img}" class="card-img-top" alt="${name}">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <p class="card-text">${descrip}</p>
          <p class="card-text"> Precio: CLP$   ${precio}</p>
          <p class="card-text"> Fecha de lanzamiento : ${fecha}</p>
          <p class="card-text"> Stock: ${stock}</p>
          <a href="#" class="btn btn-primary comprar-btn" data-name="${name}">Ver juego</a>
          <a href="#" class="btn btn-primary comprar-btn" data-name="${name}" data-precio="${precio}">Agregar al carrito</a>
        </div>
      </div>
    </div>
  `;
};

// Función para obtener los juegos desde la API y renderizar las tarjetas
const sanitizeJSON = (text) => {
  // Remueve caracteres de control no permitidos en JSON
  return text.replace(/[\u0000-\u001F\u007F-\u009F]/g, "");
};

const obtenerYRenderizarJuegos = async () => {
  try {
    const response = await fetch('https://run.mocky.io/v3/3bb5d67c-2576-4f39-b52b-2ba8a280e069 ');
    if (!response.ok) {
      throw new Error('La solicitud falló');
    }
    const text = await response.text(); // Obtiene el texto de la respuesta
    const sanitizedText = sanitizeJSON(text); // Sanitiza el texto
    let juegos;
    try {
      juegos = JSON.parse(sanitizedText); // Intenta parsear el JSON
    } catch (e) {
      throw new Error('Error al parsear el JSON: ' + e.message);
    }
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

  // Agregar event listeners a los botones de agregar al carrito
  document.querySelectorAll('.agregar-btn').forEach((button) => {
    button.addEventListener('click', (event) => {
      const juegoName = event.currentTarget.getAttribute('data-name');
      // Aquí puedes agregar la lógica para agregar el juego al carrito
      alert(`¡${juegoName} ha sido agregado al carrito!`);
    });
  });
};

// Mostrar todos los juegos al cargar la página
obtenerYRenderizarJuegos();
