/*********************************
    DECLARACIÓN DE VARIABLES
**********************************/


/*********************************
    DECLARACIÓN DE FUNCIONES
**********************************/

function buildTopicItem(topic){

    //Contenedor principal
    var topicItem = document.createElement("div");
    topicItem.className = "topic";
    //Imagen
    var img = document.createElement("img");
    img.src = topic.image;
    img.alt = topic.name;
    //título
    var title = document.createElement("h3");
    title.innerHTML = topic.name;
    //Descripción
    var desc = document.createElement("p");
    desc.innerHTML = topic.description;
    //Link
    var link = document.createElement("a");
    link.href = "./game.html?id=" + topic.id;
    link.target = "_blank";
    link.innerHTML = "JUGAR";

    /*
    <div class="topic">
        <img src="" alt="Animales" />
        <h3>Animales</h3>
        <p>Descripción</p>
        <div>
            <a href="./game.html?id=1" target="_blank">Jugar</a>
        </div>
    </div>
    */

    //Append de los hijos
    topicItem.appendChild(img);
    topicItem.appendChild(title);
    topicItem.appendChild(desc);
    topicItem.appendChild(link);

    return topicItem;

}

//Función encargada de generar los elementos de los temas tomando los datos pasados
function buildTopics(topics){

    console.log("topics",topics);
    var topicsContainer = document.querySelector("#topicsList");

    //Iterar sobre los temas
    for(var index in topics){
        //Agregar el id al item
        topics[index].id = index;
        //Construir los elementos de los temas
        var item = buildTopicItem(topics[index]);
        //Inyectar los elementos construidos en el DOM -> #topicsList
        topicsContainer.appendChild(item);
    }

}

function documentLoaded(event){

    console.log("DOM fully loaded and parsed");
    console.log(document.getElementById("topicsList"));

    //Obtener los datos del JSON
    var dataPromise = getJsonFile("./data/topics.json");

    dataPromise.then(buildTopics);

}



/*********************************
    LÓGICA DE LA APLICACIÓN
**********************************/

console.log(document.getElementById("topicsList"));

//Esperar a que cargue el documento para comenzar
document.addEventListener("DOMContentLoaded",documentLoaded);
