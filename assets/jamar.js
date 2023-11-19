//$(document).ready(function(){$("img.lazyload").lazyload();});

//localStorage.removeItem("cartCredit")

$(document).ready(function() {
  // Url actual
  var urlActual = window.location.href;

  // Url que deseas redireccionar
  var url1 = 'types?=camas';

  if (urlActual.includes(url1)) {
    window.location.href = 'https://www.jamar.com.pa/collections/camas';
  }
})

function showCarrouselbutton() {
  $("#carrusel-home .carousel-control-prev").map(function() {
      return this.classList.remove('visually-hidden');
  })
  $("#carrusel-home .carousel-control-next").map(function() {
      return this.classList.remove('visually-hidden');
  })
}

function eraseCarrouselbutton() {
  $("#carrusel-home .carousel-control-prev").map(function() {
      return this.classList.add('visually-hidden');
  })
  $("#carrusel-home .carousel-control-next").map(function() {
      return this.classList.add('visually-hidden');
  })
}

// Slick - Carrusel productos
$(document).ready(function() {
  $('.tarjeta-producto-box').slick({
    slidesToShow: 4,
    slidesToScroll: 4,
    infinite: true,
    /*autoplay: true,
    autoplaySpeed: 2000,*/
    slide: 'div',
    dots: false,
    arrows: true,
    responsive: [
    {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: false,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        }
      }
    ]
  });
})

// Obtener la fecha actual
const now = new Date();

// Comprobar si han pasado 2 días desde la última actualización
const lastUpdate = new Date(localStorage.getItem("lastUpdate"));
const diffInDays = (now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24);

// Reiniciar los valores de "cartCredit" y actualizar la fecha de última actualización
if (diffInDays >= 2) {
  localStorage.removeItem("cartCredit");
  localStorage.setItem("lastUpdate", now);
}

const btnCredito = document.querySelector(".btn-credito");
if (btnCredito != null) {
  btnCredito.addEventListener("click", () => {
    let objProduc = {
      cuotas: {
        seisMeses: $("#6-meses").text().trim(),
        doceMeses: $("#12-meses").text().trim(),
        dieciseisMeses: $("#16-meses").text().trim(),
        veinticuatroMeses: $("#24-meses").text().trim(),
        cuarentaMeses: $("#40-meses").text().trim()
      },
      sku: $(".product-sku").text().trim(),
      fee: $("#credit-select").val(),
      value: $("#cuota-semanal").text().trim(),
      link: window.location.href,
      img: $(".product-gallery--loaded-image").attr("src") ? "https:" + $(".product-gallery--loaded-image").attr("src") : "https:" + arrayImagenes.ambientada,
      title: $(".product-title").text().trim(),
      priceFull: $(".product--price  .price--main .money").text().trim(),
      priceSale: $(".product--price  .price--main .product-main-price ").text().trim(),
      quantity: $("#product-quantity-select").val().trim(),
      productId: meta.product.id,
      skuId: meta.product.variants[0].id
    };
    addTocartCredit(objProduc);
    addModalbody(objProduc.sku);

  });
}

function addTocartCredit(product) {
  let storage = JSON.parse(localStorage.getItem("cartCredit"));
  let skuFilter = (x,value) => { return x.filter((dataLine)=>dataLine.sku === value) };
  
  if (storage == null) {
    //Cuando NO hay productos en el carrito de credito
    let arrayCart = [];
    arrayCart.push(product);
    localStorage.setItem("cartCredit", JSON.stringify(arrayCart))
    //window.location.href = "https://www.jamar.com.pa/pages/credit-cart";
  } else {
    let duplicated = skuFilter(storage,product.sku);
    if (duplicated.length != 0) {
      storage.map(e => {
        if (e.sku == product.sku) {
          let newQuantity = Number(e.quantity) + Number(product.quantity);
          e.quantity = (newQuantity >= 10) ? 10 : newQuantity;
        } 
      });
    } else {
      storage.push(product);
    }
    localStorage.setItem("cartCredit", JSON.stringify(storage));
    //window.location.href = "https://www.jamar.com.pa/pages/credit-cart";
  }

};

function getCartCredit() {
  let storage = JSON.parse(localStorage.getItem("cartCredit"));
  if (storage == null) {
    return [];
  }
    else {
    //console.log(storage);
    return storage;
  }
};

function addModalbody(sku) {
  let subtotal = 0;
  let price = 0;
  let cuotaSemanal = 0;
  let producs = getCartCredit();
  let currentproduct = producs[producs.length-1];
  let bodyModal = document.querySelector("#exampleModal .modal-body .product .container");
  bodyModal.innerHTML="";
  producs.map(i => {
    //console.log(i);
    if ( i.priceSale != 0) {
      price = i.priceSale;
      console.log(price);
    } else {
      console.log("hola 2");
      price = i.priceFull;
    }
    //pintar el ultimo producto agregado al carrito si se quiere todo quitar el condicional if
    if (i.sku == sku){
    $("#exampleModal .modal-body .product .container").append(`<div class="row">
    <div class="col-4 picture">
      <a href="${i.link}"><img class="img-fluid rounded" src="${i.img}"></a>
    </div>
    <div class="col-8 info">
      <p class="text-gris-jamar">${i.sku}</p>
      <a href="${i.link}"><h5 class="text-gris-jamar ls-0 fw-bold">${i.title}</h5></a>
      <p class="text-gris-jamar">Cant. ${i.quantity}</p>
      <p class="text-gris-jamar fw-bold">${price}<p>
    </div>
  </div>`);
    }
    temPrice = price.replace(/[$,]/g, '')*i.quantity;
    temCuotasemanal = i.value.replace(/[$,]/g, '');
    subtotal = subtotal + Number(temPrice);
    cuotaSemanal = cuotaSemanal + Number(temCuotasemanal);
  });
  
  if (producs.length==1){
    $("#exampleModal .cantidad-productos")[0].innerHTML=`${producs.length} Producto en tu carrito`;
  } else {
    $("#exampleModal .cantidad-productos")[0].innerHTML=`${producs.length} Productos en tu carrito`;
  }
  $("#exampleModal .subtotal")[0].innerHTML= "$ " + subtotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") ;
  //$("#exampleModal .cuotaSemanal")[0].innerHTML= "$ " + cuotaSemanal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") ;
};

/***********************************************************
      CAMBIO DE VARIABLE EN EL DETALLE DE PRODUCTO
                   PATRYKSIM@GMAIL.COM
************************************************************/

$(document).ready(function () {

  faqAccordion();


  $(".selectVariant").change((e) => {

    let arraymy = variantsCon.filter(i => i.name === e.target.value)

    if (arraymy.length >= 1) {
      let mySku = arraymy[0].sku

      fetch(`https://3plmmfv3i1.execute-api.us-east-1.amazonaws.com/api/v1/prices?skus=${mySku}&agency=01&type=CO&project_id=01`)
        .then(data => data.json())
        .then(data => {
        })
        .catch(error => {
          console.log("error al llamar el servicio ->", error)
        })

    }

  });






  /***************************************************************
   EVENTO CLIC INTERACCIÓN DE GOOGLE MAPAS IFRAME PARA SUCURSALES
                  MENDIETA.ARNULFO@GMAIL.COM
  ****************************************************************/
  if ($('.js-city-stores-container').length) {
    var objCordenadas = { "Vía España": "8.992634903038233,-79.5200167539673", "Albrook Mall": "8.974944400000012,-79.55245630000002", "La Chorrera": "8.886493399999999,-79.77380249999999", "Tocumen": "9.07361300000002,-79.40217810000001", "Los Andes": "9.052406000000007,-79.50835970000003", "Megamall": "9.100712900000003,-79.35095519999999", "David, Chiriquí": "8.4296862,-82.428223" };
    var element, cordenada;
    $('.js-city-stores-container li').each(function () {
      element = $(this).find('.js-store-name').text();
      //console.log($(this).find('.js-store-name').text());
      for (var item in objCordenadas) {
        cordenada = getKeyByValue(objCordenadas, objCordenadas[item]);
        if (element == cordenada) {
          $(this).find('.js-view-in-map').attr('data-cordenada', objCordenadas[item]);
          $(this).find('.js-button-store-map-google').attr('href', 'http://maps.google.com/?daddr=' + objCordenadas[item] + '&ll=');
          $(this).find('.js-button-store-map-waze').attr('href', 'https://www.waze.com/ul?ll=' + objCordenadas[item] + '&amp;navigate=yes&amp;zoom=17');
        }

      }

    });
    $('.js-view-in-map').click(function () {
      //console.log($(this).attr('data-cordenada'));
      $('.js-map-container-2').html('<iframe src="https://maps.google.com/maps?q=' + $(this).attr('data-cordenada') + '&amp;hl=es;z=19&amp;output=embed" width="100%" height="auto" frameborder="0" style="border:0" allowfullscreen=""></iframe>');
    });
  }
});

/***********************************************************
   FUNCIÓN PARA OBTENER VALORES DE COORDENADAS GOOGLE MAPS
               MENDIETA.ARNULFO@GMAIL.COM
************************************************************/
function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

/*****************************************
    ACORDION PARA PREGUNTAS FRECUENTES
       PATRYKSIM@GMAIL.COM
******************************************/
function faqAccordion() {
  $(".question").click(function (e) {
    $(this).next().slideToggle();
    e.stopImmediatePropagation();
  });
}

/************************************************************
 TITULO DE INSTAFEED (APP DE INSTAGRAM) IGUAL QUE EL DE TODOS
             PATRYKSIM@GMAIL.COM
*************************************************************/

function addLineInstafeed() {
  let instafeedTitulo = $("#insta-feed h2");
  let content = instafeedTitulo[0].innerHTML;
  instafeedTitulo[0].innerHTML = "<span>" + content + "</span>";
  instafeedTitulo.addClass("home-section--title linea");
}



/**********************************************************
*                    WEB TO LEAD
*                 PATRYKSIM@GMAIL.COM
**********************************************************/

function saveDataWebToLead(data) {
  return fetch('https://mf13x5ajug.execute-api.us-east-1.amazonaws.com/prd/v1/api_lead_sf', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(data => data.json())
  .then(data => data)
  .catch(error => error)
}

var formComedoresCateg = document.getElementById('form_landing_comedores');
var formSalasCateg = document.getElementById('form_landing_salas');
var formRecamarasCateg = document.getElementById('form_landing_recamaras');
var formPopupHome = document.getElementById('form_popup_home');
var formTempoCol = document.getElementById('form_tempo_col');     //
var formRoyalCol = document.getElementById('form_royal_col'); //
var formPlayCol = document.getElementById('form_play_col');
var formMysticCol = document.getElementById('form_mystic_col'); //
var formNaturalCol = document.getElementById('form_natural_col'); //
var formSilverCol = document.getElementById('form_silver_col'); // 
var formContemponarenoStyle = document.getElementById('form_contemporaneo_style'); //
var formModernoglamStyle = document.getElementById('form_modernoglam_style'); //
var formNaturalcenturyStyle = document.getElementById('form_naturalcentury_style'); // 
var formTourvirtual = document.getElementById('form_landing_tourvirtual'); // 
var formZonasale = document.getElementById('form_zona_sale'); // 
var formHomeNewsletter = document.getElementById('form_home_newsletter'); // 
var formColchones = document.getElementById('form_landing_colchones'); //  
var formColchonesprom = document.getElementById('form_landing_colchones_prom'); // 

if (formComedoresCateg != null) {
  formComedoresCateg.addEventListener('submit', (e) => {
    $('#btn_form_landing_comedores').attr('disabled', true);
    if ($("#correoCateg").val() != "") {
      e.preventDefault();
      let dataSalesForceWebToLead = {
        "nombre": $("#name").val().toUpperCase(),
        "apellidos": "-",
        "webSite":window.location.href,
        "origen": "Web Site",
        "correoElectronico": $("#email").val().toUpperCase(),
        "whatsapp": "+507"+$("#whatsapp").val().toUpperCase(),
        "empresa": "JP",
        "nomPais": "Panama",
        "descripcion": "Landing-comedores"
        
      };
      saveDataWebToLead(dataSalesForceWebToLead)
        .then(infoUser => {
          console.log(infoUser)
          document.getElementById('form_landing_comedores').submit()
        })
        .catch(error => {
          console.log('error al guardar -> ', error);
        })
    } else {
      alert('Error');
    }
  })
}

if (formSalasCateg != null) {
  formSalasCateg.addEventListener('submit', (e) => {
    $('#btn_form_landing_salas').attr('disabled', true);
    if ($("#correoCateg").val() != "") {
      e.preventDefault();
      let dataSalesForceWebToLead = {
        "nombre": $("#name").val().toUpperCase(),
        "apellidos": "-",
        "webSite":window.location.href,
        "origen": "Web Site",
        "correoElectronico": $("#email").val().toUpperCase(),
        "whatsapp": "+507"+$("#whatsapp").val().toUpperCase(),
        "empresa": "JP",
        "nomPais": "Panama",
        "descripcion": "Landing-salas"
      };
      saveDataWebToLead(dataSalesForceWebToLead)
        .then(infoUser => {
          console.log(infoUser)
          document.getElementById('form_landing_salas').submit()
        })
        .catch(error => {
          console.log('error al guardar -> ', error);
        })
    } else {
      alert('Error');
    }
  })
}

if (formRecamarasCateg != null) {
  formRecamarasCateg.addEventListener('submit', (e) => {
    $('#btn_form_landing_recamaras').attr('disabled', true);
    if ($("#correoCateg").val() != "") {
      e.preventDefault();
      let dataSalesForceWebToLead = {
        "nombre": $("#name").val().toUpperCase(),
        "apellidos": "-",
        "webSite":window.location.href,
        "origen": "Web Site",
        "correoElectronico": $("#email").val().toUpperCase(),
        "whatsapp": "+507"+$("#whatsapp").val().toUpperCase(),
        "empresa": "JP",
        "nomPais": "Panama",
        "descripcion": "Landing-recamaras"
      };
      saveDataWebToLead(dataSalesForceWebToLead)
        .then(infoUser => {
          console.log(infoUser)
          document.getElementById('form_landing_recamaras').submit()
        })
        .catch(error => {
          console.log('error al guardar -> ', error);
        })
    } else {
      alert('Error');
    }
  })
}

if (formPopupHome != null) {
  formPopupHome.addEventListener('submit', (e) => {

    $('#btn_form_popup_home').attr('disabled', true);
    if ($("#correoPopupHome").val() != "") {
      e.preventDefault();

      let dataSalesForceWebToLead = {
        "nombre": $("#namePopupHome").val().toUpperCase(),
        "apellidos": $("#apellidoPopupHome").val() ? $("#apellidoPopupHome").val().toUpperCase() : "-",
        "origen": "Web Site",
        "webSite":window.location.href,
        "correoElectronico": $("#correoPopupHome").val().toUpperCase(),
        "empresa": "JP",
        "nomPais": "Panama",
        "descripcion": "Popup-Home"
      };

      saveDataWebToLead(dataSalesForceWebToLead)
        .then(infoUser => {
          console.log(infoUser)
          document.getElementById('form_popup_home').submit()
        })
        .catch(error => {
          console.log('error al guardar -> ', error);
        })
    } else {
      alert('Error');
    }
  })

}

if (formTempoCol != null) {
  formTempoCol.addEventListener('submit', (e) => {
    $('#btn_form_tempo_col').attr('disabled', true);
    if ($("#correoCol").val() != "") {
      e.preventDefault();
      let dataSalesForceWebToLead = {
        "nombre": $("#name").val().toUpperCase(),
        "apellidos": "-",
        "webSite":window.location.href,
        "origen": "Web Site",
        "correoElectronico": $("#correoCol").val().toUpperCase(),
        "whatsapp": "+507"+$("#whatsapp").val().toUpperCase(),
        "empresa": "JP",
        "nomPais": "Panama",
        "descripcion": "Coleccion Tempo"
      };
      saveDataWebToLead(dataSalesForceWebToLead)
        .then(infoUser => {
          console.log(infoUser)
          document.getElementById('form_tempo_col').submit()
        })
        .catch(error => {
          console.log('error al guardar -> ', error);
        })
    } else {
      alert('Error');
    }
  })
}

if (formSilverCol != null) {
  formSilverCol.addEventListener('submit', (e) => {
    $('#btn_form_silver_col').attr('disabled', true);
    if ($("#correoCol").val() != "") {
      e.preventDefault();
      let dataSalesForceWebToLead = {
        "nombre": $("#name").val().toUpperCase(),
        "apellidos": "-",
        "webSite":window.location.href,
        "origen": "Web Site",
        "correoElectronico": $("#correoCol").val().toUpperCase(),
        "whatsapp": "+507"+$("#whatsapp").val().toUpperCase(),
        "empresa": "JP",
        "nomPais": "Panama",
        "descripcion": "Coleccion Silver"
      };
      saveDataWebToLead(dataSalesForceWebToLead)
        .then(infoUser => {
          console.log(infoUser)
          document.getElementById('form_silver_col').submit()
        })
        .catch(error => {
          console.log('error al guardar -> ', error);
        })
    } else {
      alert('Error');
    }
  })
}

if (formNaturalCol != null) {
  formNaturalCol.addEventListener('submit', (e) => {
    $('#btn_form_natural_col').attr('disabled', true);
    if ($("#correoCol").val() != "") {
      e.preventDefault();
      let dataSalesForceWebToLead = {
        "nombre": $("#name").val().toUpperCase(),
        "apellidos": "-",
        "webSite":window.location.href,
        "origen": "Web Site",
        "correoElectronico": $("#correoCol").val().toUpperCase(),
        "whatsapp": "+507"+$("#whatsapp").val().toUpperCase(),
        "empresa": "JP",
        "nomPais": "Panama",
        "descripcion": "Coleccion Natural"
      };
      saveDataWebToLead(dataSalesForceWebToLead)
        .then(infoUser => {
          console.log(infoUser)
          document.getElementById('form_natural_col').submit()
        })
        .catch(error => {
          console.log('error al guardar -> ', error);
        })
    } else {
      alert('Error');
    }
  })
}

if (formRoyalCol != null) {
  formRoyalCol.addEventListener('submit', (e) => {
    $('#btn_form_royal_col').attr('disabled', true);
    if ($("#correoCol").val() != "") {
      e.preventDefault();
      let dataSalesForceWebToLead = {
        "nombre": $("#name").val().toUpperCase(),
        "apellidos": "-",
        "webSite":window.location.href,
        "origen": "Web Site",
        "correoElectronico": $("#correoCol").val().toUpperCase(),
        "whatsapp": "+507"+$("#whatsapp").val().toUpperCase(),
        "empresa": "JP",
        "nomPais": "Panama",
        "descripcion": "Coleccion Royal"
      };
      saveDataWebToLead(dataSalesForceWebToLead)
        .then(infoUser => {
          console.log(infoUser)
          document.getElementById('form_royal_col').submit()
        })
        .catch(error => {
          console.log('error al guardar -> ', error);
        })
    } else {
      alert('Error');
    }
  })
}

if (formMysticCol != null) {
  formMysticCol.addEventListener('submit', (e) => {
    $('#btn_form_mystic_col').attr('disabled', true);
    if ($("#correoCol").val() != "") {
      e.preventDefault();
      let dataSalesForceWebToLead = {
        "nombre": $("#name").val().toUpperCase(),
        "apellidos": "-",
        "webSite":window.location.href,
        "origen": "Web Site",
        "correoElectronico": $("#correoCol").val().toUpperCase(),
        "whatsapp": "+507"+$("#whatsapp").val().toUpperCase(),
        "empresa": "JP",
        "nomPais": "Panama",
        "descripcion": "Coleccion Mystic"
      };
      saveDataWebToLead(dataSalesForceWebToLead)
        .then(infoUser => {
          console.log(infoUser)
          document.getElementById('form_mystic_col').submit()
        })
        .catch(error => {
          console.log('error al guardar -> ', error);
        })
    } else {
      alert('Error');
    }
  })
}

if (formPlayCol != null) {
  formPlayCol.addEventListener('submit', (e) => {
    $('#btn_form_play_col').attr('disabled', true);
    if ($("#correoCol").val() != "") {
      e.preventDefault();
      let dataSalesForceWebToLead = {
        "nombre": $("#name").val().toUpperCase(),
        "apellidos": "-",
        "webSite":window.location.href,
        "origen": "Web Site",
        "correoElectronico": $("#correoCol").val().toUpperCase(),
        "whatsapp": "+507"+$("#whatsapp").val().toUpperCase(),
        "empresa": "JP",
        "nomPais": "Panama",
        "descripcion": "Coleccion Play"
      };
      saveDataWebToLead(dataSalesForceWebToLead)
        .then(infoUser => {
          console.log(infoUser)
          document.getElementById('form_play_col').submit()
        })
        .catch(error => {
          console.log('error al guardar -> ', error);
        })
    } else {
      alert('Error');
    }
  })
}

if (formContemponarenoStyle != null) {
  formContemponarenoStyle.addEventListener('submit', (e) => {
    $('#btn_form_contemporaneo_style').attr('disabled', true);
    if ($("#correoCol").val() != "") {
      e.preventDefault();
      let dataSalesForceWebToLead = {
        "nombre": $("#name").val().toUpperCase(),
        "apellidos": "-",
        "webSite":window.location.href,
        "origen": "Web Site",
        "correoElectronico": $("#correoCol").val().toUpperCase(),
        "whatsapp": "+507"+$("#whatsapp").val().toUpperCase(),
        "empresa": "JP",
        "nomPais": "Panama",
        "descripcion": "Estilo Contemporaneo"
      };
      saveDataWebToLead(dataSalesForceWebToLead)
        .then(infoUser => {
          console.log(infoUser)
          document.getElementById('form_contemporaneo_style').submit()
        })
        .catch(error => {
          console.log('error al guardar -> ', error);
        })
    } else {
      alert('Error');
    }
  })
}

if (formModernoglamStyle != null) {
  formModernoglamStyle.addEventListener('submit', (e) => {
    $('#btn_form_modernoglam_style').attr('disabled', true);
    if ($("#correoCol").val() != "") {
      e.preventDefault();
      let dataSalesForceWebToLead = {
        "nombre": $("#name").val().toUpperCase(),
        "apellidos": "-",
        "webSite":window.location.href,
        "origen": "Web Site",
        "correoElectronico": $("#correoCol").val().toUpperCase(),
        "whatsapp": "+507"+$("#whatsapp").val().toUpperCase(),
        "empresa": "JP",
        "nomPais": "Panama",
        "descripcion": "Estilo Moderno Glam"
      };
      saveDataWebToLead(dataSalesForceWebToLead)
        .then(infoUser => {
          console.log(infoUser)
          document.getElementById('form_modernoglam_style').submit()
        })
        .catch(error => {
          console.log('error al guardar -> ', error);
        })
    } else {
      alert('Error');
    }
  })
}

if (formNaturalcenturyStyle != null) {
  formNaturalcenturyStyle.addEventListener('submit', (e) => {
    $('#btn_form_naturalcentury_style').attr('disabled', true);
    if ($("#correoCol").val() != "") {
      e.preventDefault();
      let dataSalesForceWebToLead = {
        "nombre": $("#name").val().toUpperCase(),
        "apellidos": "-",
        "webSite":window.location.href,
        "origen": "Web Site",
        "correoElectronico": $("#correoCol").val().toUpperCase(),
        "whatsapp": "+507"+$("#whatsapp").val().toUpperCase(),
        "empresa": "JP",
        "nomPais": "Panama",
        "descripcion": "Estilo Natural Century"
      };
      saveDataWebToLead(dataSalesForceWebToLead)
        .then(infoUser => {
          console.log(infoUser)
          document.getElementById('form_naturalcentury_style').submit()
        })
        .catch(error => {
          console.log('error al guardar -> ', error);
        })
    } else {
      alert('Error');
    }
  })
}

if (formTourvirtual != null) {
  formTourvirtual.addEventListener('submit', (e) => {
    $('#btn_form_landing_tourvirtual').attr('disabled', true);
    if ($("#correoTour").val() != "") {
      e.preventDefault();
      let dataSalesForceWebToLead = {
        "nombre": $("#name").val().toUpperCase(),
        "apellidos": "-",
        "webSite":window.location.href,
        "origen": "Web Site",
        "correoElectronico": $("#correoTour").val().toUpperCase(),
        "whatsapp": "+507"+$("#whatsapp").val().toUpperCase(),
        "empresa": "JP",
        "nomPais": "Panama",
        "descripcion": "Landing Tour Virtual"
      };
      saveDataWebToLead(dataSalesForceWebToLead)
        .then(infoUser => {
          console.log(infoUser)
          document.getElementById('form_landing_tourvirtual').submit()
        })
        .catch(error => {
          console.log('error al guardar -> ', error);
        })
    } else {
      alert('Error');
    }
  })
}

if (formZonasale != null) {
  formZonasale.addEventListener('submit', (e) => {
    $('#btn_form_zona_sale').attr('disabled', true);
    if ($("#emailZonasale").val() != "") {
      e.preventDefault();
      let dataSalesForceWebToLead = {
        "nombre": $("#name").val().toUpperCase(),
        "apellidos": "-",
        "origen": "Web Site",
        "correoElectronico": $("#email").val().toUpperCase(),
        "whatsapp": "+507"+$("#whatsapp").val().toUpperCase(),
        "empresa": "JP",
        "nomPais": "Panama",
        "descripcion": "Landing Zona Sale",
        "webSite": window.location.href
      };
      saveDataWebToLead(dataSalesForceWebToLead)
        .then(infoUser => {
          console.log(infoUser)
          document.getElementById('form_zona_sale').submit()
        })
        .catch(error => {
          console.log('error al guardar -> ', error);
        })
    } else {
      alert('Error');
    }
  })
}

if (formHomeNewsletter != null) {
  formHomeNewsletter.addEventListener('submit', (e) => {
    $('#btn_form_home_newsletter').attr('disabled', true);
    if ($("#email").val() != "") {
      e.preventDefault();
      let dataSalesForceWebToLead = {
        "nombre": $("#name").val().toUpperCase(),
        "webSite":window.location.href,
        "apellidos": "-",
        "origen": "Web Site",
        "correoElectronico": $("#email").val().toUpperCase(),
        "whatsapp": "+507"+$("#whatsapp").val().toUpperCase(),
        "celular": "507"+$("#whatsapp").val().toUpperCase(),
        "empresa": "JP",
        "nomPais": "Panama",
        "descripcion": "Home Newsletter"
        
      };
      saveDataWebToLead(dataSalesForceWebToLead)
        .then(infoUser => {
          console.log(infoUser)
          document.getElementById('form_home_newsletter').submit()
        })
        .catch(error => {
          console.log('error al guardar -> ', error);
        })
    } else {
      alert('Error');
    }
  })
}


if (formColchones != null) {
  formColchones.addEventListener('submit', (e) => {
    $('#btn_form_landing_colchones').attr('disabled', true);
    if ($("#correoCateg").val() != "") {
      e.preventDefault();
      let dataSalesForceWebToLead = {
        "nombre": $("#name").val().toUpperCase(),
        "apellidos": "-",
        "webSite":window.location.href,
        "origen": "Web Site",
        "correoElectronico": $("#email").val().toUpperCase(),
        "whatsapp": "+507"+$("#whatsapp").val().toUpperCase(),
        "empresa": "JP",
        "nomPais": "Panama",
        "descripcion": "Landing-colchones"
      };
      saveDataWebToLead(dataSalesForceWebToLead)
        .then(infoUser => {
          console.log(infoUser)
          document.getElementById('form_landing_colchones').submit()
        })
        .catch(error => {
          console.log('error al guardar -> ', error);
        })
    } else {
      alert('Error');
    }
  })
}

if (formColchonesprom != null) {
  formColchonesprom.addEventListener('submit', (e) => {
    $('#btn_form_landing_colchones_prom').attr('disabled', true);
    if ($("#correoCateg").val() != "") {
      e.preventDefault();
      let dataSalesForceWebToLead = {
        "nombre": $("#name").val().toUpperCase(),
        "apellidos": "-",
        "webSite":window.location.href,
        "origen": "Web Site",
        "correoElectronico": $("#email").val().toUpperCase(),
        "whatsapp": "+507"+$("#whatsapp").val().toUpperCase(),
        "empresa": "JP",
        "nomPais": "Panama",
        "descripcion": "Landing-colchones-promocional"
      };
      saveDataWebToLead(dataSalesForceWebToLead)
        .then(infoUser => {
          console.log(infoUser)
          document.getElementById('form_landing_colchones_prom').submit()
        })
        .catch(error => {
          console.log('error al guardar -> ', error);
        })
    } else {
      alert('Error');
    }
  })
}