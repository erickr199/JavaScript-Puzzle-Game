/***********************************************************
Este archivo contiene funciones generales y de utilería que
pueden servir como apoyo en la lógica de los demás scripts.
No están asociadas directamente a la lógica de una página en
particular sino que pueden emplearse en cualquiera.
************************************************************/

//Revuelve los elementos de un arreglo
function arrayShuffle(array){

    //Crear copia del arreglo
    var myArray = array.slice();
    //Nuevo arreglo de salida
    var output = [];

    //mientras haya elementos en el arreglo tomar uno aleatoriamente y pasarlo a output
    while(myArray.length > 0){
        var index = randomNumber(0,(myArray.length-1));
        //Guardarlo en la salida
        output.push(myArray[index]);
        //Borrarlo de la copia
        myArray.splice(index,1);
    }

    return output;

}

//Obtiene el valor de un parámetro de la URL
function getParameter(name){
    var parameters = new URLSearchParams(document.location.search);
    return parameters.get(name);
}

//Devuelve un número entero aleatorio entre min y max
function randomNumber(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

//Carga un archivo JSON desde una URL y devuelve su contenido como objeto de JS
function getJsonFile(url,callback){

    //Agregar el timestamp a la URL para que no la cachée
    url = url + "?t=" + (new Date()).getTime();

    //Ejecutar el fetch y devolver la promesa con los datos JSON
    var dataPromise = fetch(url)
        .then(function(response){
            //Verificar si la respuesta fue exitosa
            if(response.ok){
                //Devolver una promesa con los datos parseados
                return response.json();
            }
            alert("error al cargar los datos");
        });

    return dataPromise;
}
