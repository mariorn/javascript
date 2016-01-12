// Función que representa el objeto rover
function myRover (name, position, direction){
  this.name = name;
  this.position = position;
  this.direction = direction;
}

// Variable que representa el tablero 10x10
var matriz = [ ["0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0"],["1","1","1","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","1","1","1","0","0","0"],["1","1","1","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0"]];

// Asigna la nueva posición al rover
function goForward(rover, posicion) {
  rover.position[0] = posicion[0];
  rover.position[1] = posicion[1];

  console.log("New Rover Position: [" + rover.position[0] + ", " + rover.position[1] + "]");
}

// Obtenemos la nueva posición que deberá asignarse al rover, en caso de que no haya colisión.
function getNewPosition(rover) {
  var pos = [];

  switch(rover.direction) {
    case 'N':
      pos = [(rover.position[0] + 1 ) % 10 , rover.position[1]];
      break;
    case 'E':
      pos = [ rover.position[0], (rover.position[1] + 1 ) % 10 ];
      break;
    case 'S':
      pos = [ (rover.position[0] - 1 ) % 10 , rover.position[1]];
      if ( pos[0] < 0 ) {
        pos[0] = pos[0] + 10;
      }
      break;
    case 'W':
      pos = [rover.position[0] , ( rover.position[1] - 1 ) % 10];
      if (pos[1] < 0 ){ 
        pos[1] = pos[1] + 10;
      }
      break;
  }

return pos;
}

// Imprime por consola el mapa 10x10 con los vehículos y los obstáculos
function muestraMapa (matriz){
  for (var i = matriz.length - 1; i >= 0 ; i--) {
    console.log("Linea "+ i + ": " + matriz[i]);
  }
}

// Función principal que procesa todas las instrucciones que introducimos
function procesaInstrucciones (instrucciones, rover, matriz){

  var obstaculo = false;
  for (var i = 0; i < instrucciones.length && !obstaculo; i++){

    var pos_actual = [ rover.position[0], rover.position[1] ];
    var pos_siguiente = [];

    switch (instrucciones[i].toLowerCase()){
      case 'f':
        rover.direction = "N";
        pos_siguiente = getNewPosition(rover);
        if(!existeObstaculo(matriz, pos_siguiente)){
          goForward(rover, pos_siguiente);
          actualizaMapa(matriz, rover, pos_actual);
        }
        else{
          alert("OBSTACULO "+ matriz[pos_siguiente[0]][pos_siguiente[1]]+" DETECTADO. FIN DE INSTRUCCION." );
          obstaculo = true;
        }
      break;
      case 'b':
        rover.direction = "S";
        pos_siguiente = getNewPosition(rover);
        if(!existeObstaculo(matriz, pos_siguiente)){
          goForward(rover, pos_siguiente);
          actualizaMapa(matriz, rover, pos_actual);
        }
        else{
          alert("OBSTACULO "+matriz[pos_siguiente[0], pos_siguiente[1]]+" DETECTADO. FIN DE INSTRUCCION." );
          obstaculo = true;
        }
      break;
      case 'l':
        rover.direction = "W";
        pos_siguiente = getNewPosition(rover);
        if(!existeObstaculo(matriz, pos_siguiente)){
          goForward(rover, pos_siguiente);
          actualizaMapa(matriz, rover, pos_actual);
        }
        else{
          alert("OBSTACULO "+matriz[pos_siguiente[0], pos_siguiente[1]]+" DETECTADO. FIN DE INSTRUCCION." );
          obstaculo = true;
        }
      break;
      case 'r':
        rover.direction = "E";
        pos_siguiente = getNewPosition(rover);
        if(!existeObstaculo(matriz, pos_siguiente)){
          goForward(rover, pos_siguiente);
          actualizaMapa(matriz, rover, pos_actual);
        }
        else{
          alert("OBSTACULO "+matriz[pos_siguiente[0], pos_siguiente[1]]+" DETECTADO. FIN DE INSTRUCCION." );
          obstaculo = true;
        }
      break;
      default:
        alert("No se procesa instruccion "+ instrucciones[i] + " ya que no esta contemplada.")
      break;
    }
  }
}

// Funcion que detecta si hay un obstáculo o vehículo en la posición pos_siguiente
function existeObstaculo(matriz, pos_siguiente){
  var obstaculo = false;

  if (matriz[pos_siguiente[0]][pos_siguiente[1]] !== "0") {
    obstaculo = true;
  }
  return obstaculo;
}

// Función que actualiza la posición del rover en el mapa
function actualizaMapa (matriz, rover, ultima){

  matriz[ultima[0]][ultima[1]] = "0";
  matriz[rover.position[0]][rover.position[1]] = rover.name;
}

function inicializaMapa (matriz, roverX, roverY){

  matriz[roverX.position[0]][roverX.position[1]] = roverX.name;
  matriz[roverY.position[0]][roverY.position[1]] = roverY.name;

}



// Creamos los dos rover
var roverX = new myRover("X", [0,0], "N");
var roverY = new myRover("Y", [9,9], "S");

// Inicializamos el mapa con las posiciones de los dos vehículos
inicializaMapa(matriz, roverX, roverY);

// Mostramos el mapa inicial
muestraMapa(matriz);


var id_rover = "X";

// Bucle infinito hasta que escribamos EXIT, mientras tanto podemos hacer todos los movimientos
// deseados para ambos vehículos indistintamente
while( (id_rover = prompt("Elige rover a mover: X o Y (para salir escribe EXIT)") ) !== "EXIT"){

  if(id_rover === "X"){
    var instrucciones = prompt("Insertar cadena de instrucciones (f,b,r,l) para el rover X: ");
    procesaInstrucciones(instrucciones, roverX, matriz);
  }
  else if (id_rover === "Y") {
    var instrucciones = prompt("Insertar cadena de instrucciones (f,b,r,l) para el rover Y: ");
    procesaInstrucciones(instrucciones, roverY, matriz);
  }
  else{
    alert("Inserta identificador válido: X,Y, EXIT");
  }

  muestraMapa(matriz);

}



