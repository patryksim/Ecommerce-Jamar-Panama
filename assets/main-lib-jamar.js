class Servicios {
    constructor(url,sku,contenedor,imageUrl) {
        this.url = url;
        this.sku = sku;
        this.contenedor = contenedor;
        this.imageUrl = imageUrl;
    }

    cylindo(){
       let {url, sku,contenedor,imageUrl} = this;
       fetch(url+sku, {method:"POST",body:JSON.stringify({"attributeIds": ["Cylindo_Aplica"]})})
       .then(response => response.json())
       .then(dataCylindo => {
            if (dataCylindo[0]) {
                try {
                    var viewerInstance = null; 
                    var options = { 
                    'accountID': 5066, 
                    'productCode': sku, 
                    'features': [], 
                    'containerID': 'cylindo-container',
                    'tooltipDragText': 'Desliza la imagen para ver en 360º',
                    'tooltipZoomText': 'Arrastra para desplazarte',
                    'tooltipAltImgText':'Haga clic para ampliar',
                    'thumbCount': 3,
                    'ARDesktop':true,
                    'ARBtnTxt': '¡VISUALÍZALO EN TU ESPACIO!',
                    'ARBackToViewTxt': 'VOLVER A LA VISTA 360',
                    'QRCodeTxt': 'Apunte la cámara de su teléfono<br/> inteligente o tableta al código QR a continuación',
                    'QRCodeTitleTxt': 'Ver el producto <br />en tu habitación...',
                    //Array of alternate content
                    'frames': [
                        1,
                        {
                            'image': imageUrl.fondoBlanco,
                            'thumb': imageUrl.fondoBlanco
                        },
                        {
                            'image': imageUrl.ambientada,
                            'thumb': imageUrl.ambientada
                        }
                        
                    ]
                    } 

                    cylindo.on('ready', function () {
                        var viewerInstance = null;
                        var rotate = false; 
                        viewerInstance = cylindo.viewer.create(options);
                        // When viewer is completed rotate it
                        viewerInstance.on(
                            viewerInstance.events.VIEWER_COMPLETE,
                            function (evt, data) {
                                if (!rotate) {
                                    // rotate function executed to rotate the viewer 360 degrees in 1 sec (1000 ms)
                                    viewerInstance.rotate(360, 3000);
                                    rotate = false;
                                }
                            }
                        )
                        });
                } catch (error) {
                    
                }
            } else {
                console.log("Cylindo viewer scripts not loaded!");
            }
       })
       
    }
}


