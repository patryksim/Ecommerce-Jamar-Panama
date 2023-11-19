/***************************************************************
*                    LANDING DE COBROS
*         			PATRYKSIM@GMAIL.COM
****************************************************************/

const carteraSteps = document.getElementById("cartera-steps");
const carteraForm = document.querySelectorAll("#cartera-form");
const nombre = document.getElementById("nombre");
const tipoDocumento = document.getElementById("tipo_documento");
const labelnroDocumento = document.querySelector(`[for="nro_documento"]`);
const nroDocumento = document.getElementById("nro_documento");
const warningCedula = document.getElementById("documento-warning");
const step1 = document.getElementById("step-1");
const step2 = document.getElementById("step-2");
const btnStep1 = document.getElementById("btn-step-1");
const loader = '<div class="sweet_loader"><img src="https://cdn.shopify.com/s/files/1/0516/5478/7271/files/ajax-loader.gif?v=1677523040"></div>';
const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
const today = new Date();
const ano = today.getFullYear();
const mesTexto = meses[today.getMonth()-1];
const mes = today.getMonth();
const utlimoDia = new Date(ano, mes, 0).getDate();
const clientNombre = document.querySelectorAll(`[data-client="nombre"]`);
const clientNumcontrato = document.querySelectorAll(`[data-client="num-contrato"]`);
const clientDiafirma = document.querySelector(`[data-client="dia-firma"]`);
const clientMesfirma = document.querySelector(`[data-client="mes-firma"]`);
const clientAnofirma = document.querySelector(`[data-client="ano-firma"]`);
const clientCapital = document.querySelector(`[data-client="capital"]`);
const clientIntereses = document.querySelector(`[data-client="intereses"]`);
const clientGastocobranza = document.querySelector(`[data-client="gastos-cobranza"]`);
const clientOtrosGastos = document.querySelector(`[data-client="otros-gastos"]`);
const dateDia = document.querySelector(`[data-date="dia"]`);
const dateMes = document.querySelector(`[data-date="mes"]`);
const dateAno = document.querySelector(`[data-date="ano"]`);
const exitSection = document.getElementById("exit-section");

habilitar = function(){
  if(nroDocumento.value != "" && nroDocumento.value != null) {
    btnStep1.disabled = false;
  } else {
    btnStep1.disabled = true;
  }
}

function warningShow() {
  warningCedula.classList.remove("visually-hidden");
  nroDocumento.classList.remove("mb-4");
  nroDocumento.classList.add("mb-1");
}
function warningHide() {
  warningCedula.classList.add("visually-hidden");
  nroDocumento.classList.remove("mb-1");
  nroDocumento.classList.add("mb-4");
}

/*cambiarMask = function() {
  switch(tipoDocumento.value) {
    case "cedula_nacional":
      Inputmask({ mask: "9-999-999" }).mask(nroDocumento);
      break;
    case "cedula_extranjera":
      Inputmask({ mask: "E-9-999999" }).mask(nroDocumento);
      break;
    default:
      Inputmask({ mask: "" }).mask(nroDocumento);
  }
}*/

/*nombre?.addEventListener("change", () => { habilitar() });
nombre?.addEventListener("keyup", () => {  habilitar() });*/
tipoDocumento?.addEventListener("change", () => {  habilitar() });
nroDocumento?.addEventListener("change", () => {  habilitar() });
nroDocumento?.addEventListener("keyup", () => {  habilitar() });

btnStep1?.addEventListener("click", () => {

  Swal.fire({
    html: '<h2 class="text-center text-gris-jamar mb-4">Falta poco para terminar, estamos validando tu información</h2>',
    showConfirmButton: false,
    allowOutsideClick: false,
    willOpen: () => {
      $('.swal2-content').append(loader);
    },
  })
  
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  fetch(`https://prd.appsjamar.com/cartera/infocobroclientepan/v1/wallet/list-info-client/JP/${nroDocumento.value}`,
      requestOptions)
  .then(response => response.text())
  .then(result => {
    Swal.close()
    warningHide()
    result = JSON.parse(result) 
    let data = result.body?.data[0]
    console.log(data)
    clientNombre.forEach(i => {
      i.innerHTML = `${data.PRIMER_NOMBRE} ${data.PRIMER_APELLIDO}`
    });
    clientNumcontrato.forEach(i => {
      i.innerHTML = `${data.CUENTA}`
    });
    clientDiafirma.innerHTML = `${data.DIA}`
    clientMesfirma.innerHTML = `${meses[Number(data.MES)-1]}`
    clientAnofirma.innerHTML = `${data.ANNO}`
    clientCapital.innerHTML = `${data.SALDO}`
    clientIntereses.innerHTML = `${data.INTERES_MORA}`
    clientGastocobranza.innerHTML = `${data.GASTOS_COBRANZA}`
    clientOtrosGastos.innerHTML = `${data.HONORARIOS}`
    step1.classList.add('visually-hidden')
    step2.classList.remove('visually-hidden')
  })
  .catch(error => {
    Swal.close()
    step1.classList.add('visually-hidden')
    exitSection.classList.remove('visually-hidden')
  });

})

dateDia.innerHTML = utlimoDia;
dateMes.innerHTML = mesTexto;
dateAno.innerHTML = ano;





