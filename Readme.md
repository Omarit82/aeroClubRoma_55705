La webApp del Aeroclub Roma permite, inicialmente, realizar un calculo sobre el peso de carga de una aeronave

Desde MockApi se cargan al Home tres aeronaves por defecto // Estas aeronaves no pueden eliminarse
Puede seleccionarse una de estas aeronaves o agregar una nueva aeronave // Estas aeronaves se cargan al LocalStorage y pueden elminarse haciendo click en el respectivo boton. 
La validacion de datos desde el html impide ingresar valores erroneos (numero negativos o caracteres incorrectos) en los campos
que corresponden. 
En caso de ingresar todos ceros o un peso vacio mayor al maximo peso de despegue, el script lo va a permitir, pero el resultado de la carga indicara que no puede realizarse el vuelo(OVERWEIGHT).

Al seleccionar una aeronave para cargar se despliega un Modal que permite la carga de los pasajeros y el equipaje.
Dependiendo de la aeronave seleccionada se realiza el calculo del combustible que puede cargarse y la autonomia disponible.

  Esto puede tener tres resultados diversos : 
  
  ***Que el peso de pasajeros y equipaje sea igual o mayor al disponible (MTOW - Maximum takeOff weight menos el EW - Empty weight) en este caso no queda peso disponible para 
  cargar combustible -OVER WEIGHT-***
  
  ***Que el peso de pasajeros y equipaje sumado al peso vacio (EW) no alcancen al peso maximo de despegue (MTOW) y quede peso disponible para cargar combustible pero no para 
  llenar el tanque, con lo cual mostrará la cantidad disponible a cargar y la autonomia con ese combustible***
  
  ***Que el peso de pasajeros y equipaje sumado al peso vacio no alcancen el peso maximo y que se pueda cargar todo el tanque completo -FULL AUTONOMIA-***
  
La pagina muestra ahora un breve resumen de lo cargado en el avion y permite volver al home o ingresar a realizar una precomputada (consulta de aerodromos.)

Pasando a Precomputada se puede realizar una consulta de aerodromos a una API a partir del nombre de las ciudades de partida y destino de los aeropuertos
(en caso de que existan). Si la ciudad tiene mas de un aeropuerto, o hay mas de una ciudad con ese nombre, muestra en el DOM una lista de los aeropuertos disponibles de partida y arribo.

Al seleccionar los aeropuertos de destino y salida, se calcula la distancia entre los aerodromos.

La opcion restante es la consulta a una API de meteorologia que muestra(en caso de existir la informacion) informacion meteorologica aeronautica de los aerodromos, incluido un mensaje aeronautico llamado METAR (un tipo de mensaje aeronautico sobre la meteorologia aeronautica muy utilizado.).

Esta consulta despliega tambien, mediante la libreria Leaflet, un mapa extraido de OpenStreetMaps con una linea uniendo los dos aeropuertos.
   