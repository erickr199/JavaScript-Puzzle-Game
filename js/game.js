/*********************************
    DECLARACIÓN DE VARIABLES
**********************************/
var id;
var answers = [];
var questions = [];
var question;
var nQuestion = 0;
var totalTime = 50;

//Valida si se puede destapar un cuadro
var enabled = false;
var correct = false;
var answer = false;

/*********************************
    DECLARACIÓN DE FUNCIONES
**********************************/

//Construye un arreglo de elementos LI con las opciones de respuesta para la imagen
function buildImageOptions(imgList,selectedIndex){

    //Generar copia de trabajo del arreglo para no alterar el original
    var images = imgList.slice();
    //Eliminar la opción que ya fue seleccionada
    answers.push({
        value: images[selectedIndex].name,
        correct: true
    });
    images.splice(selectedIndex,1);
    //Mezclar las imágenes que quedaron
    images = arrayShuffle(images);

    //Agregar N opciones extra al arreglo de respuestas tomándolas de images
    for(var i = 0; i < 2; i++){
        answers.push({
            value: images[i].name,
            correct: false
        });

    }

    //Mezclarlas para que no aparezcan en el mismo orden
    answers = arrayShuffle(answers);

    //Generar los elementos de html
    var liArray = [];

    for(var i = 0; i < answers.length; i++){

        var listItem = document.createElement("li");
        listItem.style.listStyle = "none";
        listItem.classList.add("Answrs");

        var input = document.createElement("input");
        input.type = "radio";
        input.name = "imgAnswers";
        input.id = "imgAnswers-" + i;
        input.value = answers[i].correct;

        //Agregar listener del click al input
        input.addEventListener("click", gameOver);

        var label = document.createElement("label");
        label.setAttribute("for","imgAnswers-" + i);
        label.innerHTML = answers[i].value;

        listItem.appendChild(input);
        listItem.appendChild(label);

        liArray.push(listItem);

    }

    return liArray;

}


function gameOver(event){

    var clickedInput = event.target;

    correct = clickedInput.value;

    if (correct == "true")
        answer = true;

    console.log("answer",answer);

    var resultContainer = document.querySelector("#mainFull");//UL donde se insertarán
    var questionsContainer = document.querySelector("#questionsContainer");

    while (resultContainer.firstChild) {
        resultContainer.removeChild(resultContainer.firstChild);
    }

    var div = document.createElement("div");
    div.classList.add("topic");
    var h1 = document.createElement("h1");
    h1.classList.add("EndLegend");
    var link = document.createElement("a");
    link.innerHTML = "Volver a Jugar";
    link.classList.add("RestartBtn");

    //Reiniciamos juego
    link.addEventListener("click", restartGame);

    if (answer) {
          h1.innerHTML = " ¡GANASTE! ";
    } else {
          h1.innerHTML = " ¡PERDISTE! ";
    }

    div.appendChild(h1);
    div.appendChild(link);
    resultContainer.appendChild(div);
}

function timeOver(){

    totalTime = 0;
    answer = false;

    var resultContainer = document.querySelector("#mainFull");//UL donde se insertarán
    var questionsContainer = document.querySelector("#questionsContainer");

    while (resultContainer.firstChild) {
        resultContainer.removeChild(resultContainer.firstChild);
    }

    var div = document.createElement("div");
    div.classList.add("topic");
    var h1 = document.createElement("h1");
    h1.classList.add("EndLegend");
    var link = document.createElement("a");
    link.innerHTML = "Volver a Jugar";
    link.classList.add("RestartBtn");

    //Reiniciamos juego
    link.addEventListener("click", restartGame);

    if (answer) {
          h1.innerHTML = " ¡GANASTE! ";
    } else {
          h1.innerHTML = " ¡PERDISTE! ";
    }

    div.appendChild(h1);
    div.appendChild(link);
    resultContainer.appendChild(div);
}


function restartGame(event){
    location.reload(true);
}

function buildQuestionOptions (questionsList, selectedIndex){

    var quests = questionsList.slice();

    questions.push({
        description: quests[selectedIndex].description,
        answer: quests[selectedIndex].answers[quests[selectedIndex].correctAnswer],
        options: [
            null,
            null,
            null
        ]
    });

    //Mezclamos las preguntas
    quests[selectedIndex].answers = arrayShuffle(quests[selectedIndex].answers);

    //Insertamos las respuestas revueltas
    for (var i = 0; i < quests[selectedIndex].answers.length ; i++) {
        questions[0].options[i] = quests[selectedIndex].answers[i];
    }

    //Quitamos el elemento ya usado
    quests.splice(selectedIndex,1);

    //Mezclar las preguntas que quedaron
    quests = arrayShuffle(quests);

    //Agregar N opciones extra al arreglo de preguntas tomándolas de quests
    for(var i = 0; i < 2; i++){

        questions.push({
            description: quests[i].description,
            answer: quests[i].answers[quests[i].correctAnswer],
            options: [
                null,
                null,
                null
            ]
        });

        //Mezclamos las preguntas
        quests[i].answers = arrayShuffle(quests[i].answers);

        //Insertamos las respuestas revueltas
        for (var j = 0; j < quests[i].answers.length ; j++) {
            questions[i+1].options[j] = quests[i].answers[j];
        }
    }

    //Mezclarlas para que no aparezcan en el mismo orden
    questions = arrayShuffle(questions);

    //Generar los elementos de html
    var divArray = [];

    for (var i = 0; i < questions.length; i++) {

        var divItem = document.createElement("div");
        divItem.classList.add("divCnt");

        var h1 = document.createElement("h1");
        h1.innerHTML = questions[i].description;
        h1.classList.add("Answrs");

        var ul = document.createElement("ul");
        ul.classList.add("AnswrsCnt");

        divItem.appendChild(h1);
        divItem.appendChild(ul);

        for (var j = 0; j < questions[i].options.length; j++){

            var listItem = document.createElement("li");
            listItem.style.listStyle = "none";
            listItem.classList.add("Answrs");

            var input = document.createElement("input");
            input.type = "radio";
            input.name = "questionOption";
            input.id = "questionOption-" + i + "-" + j;
            if (questions[i].answer == questions[i].options[j])
                input.value = true;
            else
                input.value = false;

            //Agregar listener del click al input
            input.addEventListener("click", answerClickHandler);

            var label = document.createElement("label");
            label.setAttribute("for","questionOption-" + i + "-" + j);
            label.innerHTML = questions[i].options[j];

            listItem.appendChild(input);
            listItem.appendChild(label);

            ul.appendChild(listItem);
        }
        divArray.push(divItem);
    }

    return divArray;
}

//Función que maneja el click en los inputs de respuestas
function answerClickHandler(event){

    var clickedInput = event.target;

    correct = clickedInput.value

    if (correct == "true")
        enabled = true;

}

//Función que maneja el click en los cuadros que cubren la imagen
function coverClickHandler(event){

    if(enabled) {
        var clickedDiv = event.target;
        clickedDiv.style.visibility = "hidden";
        //Desactivar el click
        enabled = false;
    }

}

//Cubre la imagen con 9 cuadros de tamaño fijo
function coverImage(){
    //Tamaño 115x115
    var imageContainer = document.querySelector("#mainImage");

    for(var i = 1; i <= 9; i++){
        // <div class=coverItem>1</div>
        var div = document.createElement("div");
        div.className = "coverItem";
        div.innerHTML = i;

        //Agregar evento click
        div.addEventListener("click", coverClickHandler);

        imageContainer.appendChild(div);
    }

}

function nextQuestion(questionsContainer){

      //div de pregunta
      var actualQuestion = question[nQuestion];

      //Agregamos primera pregunta
      questionsContainer.appendChild(actualQuestion);

      //Cada li de un solo div
      var actualOption = [    actualQuestion.childNodes[1].childNodes[0].childNodes[0] ,
                              actualQuestion.childNodes[1].childNodes[1].childNodes[0] ,
                              actualQuestion.childNodes[1].childNodes[2].childNodes[0]
                          ];

      for (var i = 0; i < actualOption.length; i++) {
          actualOption[i].addEventListener("click", pastClickHandler);
      }
}

function pastClickHandler(event) {

    //input
    var clickedInput = event.target;
    //div . ul . li . input
    var actualQuestion = clickedInput.parentNode.parentNode.parentNode;
    var questionsContainer = actualQuestion.parentNode;

    nQuestion++;

    //Quitamos el div anterior
    questionsContainer.removeChild(actualQuestion);

    //Agregamos el div actualizado CON RECURSIVIDAD
    if (nQuestion < 3) {
        nextQuestionHandler(questionsContainer);
    } else {
        questionsLimit(questionsContainer);
    }

}

function nextQuestionHandler(questionsContainer){

    var mainFull = questionsContainer.parentNode;
    var mainContainer = mainFull.childNodes[1];
    var mainImage = mainContainer.childNodes[1];

    var h1 = document.createElement("h1");

    if (enabled){
        h1.innerHTML = " ¡CORRECTO! ";
        console.log("Correct!");
    } else {
        h1.innerHTML = " ¡INCORRECTO! ";
        console.log("Incorrect!");
    }

    //Hacemos un delay para mostrar el resultado
    questionsContainer.appendChild(h1);
    setTimeout(() => {
            questionsContainer.removeChild(h1);
            questionsContainer.appendChild(question[nQuestion]);
            //Vamos a la siguiente
            nextQuestion(questionsContainer); }, 1000);

}

function questionsLimit(questionsContainer){
      var h1 = document.createElement("h1");

      if (enabled){
          h1.innerHTML = " ¡CORRECTO! ";
          console.log("Correct!");
      } else {
          h1.innerHTML = " ¡INCORRECTO! ";
          console.log("Incorrect!");
      }

      questionsContainer.appendChild(h1);

      setTimeout(() => {
              questionsContainer.removeChild(h1);
              h1.innerHTML = " Llegaste al límite de preguntas ¡ADIVINA! ";
              questionsContainer.appendChild(h1); }, 1000);
}

function updateClock() {

    console.log(totalTime);
    if (totalTime >= 10 && totalTime != 0)
        document.getElementById("countdown").innerHTML = "Tiempo 00:" + totalTime;
    else if (totalTime != 0)
        document.getElementById("countdown").innerHTML = "Tiempo 00:0" + totalTime;

    if (totalTime==0){
        timeOver();
        console.log('Final');
    } else {
        totalTime-=1;
        setTimeout("updateClock()",1000);
    }
}

//Se encarga de la construcción del tablero de juego
function buildGame(imgList,questionsList){

    //Seleccionar una imagen y colocarla en la interfaz
    var index = randomNumber(0,(imgList.length-1));
    var selectedImage = imgList[index];
    document.querySelector("#mainImage").style.backgroundImage = 'url("' + selectedImage.url + '")';

    //Cubrir la imagen
    coverImage();

    //Armar las opciones de respuestas
    var options = buildImageOptions(imgList,index);//Devuelve un arreglo con los LIs a insertar

    //Insertarlos en el DOM
    var optionsContainer = document.querySelector("#imageOptions");//UL donde se insertarán

    for(var i = 0; i < options.length; i++){
        optionsContainer.appendChild(options[i]);
    }

    //Colocar una pregunta aleatoria en la interfaz
    index = randomNumber(0,(questionsList.length-1));

    //Armar las opciones de preguntas
    question = buildQuestionOptions(questionsList, index);//Devuelve un arreglo con los div a insertar

    //Insertarlos en el DOM
    var questionsContainer = document.querySelector("#questionsContainer");//section donde se insertarán

    //Lanza las preguntas de una en una
    nextQuestion(questionsContainer);

    window.onload = updateClock();

    //Timer de pérdida
    //setTimeout(timeOver, 30000);
}

function documentLoaded(event){

    //Obtener los datos de los JSON
    var imagesPromise = getJsonFile("./data/topic_images.json");
    var questionsPromise = getJsonFile("./data/topic_questions.json");

    Promise.all([imagesPromise,questionsPromise]).then(function(data){

        id = getParameter("id");

        buildGame(data[0][id],data[1][id]);

    });


}



/*********************************
    LÓGICA DE LA APLICACIÓN
**********************************/

//Esperar a que cargue el documento para comenzar
document.addEventListener("DOMContentLoaded",documentLoaded);
