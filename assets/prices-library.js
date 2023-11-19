/* 
@ Author: José Antonio Amaya
@ Owner: Jamar Panama
@ Decription: Library to extract information from the prices API

 */

const PricesService = {
    dataPayload:
    {
        "agency": "C2",
        "groups": [
            "A",
            "G"
        ],
        "skus": [
            "7015842"
        ],
        "fees": [
            "16"
        ],
        "saleTypes": [
            "TJ"
        ]
    },
    /**  
    * Definición de los diferentes campos y variables que se usaran en el payload de precios
    * @dataPayload - JSON object con las siguientes claves
    *   @Agency -> String 
    *   @groups -> Array
    *   @skus -> Array
    *   @fees -> Array 
    *   @saleTypes -> Array 
    */



    getPrices: function (param) {

        let skus = document.querySelectorAll('[data-mosaic-sku]');
        let arr = [];
        skus.forEach(element => {
            arr.push(element.dataset.mosaicSku)
        });


        fetch("https://8wrhzmlo68.execute-api.us-east-1.amazonaws.com/api/v1/JP/prices", {
            method: "POST",
            body: JSON.stringify({
                "agency": "C2",
                "groups": [
                    "A",
                    "G"
                ],
                "skus":
                    arr
                ,
                "fees": [
                    param
                ],
                "saleTypes": [
                    "TJ"
                ]
            }),
            headers:
                { "Content-Type": "application/json" }
        })
            .then(res => { return res.text() })
            .then(data => {

                let sk = new Array; //Creacion de la variable local para manejar los arreglos de skus que se muestran en la pantalla

                JSON.parse(data).forEach(element => {
                    sk.push(element.sku)
                });



                let model = { datos: JSON.parse(data), elementos: arr, dataSku: sk, parent: skus }
                return model;
            })
            .then(arr => {
                arr.parent.forEach(element => {
                    if (arr.dataSku.includes(element.dataset.mosaicSku)) {
                        let country = arr.datos.find(el => el.sku == element.dataset.mosaicSku);
                        element.querySelector(".container-cuota--mosaic").innerHTML = `<b>${country.precios[0].data.cuota_sem}</b> semanales x ${param} meses con<img src="https://cdn.shopify.com/s/files/1/0516/5478/7271/files/credijamar.svg?v=1673904540" alt="">`;

                    } else {
                        element.innerHTML += "Promociones";
                    }
                });
            })

    }
};


if (window.location.href ==  "https://www.jamar.com.pa/pages/oferta-10-meses-0-de-interes") {
PricesService.getPrices(10);
} else {PricesService.getPrices(24);}


/**
* MODULO PARA FILTROS DE INFORMACION
* 
*
*/

const filtrosInformacion = {
    filtrar: function (elemento) {
        // alert(elemento.dataset.filter)
        let filters = document.querySelectorAll(`[data-product-tags]`)
        filters.forEach(element => { element.style.display = "none"; })
        filters.forEach(element => {
            // alert(element.dataset.productTags.search(elemento.dataset.filter))
            if (element.dataset.productTags.search(elemento.dataset.filter) >= 0) {
                element.style.display = "block";
            }
        });
        document.querySelectorAll(".load-animation").forEach(element => {
            element.style.display = "block";
        });

        setTimeout(() => {
            document.querySelectorAll(".load-animation").forEach(element => {
                element.style.display = "none";
            });
        }, 600);

    }
}


window.addEventListener("click", (e) => {
    document.querySelectorAll(".filter--action").forEach(element => {
        if (element.classList.contains("active")) {
            element.classList.remove("active")
        }
    });
    if (e.target.classList.contains("filter--action")) {
        e.target.classList.add("active")
        filtrosInformacion.filtrar(e.target);
    }
})




