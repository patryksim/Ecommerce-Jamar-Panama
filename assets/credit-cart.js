const user = 'ECOMMERCE';
var url_aws;
var url_aws2 = 'https://ihoffgzow6'
var url_aws3 = 'https://gm36tm91y3'
var url_aws4 = 'https://gv3rdv4ry3'
var url_aws5 = 'https://59o1es3b63'
var apiUrl = '.execute-api.us-east-1.amazonaws.com/api/v1'


const setEnvironment = "PRD";

const environments = {
  dev: {
    apiId: 'g2z65vi660',
    company: 'JP'
  },
  prod: {
    apiId: '8wrhzmlo68',
    company: 'JP'
  }
}

switch (setEnvironment) {
  case "DEV":
    url_aws = `https://${environments.dev.apiId}${apiUrl}/${environments.dev.company}`;
    break;
  case "PRD":
    url_aws = `https://${environments.prod.apiId}${apiUrl}/${environments.prod.company}`;
    break;
  default:
    url_aws = `https://${environments.dev.apiId}${apiUrl}/${environments.dev.company}`;
    break; 
}

tipoDocumentos().then(data => localStorage.setItem("documentos", JSON.stringify(data)))

function removeDuplicates(originalArray, prop) {
  var newArray = [];
  var lookupObject = {};

  for (var i in originalArray) {
    lookupObject[originalArray[i][prop]] = originalArray[i];
  }

  for (i in lookupObject) {
    newArray.push(lookupObject[i]);
  }
  return newArray;
}




function delteItemCredit(prd) {
  let storage = JSON.parse(localStorage.getItem("cartCredit"));
  let filterArray = storage.filter(i => i.sku != prd.sku);
  localStorage.setItem("cartCredit", JSON.stringify(filterArray));
}


$("#clear").click(() => {
  localStorage.removeItem("cartCredit");
  window.location.reload()
});






function formatNumber(num) {
  if (!num || num == 'NaN') return '-';
  if (num == 'Infinity') return '&#x221e;';
  num = num.toString().replace(/\$|\,/g, '');
  if (isNaN(num))
    num = "0";
  sign = (num == (num = Math.abs(num)));
  num = Math.floor(num * 100 + 0.50000000001);
  cents = num % 100;
  num = Math.floor(num / 100).toString();
  if (cents < 10)
    cents = "0" + cents;
  for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
    num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
  return (((sign) ? '' : '-') + num + '.' + cents);
}

function addPrductinView() {
  
 

  const producs = getCartCredit();
  let price = 0;
  let subtotal = 0;
  let cuotaTotal_6 = 0;
  let cuotaTotal_12 = 0;
  let cuotaTotal_16 = 0;
  let cuotaTotal_24 = 0;
  let cuotaTotal_40 = 0;
  var listaPrecios = 0;
  
  if (producs.length == 0) {
    $(".cartempty--container")[0].classList.remove("display-no");
  } else {
    $("#crediCartitems")[0].innerHTML ="";
    $(".cartitems--container")[0].classList.remove("display-no");
  
    producs.map(i => {
      if ( i.priceSale != 0) {
        price = i.priceSale.replace(/[$,]/g, '') * i.quantity;
        console.log(price);
      } else {
        price = i.priceFull.replace(/[$,]/g, '') * i.quantity;
      }
      $("#crediCartitems").append(`<div class="row mb-4">
          <div class="col-4 col-md-3 pr-0">
            <a href="${i.link}"><img class="img-fluid rounded" src="${i.img}"></a>
          </div>
          <div class="col-8 col-md-6">
            <a href="${i.link}"><h5 class="text-gris-jamar fw-bold mb-2 fs-md-5 fs-6">${i.title}</h5></a>
			<p class="text-gris-jamar fw-bold mb-2 d-md-none">$ ${price}</p>
            <div class="d-none d-md-block container p-0">
              <div class="row">
                <div class="col-7">
                  <p class="text-gris-jamar mb-2">Cuota semanal</p>
                </div>
                <div class="col-5 text-end">
                  <!-- p class="text-gris-jamar fw-bold mb-2 selected-meses">$ ${i.value}</p -->
                  <p class="text-gris-jamar fw-bold mb-2 6-meses visually-hidden">$ ${Number(i.cuotas.seisMeses * i.quantity).toFixed(2)}</p>
                  <p class="text-gris-jamar fw-bold mb-2 12-meses visually-hidden">$ ${Number(i.cuotas.doceMeses * i.quantity).toFixed(2)}</p>
                  <p class="text-gris-jamar fw-bold mb-2 16-meses visually-hidden">$ ${Number(i.cuotas.dieciseisMeses * i.quantity).toFixed(2)}</p>
                  <p class="text-gris-jamar fw-bold mb-2 24-meses visually-hidden">$ ${Number(i.cuotas.veinticuatroMeses * i.quantity).toFixed(2)}</p>
                  <p class="text-gris-jamar fw-bold mb-2 40-meses visually-hidden">$ ${Number(i.cuotas.cuarentaMeses * i.quantity).toFixed(2)}</p>
                </div>
              </div>
              <!--div class="row">
                <div class="col-7">
                  <p class="text-gris-jamar mb-2">Cuota de manejo</p>
                </div>
                <div class="col-5 text-end">
                  <p class="text-gris-jamar fw-bold mb-2">$ 0</p>
                </div>
              </div-->

              <div class="row">
                <div class="col-12">
                  <p class="text-gris-jamar fw-bold mb-2">Sin abono inicial</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-6 pt-3 d-md-none">
          	<p class="text-gris-jamar mb-0">Cuota semanal</p>
          </div>
          <div class="col-6 pt-3 d-md-none text-end">
            <!-- p class="text-gris-jamar fw-bold mb-2 selected-meses">$ ${i.value}</p -->
            <p class="text-gris-jamar fw-bold mb-0 6-meses visually-hidden">$ ${Number(i.cuotas.seisMeses * i.quantity).toFixed(2)}</p>
            <p class="text-gris-jamar fw-bold mb-0 12-meses visually-hidden">$ ${Number(i.cuotas.doceMeses * i.quantity).toFixed(2)}</p>
            <p class="text-gris-jamar fw-bold mb-0 16-meses visually-hidden">$ ${Number(i.cuotas.dieciseisMeses * i.quantity).toFixed(2)}</p>
            <p class="text-gris-jamar fw-bold mb-0 24-meses visually-hidden">$ ${Number(i.cuotas.veinticuatroMeses * i.quantity).toFixed(2)}</p>
            <p class="text-gris-jamar fw-bold mb-0 40-meses visually-hidden">$ ${Number(i.cuotas.cuarentaMeses * i.quantity).toFixed(2)}</p>
          </div>
          <div class="col-12 d-md-none">
            <p class="text-gris-jamar fw-bold mb-0">Sin abono inicial</p>
          </div>
          <div class="col-6 d-md-none">
            <select class="form-select rounded-pill w-50 mt-2 select-number-${i.sku}" onchange="changeCantidades(${i.sku},value)" id="" aria-label="example">
              <!--option class="d-none" value="${i.quantity}" selected>${i.quantity}</option-->
			  <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10+</option>
            </select>
          </div>
          <div class="col-6 d-md-none text-end align-self-center">
          	<p class="text-gris-jamar m-0"><i class="fa-regular fa-trash-can"></i> <span class="text-decoration-underline removeItems" id="${i.sku}" style="cursor: pointer;">Eliminar</span></p>
          </div>
          <div class="col-3 text-end d-none d-md-block">
            <a href=""><h5 class="text-gris-jamar fw-bold mb-2">$ ${price}</h5></a>
            <select class="form-select rounded-pill w-50 ml-auto mr-0 mt-4 mb-4 select-number-${i.sku}" onchange="changeCantidades(${i.sku},value)" id="" aria-label="example">
              <!--option class="d-none" value="${i.quantity}" selected>${i.quantity}</option-->
			  <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10+</option>
            </select>
            <p class="text-gris-jamar"><i class="fa-regular fa-trash-can"></i> <span class="text-decoration-underline removeItems" id="${i.sku}" style="cursor: pointer;">Eliminar</span></p>
          </div>
        </div>`);
      
      //temPrice = price.replace(/[$,]/g, '');
      //temCuotasemanal = Number(i.value);
      subtotal = subtotal + Number(price);
      //cuotaSemanal = cuotaSemanal + Number(temCuotasemanal);
      cuotaTotal_6 = cuotaTotal_6 + Number(i.cuotas.seisMeses * i.quantity);
      cuotaTotal_12 = cuotaTotal_12 + Number(i.cuotas.doceMeses * i.quantity);
      cuotaTotal_16 = cuotaTotal_16 + Number(i.cuotas.dieciseisMeses * i.quantity);
      cuotaTotal_24 = cuotaTotal_24 + Number(i.cuotas.veinticuatroMeses * i.quantity);
      cuotaTotal_40 = cuotaTotal_40 + Number(i.cuotas.cuarentaMeses * i.quantity);

      let priceList = parseFloat(i.priceFull.replace(",", "").replace("$", ""));
      listaPrecios = listaPrecios + priceList;
      $("#priceTotaltop").text(`$${formatNumber(listaPrecios)}`);
      $("#priceTotalbotton").text(`$${formatNumber(listaPrecios)}`);
	  $(`.select-number-${i.sku}`)[0].value=`${i.quantity}`;
      $(`.select-number-${i.sku}`)[1].value=`${i.quantity}`;


      $(".removeItems").click((e) => {
        console.log(e.target.id);
        console.log(typeof e.target.id);
        if (typeof e.target.id == "string") {
          let storage = JSON.parse(localStorage.getItem("cartCredit"))
          let newArr = storage.filter(i => i.sku != e.target.id);
          if (newArr.length == 0) {
            localStorage.removeItem("cartCredit");
          } else {
            localStorage.setItem("cartCredit", JSON.stringify(newArr))
          }
          $(".cartitems--container")[0].classList.add("display-no");
          addPrductinView();
          //window.location.reload()
        }

      })
    })
    if (producs.length==1){
      $("#summary .cantidad-productos")[0].innerHTML=`${producs.length} PRODUCTO`;
    } else {
      $("#summary .cantidad-productos")[0].innerHTML=`${producs.length} PRODUCTOS`;
    }
    
    $(`.${cuotaSelect.value}-meses`).map(function() {
      return this.classList.remove('visually-hidden');
    })
    $("#summary .subtotal")[0].innerHTML= "$ " + subtotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") ;
    $("#summary .cuotatotal.6-meses")[0].innerHTML= "$ " + cuotaTotal_6.toFixed(2) ;
    $("#summary .cuotatotal.12-meses")[0].innerHTML= "$ " + cuotaTotal_12.toFixed(2) ;
    $("#summary .cuotatotal.16-meses")[0].innerHTML= "$ " + cuotaTotal_16.toFixed(2) ;
    $("#summary .cuotatotal.24-meses")[0].innerHTML= "$ " + cuotaTotal_24.toFixed(2) ;
    $("#summary .cuotatotal.40-meses")[0].innerHTML= "$ " + cuotaTotal_40.toFixed(2) ;

  }


}

function changeCantidades(sku,value) {
  //let itemsArr = e.target.value.split("-");
  //let itemsArr = e.target.value;
  let storage = JSON.parse(localStorage.getItem("cartCredit"))
  let nwArr = [];
  storage.map(i => {
    if (i.sku == sku) {
      i.quantity = parseInt(value);
      nwArr.push(i)
    } else {
      nwArr.push(i);
    }
  });
  localStorage.setItem("cartCredit", JSON.stringify(nwArr));
  addPrductinView();
  //window.location.reload()
};

$(document).ready(function () {
  if ($(".cartitems--container") != null) {
    addPrductinView();
  } 
})

/*****************************************
*    CONSULTAR TIPOS DE DOCUMENTOS
*		    ANTONYTRIANA@GMAIL.COM
******************************************/
function tipoDocumentos() {
  return new Promise((resolve, reject) => {
    fetch(`${window.url_aws}/doc-type`)
      .then(response => response.json())
      .then(data => {
        resolve(data.filter(doc => {
          if (doc.tipo == "CC" || doc.tipo == "41") {
            return doc
          }
        }))
      })
      .catch(err => reject(err));
  })
}

/***************************************************************
*                        CREDIJAMAR
*                   ANTONYTRIANA@GMAIL.COM
****************************************************************/

window.onload = function () {
  getDocTypes();
}

// DECLARACIONES
let newUser = false;
let listaOcupaciones = [];
let productos;
let objVisor = {
  "internal_id": "",
  "c_emp": "JP",
  "tipo_doc": "",
  "desc_doc": "",
  "documento": "",
  "primer_nombre": "",
  "segundo_nombre": "",
  "primer_apellido": "",
  "segundo_apellido": "",
  "celular": "",
  "correo": "",
  "ocupacion": "",
  "actividad_cargo": "",
  "ingresos": "",
  "agencia_seleccionada": "",
  "canal_venta": "distancia",
  "url_foto": "",
  "province": "",
  "province_desc": "",
  "city": "",
  "city_desc": "",
  "township": "",
  "township_desc": "",
  "address": "",
  "indications": "",
  "c_est": "",
  "empresa": "",
  "uuid": "",
  "segmento": "",
  "nro_op": "",
  "age_est": "",
  "tipoempresa": "-1"
};
let params = Object.fromEntries(new URLSearchParams(window.location.search).entries());
if (params.gclid){
  localStorage.setItem("gclid", String(params.gclid));
  objVisor.gclid = localStorage.getItem('gclid');
}
if (localStorage.getItem('gclid')){
  objVisor.gclid = localStorage.getItem('gclid');
}
let obj_form = {}
let obj_form_f = []
// SELECTORES
const credijamarSteps = document.getElementById("credijamar-steps");
const cuotaSelect = document.getElementById("cuotaSelect");
const step1 = document.getElementById("step-1");
const step2 = document.getElementById("step-2");
const step21 = document.getElementById("step-2-1");
const step22 = document.getElementById("step-2-2");
const step23 = document.getElementById("step-2-3");
const step3 = document.getElementById("step-3");
const imgStep3viable = document.getElementById("img-step-3-viable");
const imgStep3noViable = document.getElementById("img-step-3-no-viable");
const imgStep3Amarillo = document.getElementById("img-step-3-amarillo");
const imgStep3Amarillooro = document.getElementById("img-step-3-amarillo-oro");
const imgStep3Amarilloverde = document.getElementById("img-step-3-amarillo-verde");
const step4 = document.getElementById("step-4");
const step5 = document.getElementById("step-5");
const step6 = document.getElementById("step-6");
const step7 = document.getElementById("step-7");
const step8 = document.getElementById("step-8");


const progressBar1 = document.getElementById("progress-bar-1");
const progressBar2 = document.getElementById("progress-bar-2");

const inputs = document.querySelectorAll("#credijamar-form");
const tipoDocumento = document.getElementById("tipo_documento");
const cedula = document.getElementById("cedula");
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const segundo_nombre = document.getElementById("segundo_nombre");
const segundo_apellido = document.getElementById("segundo_apellido");
const celular = document.getElementById("celular");
const celularCampo = document.getElementById("form-field__celular");
const email = document.getElementById("email");
const emailCampo = document.getElementById("form-field__email");
const ingresos = document.getElementById("ingresos");
const ocupaciones = document.getElementById("ocupaciones");
const province = document.getElementById("province");
const city = document.getElementById("city");
var township = "";
const townshipSelected = document.getElementById("township-selected");
const townshipsList = document.getElementById("townships-list");
const address = document.getElementById("address");
const indications = document.getElementById("indications");
const actividad = document.getElementById("actividad");
const exitSection = document.getElementById("exit-section");
const viableSection = document.getElementById("viable-section");
const tipoempresa = document.getElementById("tipoempresa");


const btnStep1 = document.getElementById("btn-step-1");
const btnStep21 = document.getElementById("btn-step-2-1");
const btnStep22 = document.getElementById("btn-step-2-2");
const btnStep23 = document.getElementById("btn-step-2-3");
const btnStep3 = document.getElementById("btn-step-3");
const btnStep4 = document.getElementById("btn-step-4");
const btnStep5 = document.getElementById("btn-step-5");
const btnStep6 = document.getElementById("btn-step-6");
const btnStep7 = document.getElementById("btn-step-7");
const btnStep8 = document.getElementById("btn-step-8");

const helpSection = document.getElementById("help-section");
const btnHelp = document.getElementById("btn-help");

const btnContactform = document.querySelectorAll(".contact-form-button")[0];
const dataContactform = {
  "primer_apellido": document.getElementById("contact_last_name"),
  "segundo_apellido": document.getElementById("contact_last_name"),
  "primer_nombre": document.getElementById("contact_name"),
  "segundo_nombre": document.getElementById("contact_name"),
  "nro_documento": document.getElementById("contact_id_number"),
  "tipo_documento": "CC",
  "telefono": document.getElementById("phone")
}

const api_whatsapp = document.querySelector("#step-5 a")?.setAttribute("href", "https://api.whatsapp.com/send?phone=50766785136&text=Hola,%20me%20puedes%20ayudar%20con%20mi%20proceso%20de%20crédito?");
var carrito = localStorage.getItem('cartCredit') != null ? JSON.parse(localStorage.getItem('cartCredit')).map(e => ` ${e.sku} - ${e.title} ${e.priceFull} Meses ${e.fee} - Cuota Sem ${e.value}`) : '';
var pasoActual = 1
var agrupacion
var deliveryDate = null
var availableDates = null
var re_become = false

/***************************************************************
*                 PROGRESSIVE BAR CREDIJAMAR
*         			PATRYKSIM@GMAIL.COM
****************************************************************/
const progressText = document.querySelectorAll(".step p");
const progressCheck = document.querySelectorAll(".step .check");
const bullet = document.querySelectorAll(".step .bullet");
let current = 1;
function next(n) {
  document.querySelector(`#step-${n}`).classList.add("display-no");
  document.querySelector(`#step-${n + 1}`).classList.remove("display-no");
  /*bullet[n - 1].classList.add("active");
  progressCheck[n - 1].classList.add("active");
  progressText[n - 1].classList.add("active");
  current += 1;*/
}
function prev(n) {
  document.querySelector(`#step-${n}`).classList.add("display-no");
  document.querySelector(`#step-${n - 1}`).classList.remove("display-no");
  bullet[current - 2].classList.remove("active");
  progressCheck[current - 2].classList.remove("active");
  progressText[current - 2].classList.remove("active");
  current -= 1;
}


/***************************************************************
*           CAMBIAR CUOTA CARRITO DE CREDIJAMAR
*         			PATRYKSIM@GMAIL.COM
****************************************************************/
cuotaSelect.addEventListener("change", (e) => {
	switch(e.target.value) {
      case "6":
			/*$(".selected-meses").map(function() {
			    return this.classList.add('visually-hidden');
			})*/
			$(".6-meses").map(function() {
			    return this.classList.remove('visually-hidden');
			})
			$(".12-meses").map(function() {
			    return this.classList.add('visually-hidden');
			})
			$(".16-meses").map(function() {
			    return this.classList.add('visually-hidden');
			})
			$(".24-meses").map(function() {
			    return this.classList.add('visually-hidden');
			})
			$(".40-meses").map(function() {
			    return this.classList.add('visually-hidden');
			})
		break;
        case "12":
			/*$(".selected-meses").map(function() {
			    return this.classList.add('visually-hidden');
			})*/
			$(".6-meses").map(function() {
			    return this.classList.add('visually-hidden');
			})
			$(".12-meses").map(function() {
			    return this.classList.remove('visually-hidden');
			})
			$(".16-meses").map(function() {
			    return this.classList.add('visually-hidden');
			})
			$(".24-meses").map(function() {
			    return this.classList.add('visually-hidden');
			})
			$(".40-meses").map(function() {
			    return this.classList.add('visually-hidden');
			})
		break;
		case "16":
			/*$(".selected-meses").map(function() {
			    return this.classList.add('visually-hidden');
			})*/
      $(".6-meses").map(function() {
        return this.classList.add('visually-hidden');
    })
			$(".12-meses").map(function() {
			    return this.classList.add('visually-hidden');
			})
			$(".16-meses").map(function() {
			    return this.classList.remove('visually-hidden');
			})
			$(".24-meses").map(function() {
			    return this.classList.add('visually-hidden');
			})
			$(".40-meses").map(function() {
			    return this.classList.add('visually-hidden');
			})
			break;
		case "24":
			/*$(".selected-meses").map(function() {
			    return this.classList.add('visually-hidden');
			})*/

      $(".6-meses").map(function() {
        return this.classList.add('visually-hidden');
    })
			$(".12-meses").map(function() {
			    return this.classList.add('visually-hidden');
			})
			$(".16-meses").map(function() {
			    return this.classList.add('visually-hidden');
			})
			$(".24-meses").map(function() {
			    return this.classList.remove('visually-hidden');
			})
			$(".40-meses").map(function() {
			    return this.classList.add('visually-hidden');
			})
			break;
		case "40":
			/*$(".selected-meses").map(function() {
			    return this.classList.add('visually-hidden');
			})*/
      $(".6-meses").map(function() {
        return this.classList.add('visually-hidden');
    })
			$(".12-meses").map(function() {
			    return this.classList.add('visually-hidden');
			})
			$(".16-meses").map(function() {
			    return this.classList.add('visually-hidden');
			})
			$(".24-meses").map(function() {
			    return this.classList.add('visually-hidden');
			})
			$(".40-meses").map(function() {
			    return this.classList.remove('visually-hidden');
			})

			break;
	}
});

function exit() {
  credijamarSteps.classList.add('display-no');
  exitSection.classList.remove('display-no');
  saveInSalesforce(objVisor)
}

function viable() {
  credijamarSteps.classList.add('display-no');
  viableSection.classList.remove('display-no');
  saveInSalesforce(objVisor)
}

// CONFIGURACIONES
if (celular != null) Inputmask({ mask: "69999999" }).mask(celular);
if (ingresos != null) Inputmask({ alias: "currency", digits: 0, prefix: '$ ' }).mask(ingresos);

// EVENTOS
ocupaciones?.addEventListener("change", async (e) => {
  objVisor.ocupacion = e.target.value;
  clearSelect(actividad)
  let actividadesComerciales = await getActividadComercial(e.target.value).then(data => data);
  $("#actividad").html("<option value>selecciona a que te dedicas</option>")
  console.log(actividadesComerciales)
  actividadesComerciales.forEach(i => {
    $("#actividad").append(`<option value="${i.cod}">${i.des}</option>`)
  });
});

actividad?.addEventListener("change", (e) => {
  objVisor.actividad_cargo = e.target.value;
});


ingresos?.addEventListener("keyup", (e) => {
  objVisor.ingresos = e.target.value.replaceAll(/[,$/\s]/g, '')
});


//validate cedula doc
cedula?.addEventListener("change", (e) => {
  validarCampo(objVisor.tipo_doc == 'CC' ? expresiones.cedula : expresiones.pasaporte, e.target, 'cedula');
});

tipoDocumento?.addEventListener('change', function () {
  objVisor.tipo_doc = this.value;
  objVisor.desc_doc = this.options[this.selectedIndex].text
  if (this.value === "-1" || this.value === "" || this.value === null) {
    campos['tipo_documento'] = false;
  } else {
    campos['tipo_documento'] = true;
  }
  validarCampo(objVisor.tipo_doc == 'CC' ? expresiones.cedula : expresiones.pasaporte, { value: objVisor.documento }, 'cedula');
});

nombre?.addEventListener("keypress", forceKeyPressUppercase, false);
segundo_nombre?.addEventListener("keypress", forceKeyPressUppercase, false);
apellido?.addEventListener("keypress", forceKeyPressUppercase, false);
segundo_apellido?.addEventListener("keypress", forceKeyPressUppercase, false);

// PARA PASAR DEL PASO 1 AL 2
btnStep1?.addEventListener("click", () => {
  //helpSection.classList.remove('display-no');
  $('#shopify-section-pxs-newsletter')?.addClass("display-no");
  next(1);
  window.location.hash = '#credijamar-steps';
  /*step1.classList.add('display-no')
  step2.classList.remove('display-no')*/
})

let cedulaCampo = document.getElementById("form-field__cedula-warning");
let warningCedula = document.getElementById("form-field__cedula-warning");
function warningShow() {
  warningCedula.classList.remove("display-no");
}
function warningHide() {
  warningCedula.classList.add("display-no");
}

// EVENTO CONSULTAR VISOR PRIMERA VEZ - DIGITA DOC
btnStep21?.addEventListener("click", () => {

  if (document.getElementById("tipo_documento").value === "-1") {
    Swal.fire({
      imageUrl: 'https://cdn.shopify.com/s/files/1/0516/5478/7271/t/12/assets/sorpresa.png',
      title: '¡Disculpa!',
      text: 'Estimado cliente seleccione un tipo de documento',
      allowOutsideClick: false,
      confirmButtonColor: "#00abb0"
    })
    return;
  }

  if (!campos.cedula) {
    Swal.fire({
      imageUrl: 'https://cdn.shopify.com/s/files/1/0516/5478/7271/t/12/assets/sorpresa.png',
      title: '¡Disculpa!',
      text: 'Estimado cliente usted ha digitado un documento no valido',
      allowOutsideClick: false,
      confirmButtonColor: "#00abb0"
    })
    return;
  }
  
  if (!campos.celular) {
    Swal.fire({
      imageUrl: 'https://cdn.shopify.com/s/files/1/0516/5478/7271/t/12/assets/sorpresa.png',
      title: '¡Disculpa!',
      text: 'Estimado cliente por favor indicanos un número celular',
      allowOutsideClick: false,
      confirmButtonColor: "#00abb0"
    })
    return;
  }

  if (!campos.email) {
    Swal.fire({
      imageUrl: 'https://cdn.shopify.com/s/files/1/0516/5478/7271/t/12/assets/sorpresa.png',
      title: '¡Disculpa!',
      text: 'Estimado cliente por favor indicanos tu correo electrónico',
      allowOutsideClick: false,
      confirmButtonColor: "#00abb0"
    })
    return;
  }

  if (!terminos.checked) {
    document.getElementById("terminos").setCustomValidity("Por favor, indique que acepta los Términos y Condiciones");
    return;
  }

  if (cedula.value && cedula.value != "" && cedula.value != null && tipoDocumento.value != "-1") {
    //document.getElementById('sagicc-chat-div').style.display = "none";
    try {
      document.getElementById('whatsapp-header').style.display = "none";
    } catch (error) {
      console.log(error);
    } 
    getOccupations();
    Swal.fire({
      title: 'Consultando información',
      html: 'Gracias por esperar...',
      showConfirmButton: false,
      allowOutsideClick: false,
      willOpen: () => {
        Swal.showLoading()
      },
    })
    // METODO CONSULTAR VISOR MODO C
    fetch(`${window.url_aws}/client/${cedula.value}`)
      .then(async (response) => {
        objVisor.statusCode = response.status;
        const data = await response.json();
        Swal.close();
        warningHide();
        console.log(objVisor.statusCode);
        console.log('CONSULTAR VISOR MODO C', data);
        objVisor.c_est = data.cod_est
        objVisor.age_est = data.age_est
        objVisor.estrategia = data.estrategia
        objVisor.internal_id = data.internal_id
        btnStep21.classList.add('display-no');
        document.getElementById("terminos-apc").style.display = 'none';
        celularCampo.classList.add("display-no");
        emailCampo.classList.add("display-no");
        step22.classList.remove('display-no')
		helpSection.classList.remove('display-no');
        newUser = objVisor.statusCode == 200 ? true : false;

        objVisor == { ...objVisor, ...data }

        $("#cedula").attr('disabled', 'disabled');

        if (objVisor.statusCode == 201) {
          document.querySelector("#form-field__segundo_nombre").classList.add("display-no");
          document.querySelector("#form-field__segundo_apellido").classList.add("display-no");
          $("#nombre").attr('disabled', 'disabled');
          $("#apellido").attr('disabled', 'disabled');
        }

        $("#nombre").val(data.primer_nombre);
        campos["nombre"] = data.primer_nombre ? true : false;
        objVisor.primer_nombre = data.primer_nombre ? data.primer_nombre : "";

        $("#segundo_nombre").val(data.segundo_nombre);
        campos["segundo_nombre"] = data.segundo_nombre ? true : false;
        objVisor.segundo_nombre = data.segundo_nombre ? data.segundo_nombre : "";

        $("#apellido").val(data.primer_apellido);
        campos["apellido"] = data.primer_apellido ? true : false;
        objVisor.primer_apellido = data.primer_apellido ? data.primer_apellido : "";

        $("#segundo_apellido").val(data.segundo_apellido);
        campos["segundo_apellido"] = data.segundo_apellido ? true : false;
        objVisor.segundo_apellido = data.segundo_apellido ? data.segundo_apellido : "";

        /*$("#celular").val(data.celular);
        campos["celular"] = data.celular ? true : false;
        objVisor.celular = data.celular ? data.celular : "";

        $("#email").val(data.correo);
        campos["email"] = data.correo ? true : false;
        objVisor.correo = data.correo ? data.correo : "";*/

        if (objVisor.statusCode != 200 && objVisor.statusCode != 201) {
          api_whatsapp;
        }

        btnStep22.addEventListener('click', (e) => {
          console.log("click boton btn-step-2-2");
          e.preventDefault();
          if (campos.tipo_documento && campos.cedula && campos.nombre && campos.apellido && campos.email && campos.celular) {
            if (newUser == true) { // 200 CLIENTE NUEVO
              console.log("usuarios nuevo");
              step21.classList.add('display-no');
              step22.classList.add('display-no');
              step23.classList.remove('display-no');
            } else { // 201 CLIENTE CONOCIDO 
              validateTYPEuser(data);
            }
            obtenerCarrito()
            transactionTracker()
            limpiarCarrito()
          } else {
            //console.log("Error: Debe rellenar correctamente los campos.");
            document.querySelector(`.credijamar-step-1-message.message--error`)?.classList.remove("inactivo");
            document.querySelector(`.credijamar-step-1-message.message--error`)?.classList.add("activo");
            console.log(campos);
          }
        });
      })
      .catch(function (error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
      });
  } else {
    campos['tipo_documento'] = false;
  }
});

document.getElementById('previous')?.addEventListener("click", (e) => {
  step2.classList.remove('display-no');
  step3.classList.add('display-no')
})

btnStep23?.addEventListener("click", (e) => {
  Swal.fire({
    title: 'Estimado Cliente',
    html: 'Gracias por esperar...',
    showConfirmButton: false,
    allowOutsideClick: false,
    willOpen: () => {
      Swal.showLoading()
    },
  })
  // PRIMERA VEZ
  e.preventDefault();
  // EVALUO AL CLIENTE
  console.log('EVALUANDO', objVisor)
  saveModoE(objVisor).then(data => {
    console.log('MODO E', data)
    Swal.close();
    if (data.message == "100 - El número de teléfono se encuentra registrado a más de 3 clientes.") {
      console.log('OTRO NRO - VISOR MODO E');
      Swal.fire({
        imageUrl: 'https://cdn.shopify.com/s/files/1/0516/5478/7271/t/12/assets/sorpresa.png',
        title: '¡Disculpa!',
        text: 'Estimado cliente por favor digite otro número celular de contacto',
        allowOutsideClick: false,
        confirmButtonColor: "#00abb0"
      }).then((result) => {
        if (result.isConfirmed) {
          step21.classList.remove('display-no')
          celularCampo.classList.remove('display-no')
          emailCampo.classList.remove('display-no')
          step22.classList.remove('display-no')
          step23.classList.add('display-no')
          console.log('BOTON OK')
        }
      })
      /*step2.classList.remove('display-no');
      step3.classList.add('display-no');*/
    } else {
      next(2);
      const filterOcupacion = listaOcupaciones.filter(e => e.cod_ocu == data.ocupacion);
      let bjs = {
        "empresa": objVisor.c_emp,
        "tipoIdentificacion": objVisor.desc_doc,
        "idCliente": `${objVisor.c_emp}_${data.n_ide}`,
        "identificacion": data.n_ide,
        "nombre": data.primer_nombre,
        "segundoNombre": data.segundo_nombre,
        "apellidos": data.primer_apellido,
        "correoElectronico": objVisor.correo,
        "celular": objVisor.celular ? "507" + objVisor.celular : 0,
        "agencia": `${objVisor.c_emp}_${data.c_agr}`,
        "ocupacion": filterOcupacion.length > 0 ? filterOcupacion[0].des_ocu : "EMPLEADO",
        "ingresos": data.ingresos + '',
        "province": objVisor.province,
        "city": objVisor.city,
        "township": objVisor.township,
        "address": objVisor.address,
        "indications": objVisor.indications,
        "viabilidad": data.viable,
        "cupoDisponible": data.cupo ? data.cupo : 0,
        "salida": data.salida,
        "estrategia": data.estrategia,
        "origen": "Ecommerce",
        "quieroQueLlamen": "Si",
        "whatsapp": objVisor.celular ? "+507" + objVisor.celular : 0,
        "aceptoContactoWhatsapp": "true",
        "segmento": data.segmento,
        "cuotaDisponible": data.cupo ? data.cupo : 0,
        "cuentaPersona": "Cuenta Persona",
        "productoInteres": JSON.stringify(carrito).replaceAll(/[\[\]"\r\n\t]/g, '').substring(0, 255)
      };
      objVisor.c_est = data.cod_est
      objVisor.age_est = data.age_est
      objVisor.segmento = data.segmento
      inicioPreCalificacion(data.estrategia, bjs)

      console.log(data);
      obtenerCarrito()
      limpiarCarrito()
    }
  }).catch(e => {
    console.log("error ->".e)
  });
})

btnStep3?.addEventListener("click", () => {
  progressBar1.classList.add('display-no')
  progressBar2.classList.remove('display-no')
  next(3)
})

btnStep4?.addEventListener("click", () => {
  if (province.value == '08') {
    if (city.value == '01' || city.value == '05' || city.value == '06' || city.value == '07') {
      next(4);
      Swal.fire({
        html: '<img src="https://cdn.shopify.com/s/files/1/0516/5478/7271/files/Credito-llenar_Formulario-05.jpg?v=1620414572">' +
          'Gracias por esperar.',
        showConfirmButton: false,
        allowOutsideClick: false,
        willOpen: () => {
          Swal.showLoading()
          Swal.getContent().style = "padding: 0px;"
        },
      })
      crearOP().then(resp => {
        console.log('OP', resp)

        validarEstadoOP(`${window.url_aws3}${apiUrl}/${environments.prod.company}/orders-queue/${resp.num}`).then(resp => {
          console.log('validarEstadoOP', resp)

          if (resp.data.success) {
            Swal.close()
            objVisor.nro_op = resp.data.NoPedido
            objVisor.cuotas = resp.data.cuotas
            objVisor.encabezado = resp.data.encabezado
            if (objVisor.nro_op != undefined && objVisor.encabezado != null) {
              buttonBecome()
              console.log('FORM DINAMICO')
              form_dinamico()
            } else {
              exit();
              Swal.close()
            }
          } else {
            exit();
            Swal.close()
          }
        })
      })
    }
  } else {
    step4.classList.add('display-no')
    exit.classList.remove('display-no')
  }

})

btnStep5?.addEventListener("click", () => {
  next(5);
})

btnStep6?.addEventListener("click", () => {
  let nextStep = true
  if ($('#empresa').val() == '') {
    Swal.fire({
      imageUrl: 'https://cdn.shopify.com/s/files/1/0516/5478/7271/t/12/assets/sorpresa.png',
      title: 'Estimado cliente',
      text: 'Por favor usted debe buscar la empresa',
      allowOutsideClick: false,
      confirmButtonColor: "#00abb0"
    })
    return
  }
  if (objVisor.tipoempresa == -1) {
    Swal.fire({
      imageUrl: 'https://cdn.shopify.com/s/files/1/0516/5478/7271/t/12/assets/sorpresa.png',
      title: 'Estimado cliente',
      text: 'Por favor usted debe seleccionar el tipo',
      allowOutsideClick: false,
      confirmButtonColor: "#00abb0"
    })
    return
  }

  if (re_become) {
    post_become().then(resp => {
      if (resp.success) {
        if (resp.status == "success") {
          objVisor.fecha_nac = resp.birth
          objVisor.uuid = resp.uuid
        } else {
          nextStep = false
          exit();
        }
      } else {
        nextStep = false
        exit();
      }
    })
  }

  if (nextStep) {
    getCreateDocumentsList()
    guardar_preguntas().then(resp => {
      if (!resp.success) {
        exit()
      }
    })
  }

})

btnStep7?.addEventListener("click", () => {
  if ($("input[name='array']:checked").length == $("input[name='array']").length && $('#manifiesto').is(':checked')) {
    getFechaEntrega();

    Swal.fire({
      imageUrl: 'https://cdn.shopify.com/s/files/1/0516/5478/7271/t/12/assets/carita_audifono.png',
      title: 'Estimado cliente',
      text: `El código de confirmación será enviado al número de telefono: ${objVisor.celular}`,
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonColor: "#00abb0",
      cancelButtonColor: "#D8232A"
    }).then(resp => {
      if (resp.isConfirmed) {
        enviar_otp(objVisor.num).then(resp => {
          if (resp.errorcode == 0) {
            codigoOTP().then(resp => {
              console.log(resp)
            })
          }
        })
      }
    })

  } else {
    Swal.fire({
      imageUrl: 'https://cdn.shopify.com/s/files/1/0516/5478/7271/t/12/assets/sorpresa.png',
      title: 'Estimado cliente',
      text: 'Por favor usted debe manisfestar haber leido los documentos',
      allowOutsideClick: false,
      confirmButtonColor: "#00abb0"
    })
  }
})

btnStep8?.addEventListener("click", () => {

  if (deliveryDate == null) {
    Swal.fire({
      imageUrl: 'https://cdn.shopify.com/s/files/1/0516/5478/7271/t/12/assets/sorpresa.png',
      title: '¡Disculpa!',
      text: 'Estimado cliente seleccione una fecha de entrega y vuelva a intentar.',
      allowOutsideClick: false,
      confirmButtonColor: "#00abb0"
    })
    return;
  }

  Swal.fire({
    title: 'Enviando su fecha de entrega',
    html: 'Falta poco para terminar...',
    showConfirmButton: false,
    allowOutsideClick: false,
    willOpen: () => {
      Swal.showLoading()
    },
  })

  //sendFechaEntrega(deliveryDate);
  sendFechaEntregaRetry(deliveryDate).then(resp => {
    if (resp.status == 'OK') {
      Swal.close();
      document.querySelector("#exit-section img")?.setAttribute("src", "https://cdn.shopify.com/s/files/1/0516/5478/7271/files/Credijamar-Orden-Confirmada.jpg?v=1619556185");
      exit();
    } else {
      Swal.close()
      exit()
    }
  })
})

// PARA PASAR DEL PASO 1 AL 2
btnHelp?.addEventListener("click", () => {
  postHelp(objVisor)
})

// METODOS
/*****************************************************
*       CONSULTAMOS EL LOCALSTORAGE PARA OBTENER
*                 LOS DOCUMENTOS
*	            ANTONYTRIANA@GMAIL.COM
******************************************************/
function getDocTypes() {
  let storage = JSON.parse(localStorage.getItem("documentos"));
  storage.forEach(element => {
    let option = document.createElement("option");
    option.value = `${element.tipo}`;
    option.text = `${element.des}`;
    tipoDocumento?.appendChild(option);
  })
}

/*****************************************************
*
* CONSULTAMOS EL SERVICIO WEB PARA OBTENER LAS 
*              ACTIVIDADES COMERCIALES
*		           ANTONYTRIANA@GMAIL.COM
*	
******************************************************/
function getActividadComercial(codigo) {
  return new Promise((resolve, reject) => {
    fetch(`${window.url_aws}/activity?ocupationId=${codigo}`)
      .then(data => data.json())
      .then(data => resolve(data))
      .catch(e => {
        console.log("error -> ", e);
        reject(e)
      })
  })
};

/*****************************************************
*
*      CONSULTAMOS EL SERVICIO VISOR MODO E
*		          ANTONYTRIANA@GMAIL.COM
*	
******************************************************/
function saveModoE(data) {
  return new Promise((resolve, reject) => {
    var requestOptions = {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(data),
      redirect: 'follow'
    };
    fetch(`${window.url_aws}/client/${objVisor.documento}`, requestOptions)
      .then(response => response.json())
      .then(result => resolve(result))
      .catch(error => reject(error));
  })
}

/*****************************************************
*
*  CONSULTAMOS EL SERVICIO PARA GUARDAR EN SALESFORCE
*		          ANTONYTRIANA@GMAIL.COM
*	
******************************************************/
function saveInSalesforce(obj) {
  return new Promise((resolve, reject) => {
    var requestOptions = {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(obj),
      redirect: 'follow'
    };
    fetch(`${window.url_aws2}${apiUrl}/api_lead_sf`, requestOptions)
      .then(response => response.json())
      .then(result => resolve(result))
      .catch(error => reject(error));
  })
}

/*****************************************************
*
*  CONSULTAMOS EL SERVICIO PARA GUARDAR CLIENTE
*		          ANTONYTRIANA@GMAIL.COM
*	
******************************************************/
function saveCustomer(data) {
  return new Promise((resolve, reject) => {
    let body = {
      "internal_id": data.internal_id,
      "c_emp": data.c_emp,
      "tipo_doc": objVisor.tipo_doc,
      "primer_nombre": data.primer_nombre,
      "segundo_nombre": data.segundo_nombre,
      "primer_apellido": data.primer_apellido,
      "segundo_apellido": data.segundo_apellido,
      "celular": objVisor.celular,
      "correo": objVisor.correo,
      "ocupacion": data.ocupacion,
      "actividad_cargo": data.actividad_cargo,
      "sector_trabajo": data.sector_trabajo,
      "ingresos": data.ingresos,
      "agencia_seleccionada": data.c_agr,
      "canal_venta": "distancia",
      "url_foto": ""
    }
    objVisor = { ...objVisor, ...body }
    let requestOptions = {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(body),
      redirect: 'follow'
    };
    fetch(`${window.url_aws}/contact/${objVisor.documento}`, requestOptions)
      .then(response => response.json())
      .then(result => resolve(result))
      .catch(error => reject(error));
  })
}

/*****************************************************
*
* CONSULTAMOS EL SERVICIO PARA OBTENER LAS OCUPACIONES
*	
******************************************************/
const getOccupations = () => {
  fetch(`${window.url_aws}/occupations`)
    .then(response => response.json())
    .then(data => {
      listaOcupaciones = data;
      let Occupations = data;
      return Occupations.map(function (Occupation) {
        let option = document.createElement("option");
        option.value = `${Occupation.cod_ocu}`;
        option.text = `${Occupation.des_ocu}`;
        ocupaciones.appendChild(option);
      });
    })
    .catch(err => console.log(err));
}

const expresiones = {
  cedula: /^P$|^(?:PE|E|N|[23456789]|[23456789](?:A|P)?|1[0123]?|1[0123]?(?:A|P)?)$|^(?:PE|E|N|[23456789]|[23456789](?:AV|PI)?|1[0123]?|1[0123]?(?:AV|PI)?)-?$|^(?:PE|E|N|[23456789](?:AV|PI)?|1[0123]?(?:AV|PI)?)-(?:\d{1,4})-?$|^(PE|E|N|[23456789](?:AV|PI)?|1[0123]?(?:AV|PI)?)-(\d{1,4})-(\d{1,6})$/i,
  pasaporte: /^[A-Za-z0-9]+$/,
  nombre: /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]{1,40}$/, //Letras y espacios pueden llevar acentos.
  apellido: /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]{1,40}$/, //Letras y espacios pueden llevar acentos.
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  celular: /^\d{8}$/ // 8 dígitos o cifras seguidas
}

const campos = {
  tipo_documento: false,
  cedula: false,
  nombre: false,
  segundo_nombre: false,
  apellido: false,
  segundo_apellido: false,
  email: false,
  celular: false
}
const validarFormulario = (e) => {
  // console.log(e);
  switch (e.target.name) {
    case "cedula":
      validarCampo(objVisor.tipo_doc == 'CC' ? expresiones.cedula : expresiones.pasaporte, e.target, 'cedula');
      objVisor.documento = e.target.value
      break;
    case "nombre":
      validarCampo(expresiones.nombre, e.target, 'nombre');
      objVisor.primer_nombre = e.target.value;
      break;
    case "segundo_nombre":
      validarCampo(expresiones.nombre, e.target, 'segundo_nombre');
      objVisor.segundo_nombre = e.target.value;
      break;
    case "apellido":
      validarCampo(expresiones.apellido, e.target, 'apellido');
      objVisor.primer_apellido = e.target.value;
      break;
    case "apellido":
      validarCampo(expresiones.apellido, e.target, 'segundo_apellido');
      objVisor.segundo_apellido = e.target.value;
      break;
    case "celular":
      validarCampo(expresiones.celular, e.target, 'celular');
      console.log('CELULAR', e.target.value)
      objVisor.celular = e.target.value;
      break;
    case "email":
      validarCampo(expresiones.correo, e.target, 'email');
      objVisor.correo = e.target.value;
      break;
  }
}

const messageErrors = (campo) => {

  switch (campo) {
    case "cedula":
      message = "Por favor introduzca un número de documento válido.";
      break;
    case "nombre":
      message = "Por favor introducir un nombre válido.";
      break;
    case "segundo_nombre":
      message = "Por favor introducir un segundo nombre válido.";
      break;
    case "apellido":
      message = "Por favor introducir un apellido válido.";
      break;
    case "segundo_apellido":
      message = "Por favor introducir un segundo apellido válido.";
      break;
    case "celular":
      message = "Por favor introducir un número de celular válido.\n 8 dígitos seguidos máximo.";
      break;
    case "email":
      message = "Por favor introducir un Correo Electrónico válido.";
      break;
  }

  return message;

}

const validarCampo = (expresion, input, campo) => {
  if (expresion.test(input.value.toUpperCase())) {
    document.getElementById(`form-field__${campo}`).classList.remove("form-field__incorrecto");
    document.querySelector(`#form-field__${campo} .error-message`).classList.remove("form-field__incorrecto-activo");
    document.querySelector(`#form-field__${campo} .error-message`).classList.add("form-field__incorrecto-inactivo");

    //console.log(input.value);
    campos[campo] = true;
  } else if (input.value === '' || input.value === null) {
    document.getElementById(`form-field__${campo}`).classList.add("form-field__incorrecto");
    document.querySelector(`#form-field__${campo} .error-message`).classList.remove("form-field__incorrecto-inactivo");
    document.querySelector(`#form-field__${campo} .error-message`).classList.add("form-field__incorrecto-activo");
    document.querySelector(`#form-field__${campo} .error-message`).innerHTML = `Debe introducir un valor válido para el ${campo}.`;
    campos[campo] = false;
  } else {
    document.getElementById(`form-field__${campo}`).classList.add("form-field__incorrecto");
    document.querySelector(`#form-field__${campo} .error-message`).classList.remove("form-field__incorrecto-inactivo");
    document.querySelector(`#form-field__${campo} .error-message`).classList.add("form-field__incorrecto-activo");
    document.querySelector(`#form-field__${campo} .error-message`).innerHTML = messageErrors(campo);
    campos[campo] = false;
  }
}



inputs.forEach((input) => {
  // console.log(input);
  var idElement = input.id;
  const inputId = document.getElementById(idElement);
  inputId.addEventListener("keyup", validarFormulario);
  inputId.addEventListener("blur", validarFormulario);
});

async function validateTYPEuser(data) {
  // YA EXISTE - FORM # 1
  const filterOcupacion = listaOcupaciones.filter(e => e.cod_ocu == data.ocupacion);
  console.log(data)
  let bjs = {
    "empresa": data.c_emp,
    "tipoIdentificacion": objVisor.desc_doc,
    "idCliente": `${objVisor.c_emp}_${data.n_ide}`,
    "identificacion": data.n_ide,
    "nombre": data.primer_nombre,
    "segundoNombre": data.segundo_nombre,
    "apellidos": data.primer_apellido,
    "correoElectronico": objVisor.correo,
    "celular": "507" + objVisor.celular,
    /*"agencia": `${objVisor.c_emp}_${data.c_agr}`,*/
    "agencia": `${objVisor.c_emp}_C2`,
    "ocupacion": filterOcupacion.length > 0 ? filterOcupacion[0].des_ocu : "EMPLEADO",
    "ingresos": data.ingresos + '',
    "viabilidad": data.viable,
    "cupoDisponible": data.cupo ? data.cupo.toString() : "0",
    "salida": data.salida,
    "estrategia": data.estrategia,
    "origen": "Ecommerce",
    "quieroQueLlamen": "Si",
    "whatsapp": "+507" + objVisor.celular,
    "aceptoContactoWhatsapp": "true",
    "segmento": data.segmento,
    "cuotaDisponible": data.cuota ? data.cuota.toString() : "0",
    "cuentaPersona": "Cuenta Persona",
    "productoInteres": JSON.stringify(carrito).replaceAll(/[\[\]"\r\n\t]/g, '').substring(0, 255)
  };

  saveCustomer(data).then(data => {
    if (data.message) {
      console.log('ERROR CONTACTO ORO - DEJAR PASAR SALESFORCE', data);
    }
  })
  objVisor.segmento = data.segmento
  inicioPreCalificacion(data.estrategia, bjs)
}

/*****************************************************
*
*         FUNCIÓN PARA CONVERTIR VALORES 
            DE LOS CAMPOS A MÁYUSCULAS
*		    MENDIETA.ARNULFO@GMAIL.COM
*	
******************************************************/

function forceKeyPressUppercase(e) {

  var charInput = e.keyCode;

  if ((charInput >= 97) && (charInput <= 122)) { // Lowercase
    if (!e.ctrlKey && !e.metaKey && !e.altKey) { // No modifier key
      var newChar = charInput - 32;
      var start = e.target.selectionStart;
      var end = e.target.selectionEnd;
      e.target.value = e.target.value.substring(0, start) + String.fromCharCode(newChar) + e.target.value.substring(end);
      e.target.setSelectionRange(start + 1, start + 1);
      e.preventDefault();
    }
  }
}

/*****************************************************
*
* 		LIMPIAR UN SELECT PASADO POR PARAMETRO
*		          ANTONYTRIANA@GMAIL.COM
*	
******************************************************/
function clearSelect(select) {
  for (let i = select.options.length; i >= 0; i--) {
    select.remove(i);
  }
}

/*****************************************************
* 		    LIMPIAR LAS OPCIONES DEL DATALIST
*		          PATRYKSIM@GMAIL.COM
******************************************************/
function clearDatalist(datalist) {
  datalist.innerHTML = "";
}

/*****************************************************
*  VERIFICA EL CAMBIO EN EL INPUT DEL CORREGIMIENTO
*		       PATRYKSIM@GMAIL.COM
******************************************************/
function inputChange(input, datalist) {
  input?.addEventListener("change", (e) => {
    console.log("changed");
    findTownshipcod(datalist, e.target.value)
    var optionFound = false;
    for (var j = 0; j < datalist.options.length; j++) {
      if (input.value == datalist.options[j].value) {
        optionFound = true;
        break;
      }
    }
    if (optionFound) {
      input.setCustomValidity("");
    } else {
      input.setCustomValidity("Por favor seleccione un valor de la lista");
    }
  });
}
/*****************************************************
*  BUSCA EL CODIGO DEL CORREGIMIENTO EN EL LISTADO
*		       PATRYKSIM@GMAIL.COM
******************************************************/
function findTownshipcod(list, e) {
  let corregimientos = {
    "descripciones": [],
    "codigos": [],
  };
  for (var j = 0; j < list.options.length; j++) {
    corregimientos.descripciones.push(list.options[j].value);
    corregimientos.codigos.push(list.options[j].dataset.value);
  }
  for (var j = 0; j < corregimientos.descripciones.length; j++) {
    if (corregimientos.descripciones[j] == e) {
      township = corregimientos.codigos[j];
      objVisor.township = township;
      objVisor.township_desc = $("#township-selected").val()
    }
  }
}

/*****************************************************
*        LIMPIAR CARRITO DE COMPRA A CREDITO
*		          ANTONYTRIANA@GMAIL.COM
******************************************************/
const limpiarCarrito = () => {
  if (localStorage.getItem('cartCredit') != null) {
    localStorage.removeItem('cartCredit')
  }
}

/*****************************************************
*       OBTENER CARRITO DE COMPRA A CREDITO
*		          ANTONYTRIANA@GMAIL.COM
******************************************************/
const obtenerCarrito = () => {
  if (localStorage.getItem('cartCredit') != null) {
    productos = JSON.parse(localStorage.getItem('cartCredit'))
  }
}

/*****************************************************
*
* CONSULTAMOS EL SERVICIO PARA OBTENER LOS PROVINCIA
*	              ANTONYTRIANA@GMAIL.COM
******************************************************/
function getProvinces() {
  fetch(`${window.url_aws}/departments`)
    .then(response => response.json())
    .then(data => {
      let provinces = data;
      return provinces.map(function (provinces) {
        let option = document.createElement("option");
        if (provinces.codigo == "08") {
          objVisor.province = provinces.codigo
          objVisor.province_desc = provinces.descripcion
          option.setAttribute('selected', 'selected');
        }
        option.value = `${provinces.codigo}`;
        option.text = `${provinces.descripcion}`;
        province.appendChild(option);
      });
    })
    .catch(err => console.log(err));
}

province?.addEventListener("change", (e) => {
  clearSelect(city);
  clearDatalist(townshipsList);
  getCities(e.target.value);
  province.value = e.target.value;
  objVisor.province = e.target.value;
  objVisor.province_desc = province.options[province.selectedIndex].text
});

/*****************************************************
*
* CONSULTAMOS EL SERVICIO PARA OBTENER LAS CIUDADES
*	              ANTONYTRIANA@GMAIL.COM
******************************************************/
function getCities(cod_province) {
  fetch(`${window.url_aws}/departments/${cod_province}/cities`)
    .then(response => response.json())
    .then(data => {
      const cities = data;
      return cities.map(function (cities) {
        let option = document.createElement("option");
        if (cities.codigo == "06") {
          objVisor.city = cities.codigo
          objVisor.city_desc = cities.descripcion
          option.setAttribute('selected', 'selected');
        }
        option.value = `${cities.codigo}`;
        option.text = `${cities.descripcion}`;
        city.appendChild(option);
      });
    })
    .catch(err => console.log(err));
}

city?.addEventListener("change", (e) => {
  clearDatalist(townshipsList);
  getTownship(province.value, e.target.value);
  city.value = e.target.value;
  objVisor.city = e.target.value;
  objVisor.city_desc = city.options[city.selectedIndex].text
});

address?.addEventListener("change", (e) => {
  objVisor.address = e.target.value.toUpperCase();
});

indications?.addEventListener("change", (e) => {
  objVisor.indications = e.target.value.toUpperCase();
});


/*****************************************************
*
* CONSULTAMOS EL SERVICIO PARA OBTENER LOS CORREGIMIENTOS
*	              ANTONYTRIANA@GMAIL.COM
******************************************************/
function getTownship(cod_province, cod_city) {
  fetch(`${window.url_aws}/departments/${cod_province}/cities/${cod_city}/neigborhoods`)
    .then(response => response.json())
    .then(data => {
      let townships = data;
      townships.map(function (townships) {
        let option = document.createElement("option");
        option.text = `${townships.descripcion}`;
        option.setAttribute("data-value", `${townships.codigo}`);
        townshipsList.appendChild(option);
      });
    })
    .catch(err => console.log(err));
}

inputChange(townshipSelected, townshipsList);

tipoempresa?.addEventListener("change", (e) => {
  objVisor.tipoempresa = e.target.value;
});

/*****************************************************
*
* CONSULTAMOS EL SERVICIO PARA OBTENER LA DIRECCION
*	              ANTONYTRIANA@GMAIL.COM
******************************************************/
function getDireccion(cod_user) {
  fetch(`${window.url_aws}/users/${cod_user}/address`)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
}


/*****************************************************
*
*       VALIDAR SI ES UN DISPOSITIVO MOVIL O TABLET
*	              ANTONYTRIANA@GMAIL.COM
******************************************************/
function dispositivo() {
  let e = navigator.userAgent;
  return /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(e) ? "tablet" : /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(e) ? "mobile" : "desktop"
}

/*****************************************************
*
*                 PROCESO BECOME
*	              ANTONYTRIANA@GMAIL.COM
******************************************************/
async function buttonBecome() {
  const access_token = await getTokenBecome();
  const button = document.createElement("become-button");
  objVisor.userId = `${objVisor.documento}` + new Date().getTime()
  // setup attributes
  button.setAttribute("userid", objVisor.userId);
  button.setAttribute("token", access_token);
  button.setAttribute("contractId", "15");
  button.setAttribute("country", "PA");

  // setup callbacks
  button.addEventListener('become:loaded', ({ detail }) => {
    console.log('loaded payload', detail)
  })
  button.addEventListener('become:userFinishedSdk', ({ detail }) => {
    console.log('finished payload', detail)
    if (detail.data.code == 201) {
      Swal.fire({
        title: 'Por favor espere',
        html: 'Estimado Cliente: Por favor espere, estamos validando su información.',
        showConfirmButton: false,
        allowOutsideClick: false,
        willOpen: () => {
          Swal.showLoading()
        },
      })
      post_become().then(resp => {
        Swal.close()
        if (resp.success) {
          if (resp.status == "success") {
            objVisor.fecha_nac = resp.birth
            objVisor.uuid = resp.uuid
            next(5);
          } else {
            exit();
          }
        } else {
          re_become = true
          next(5);
        }
      })
    }
  })
  button.addEventListener('become:exitedSdk', ({ detail }) => {
    console.log('exited payload', detail)
  })
  // init button
  const button_old = document.querySelector('become-button');
  if (button_old) {
    document.getElementById('btn-become').replaceChild(button, button_old);
  } else {
    document.getElementById('btn-become')?.appendChild(button);
  }
}

/*****************************************************
*
*          FUNCION PARA VALIDAR DISPOSITIVOS
*	              ANTONYTRIANA@GMAIL.COM
******************************************************/
function verifyMe() {
  let device = dispositivo()
  console.log("TIPO DISPOSITIVO", device)
  return device == "tablet" || device == "mobile" ? true : false
}

/*****************************************************
*
*      FUNCION PARA CONSULTAR POSIBLE FECHA DE ENTREGA
*	              ANTONYTRIANA@GMAIL.COM
******************************************************/
async function getDeliveryDate(data, productos) {
  let body = {
    "body": {
      "codigo_agencia": data.agencia_seleccionada,
      "departamento_despacho": data.province,
      "ciudad_despacho": data.city,
      "barrio_despacho": data.township,
      "tipo_orden": "OP",
      "productos": productos.map(elem => (
        {
          codigo_producto: elem.sku,
          cantidad_producto: '' + elem.quantity
        }
      ))
    }
  }
  const response = await fetch(`${window.url_aws3}${apiUrl}/${environments.prod.company}/delivery-date`, {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(body)
  });
  return response.json();
};






/*****************************************************
*
*               FUNCION CREACION DE OP
*	              ANTONYTRIANA@GMAIL.COM
******************************************************/
async function crearOP() {
  let delivery_date = await getDeliveryDate(objVisor, productos)
  let bodyOP = {
    "order": {
      "additional_data": [
        "",
        {
          "label": "id_sales_origin",
          "value": 7,
          "data": {}
        }
      ],
      "agency_code": objVisor.agencia_seleccionada,
      "client_takes": "N",
      "client_type": objVisor.segmento == 'ORO' ? 'OR' : 'TJ',
      "delivery_date": delivery_date.data[0].Fecha != '' ? delivery_date.data[0].Fecha : new Date().toLocaleDateString('en-CA'),
      "dues": Math.max(...productos.map(e => e.fee)),
      "edit": "N",
      "fee_value": Math.max(...productos.map(e => e.value)),
      "initial_fee": 0,
      "original": null,
      "quote": "N",
      "seller_code": "800",
      "separate_invoices": "S",
      "session_user": "",
      "t_plan": "N",
      "user_app": user,
      "value": productos.map(e => parseFloat(e.priceFull.substr(1, e.length))).reduce((a, b) => a + b, 0), // SUMA TOTAL DE LA COMPRA SHOPIFY DE LOS PRODUCTOS
      "observation": ""
    },
    "client": {
      "address": objVisor.address,
      "cellphone": objVisor.celular ? objVisor.celular : 0,
      "cellphone1": null,
      "cellphone2": null,
      "city_code": objVisor.city,
      "email": objVisor.correo,
      "first_name": objVisor.primer_nombre,
      "identification": `${objVisor.tipo_doc}::${objVisor.documento}`,
      "neighborhood_code": objVisor.township,
      "second_name": objVisor.segundo_nombre,
      "second_surname": objVisor.segundo_apellido,
      "state_code": objVisor.province,
      "surname": objVisor.primer_apellido
    },
    "products": productos.map((elem, i) => (
      {
        bonus_code: '',
        discount: 0,
        dues: 40,
        father: 0,
        fee_value: 0,
        gifts: [],
        promotion_code: '',
        quantity: Number.parseInt(elem.quantity),
        regular_value: Number.parseFloat(elem.priceFull.substr(1, elem.length)),
        sequence: i + 1,
        sku: elem.sku,
        unit_value: Number.parseFloat(elem.priceFull.substr(1, elem.length))
      }
    )),
    "services": [
      {
        "service_code": "01",
        "service_name": "DELIVERY",
        "service_price": 0
      }
    ],
    "dispatch": {
      "address": objVisor.address,
      "city_code": objVisor.city,
      "indications": objVisor.indications,
      "neighborhood_code": objVisor.township,
      "phone": objVisor.celular ? objVisor.celular : 0,
      "state_code": objVisor.province,
      "zone_code": "00"
    }
  }
  console.log('OP', bodyOP)
  // AppVendedorDevOrder
  const response = await fetch(`${window.url_aws3}${apiUrl}/${environments.prod.company}/orders-new?type=D&country=01`, {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(bodyOP)
  });
  return response.json();
}

/*****************************************************
*
*      FUNCION PARA CONSULTAR TOKEN BECOME
*	              ANTONYTRIANA@GMAIL.COM
******************************************************/
function getTokenBecome() {
  return new Promise((resolve, reject) => {
    fetch(`${window.url_aws3}${apiUrl}/${environments.prod.company}/become/link`)
      .then(data => data.json())
      .then(data => resolve(data['access_token']))
      .catch(e => {
        console.log("error -> ", e);
        reject(e)
      })
  })
};

/*****************************************************
*
*     FUNCION PARA DESMATERIALIZAR DOCUMENTOS
*	          ANTONYTRIANA@GMAIL.COM
******************************************************/
async function desmaterializar(documentos, sign = false, otp = "", uuid = "", finished, id = '') {
  writtenNumber.defaults.lang = 'es';
  let anexo = {}
  switch (objVisor.tipoempresa) {
    case 'ddempresaprivadapanama':
      anexo = {
        "tipo_anexo": objVisor.tipoempresa,
        "Dia": new Date().getDate(),
        "Mes": new Date().getMonth() + 1,
        "Anno": new Date().getFullYear(),
        "Pagos": "________________",
        "PagosMensuales": "________________",
        "Cantidad": "________________",
        "Quincena": "________________",
        "MesPago": "________________",
        "SumaTotal": "________________",
        "Suma": "________________________________________________",
        "Compromiso": "________________________________________________",
        "Nombre": `${objVisor.primer_nombre} ${objVisor.segundo_nombre} ${objVisor.primer_apellido} ${objVisor.segundo_apellido}`,
        "Documento": objVisor.documento,
        "Firma": sign ? "Si" : "No",
        "FechaFirma": new Date().toLocaleDateString('en-GB'),
        "CodigoOtp": otp,
        "uuid": uuid
      }

      break;
    case ' ddjubiladopanama':
      anexo = {
        "tipo_anexo": objVisor.tipoempresa,
        "DirecccionCamara": " ____________________________________________",
        "Dia": new Date().getDate(),
        "Mes": new Date().getMonth() + 1,
        "Anno": new Date().getFullYear(),
        "Clave": "________",
        "Subclave": "________",
        "NumeroCajaSeguro": "________________",
        "Planilla": "________________",
        "Suma": "________________",
        "Plazo": "________",
        "PagoObligacion": "________________",
        "TextoObligacion": "________________________________",
        "DiaDescuento": "________",
        "MesDescuento": "________",
        "AnnoDescuento": "________",
        "PrecioVenta": "________",
        "AbonoInicial": "________",
        "ObligacionFinanciar": "________",
        "Intereses": "________",
        "Cargo": "________",
        "ValorCargo": "________",
        "TotalCargo": "________",
        "Itbms": "________",
        "NetoPagar": "________",
        "Documento": objVisor.documento,
        "Nombre": `${objVisor.primer_nombre} ${objVisor.segundo_nombre} ${objVisor.primer_apellido} ${objVisor.segundo_apellido}`,
        "Firma": sign ? "Si" : "No",
        "FechaFirma": new Date().toLocaleDateString('en-GB'),
        "CodigoOtp": otp,
        "uuid": uuid
      }
      break;
    case ' ddsemiautonomopanama':
      anexo = {
        "tipo_anexo": objVisor.tipoempresa,
        "DireccionCamara": " ________________________________________",
        "Dia": new Date().getDate(),
        "Mes": new Date().getMonth() + 1,
        "Anno": new Date().getFullYear(),
        "Clave": "________",
        "Subclave": "________",
        "RazonSaldo": "________________________________",
        "Saldo": "________________",
        "Empleado": " Empleado ",
        "Planilla": "________________",
        "Suma": "________________",
        "Plazo": "________",
        "DiaDescuento": "________",
        "MesDescuento": "________",
        "AnnoDescuento": "________",
        "Cedula": "________________",
        "Pago": "________",
        "PrecioVenta": "________",
        "AbonoInicial": "________",
        "MontoTotal": "________",
        "Interes": "________",
        "Cargo": "________________",
        "ValorCargo": "________",
        "TotalCargo": "________",
        "Itbms": "________",
        "NetoPagar": "________",
        "Documento": objVisor.documento,
        "Nombre": `${objVisor.primer_nombre} ${objVisor.segundo_nombre} ${objVisor.primer_apellido} ${objVisor.segundo_apellido}`,
        "Firma": sign ? "Si" : "No",
        "FechaFirma": new Date().toLocaleDateString('en-GB'),
        "CodigoOtp": otp,
        "uuid": uuid
      }
      break;
    case ' ddcajasegurosocialpanama':
      anexo = {
        "tipo_anexo": objVisor.tipoempresa,
        "Adicion": "",
        "Correccion": "",
        "Eliminacion": "",
        "Documento": objVisor.documento,
        "Codigo": "170122",
        "Nombre": "________________",
        "Acreedor": "________________",
        "Cedula": "________________",
        "SeguroSocial": "________",
        "Descuento": "________________",
        "MontoTotal": "________________",
        "Saldo": "________________",
        "Plazo": "________________",
        "FechaDescuento": "________________",
        "NumeroCuenta": "________________",
        "Observaciones": "",
        "Dia": new Date().getDate(),
        "Mes": new Date().getMonth() + 1,
        "Anno": new Date().getFullYear(),
        "Clave": "________",
        "Subclave": "________",
        "RazonSueldo": "________",
        "DeSueldo": "________________",
        "Itbms": "________________",
        "NetoPagar": "________________",
        "Planilla": "________________",
        "NumeroEmpleado": "________________",
        "DiaDescuento": "________________",
        "MesDescuento": "________________",
        "AnnoDescuento": "________________",
        "PrecioVenta": "________________",
        "AbonoInicial": "________________",
        "Interes": "________________",
        "RazonCargo": "________________",
        "Cargo": "________________",
        "TotalCargo": "________________",
        "Cuota": "________________",
        "Aportacion": "________________",
        "Prestamo": "________________",
        "Ahorro": "________________",
        "Poliza": "________________",
        "Firma": sign ? "Si" : "No",
        "FechaFirma": new Date().toLocaleDateString('en-GB'),
        "CodigoOtp": otp,
        "uuid": uuid,
        "Transacciones": [
          {
            "Transaccion": "",
            "Codigo": "",
            "LetraQuinc": "",
            "Saldo": ""
          },
          {
            "Transaccion": "",
            "Codigo": "",
            "LetraQuinc": "",
            "Saldo": ""
          },
          {
            "Transaccion": "",
            "Codigo": "",
            "LetraQuinc": "",
            "Saldo": ""
          },
          {
            "Transaccion": "",
            "Codigo": "",
            "LetraQuinc": "",
            "Saldo": ""
          }
        ]
      }
      break;
  }

  let body = {
    "c_agr": objVisor.age_est,
    "c_est": objVisor.c_est,
    "cod_otp": otp,
    "usuario": user,
    "body_habeas": {
      "Documento": objVisor.documento,
      "Telefono": objVisor.celular,
      "Nombre": `${objVisor.primer_nombre} ${objVisor.segundo_nombre} ${objVisor.primer_apellido} ${objVisor.segundo_apellido}`,
      "Direccion": objVisor.address,
      "Corregimiento": objVisor.township_desc,
      "Distrito": objVisor.city_desc,
      "Provincia": objVisor.province_desc,
      "Correo": objVisor.correo,
      "Firma": sign ? "Si" : "No",
      "FechaFirma": new Date().toLocaleDateString('en-GB'),
      "CodigoOtp": otp,
      "uuid": uuid
    },
    "body_contrato": {
      "Documento": objVisor.documento,
      "Distrito": objVisor.city_desc,
      "Corregimiento": objVisor.township_desc,
      "Barriada": objVisor.township_desc,
      "Agencia": objVisor.agencia_seleccionada,
      "Ciudad": objVisor.city_desc,
      "Direccion": objVisor.address,
      "Telefono": objVisor.celular,
      "Orden": objVisor.nro_op,
      "Tienda": "TIENDA E-COMMERCE PANAMA", // TIENDA DE DONDE SE REALIZA ORDEN DE PEDIDO
      "Producto": JSON.stringify(productos.map(e => e.title)).replaceAll(/[\[\]"\r\n\t]/g, ''), // PENDIENTE
      "Cantidad": "1", // PENDIENTE
      "Vendedor": user, // PENDIENTE
      "CapitalFinanciar": objVisor.encabezado.capital, // PENDIENTE
      "Utilizacion": objVisor.encabezado.tot, // PENDIENTE
      "NumeroCuotas": objVisor.cuotas[0].cuotas, // PENDIENTE
      "ValorCuota": objVisor.cuotas[0].valor, // PENDIENTE
      "Suma": objVisor.encabezado.tot, // PENDIENTE
      "Recargo": "12",
      "TarifaCuota1": "8",
      "TarifaCuota2": "10",
      "TarifaCuota3": "14",
      "TarifaCuota4": "17",
      "PorcentajeLineaCredito": "3",
      "Impuesto": "5",
      "InteresEfectivo": Number.parseFloat(objVisor.encabezado.iea).toFixed(2), // PENDIENTE
      "InteresNominal": Number.parseFloat(objVisor.encabezado.tasa_nominal_per).toFixed(2), // PENDIENTE
      "MontoInteres": objVisor.encabezado.interes, // PENDIENTE
      "SumaPagadas": "0",
      "SumaNeta": "0",
      "Dias": new Date().getDate(),
      "Mes": new Date().getMonth() + 1,
      "Anno": new Date().getFullYear(),
      "Nombre": `${objVisor.primer_nombre} ${objVisor.segundo_nombre} ${objVisor.primer_apellido} ${objVisor.segundo_apellido}`,
      "Firma": sign ? "Si" : "No",
      "FechaFirma": new Date().toLocaleDateString('en-GB'),
      "CodigoOtp": otp,
      "uuid": uuid
    },
    "body_pagare": {
      "Lugar": "Panamá",
      "Nombre": `${objVisor.primer_nombre} ${objVisor.segundo_nombre} ${objVisor.primer_apellido} ${objVisor.segundo_apellido}`,
      "Documento": objVisor.documento,
      "NumeroPagare": "", // PENDIENTE
      "DocumentoCodeudor": "________________",
      "NombreCodeudor": "________________",
      "SumaLetras": writtenNumber(Number.parseFloat(objVisor.encabezado.capital + objVisor.encabezado.interes).toFixed(2)).toUpperCase(),
      "Suma": Number.parseFloat(objVisor.encabezado.capital + objVisor.encabezado.interes).toFixed(2), // PENDIENTE
      "MensualidadLetras": writtenNumber(objVisor.cuotas[0].cuotas).toUpperCase(),
      "Mensualidad": objVisor.cuotas[0].cuotas, // PENDIENTE
      "DiaPago": "2 DE CADA MES", // PENDIENTE
      "Porcentaje": "2",
      "DiasLetras": writtenNumber(new Date().getDate()).toUpperCase(),
      "Dia": new Date().getDate(),
      "Mes": new Date().getMonth() + 1,
      "Anno": new Date().getFullYear(),
      "Firma": sign ? "Si" : "No",
      "FechaFirma": new Date().toLocaleDateString('en-GB'),
      "CodigoOtp": otp,
      "uuid": uuid
    },
    "body_anexo": anexo,
    "body_terminos": {
      "Recargo": "12",
      "TarifaCuota1": "8",
      "TarifaCuota2": "10",
      "TarifaCuota3": "14",
      "TarifaCuota4": "17",
      "Dias": new Date().getDate(),
      "Mes": new Date().getMonth() + 1,
      "Anno": new Date().getFullYear(),
      "Nombre": `${objVisor.primer_nombre} ${objVisor.segundo_nombre} ${objVisor.primer_apellido} ${objVisor.segundo_apellido}`,
      "Documento": objVisor.documento,
      "Firma": sign ? "Si" : "No",
      "FechaFirma": new Date().toLocaleDateString('en-GB'),
      "CodigoOtp": otp,
      "uuid": uuid
    },
    "body_cotizacion": {
      "Agencia": objVisor.age_est,
      "Tienda": "JAMAR VIA ESPAÑA",
      "Pin": objVisor.encabezado.pin_es, // PENDIENTE
      "Documento": objVisor.documento,
      "Telefono": objVisor.celular,
      "Nombre": `${objVisor.primer_nombre} ${objVisor.segundo_nombre} ${objVisor.primer_apellido} ${objVisor.segundo_apellido}`,
      "Ciudad": objVisor.city_desc,
      "Direccion": objVisor.address,
      "Barrio": objVisor.township_desc,
      "Producto": JSON.stringify(productos.map(e => e.title)).replaceAll(/[\[\]"\r\n\t]/g, ''),
      "Cantidad": "1",
      "Vendedor": user, // PENDIENTE
      "CapitalFinanciar": objVisor.encabezado.capital, // PENDIENTE
      "AbonoInicial": objVisor.encabezado.sal_ini, // PENDIENTE
      "SaldoAnterior": objVisor.encabezado.saldo_cartera, // PENDIENTE
      "CapitalTotalFinanciar": objVisor.encabezado.capital - objVisor.encabezado.sal_ini ? objVisor.encabezado.sal_ini : 0, // PENDIENTE
      "SaldoTotalNuevo": objVisor.encabezado.saldo_cartera ? objVisor.encabezado.saldo_cartera : 0 + (objVisor.encabezado.capital - objVisor.encabezado.sal_ini ? objVisor.encabezado.sal_ini : 0), // PENDIENTE
      "NuevaUtilizacion": "Utilizacion", // PENDIENTE
      "NumeroCuotas": objVisor.cuotas[0].cuotas, // PENDIENTE
      "ValorCuota": objVisor.cuotas[0].valor, // PENDIENTE
      "TasaInteres": objVisor.encabezado.iea, // PENDIENTE
      "Porcentaje": Number.parseFloat(objVisor.encabezado.tasa_nominal_per || 0).toFixed(2), // PENDIENTE
      "ComisionParaSi": "0",
      "ComisionParaTerceros": "0",
      "Suma": "", // PENDIENTE
      "SobretasaFECI": "0",
      "RetencionFECI": "1",
      "GastosNotariales": "0", // PENDIENTE
      "GastosRegistro": "0", // PENDIENTE
      "PrimasSeguro": objVisor.encabezado.valor_seguro, // PENDIENTE
      "PeriodoVigencia": "30 días", // PENDIENTE
      "ValorCertificado": "15", // PENDIENTE
      "MontoObligaciones": objVisor.encabezado.interes, // PENDIENTE
      "Firma": sign ? "Si" : "No",
      "FechaFirma": new Date().toLocaleDateString('en-GB'),
      "CodigoOtp": otp,
      "uuid": uuid
    },
    "body_certificado": {
      "Dia": new Date().getDate(),
      "Mes": new Date().getMonth() + 1,
      "Anno": new Date().getFullYear(),
      "Clave": "_________",
      "Subclave": "_________",
      "Nombre": `${objVisor.primer_nombre} ${objVisor.segundo_nombre} ${objVisor.primer_apellido} ${objVisor.segundo_apellido}`,
      "Codigo": "_________",
      "Obligatoria": "",
      "Comprometido": "",
      "Disponible": "",
      "SaldoQuincenal": "",
      "Documento": objVisor.documento,
      "Firma": sign ? "Si" : "No",
      "FechaFirma": new Date().toLocaleDateString('en-GB'),
      "CodigoOtp": otp,
      "uuid": uuid
    },
    "documentos": documentos
  }
  const response = await fetch(`${window.url_aws3}${apiUrl}/${environments.prod.company}/epik/desmaterializar${finished ? `?id=${id}` : ''}`, {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(body)
  });
  return response.json();
}

function inicioPreCalificacion(estrategia, bjs) {
  saveInSalesforce(bjs).then(info => {
    console.log('ENVIAR A SALESFORCE', info);
  })
  switch (estrategia) {
    case 'AMARILLO':
      console.log("es Amarillo", bjs)
      next(2);
      imgStep3Amarillo.classList.remove('display-no');
      if (bjs.segmento === "ORO") {
        imgStep3Amarillooro.classList.remove('display-no');
      } else {
        imgStep3Amarilloverde.classList.remove('display-no');
      }
      getProvinces()
      getCities("08")
      getTownship("08", "06")
      if (verifyMe()) {
        if (objVisor.ocupacion == 2) {
          if (objVisor.estrategia != 'AMARILLO') {
            getComprobador().then(resp => {
              if (!resp.success) {
                exit()
              }
            })
          }
        }
        if (bjs.segmento === "ORO") {
          imgStep3Amarillooro.classList.remove('display-no');
        } else {
          imgStep3Amarilloverde.classList.remove('display-no');
        }
      } else {
        viable();
      }
      break;
    case 'NARANJA':
    case 'AZUL':
      next(2);
      console.log("NO es oro")
      imgStep3viable.classList.remove('display-no');
      console.log('NO ORO', bjs)
      break;
    default:
      next(2);
      imgStep3noViable.classList.remove('display-no');
      api_whatsapp;
  }
}

function createDocumentsList(codigo) {
  $('#documents').empty();
  validarEstadoDesmaterializar(`${window.url_aws3}${apiUrl}/${environments.prod.company}/epik/getDocuments?id=${codigo}`).then(resp => {
    Swal.close()
    console.log(resp)
    if (resp.estado == "Visualizado") {
      for (const key in resp) {
        console.log(`${resp} Key ${key} Object ${resp[key]}`)
        if (key == 'habeas_data' && resp[key] != null) {
          createDocument('Autorizaciónes y Declaraciones', resp.habeas_data, key)
        } else if (key == 'contrato' && resp[key] != null) {
          createDocument('Contrato de Préstamo/Linea de Credito', resp.contrato, key)
        } else if (key == 'pagare' && resp[key] != null) {
          createDocument('Pagaré', resp.pagare, key, key)
        } else if (key == 'anexo' && resp[key] != null) {
          createDocument('Orden de Descuento Directo', resp.anexo.link, resp.anexo.tipo)
        } else if (key == 'terminos' && resp[key] != null) {
          createDocument('Terminos y Condiciones de la Plataforma', resp.terminos, key)
        } else if (key == 'cotizacion' && resp[key] != null) {
          createDocument('Cotización de Prestamo', resp.cotizacion, key)
        } else if (key == 'certificado' && resp[key] != null) {
          createDocument('Certificado de Jubilación', resp.certificado, key)
        }
      }
    }
  })
}

function createDocument(name, url, tipo) {
  let checkbox = document.createElement('input');
  checkbox.type = "checkbox";
  checkbox.name = "array";
  checkbox.value = tipo;

  let label = document.createElement('label')
  label.htmlFor = tipo;

  let link = document.createElement('a');
  link.href = url;
  link.innerHTML = `<strong>${name}</strong>`;
  link.target = "_blank";
  link.style = "margin-left: 5px;"
  label.appendChild(link);

  let br = document.createElement("br");

  document.getElementById('documents')?.appendChild(checkbox);
  document.getElementById('documents')?.appendChild(label);
  document.getElementById('documents')?.appendChild(br);
}

var seleccion = false
function selectAll() {
  seleccion = !seleccion
  let boxes = document.documents.array.length;
  let documents = document.getElementById('documents');
  for (var i = 0; i < boxes; i++) {
    if (seleccion) {
      documents.array[i].checked = true;
    } else {
      documents.array[i].checked = false;
    }
  }
}

function getDocuments(codigo) {
  return new Promise((resolve, reject) => {
    fetch(`${window.url_aws3}${apiUrl}/${environments.prod.company}/epik/getDocuments?id=${codigo}`)
      .then(data => data.json())
      .then(data => resolve(data))
      .catch(e => {
        console.log("error -> ", e);
        reject(e)
      })
  })
};

async function consultar_preguntas() {
  let body = {
    "ageest": objVisor.agencia_seleccionada,
    "codest": objVisor.c_est,
    "cliente": objVisor.documento,
    "ageop": objVisor.agencia_seleccionada,
    "perop": new Date().getFullYear(),
    "numop": objVisor.nro_op,
    "usuario": user,
    "proceso": "RIESGOS_WEB",
    "programa": user,
    "ide": objVisor.tipo_doc,
    "apellido": objVisor.primer_apellido
  }

  const response = await form_dinamico_retry(`${window.url_aws4}${apiUrl}/${environments.prod.company}/test/epik/precalificar/preguntas`, {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(body)
  });
  return response;
};

async function form_dinamico() {
  let preguntas = await consultar_preguntas()
  agrupacion = _.groupBy(preguntas.data.preguntas, 'seccion')
  obj_form = {}
  obj_form_f = []

  let obj_f = {}
  for (const key in agrupacion) {
    for (const key2 in agrupacion[key]) {
      obj_form = {
        ...obj_form, ...pregunta_input(agrupacion[key][key2],
          agrupacion[key][key2]?.opciones?.data)
      }
    }
  }
  obj_form_f.push({
    "type": "submit",
    "title": "Siguiente",
  })
  preguntas_form(obj_form)
}

function preguntas_form(obj) {
  $('form#precalificacion').jsonForm({
    schema: obj,
    form: obj_form_f,
    onSubmit: function (errors, values) {
      if (errors) {
        Swal.fire({
          imageUrl: 'https://cdn.shopify.com/s/files/1/0516/5478/7271/t/12/assets/sorpresa.png',
          title: '¡Disculpa!',
          text: 'Estimado cliente el formulario tiene valores no válidos',
          allowOutsideClick: false,
          confirmButtonColor: "#00abb0"
        })
        return;
      }
      console.log('values', values);
      objVisor = { ...objVisor, ...values }
      if (objVisor.ocupacion == 2) {
        console.log('INPUT EMPRESA')
        document.getElementById('precalificacion').classList.add('display-no')
        document.getElementById('div-empresa').classList.remove('display-no')
      } else {
        if (objVisor.ocupacion == 3) {
          objVisor.tipoempresa = 'ddjubiladopanama'
        }
        guardar_preguntas().then(resp => {
          if (!resp.success) {
            exit()
          }
        })
        getCreateDocumentsList()
      }

    }
  });
  $('.datepicker').datepicker({
    dateFormat: 'yy-mm-dd',
    changeMonth: true,
    changeYear: true,
    yearRange: "-80:+20"
  });
  Inputmask({ mask: "9999-99-99" }).mask(document.getElementsByClassName('datepicker'))


  let botonAnterior = document.createElement("span");
  botonAnterior.innerHTML = '<button type="button" id="anteriorBtn" class="button-primary display-no" onclick="pasos(-1)" style="margin-right: 10px;">Anterior</button>';

  let botonSiguiente = document.createElement("span");
  botonSiguiente.innerHTML = '<button type="button" id="siguienteBtn" class="button-primary" onclick="pasos(1)" style="margin-right: 10px;">Siguiente</button>';

  let formulariopre = document.getElementById("formulariopre")

  formulariopre.insertBefore(botonAnterior, document.getElementById("btn-json-form"));
  formulariopre.insertBefore(botonSiguiente, document.getElementById("btn-json-form"));

  mostrarPasos(pasoActual);

  $('#btn-json-form').click(function () {
    $('.jsonformselector').each(function () {
      if (this.value == '') {
        Swal.fire({
          imageUrl: 'https://cdn.shopify.com/s/files/1/0516/5478/7271/t/12/assets/sorpresa.png',
          title: '¡Disculpa!',
          text: 'Estimado cliente algunos campos están vacíos, por favor verifique y vuelva a intentar.' + this,
          allowOutsideClick: false,
          confirmButtonColor: "#00abb0"
        })
        return;
      }
    });
  });
}

function pregunta_input(object, array = []) {
  let type_obj
  let fecha = false
  switch (object.tipo_dato) {
    case 'D':
      type_obj = "string"
      fecha = true
      break;
    case 'N':
      type_obj = "integer"
      break;
    case 'E':
      type_obj = "email"
      break;
    default:
      type_obj = "string"
      break;
  }

  let obj = {
    [object.campo_guardar.toLowerCase()]: {
      "type": type_obj,
      "title": object.nombre_mostrar,
      "required": true
    }
  }

  if (object.campo_guardar.toLowerCase() == 'extrecho_colaborador_pep' || object.campo_guardar.toLowerCase() == 'fam_politica_expuesta') {
    obj[object.campo_guardar.toLowerCase()].description = 'PEP: Persona Expuesta Políticamente'
  }

  let form_s = {
    "key": object.campo_guardar.toLowerCase(),
    "titleMap": {},
  }

  if (type_obj == 'integer') {
    form_s.placeholder = 0
    obj[object.campo_guardar.toLowerCase()].min = 0
  }

  if (object.visible == 'N') {
    form_s.type = "hidden"
    if (object.opciones) obj[object.campo_guardar.toLowerCase()].default = object.opciones.data[0].codigo
  }

  if (fecha) form_s.fieldHtmlClass = 'datepicker'

  if (array.length > 0) {
    let listado = [];
    array.forEach(element => {
      listado.push(element.OPC_VALOR || element.codigo)
      let temp = {
        [element.OPC_VALOR || element.codigo]: element.DES_OCU || element.descripcion || element.OPC_DESCRI || element.DESCRIPCION || element.DESC_OCU
      }
      form_s.titleMap = { ...form_s.titleMap, ...temp }
    });
    obj[object.campo_guardar.toLowerCase()].enum = listado
  }

  console.log(obj)
  obj_form_f.push(form_s)
  return obj
}

async function guardar_preguntas() {
  let origen_fondo;

  switch (objVisor.ocupacion) {
    case '1':
      origen_fondo = 'OF5'
      break;
    case '2':
    case '3':
      origen_fondo = 'OF1'
      break;
    case '4':
      origen_fondo = 'OF2'
      break;
    case '5':
      origen_fondo = 'OF3'
      break;
    case '6':
    case '7':
      origen_fondo = 'OF4'
      break;
  }

  let pre_body = {
    "bar": objVisor.township,
    "c_cab": objVisor.city,
    "dep": objVisor.province,
    "ciu": objVisor.city,
    "c_pai": "01",
    "dir": objVisor.address,
    "sena": objVisor.indications,
    "actividad_negocio": objVisor.actividad_cargo,
    "cargo": objVisor.actividad_cargo,
    "ocupacion": objVisor.ocupacion,
    "ingresos_principales": objVisor.ingresos ? objVisor.ingresos + '' : '',
    "dir_elect": objVisor.correo,
    "tipo_vivienda": "",
    "fecha_tiempo_vivienda": "",
    "tipo_contrato": "",
    "fecha_tiempo_servicio": "",
    "dir_clte": objVisor.address,
    "est_civil": "",
    "sexo": "",
    "nro_hijos": "",
    "fecha_nac": objVisor.birth,
    "c_emp": objVisor.c_emp,
    "api_key": "d47c29cfdf8e2456ac678c51f9e4ddfa8ec577f64e98aa9e863399f6a10210d4",
    "c_est": objVisor.c_est,
    "n_ide": objVisor.documento,
    "c_agr": objVisor.age_est,
    "ide": objVisor.tipo_doc,
    "valida_resp": "N",
    "criterios": [],
    "usuario": user,
    "programa": "FABRICA",
    "modulAccion": "FABRICA",
    "apellido": objVisor.primer_apellido,
    "valida_pol": "S",
    "modulo": "0002",
    "lugar_trabajo": "",
    "valor_egresos": "",
    "otros_egresos": "",
    "direccion_residencial": {
      "tipo_dir": "RD",
      "dir": objVisor.address,
      "c_pais": "01",
      "c_depto": objVisor.province,
      "c_mnpo": objVisor.city,
      "bar": objVisor.township,
      "sena": objVisor.indications,
      "nombre_tipo": "",
      "est_dir": "A"
    },
    "telefonos": {
      "numero": Number.parseInt(objVisor.celular),
      "ext": 507,
      "tipo": "CELULAR",
      "primer_nombre": objVisor.primer_nombre,
      "segundo_nombre": objVisor.segundo_nombre,
      "primer_apellido": objVisor.primer_apellido,
      "segundo_apellido": objVisor.segundo_apellido,
      "dep": objVisor.province,
      "ciu": objVisor.city,
      "parentesco": "",
      "ubicacion": "MOVIL"
    },
    "referencias": [
      {
        "nomb_ref1": objVisor.nombre_cont_1,
        "numero": objVisor.telefono_ref_1 + ''
      },
      {
        "nomb_ref2": objVisor.nombre_cont_2,
        "numero": objVisor.telefono_ref_2 + ''
      }
    ],
    "canal_vinculacion": objVisor.statusCode == 200 ? 'CV4' : 'CV1',
    "origen_fondo": origen_fondo
  }
  pre_body = { ...pre_body, ...objVisor }

  let body = {
    "params": pre_body
  }
  console.log('SAVE', body)

  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const response = await post_retry(`${window.url_aws4}${apiUrl}/${environments.prod.company}/client/saveAnswers`, {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(body),
    redirect: 'follow'
  });
  return response;
};


async function buscarEmpresa() {
  console.log('BUSCAR EMPRESA')
  let empresas
  const { value: empresa } = await Swal.fire({
    imageUrl: 'https://cdn.shopify.com/s/files/1/0516/5478/7271/t/12/assets/carita_audifono.png',
    title: 'Buscando empresa...',
    input: 'text',
    inputLabel: 'Escriba el nombre de la empresa',
    showCancelButton: true,
    allowOutsideClick: false,
    confirmButtonColor: "#00abb0",
    cancelButtonColor: "#D8232A",
    inputValidator: async (value) => {
      if (!value) {
        return 'Usted necesita escribir algo!'
      }
      console.log('1')
      await get_empresa_retry(`${window.url_aws4}${apiUrl}/${environments.prod.company}/nits?data=${value}`).then(resp => {
        resp.forEach(e => {
          let obj = { [e.n_ide]: e.nom }
          empresas = { ...empresas, ...obj }
          console.log('2')
        })
      })
      console.log('3')
    }
  })

  if (empresa) {
    console.log('4')
    await Swal.fire({
      imageUrl: 'https://cdn.shopify.com/s/files/1/0516/5478/7271/t/12/assets/carita_audifono.png',
      title: 'Resultado de la empresa',
      input: 'select',
      inputOptions: empresas,
      inputPlaceholder: 'Seleccione una empresa',
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonColor: "#00abb0",
      cancelButtonColor: "#D8232A",
      inputValidator: (value) => {
        if (!value) {
          return 'Usted necesita seleccionar una empresa'
        }
        objVisor.empresa = value
        $('#empresa').val($(".swal2-select option:selected").text())
      }
    })
  }
}

function getEmpresa(nombre) {
  return new Promise((resolve, reject) => {
    fetch(`${window.url_aws4}${apiUrl}/${environments.prod.company}/nits?data=${nombre}`)
      .then(data => data.json())
      .then(data => resolve(data))
      .catch(e => {
        console.log("error -> ", e);
        reject(e)
      })
  })
};

function getCreateDocumentsList() {
  Swal.fire({
    title: 'Por favor espere',
    html: 'Estimado Cliente: Por favor espere, estamos validando su información.',
    showConfirmButton: false,
    allowOutsideClick: false,
    willOpen: () => {
      Swal.showLoading()
    },
  })

  consultar_politicas().then(resp => {
    const documentos = resp.data.datospoliticas[0].detallerespuesta.filter(e => e.respuesta1 == "SI").map(e => Number.parseInt(e.condicion))
    console.log('documentos', documentos)
    objVisor.array_documentos = documentos
    desmaterializar(objVisor.array_documentos, false, '', objVisor.uuid, false).then(resp => {
      console.log('Desmaterializar', resp)
      next(6);
      objVisor.num = resp.num
      createDocumentsList(objVisor.num)
    })
  })
}

const validarEstadoOP = (url) => {
  return new Promise((resolve, reject) => {
    let intentos = 1;
    const fetch_retry = (url, n) => {

      const reintentos = (error) => {
        if (n === 1) reject(error)
        else
          setTimeout(() => {
            intentos++
            fetch_retry(url, n - 1);
          }, intentos * 500)
      }

      return fetch(url)
        .then(response => response.json())
        .then(result => {
          if (result.state == 'FINISHED') {
            resolve(result)
          } else {
            reintentos('error')
          }
        })
        .catch(function (error) {
          reintentos(error)
        });
    }
    return fetch_retry(url, 10);
  });
}

const validarEstadoDesmaterializar = (url) => {
  return new Promise((resolve, reject) => {
    let intentos = 1;
    const fetch_retry = (url, n) => {

      const reintentos = (error) => {
        if (n === 1) reject(error)
        else
          setTimeout(() => {
            intentos++
            fetch_retry(url, n - 1);
          }, intentos * 500)
      }

      return fetch(url)
        .then(response => response.json())
        .then(result => {
          console.log(result)
          if (result.estado == 'Pendiente') {
            reintentos('error')
          } else {
            resolve(result)
          }
        })
        .catch(function (error) {
          reintentos(error)
        });
    }
    return fetch_retry(url, 15);
  });
}

function manifiesto() {
  let manifiesto = document.getElementById("manifiesto");
  if (manifiesto.checked == true) {
    btnStep7.classList.remove('display-no')
  } else {
    btnStep7.classList.add('display-no')
  }
}

async function consultar_politicas() {
  let body = {
    "params": {
      "cliente": objVisor.documento,
      "age_est": objVisor.age_est,
      "cod_est": objVisor.c_est
    }
  }
  const response = await fetch(`${window.url_aws4}${apiUrl}/${environments.prod.company}/politicaMercadeo`, {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(body)
  });
  return response.json();
};

async function getVerifyMe(userId, c_agr, c_est, n_ide, usuario) {
  return await get_retry(`${window.url_aws3}${apiUrl}/${environments.prod.company}/become/result/${userId}/${c_agr}/${c_est}/${n_ide}/${usuario}`)
};

const form_dinamico_retry = (url, options) => {
  return new Promise((resolve, reject) => {
    let intentos = 1;
    const fetch_retry = (url, n) => {

      const reintentos = (error) => {
        if (n === 1) reject(error)
        else
          setTimeout(() => {
            intentos++
            fetch_retry(url, n - 1);
          }, intentos * 3000)
      }

      return fetch(url, options)
        .then(response => response.json())
        .then(result => {
          if (result.success) {
            resolve(result)
          } else {
            reintentos('error')
          }
        })
        .catch(function (error) {
          reintentos(error)
        });
    }
    return fetch_retry(url, 5);
  });
}

async function enviar_otp(num = '') {
  let body = {
    "num": num,
    "body": {
      "definitionKey": "APROB_PRIMER_CONTACTO_PA",
      "recipient": {
        "contactKey": "1143166625",
        "to": `507${objVisor.celular}`,
        "attributes": {
          "FirstName": objVisor.primer_nombre
        }
      }
    }
  }
  const response = await fetch(`${window.url_aws3}${apiUrl}/${environments.prod.company}/epik/OTP`, {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(body)
  });
  return response.json();
};

async function codigoOTP() {

  const { value: codigo_otp } = await Swal.fire({
    imageUrl: 'https://cdn.shopify.com/s/files/1/0516/5478/7271/t/12/assets/carita_audifono.png',
    title: 'Estimado Cliente',
    input: 'text',
    inputLabel: 'Por favor ingrese el código enviado al número de telefono',
    showCancelButton: true,
    allowOutsideClick: false,
    confirmButtonColor: "#00abb0",
    cancelButtonColor: "#D8232A",
    inputValidator: async (value) => {
      if (!value) {
        return 'Usted necesita escribir algo!'
      }
    }
  })

  if (codigo_otp) {
    console.log(codigo_otp)
    desmaterializar(objVisor.array_documentos, true, codigo_otp, objVisor.uuid, true, objVisor.num).then(resp => {
      console.log(resp)
      if (resp.message) {
        Swal.fire({
          imageUrl: 'https://cdn.shopify.com/s/files/1/0516/5478/7271/t/12/assets/sorpresa.png',
          title: 'Estimado cliente',
          text: resp.message,
          allowOutsideClick: false,
          confirmButtonColor: "#00abb0"
        })
        return
      }
      // LLAMAR AUTORIZADOR
      Swal.fire({
        title: 'Por favor espere',
        html: 'Estimado Cliente: Por favor espere, estamos validando su información.',
        showConfirmButton: false,
        allowOutsideClick: false,
        willOpen: () => {
          Swal.showLoading()
        },
      })
      getAutorizador().then(resp => {
        if (resp.success) {
          if (resp.message == 'OK, APROBACION INMEDIATA ') {
            getApprove().then(resp => {
              if (resp.ps_vcresultado) {
                Swal.close();
                next(7);
              } else {
                Swal.close();
                exit();
              }
            })
          } else {
            Swal.close();
            exit()
          }
        } else {
          Swal.close();
          exit();
        }
      })
    })
  }
}

const get_empresa_retry = (url) => {
  return new Promise((resolve, reject) => {
    let intentos = 1;
    const fetch_retry = (url, n) => {

      const reintentos = (error) => {
        if (n === 1) reject(error)
        else
          setTimeout(() => {
            intentos++
            fetch_retry(url, n - 1);
          }, intentos * 3000)
      }

      return fetch(url)
        .then(response => response.json())
        .then(result => {
          if (result.length > 0) {
            resolve(result)
          } else {
            reintentos('error')
          }
        })
        .catch(function (error) {
          reintentos(error)
        });
    }
    return fetch_retry(url, 5);
  });
}

function mostrarPasos(n) {
  let arrayStep = Object.keys(agrupacion).filter(e => e != 'null').length

  if (n == 1) {
    document.getElementById("anteriorBtn").classList.add('display-no')
  } else {
    document.getElementById("anteriorBtn").classList.remove('display-no')
  }

  if (n == arrayStep) {
    document.getElementById("siguienteBtn").classList.add('display-no')
    document.getElementById("btn-json-form").classList.remove('display-no')
  } else {
    document.getElementById("btn-json-form").classList.add('display-no')
    document.getElementById("siguienteBtn").classList.remove('display-no')
  }

  console.log('mostrarPasos', n)
  agrupacion[n]?.map(e => e.campo_guardar.toLowerCase()).forEach(e => {
    document.getElementById(e)?.classList.remove('display-no')
  })
}

function ocultarPasos(n) {
  console.log('ocultarPasos', n)
  agrupacion[n]?.map(e => e.campo_guardar.toLowerCase()).forEach(e => {
    document.getElementById(e)?.classList.add('display-no')
  })
}

function pasos(n) {
  ocultarPasos(pasoActual)
  pasoActual = pasoActual + n;
  mostrarPasos(pasoActual)
}

/*****************************************************
*     		  OBTENER FECHAS DE ENTREGA
*	            PATRYKSIM@GMAIL.COM
******************************************************/

async function postFechaEntrega(data, productos) {
  let body = {
    "codigo_agencia": data.agencia_seleccionada,
    "departamento_despacho": data.province,
    "ciudad_despacho": data.city,
    "barrio_despacho": data.township,
    "tipo_orden": "OP",
    "productos": productos.map(elem => (
      {
        codigo_producto: elem.sku,
        cantidad_producto: '' + elem.quantity
      }
    ))
  }
  console.log(body)
  const response = await fetch(`${window.url_aws5}${apiUrl}/${environments.prod.company}/delivery-date`, {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(body)
  });
  return response.json();
};

async function getFechaEntrega() {
  let delivery_dates = await postFechaEntrega(objVisor, productos)
  availableDates = delivery_dates.response.data[0].Fechas.filter(e => e.Estado == 'S').map(e => e.Fecha.replaceAll(/'/gm, ''))

  if ($.isEmptyObject(delivery_dates.response.data[0])) {
    exit()
  }

  $('#select-delivery-date-input').datepicker({
    beforeShowDay: available,
    dateFormat: 'yy-mm-dd',
    minDate: new Date(),
    onSelect: function (selectedDate) {
      deliveryDate = selectedDate
    }
  });

  document.getElementsByClassName('ui-datepicker-inline')[0].style.display = "inline-block";
}

function available(date) {
  dmy = date.getFullYear() + "-" + leadingZero(date.getMonth() + 1) + "-" + leadingZero(date.getDate());
  if ($.inArray(dmy, availableDates) != -1) {
    return [true, "", "Available"];
  } else {
    return [false, "", "unAvailable"];
  }
}

function leadingZero(value) {
  if (value < 10) {
    return "0" + value.toString();
  }
  return value.toString();
}

/*****************************************************
*     		  ENVIAR FECHA DE ENTREGA
*	            PATRYKSIM@GMAIL.COM
******************************************************/

async function sendFechaEntrega(date) {
  const response = await fetch(`${window.url_aws3}${apiUrl}/${environments.prod.company}/${objVisor.agencia_seleccionada}/orders/${objVisor.nro_op}/update-delivery-date?date=%27${date}%27`, {
    method: 'PUT',
    redirect: 'follow'
  })
    .then(async (response) => {
      Swal.close();
      document.querySelector("#exit-section img")?.setAttribute("src", "https://cdn.shopify.com/s/files/1/0516/5478/7271/files/Credijamar-Orden-Confirmada.jpg?v=1619556185");
      exit();
    })
    .catch(error => {
      Swal.close();
      viable();
      console.log('error', error)
    });
};

async function sendFechaEntregaRetry(date) {
  const response = await post_retry_b(`${window.url_aws3}${apiUrl}/${environments.prod.company}/${objVisor.agencia_seleccionada}/orders/${objVisor.nro_op}/update-delivery-date?date=%27${date}%27`, {
    method: 'PUT',
    redirect: 'follow'
  });
  return response;
};

function getAutorizador() {
  return new Promise((resolve, reject) => {
    fetch(`${window.url_aws3}${apiUrl}/${environments.prod.company}/autorizador?pe_vcAgeOp=${objVisor.agencia_seleccionada}&pe_vcPerOp=${new Date().getFullYear()}&pe_vcNumOp=${objVisor.nro_op}&pe_vcN_ide=${objVisor.documento}&pe_vcAge_est=${objVisor.age_est}&pe_vcc_est=${objVisor.c_est}`)
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(err => reject(err));
  })
}

function getApprove() {
  return new Promise((resolve, reject) => {
    fetch(`${window.url_aws3}${apiUrl}/${environments.prod.company}/autorizador/Approve?pe_vcAgeOp=${objVisor.agencia_seleccionada}&pe_vcPerOp=${new Date().getFullYear()}&pe_vcNumOp=${objVisor.nro_op}&pe_vcN_ide=${objVisor.documento}&pe_vcAge_est=${objVisor.age_est}&pe_vcc_est=${objVisor.c_est}&usuario=${user}`)
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(err => reject(err));
  })
}
/*****************************************************
*     			ENVIAR DATOS A SAGGIC
*	            PATRYKSIM@GMAIL.COM
******************************************************/

async function postHelp(data) {
  let body = {
    "sagicc_token": "0dec6dcb163e4020154729baef80b2d5",
    "apellido": (data.primer_apellido != "") ? data.primer_apellido : null,
    "segundo_apellido": (data.segundo_apellido != "") ? data.segundo_apellido : null,
    "nombre": (data.primer_nombre != "") ? data.primer_nombre : null,
    "segundo_nombre": (data.segundo_nombre != "") ? data.segundo_nombre : null,
    "nro_documento": (data.documento != "") ? data.documento : null,
    "tipo_documento": (data.tipo_doc != "") ? data.tipo_doc : null,
    "telefono": (data.celular != "") ? data.celular : null
  }
  console.log(body)
  const response = await fetch("https://jamar.sagicc.co/api/v2/canal-website/website-callback", {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(body),
    redirect: 'follow'
  });
  return response.json();
};

/*****************************************************
* EVENTO DE ABANDONO EN EL PASO 5 LLEVA A SALESFORCE
*	            PATRYKSIM@GMAIL.COM
******************************************************/

window.onbeforeunload = function () {
  if (current == 4) {
    return "Are you sure?";
  }
};

const get_retry = (url) => {
  return new Promise((resolve, reject) => {
    let intentos = 1;
    const fetch_retry = (url, n) => {

      const reintentos = (error) => {
        if (n === 1) reject(error)
        else
          setTimeout(() => {
            intentos++
            fetch_retry(url, n - 1);
          }, intentos * 3000)
      }

      return fetch(url)
        .then(response => response.json())
        .then(result => {
          if (result.success) {
            resolve(result)
          } else {
            reintentos('error')
          }
        })
        .catch(function (error) {
          reintentos(error)
        });
    }
    return fetch_retry(url, 5);
  });
}

const post_retry = (url, options) => {
  return new Promise((resolve, reject) => {
    let intentos = 1;
    const fetch_retry = (url, n) => {

      const reintentos = (error) => {
        if (n === 1) reject(error)
        else
          setTimeout(() => {
            intentos++
            fetch_retry(url, n - 1);
          }, intentos * 3000)
      }

      return fetch(url, options)
        .then(response => response.json())
        .then(result => {
          if (result.success) {
            resolve(result)
          } else {
            reintentos('error')
          }
        })
        .catch(function (error) {
          reintentos(error)
        });
    }
    return fetch_retry(url, 5);
  });
}

const post_retry_b = (url, options) => {
  return new Promise((resolve, reject) => {
    let intentos = 1;
    const fetch_retry = (url, n) => {

      const reintentos = (error) => {
        if (n === 1) reject(error)
        else
          setTimeout(() => {
            intentos++
            fetch_retry(url, n - 1);
          }, intentos * 3000)
      }

      return fetch(url, options)
        .then(response => response.json())
        .then(result => {
          if (result.success | !result.success) {
            resolve(result)
          } else {
            reintentos('error')
          }
        })
        .catch(function (error) {
          reintentos(error)
        });
    }
    return fetch_retry(url, 5);
  });
}

function getComprobador() {
  return new Promise((resolve, reject) => {
    let documento = objVisor.documento
    let cadena = objVisor.documento.substring(0, 2)
    if (cadena == 'E-') {
      documento = objVisor.documento.replace('-', '0000')
      documento = documento.replace('-', '')
    }
    fetch(`${window.url_aws4}${apiUrl}/${environments.prod.company}/comprobador/${documento}`)
      .then(data => data.json())
      .then(data => resolve(data))
      .catch(e => {
        console.log("error -> ", e);
        reject(e)
      })
  })
};

async function post_become() {

  let body = {
    "documento": objVisor.documento,
    "age_est": objVisor.age_est,
    "c_est": objVisor.c_est,
    "perop": new Date().getFullYear(),
    "nro_op": objVisor.nro_op,
    "celular": objVisor.celular,
    "agencia_seleccionada": objVisor.agencia_seleccionada,
    "userId": objVisor.userId,
    "usuario": user,
    "programa": user
  }

  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const response = await post_retry_b(`${window.url_aws3}${apiUrl}/${environments.prod.company}/become/result`, {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(body),
    redirect: 'follow'
  });
  return response;
};

/*****************************************************
*    ENVIAR DATOS FORMULARIO DE CONTACTO A SAGGIC
*	            PATRYKSIM@GMAIL.COM
******************************************************/

async function postContactform(data) {
	let body = {
		"sagicc_token": "021cff033a4342ecf16fad85ae62453f",
		"primer_apellido": (data.primer_apellido != "") ? data.primer_apellido : null,
		"segundo_apellido": (data.segundo_apellido != "") ? data.segundo_apellido : null,
		"primer_nombre": (data.primer_nombre != "") ? data.primer_nombre : null,
		"segundo_nombre": (data.segundo_nombre != "") ? data.segundo_nombre : null,
		"nro_documento": (data.nro_documento != "") ? data.nro_documento : null,
		"tipo_documento": (data.tipo_documento != "") ? data.tipo_documento : null,
		"telefono": (data.telefono != "") ? data.telefono : null,
	}
	console.log(body)
	const response = await fetch("https://jamar.sagicc.co/api/v2/canal-website/website-callback", {
	    method: 'POST',
	    headers: new Headers({ 'Content-Type': 'application/json' }),
	    body: JSON.stringify(body),
	    redirect: 'follow'
	});
	return response.json();
}

// SE ENVIA A SAGICC DESDE EL FORMULARIO DE CONTACTO
btnContactform?.addEventListener("click", () => {
	postContactform(dataContactform);
})


