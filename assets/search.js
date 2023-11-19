const getInputValues = (elem) => {
    if (elem.target.value.length > 1 ) {
        renderResults(true)
        fetch(`/search/suggest?q=${elem.target.value}&resources[type]=article&resources[options][fields]=body&section_id=predictive-search-blog`)
        .then(res => res.text())
        .then(data => {
            renderResultsHTML(data)
        })
    } else {
        renderResults(false)
    }
}

function renderResults(active){
    let htmlLoading = `<div class="loading"></div>
    <p>Cargando articulos</p>`;
    let contenedorResults = document.querySelector('.container-results');

    contenedorResults.innerHTML= htmlLoading;
    if (active){
        contenedorResults.classList.remove('not-loading')
        contenedorResults.classList.add('loading');
    } else {
        contenedorResults.classList.remove('loading')
        contenedorResults.classList.add('not-loading')
    }
}

function renderResultsHTML(data){
    let contenedorResults = document.querySelector('.container-results');
    contenedorResults.innerHTML = data;
}

function closeContainerResults(){
    let contenedorResults = document.querySelector('.container-results');
    contenedorResults.classList.add('not-loading')
}

window.addEventListener('input', (e) => {
        getInputValues(e);
});
window.addEventListener('click', (e) => {
   if(e.target.id){
    if(e.target.id == "closeSearch"){
        closeContainerResults()
    }
   }
});