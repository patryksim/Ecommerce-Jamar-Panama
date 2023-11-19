(function () {
    // Definicion de variables
    let formWebToLead = document.querySelector(".form-webtolead");
    let urlSalesForce = "https://ihoffgzow6.execute-api.us-east-1.amazonaws.com/Stage/v1/api_lead_sf";
    async function saveDataWebToLead(data) {
        let fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(data)
        }
        let response = await fetch(urlSalesForce, fetchOptions);
        return response.json();
    }

    formWebToLead.addEventListener("submit",(e) => {
        e.preventDefault();
        let dataSalesForce = {
            "apellidos": `${formWebToLead.querySelector("#name").value}`,
            "origen": "Web Site",
            "correoElectronico": formWebToLead.querySelector("#email").value,
            "empresa": "JP",
            "nomPais": "Panama",
            "descripcion": formWebToLead.id
        }
        
        if(formWebToLead.querySelector("#email").value !== "" && formWebToLead.querySelector("#name").value !== ""  ) {
            saveDataWebToLead(dataSalesForce).then(res => console.log(res)).catch(err => console.error(err));
            formWebToLead.submit();
        }
    })
  })();