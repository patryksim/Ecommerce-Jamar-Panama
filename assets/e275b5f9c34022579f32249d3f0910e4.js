(function() {

  function insertScript(content, type, id) {
    var s = document.createElement('script');
    var body = document.querySelector('body');
    s.type = type;
    if (id) {
      s.id = id;
    }
    s.innerText = content;
    body.appendChild(s);
  }

  function insertCSS(content) {
    var sheet = document.createElement('style');
    var head = document.querySelector('head');
    sheet.type = 'text/css';

    sheet.innerText = content;
    head.appendChild(sheet);
  }






}());

function addScript(type) {
      var s = document.createElement('script');
      var p = document.getElementsByTagName('script')[0];
      s.src = '//cdn.doofinder.com/media/js/doofinder-' + type + '.7.latest.min.js';
      s.async = 1;
      s.setAttribute('charset', 'utf-8');
      p.parentNode.insertBefore(s, p);
    }
    var insertionPoint = ".section-header";

    if (document.querySelector(insertionPoint) && window.location.pathname.indexOf('/search') === 0)
      addScript('embedded');
    else
      addScript('classic');

    var dfClassicLayers = [{
      "queryInput": "input[name='q'], #SearchInput, input[name='search_query'], input[id^='search_query'],#custom_predictive_input, #custom_predictive_input_movil",
      "hashid": "e275b5f9c34022579f32249d3f0910e4",
      "zone": "us1",
      "display": {
        "lang": "es",
        "align": "center",
        facets: {
          "width": "250px",
          "attached": "left"
        }
      },
      "historyPlugin": true
    }];

    var dfEmbeddedLoaded = function(instance) {
      var query = (doofinder.core.util.qs.parse(
        window.location.search.substr(1)
      ).q || "").trim();
      instance.layer.launch(query);
    };

    var dfEmbeddedLayers = [{
      "hashid": "e275b5f9c34022579f32249d3f0910e4",
      "zone": "us1",
      "display": {
        "lang": "es",
        "insertionPoint": insertionPoint,
        facets: {
          width: '250px',
          attached: 'left'
        }
      },
      "queryInput": "input[name='q'], #SearchInput, input[name='search_query'], input[id^='search_query'],#custom_predictive_input, #custom_predictive_input_movil",
      "callbacks": {
        "loaded": dfEmbeddedLoaded
      }
    }];

    (function() {
        var getLayer = function() {
            return dfClassicLayers[0].layer || dfEmbeddedLayers[0].layer
        }

        var getShopifyProductData = function(item_variant_id) {
            let product_variants = window.ShopifyAnalytics.meta.product['variants'];  // Get item
            return Object.values(product_variants).filter(item => item.id == item_variant_id)[0];
        }

        var addCart = function(event) {
            var element = event.target.closest("form[action='/cart/add']").querySelector("[name='id']");
            var id;
            if (element.nodeName === "INPUT"){
                id = element.value;
            }
            else {
                id = element.options[element.selectedIndex].value;
            }

            const product_info = getShopifyProductData(id);  // From shopify js code
            const item_data = {
              price: product_info.price,
              title: product_info.name,
              datatype: "product",
            }

            getLayer().addToCart(id, 1, item_data);
        }

        var addButtons = document.querySelectorAll("form[action='/cart/add'] input[type='submit'], form[action='/cart/add'] button[type='submit']")
        addButtons.forEach(node => node.addEventListener("click", addCart))

        var origOpen = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function() {
            this.addEventListener('load', function() {
                if (this._url === "/cart/add.js" && this.status === 200 && addButtons.length === 0) {
                    var id = JSON.parse(this.responseText).id
                    getLayer().addToCart(id, 1)
                }

                if (this._url === "/cart/clear.js" && this.status === 200) {
                    getLayer().clearCart()
                }
            });
            origOpen.apply(this, arguments);
        };
    })()
