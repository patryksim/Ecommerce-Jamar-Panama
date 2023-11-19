![Cover-Ecommerce-Panama](https://user-images.githubusercontent.com/68615071/227983730-a2e2783c-66bf-4e18-aa54-cbd08dcccc2c.jpg)

# Introducción a como trabajar con el tema

En nuestra tienda en línea, trabajamos de forma estructurada y organizada. Los cambios que recibimos en un pull request deben estar etiquetados con secciones autodescriptivas, lo que nos ayuda a entender claramente los cambios que se han realizado. De esta manera, podemos asegurarnos de que nuestro sitio web sea lo más efectivo y fácil de usar para nuestros clientes.

# Listado de herramientas usadas en la tienda de Panamá

1. Editor de código: se recomienda Visual Studio Code para editar el código fuente.
2. Extensión de Liquid de Shopify: se utiliza para validar errores de sintaxis en el código Liquid utilizado en las plantillas de Shopify.
3. Shopify CLI 3 (o posterior): herramienta de línea de comandos para trabajar con tiendas de Shopify.
4. Git: sistema de control de versiones distribuido para rastrear los cambios en el código fuente y coordinar el trabajo entre varios desarrolladores.
5. GitHub Desktop o CLI: interfaces gráficas o de línea de comandos para trabajar con repositorios de Git alojados en GitHub.
6. Ngrok: herramienta para exponer un servidor local a Internet a través de una URL pública. Se utiliza para probar aplicaciones y sitios web en un entorno de desarrollo local.

# Ambientes de desarrollo

Cada desarrollador debe trabajar en su ambiente local y posteriormente subir a su tema de github solo los cambios realizados antes de hacer un sincronización con el tema main que es nuestro tema de producción.

Enlaces de interes:

- Capacitaciones de uso de temas locales y github
- Cómo usar la linea de comandos de Shopify para ambientes locales
- Cómo subir solo archivos especificos a nuestros temas
- Soporte y apoyo en [slack](https://app.slack.com/huddle/T0269J2LF2N/C02FXQ1FW3G)

![Cover (1)](https://user-images.githubusercontent.com/68615071/228630529-7bd7ba30-b90f-429d-aabb-2d5ce50dca8e.jpg)

## Shopify CLI

```bash
# instalacion de la linea de comandos 
npm install -g @shopify/cli @shopify/theme
```

```bash
# Siempre antes de ejecutar cualquier accion debes asegurarte de estar trabajando en desarrollo con el comando
shopify theme info
```

```bash
# Crear tema de desarrollo en local
# siempre asegurarte de tener una rama local para el desarrolo
# de otra forma se sobreescribe el codigo que estes desarrollando
shopify theme dev # El comando te genera un tema local con un id 
```

```bash
# utiliza la bandera --theme para seccionar el tema de desarrollo en el
# que esta trabajando siempre tiene la etiqueta local en el theme list
# y esta asociado a un id del tema

shopify theme dev --theme numero_tema # para trabajar en un tema concreto

# El tema se asocia a la rama de git activa, si necesitas crear 
# previsualizaciones puedes usar el comando share con el id del tema
```

```bash
# para hacer el push de los archivos y secciones trabajando es necesario que
# ejecutes un merge en local entre tus tema de desarrollo remoto vs el tema loca
# que no se sobreescriban archivos importantes sin quieres evitar inconveniente
# solo envia a tu tema los archivos que has trabajado con el comando

shopify theme push --theme numero_tema_remoto --only filenames.extesiones

# nunca enviar nada directo a staging o producción a través de la cli
# Mantener siempre el proceso flujo de trabajo a través de github
```

![Cover (2)](https://user-images.githubusercontent.com/68615071/228632272-c05e0179-c77d-4194-bc72-ecfba09f7ab7.jpg)

## Pull Requests
Considerar siempre que cada pull request que sea solicitado use una etiqueda correspondiente al trabajo que se esta realizando. De esta forma el analisis del mismo será mas agil.


# Guías de desarrollo

[Ver la documentación en la wiki.](https://github.com/JamarRepository/eccomerce-pan/wiki)

### Enlaces importantes:

1.  [ **Shopify CLI 3**](https://shopify.dev/docs/themes/tools/cli/commands)
2.  [Ngrok CLI](https://ngrok.com/docs/getting-started/)
