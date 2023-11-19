(function () {
    // Definicion de variables

    if (document.querySelector("#input-search") != "Undefined") {
    
    let searchInput = document.querySelector("#input-search");
    let result = document.querySelector(".text-results");

    if (document.querySelector("#buscador-inventario")){
        document.querySelector("#buscador-inventario").addEventListener("click", function() {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
    
            var raw = JSON.stringify({
            "agency": "99",
            "project": 10,
            "apply": [
                "C",
                "A"
            ],
            "department": "08",
            "city": "06",
            "neighborhood": "350",
            "products": [
                {
                "sku": searchInput.value,
                "quantity": 1
                }
            ]
            });
    
            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };
    
            fetch("https://3plmmfv3i1.execute-api.us-east-1.amazonaws.com/api/v1/products/publishing", requestOptions)
            .then(response => response.json())
            .then(data =>{
                let sku = Object.keys(data)[0];
                result.textContent= data[sku] == true ? result.style.color="#000" : result.style.color="red";
                result.textContent= data[sku] == true ? "Tiene stock" : "No tiene stock";
            })
            .catch(error => console.log('error', error));
                })
            }
    }

    if (document.querySelector(".template-product")) {
            let sku = document.querySelector(".product-sku").textContent;
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
    
            var raw = JSON.stringify({
            "agency": "99",
            "project": 10,
            "apply": [
                "C",
                "A"
            ],
            "department": "08",
            "city": "06",
            "neighborhood": "350",
            "products": [
                {
                "sku": sku,
                "quantity": 1
                }
            ]
            });
    
            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };
    
            fetch("https://3plmmfv3i1.execute-api.us-east-1.amazonaws.com/api/v1/products/publishing", requestOptions)
            .then(response => response.json())
            .then(data =>{
                let sku = Object.keys(data)[0];
                result= data[sku] == true ? "tiene" : "no-tiene";
                if(result == "no-tiene") {
                    document.querySelector(".btn-credito").classList.add("disabled");
                    document.querySelector(".btn-credito").textContent = "Agotado";
                    document.querySelector(".btn-credito").style.display = "none";
                    document.querySelector(".btn-contado").classList.add("disabled");
                    document.querySelector(".btn-contado").classList.add("mt-3");
                    document.querySelector(".atc-button--text").textContent = "Agotado";
                }
            })
            .catch(error => console.log('error', error));
    }


  })();