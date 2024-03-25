<p align="center">
  <a href="https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-Sampeerez/actions/workflows/node.js.yml" style="text-decoration: none;">
    <img src="https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-Sampeerez/actions/workflows/node.js.yml/badge.svg?branch=main" alt="Tests">
  </a>
  <a href="https://coveralls.io/github/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-Sampeerez?branch=main">
    <img src="https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-Sampeerez/badge.svg?branch=main" alt="Coverage Status">
  </a>
  <a href="https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2324_ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-Sampeerez">
    <img src="https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2324_ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-Sampeerez&metric=alert_status" alt="Quality Gate Status">
  </a>
</p>

# Práctica 9 - Aplicación para coleccionistas de cartas Magic

## Autor

- Samuel Pérez López

## Índice

1. [Resumen](#resumen)
2. [Introducción y Objetivos](#introducción-y-objetivos)
3. [Desarrollo](#desarrollo)
   - [Ejercicio magic](#ejercicio-magic)
   - [Ejercicio práctica](#ejercicio-práctica)
4. [Conclusiones](#conclusiones)

## Resumen

En este proyecto, se desarrolló una aplicación en TypeScript para administrar los datos de una colección de cartas del juego Magic, que pertenecen a un usuario específico. La aplicación se enfoca en funciones básicas como agregar, modificar, eliminar, listar y leer información relacionada con las cartas de Magic. Cada carta se guarda en formato JSON en el sistema de archivos del dispositivo donde se ejecuta la aplicación. Es relevante mencionar que la interacción con la aplicación se realiza únicamente a través de la línea de comandos, sin la presencia de un menú interactivo para las operaciones.

## Introducción y Objetivo

Este proyecto consistió en desarrollar una aplicación en TypeScript para administrar una colección de cartas del juego Magic pertenecientes a un usuario en particular. La aplicación ofrece funcionalidades para agregar, modificar, eliminar, listar y visualizar detalles de las cartas, todo a través de la línea de comandos. Los datos de cada carta se almacenan en el sistema de archivos local en formato JSON.

## Desarrollo

### Ejercicio magic

En principio, diseñé una estructura llamada "Card" para almacenar los datos necesarios de cada carta, y además permitir la gestión de atributos opcionales según el tipo de carta. Aunque podría haber manejado directamente la información clave, como el valor, a través de comandos, llegué a la conclusión de que encapsular la entidad de una carta resultaba más conveniente y elegante. Destaco que utilicé tipos enumerados para definir ciertos atributos de las cartas, como el color, tipo o rareza. Posteriormente, establecí la estructura de comandos del programa principal mediante el uso del paquete "yargs". Se puede observar que cada comando tiene sus argumentos obligatorios marcados con la opción "demandOption: true", y después de obtener la información a través de la línea de comandos, esta se procesa. Por ejemplo, en el comando "add", se verifican los tipos de las cartas, se crea el objeto "MagiCard" y se invoca al método correspondiente de la clase encargada de manejar las cartas.

La magia del programa radica en la clase "CardManager". Para mantener el código lo más limpio y simple posible, opté por nombrar los archivos como "ID_de_la_carta.json". De esta manera, al ser el ID único para cada carta, se simplifican muchas tareas, como buscar una carta o verificar la unicidad de los IDs, ya que no es necesario acceder al contenido del archivo ni analizar los nombres de estos para obtener la información. Además, creé una clase llamada "SystemManager" para manejar errores y funciones aparte del programa principal.

### Ejercicio práctica

Durante el ejercicio PE de esta semana, nos adentramos en el uso de la API Síncrona de Node y exploramos el patrón de diseño conocido como Plantilla o Template. Para ello, creamos una clase abstracta llamada BagReader, de la cual derivamos dos clases concretas: JSONReader y CSVReader. Cada una de estas clases implementaba el método procesar(), el cual se encargaba de analizar los argumentos de manera distinta dependiendo de la clase a la que perteneciera. Por ejemplo, en el caso de CSVReader, se consideraban las comas y el orden para descomponer los argumentos y devolver los beneficios y los pesos. En cambio, en el caso de JSONReader, se empleaba JSON.parse para interpretar los diversos campos en objetos que cumplían con la estructura.
## Conclusiones

En resumen, el programa desarrollado es una aplicación de administración de cartas Magic que permite al usuario ejecutar operaciones fundamentales como añadir, modificar, eliminar, listar y visualizar detalles de las cartas. La interacción con la aplicación se realiza a través de la línea de comandos, utilizando la biblioteca yargs para definir comandos y argumentos. La arquitectura del programa incorpora clases como Card, CardCollection y FileManager para representar las cartas, administrar la colección de cartas y gestionar la interacción con el sistema de archivos, respectivamente. La utilización de módulos, enumeraciones y funciones de callback en yargs contribuye a la organización del código y facilita la implementación de funcionalidades esenciales para la gestión eficaz de las cartas Magic en la aplicación.