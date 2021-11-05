const preguntas = [
    {
        pregunta: "¿Quién y en qué año se descubrió América?",
        respuestas: ["José de San Martín 1828", "Cristóbal Colón 1492", "Cristóbal Colón 1482"],
        correcta: 1
    },
    {
        pregunta: "¿Cuál es el país más grande del mundo?",
        respuestas: ["China","Rusia","Brasil", "Japón"],
        correcta: 1
    },
    {
        pregunta: "¿Cuál es el continente más frío del mundo?",
        respuestas: ["Antártida", "Ártico","Polo Sur"],
        correcta: 0
    },
    {
        pregunta: "¿Cuando fue la independencia del Perú?",
        respuestas: ["28 de Julio 1832", "28 de Julio 1922", "28 de Julia 1821"],
        correcta: 2
    }


];

let indice_aleatorio = 0;

let pregunta_txt = "";

let interval;

window.onload = iniciar();

function iniciar() {
    loadQuestions();
    if (localStorage.getItem("SCORE") != null) {
        localStorage.removeItem("SCORE");
    }
    }


function iniciarCronometro() {
  const contador = 15, cronometroDisplay = document.getElementById("cronometro")

  iniciarTiempo(contador, cronometroDisplay)
  
}

function iniciarTiempo(duracion, componente) {
    interval = setInterval(() => {
    if (duracion === 0) {

      componente.innerHTML = "Se acabó el tiempo";

      clearInterval(interval);

      loadQuestions()

    } else {
      
      duracion = duracion < 10 ? "0" + duracion : duracion;

      componente.textContent = "00:" + duracion;

      duracion--;
    }
    }, 1000)

}

function loadQuestions() {
  iniciarCronometro()
    if (preguntas.length > 0) {

        indice_aleatorio = Math.floor(Math.random() * preguntas.length);

        pregunta_txt = "";

        pregunta_txt += '<p class="pregunta">' + preguntas[indice_aleatorio].pregunta + '</p>';

        pregunta_txt += '<button id="opcion0" class="botonTrivias" onclick="verificarRespuestaCorrecta(0, ' + preguntas[indice_aleatorio].correcta + ')">' + preguntas[indice_aleatorio].respuestas[0] + '</button>';

        pregunta_txt += '<button id="opcion1" class="botonTrivias" onclick="verificarRespuestaCorrecta(1, ' + preguntas[indice_aleatorio].correcta + ')">' + preguntas[indice_aleatorio].respuestas[1] + '</button>';

        pregunta_txt += '<button id="opcion2" class="botonTrivias" onclick="verificarRespuestaCorrecta(2, ' + preguntas[indice_aleatorio].correcta + ')">' + preguntas[indice_aleatorio].respuestas[2] + '</button>';


        document.getElementById("pregunta").innerHTML = pregunta_txt;

        preguntas.splice(indice_aleatorio, 1);

    }
     else {
        window.location.href ="menufinal.html"; }}

        let puntos = 0;

function verificarRespuestaCorrecta(indice, correcta) {
    if (correcta === indice) {
        puntos = puntos + 5;   
    }
    
    localStorage.setItem("SCORE", puntos);

    document.getElementById("opcion0").disabled = true;
    document.getElementById("opcion1").disabled = true;
    document.getElementById("opcion2").disabled = true;
}

document.getElementById("siguienteTrivia").addEventListener("click", () => { clearInterval(interval), loadQuestions() });