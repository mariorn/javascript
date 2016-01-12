
window.onload = function() {

// the following code adds event listeners to the buttons
// you'll learn more about this later
// for this exercise, you are going to write the functions for
// what happens when the user clicks on the buttons.
  var saveButton = document.getElementById('save-button');
  saveButton.addEventListener('click', addToDoItem, false);

  var doneButton = document.getElementById('done-button');
  doneButton.addEventListener('click', markAsDone, false);


  function addToDoItem() {

    var nuevaLinea = document.createElement("li");
    nuevaLinea.textContent = document.getElementById("todo-input").value;
    var listaToDo = document.getElementsByClassName("todo-list-items")[0];
    listaToDo.appendChild(nuevaLinea);
    document.getElementById("todo-input").value = "";

  }

  function markAsDone() {
    doneButton.classList.add('liked');
    doneButton.innerHTML = "Liked!";
    document.querySelector('h1').style.color = "red";

    var tareaFinalizada = (document.getElementsByClassName("todo-list-items")[0]).getElementsByTagName("li")[0];
    tareaFinalizada.classList.add('done');
    var listaDone = document.getElementsByClassName("done-list-items")[0];
    listaDone.appendChild(tareaFinalizada);

  }
  
}
