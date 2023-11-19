function popUp(timer){
    // Selector del elemento principal del popup
let pop_modal_container = document.querySelector('.fixed-container-popup');

// Asincronismo para mostrar el popup en 7s 
setTimeout(() => {
    console.log(timer)
    if (localStorage.getItem("popup_expo_colecciones")!= "ready") {
        pop_modal_container.dataset.popup_show="true";
    }
}, timer*1000);


// Seleccion de elemento de para poder cerrar el popup
let btn_cerrar = document.querySelector('#close');

btn_cerrar.addEventListener("click", () => {
    pop_modal_container.dataset.popup_show="false";
    pop_modal_container.remove();

    localStorage.setItem("popup_expo_colecciones", "ready");
})
}

popUp(12);