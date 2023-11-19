function slide(tiempo) {
    // declaracion de variables
    var myCarousel = document.querySelector('#mainCarrousel')
    var carousel = new bootstrap.Carousel(myCarousel, {
        interval: tiempo,
        wrap: true,
        touch: true
    })

    // Selectores importantes para el slider
    let btnNext = document.querySelector('#mainCarrousel .next');
    let btnBack = document.querySelector('#mainCarrousel .back');

    // Accionadores de eventos 
    btnNext.addEventListener('click', () => {
        carousel.next()
    });
    btnBack.addEventListener('click', () => {
        carousel.prev()
    });


    // Creador de los elementos tipo click 
    let indicadoresPosicion = document.querySelectorAll("#mainCarrousel .carousel-inner .carousel-item");

    // Contenedor de los indicadores de posicion
    let contenedorIndicadores = document.querySelector('.container-indicators');


    // Sentencia para crear el indicador de posicion
    indicadoresPosicion.forEach((element, index) => {
        contenedorIndicadores.innerHTML +=
            `<span class="indicador" data-number-position="${index}"></span>`
    });

    // definir indicadores de posicion 
    let slidePosition = document.querySelectorAll('.container-indicators .indicador');

    // Añadir clase por defecto
    document.querySelector('.container-indicators .indicador').classList.add("active")




    // Obtener el indicador de posicion
    myCarousel.addEventListener('slide.bs.carousel', (e) => {
        // Resetear clases 
        slidePosition.forEach((element, index) => {
            element.classList.remove("active");
        });
        document.querySelector(`[data-number-position="${e.to}"]`).classList.add("active");
    })

    // Ejecutar evento de mover slide
    window.addEventListener('click', (element) => {
        if (element.target.classList.contains("indicador")) {
            carousel.to(element.target.dataset.numberPosition)
        }
    })

    // Validar si solo contiene un item
    if (indicadoresPosicion.length < 2) {
        contenedorIndicadores.style.display = "none";
        indicadoresPosicion.style.display = "none";
        btnNext.style.display = "none";
        btnBack.style.display = "none";

    }
}

slide(4000);