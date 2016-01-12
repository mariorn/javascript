

var user = {};

var responses = [];

function question1() {
  var name = prompt('What is your name?');
  user.name = name;
}

function question2() {

  var firstQuestion = prompt('Does null === 0 ? (Yes or No)')

  if (firstQuestion.toLowerCase() === 'yes') {
    firstQuestion = true;
  } else if (firstQuestion.toLowerCase() === 'no') {
    firstQuestion = false;
  } else {
    alert("Please answer either Yes or No");
    return question2();
  }
  responses.push(firstQuestion); // add the true or false value to the responses array
}

function question3() {
  var js = prompt('What was the original name for JavaScript: Java, LiveScript, JavaLive, or ScriptyScript?');
  js = js.toLowerCase();
  switch (js) {
    case 'java':
    case 'javalive':
    case 'scriptyscript':
    	responses.push(false);
    break;
    case 'livescript':
    	responses.push(true);
    break;
    default:
    	alert("That answer does not correspond to possible solutions: Java, LiveScript, JavaLive, or ScriptyScript");
    	return question3();
    break;
  }
}

function question4(){
	var res = prompt("What's the result of ( 5 + 8 * 9 / 3 - 2 * 5 )? ");
	(res === "19") ? responses.push(true) : responses.push(false);
}

function question5(){

	var res = prompt("'use strict' in functions makes our code more reliable. (Yes or No)");
	if (res.toLowerCase() === 'yes') {
	  res = true;
	} else if (res.toLowerCase() === 'no') {
	  res = false;
	} else {
	  alert("That answer does not correspond to possible solutions: Yes or No");
	  return question5();
	}
	responses.push(res); 
}

function evaluate(responsesArray) {

	var correctas = 0;
	var incorrectas = 0;

	for (var i = 0; i < responsesArray.length ; i++) {
		(responsesArray[i] === true) ? correctas++ : incorrectas++ ;
	}

	user.correctas = correctas;
	user.incorrectas = incorrectas;

	showResults();
}

function showResults() {

	alert("Name: " + user.name + "\nCorrect answers: "+ user.correctas + "\nIncorrect answers: "+ user.incorrectas);

}



question1();
question2();
question3();
question4();
question5();
evaluate(responses);




