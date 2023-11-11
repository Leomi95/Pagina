document.addEventListener("DOMContentLoaded", function () {
    const reproductorSelect = document.getElementById("reproductor-select");
    const reproductor = document.getElementById("reproductor");
    const countrySelect = document.getElementById("country-select");
    const languageSelect = document.getElementById("language-select");
    const stationInfo = document.getElementById("station-info");
    const stationOrigin = document.getElementById("station-origin");

    // Listener para el cambio en la selección de país o idioma
    countrySelect.addEventListener("change", actualizarEstaciones);
    languageSelect.addEventListener("change", actualizarEstaciones);

    function actualizarEstaciones() {
        const selectedCountry = countrySelect.value;
        const selectedLanguage = languageSelect.value;

        cargarEstaciones(selectedCountry, selectedLanguage);
    }

    // Función para cargar estaciones de radio de un país y un idioma específicos
    function cargarEstaciones(country, language) {
        // Construye la URL de la API para obtener las estaciones de radio
        const apiUrl = `https://de1.api.radio-browser.info/json/stations/search?country=${country}&language=${language}&limit=15`;

        // Realiza una solicitud a la API
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Limpia el selector de estaciones de radio
                reproductorSelect.innerHTML = "";

                // Asegúrate de que la respuesta incluya estaciones
                if (data && data.length > 0) {
                    // Llena el selector con las estaciones disponibles
                    data.slice(0, 20).forEach(station => {
                        const option = document.createElement("option");
                        option.value = station.url;
                        option.textContent = station.name;
                        reproductorSelect.appendChild(option);
                    });
                } else {
                    console.error(`No se encontraron estaciones de radio para ${country} y el idioma ${language}.`);
                }
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }

    // Listener para el cambio en la selección de estación de radio
    reproductorSelect.addEventListener("change", function () {
        const selectedStation = reproductorSelect.value;
        reproductor.src = selectedStation;
        reproductor.play(); // Inicia la reproducción automáticamente

        // Muestra la información de la página/origen de la radio seleccionada
        stationOrigin.textContent = obtenerOrigen(selectedStation);
    });

    // Función para obtener el origen de la radio desde la URL
    function obtenerOrigen(url) {
        // Puedes personalizar esta lógica según la estructura de tus URLs
        // En este ejemplo, simplemente extraemos el dominio
        const urlObj = new URL(url);
        return urlObj.hostname;
    }

    // Carga inicial de estaciones de radio
    cargarEstaciones("", "");
});


//Codigo para estilo----------------------------------------------------------------------------------------
const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");  });

    document.addEventListener("DOMContentLoaded", function () {
        const accordionLabels = document.querySelectorAll('.aside .accordion label');
    
        accordionLabels.forEach(function (label) {
            label.addEventListener('click', function () {
                const panel = this.nextElementSibling;
                panel.classList.toggle('active');
    
                // Cerrar otros paneles abiertos
                accordionLabels.forEach(function (otherLabel) {
                    if (otherLabel !== label) {
                        otherLabel.nextElementSibling.classList.remove('active');
                    }
                });
            });
        });
    });

    
//seleccion por lenguaje---------------------------------------------------------------------------------------------
