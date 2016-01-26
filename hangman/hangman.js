
window.onload = function() {

// the following code adds event listeners to the buttons
// you'll learn more about this later
// for this exercise, you are going to write the functions for
// what happens when the user clicks on the buttons.

  initializeWord();

  var playButton = document.getElementById('play-button');
  playButton.addEventListener('click', resetItem, false);

  var tryButton = document.getElementById('try-button');
  tryButton.addEventListener('click', checkLetter, false);

  function chooseWord(){
    var allWords = ["TELEVISION","PACHYDERM","INTELIGENT","PLASTIC","WALLET","SWEATSHIRT","MOTIVATION","IRONHACK", "TABLET", "RUNNING"];
    return allWords[ Math.round( Math.random() * allWords.length ) - 1];
  }


  //Función que inicialia la palabra a adivinar
  function initializeWord(){

    var aux = chooseWord();
    var finalWord = aux;

    document.getElementsByClassName("finalWord")[0].textContent = aux;

    for (var i = 0 ; i < finalWord.length; i++) {
      var nuevaLinea = document.createElement("li");
      nuevaLinea.textContent = "_";
      var wordItems = document.getElementsByClassName("principal-word-items")[0];
      wordItems.appendChild(nuevaLinea);
      aux = aux.replace(aux[i], "_");
    }

    document.getElementsByClassName("testWord")[0].textContent = aux;
  }

  //Función que elimina los elementos de la lista
  function removeList(lista){
    while(document.getElementsByClassName(lista)[0].getElementsByTagName("li").length > 0){
      var elemento = document.getElementsByClassName(lista)[0].getElementsByTagName("li")[0];
      var padre = elemento.parentNode;
      padre.removeChild(elemento);
    }
  }

  //Función que comprueba si una letra ya ha sido utilizada
  function isUsed(letra){
    var encontrada = false;

    for (var i = 0; i < document.getElementsByClassName("used-letters-items")[0].getElementsByTagName("li").length ; i++){
      if (document.getElementsByClassName("used-letters-items")[0].getElementsByTagName("li")[i].textContent === letra) {
        return true;
      }
    }

    return encontrada;
  }

  //Función que resetea todos los indicadores (listas, palabras..)
  function resetItem() {
    removeList("principal-word-items");
    removeList("used-letters-items");
    initializeWord();
    document.getElementsByClassName("done-list")[0].style.display = "none";
    var imagen_src = document.getElementsByTagName("img")[0].src;
    var imagen = (imagen_src.split("/")[imagen_src.split("/").length - 1]).split(".")[0];
    var finalSrc = imagen_src.split(imagen)[0] + "1.png"
    document.getElementsByTagName("img")[0].src = finalSrc;    

    document.getElementById("final_lose").style.display = "none";
    document.getElementById("final_win").style.display = "none";

  }

  //Función que pinta en la pantalla la letra que has adivinado.
  function descubreLetra (letra){

    var palabra = document.getElementsByClassName("finalWord")[0].textContent;
    var palabraCod = document.getElementsByClassName("testWord")[0].textContent;
    var cambia = palabraCod.split("");

    for( var i = 0; i < palabra.length; i++){
      if(palabra[i] === letra){
        cambia[i] = letra;
        (document.getElementsByClassName("principal-word-items")[0]).getElementsByTagName("li")[i].textContent = letra;
      }
    }

    document.getElementsByClassName("testWord")[0].textContent = cambia.join("");
    return cambia.join("");
  }

  //Función que añade una nueva letra a la lista 
  function addList(lista,letra){

    var nuevaLinea = document.createElement("li");
    nuevaLinea.textContent = letra;
    var wordItems = document.getElementsByClassName(lista)[0];
    wordItems.appendChild(nuevaLinea);

    return nuevaLinea;
  }

  //Función que obtiene la siguiente imagen a mostrar
  function nextImg(){

    var imagen_src = document.getElementsByTagName("img")[0].src;
    var imagen = (imagen_src.split("/")[imagen_src.split("/").length - 1]).split(".")[0];
    var cont = parseInt(imagen);
    cont += 1;
    var finalSrc = imagen_src.split(imagen)[0] + cont.toString() + ".png"

    return finalSrc;
  }

  //Función que obtiene el número de intentos realizados
  function getIntento(){
    var imagen_src = document.getElementsByTagName("img")[0].src;
    var imagen = (imagen_src.split("/")[imagen_src.split("/").length - 1]).split(".")[0];
    var cont = parseInt(imagen);
    return cont;
  }

  //Función que valida si la palabra es igual a la ganadora
  function checkWin(nuevaPal, finalWord){
    if (nuevaPal === finalWord) {
      document.getElementsByClassName("done-list")[0].style.display = "block";
      document.getElementById("final_win").style.display = "block";
    }
  }

  //Función que valida si has superado el límite de intentos
  function checkIntentos(){
    if (getIntento() === 9) {
      document.getElementsByClassName("done-list")[0].style.display = "block";
      document.getElementById("final_lose").style.display = "block";
    }
  }

  //Función que añade letra bien en la lista como válida o como inválida
  function addLetra(letra){
    //Incluimos letra en la lista de letras utilizadas
    var nuevaLinea = addList("used-letters-items", letra)
    var finalWord = document.getElementsByClassName("finalWord")[0].textContent;
    var testWord = document.getElementsByClassName("testWord")[0].textContent;

    //Si la letra está contenida en la palabra -> descubrimos y almacenamos letra como correcta
    if(finalWord.indexOf(letra) >= 0 && letra !== ""){
      var nuevaPal = descubreLetra(letra);
      nuevaLinea.classList.add("win");
      checkWin(nuevaPal, finalWord);

    }
    else{
      //Si la letra NO está contenida en la palabra -> nueva imagen y almacenamos letra comincorrecta
      document.getElementsByTagName("img")[0].src = nextImg();
      nuevaLinea.classList.add("lose");
      checkIntentos();
    }
        
  }



  //Función que comprueba si la letra introducida pertenece a la palabra a adivinar
  function checkLetter(){

    var letra = document.getElementById("hangman-input").value.toUpperCase();

    if(!isUsed(letra)){
      addLetra(letra);
    }
    else{
      alert("The letter "+ letra + " has been used. Try another.");
    }

    //Eliminamos la letra del input
    document.getElementById("hangman-input").value = "";

  }

}
