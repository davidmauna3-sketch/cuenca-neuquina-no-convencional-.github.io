document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     LOADER
  ========================= */

  setTimeout(() => {
    document.body.classList.add("loaded");
  }, 500);


  /* =========================
     MENÚ CELULAR
  ========================= */

  const nav = document.getElementById("nav");
  const menu = document.getElementById("menuBtn");

  menu.onclick = () => {
    nav.classList.toggle("open");
  };

  document.querySelectorAll("nav a").forEach(link => {

    link.onclick = () => {
      nav.classList.remove("open");
    };

  });


  /* =========================
     MODO STAND
  ========================= */

  const standBtn = document.getElementById("standBtn");

  standBtn.onclick = () => {

    document.body.classList.toggle("stand-mode");

    if(document.body.classList.contains("stand-mode")){
      standBtn.textContent = "Salir del Stand";
    }else{
      standBtn.textContent = "Modo Stand";
    }

  };


  /* =========================
     LÍNEA DE TIEMPO
  ========================= */

  const times = {

    jur: [
      "JURÁSICO",
      "La cuenca comienza a definirse",
      "La evolución tectónica y sedimentaria genera el espacio de acomodación donde posteriormente se acumularán grandes espesores de sedimentos."
    ],

    tit: [
      "TITHONIANO",
      "Se depositan lutitas ricas en materia orgánica",
      "La inundación marina favorece la sedimentación de materiales finos y ricos en materia orgánica, vinculados a la Formación Vaca Muerta."
    ],

    ber: [
      "BERRIASIANO",
      "Cambian las condiciones sedimentarias",
      "La evolución continúa con cambios en los ambientes de depósito y el desarrollo de plataformas carbonáticas y otros sistemas sedimentarios."
    ],

    act: [
      "ACTUALIDAD",
      "La geología se convierte en energía",
      "El conocimiento del subsuelo, la perforación horizontal y la estimulación permiten desarrollar recursos alojados en rocas de baja permeabilidad."
    ]

  };


  document.querySelectorAll(".time").forEach(button => {

    button.onclick = () => {

      document.querySelectorAll(".time")
        .forEach(x => x.classList.remove("active"));

      button.classList.add("active");

      const data = times[button.dataset.time];

      document.getElementById("timeLabel").textContent = data[0];

      document.getElementById("timeTitle").textContent = data[1];

      document.getElementById("timeText").textContent = data[2];

    };

  });


  /* =========================
     CONTROL DEL POZO
  ========================= */

  const depth = document.getElementById("depth");

  depth.oninput = () => {

    document.getElementById("depthValue").textContent =
      depth.value + "%";

    document.querySelector(".well-demo")
      .style.setProperty(
        "--depth",
        (depth.value - 65) * 1.4 + "px"
      );

  };


  /* =========================
     LABORATORIO
  ========================= */

  const porosity = document.getElementById("porosity");
  const perm = document.getElementById("perm");
  const organic = document.getElementById("organic");

  function updateReading(){

    const p = Number(porosity.value);
    const k = Number(perm.value);
    const o = Number(organic.value);

    let text;

    if(k < 30){

      text =
        "Matriz compacta · flujo restringido";

    }else if(k < 65){

      text =
        "Permeabilidad intermedia · conectividad moderada";

    }else{

      text =
        "Mayor conectividad conceptual · flujo favorecido";

    }

    if(o >= 11){

      text += " · alto contenido orgánico";

    }else if(o >= 7){

      text += " · materia orgánica significativa";

    }

    document.getElementById("readingText")
      .textContent = text;

  }


  [porosity, perm, organic].forEach(slider => {

    slider.oninput = updateReading;

  });


  /* =========================
     QUIZ
  ========================= */

  const questions = [

    [
      "¿Qué es Vaca Muerta?",
      [
        "Una formación geológica",
        "Una provincia",
        "Un tipo de bomba",
        "Un río"
      ],
      0
    ],

    [
      "¿Por qué un recurso es considerado no convencional?",
      [
        "Porque está en otro país",
        "Porque requiere técnicas específicas por la baja permeabilidad",
        "Porque no contiene hidrocarburos",
        "Porque siempre está en superficie"
      ],
      1
    ],

    [
      "¿Qué permite el tramo horizontal?",
      [
        "Reducir la longitud del pozo",
        "Aumentar el contacto con la formación objetivo",
        "Eliminar la necesidad de perforar",
        "Cambiar la edad de la roca"
      ],
      1
    ],

    [
      "¿Qué busca la estimulación hidráulica?",
      [
        "Crear conductividad en la roca",
        "Enfriar el yacimiento",
        "Cambiar la composición del petróleo",
        "Cerrar el pozo"
      ],
      0
    ],

    [
      "¿En qué cuenca se encuentra Vaca Muerta?",
      [
        "Golfo San Jorge",
        "Neuquina",
        "Cuyana",
        "Austral"
      ],
      1
    ],

    [
      "¿Qué estudia principalmente la geología del subsuelo?",
      [
        "La arquitectura y propiedades de las rocas",
        "El tránsito urbano",
        "La meteorología diaria",
        "La electricidad domiciliaria"
      ],
      0
    ]

  ];


  let questionIndex = 0;
  let points = 0;
  let answered = false;


  function renderQuestion(){

    const q = questions[questionIndex];

    document.getElementById("qNumber").textContent =
      `Pregunta ${questionIndex + 1} de ${questions.length}`;

    document.getElementById("score").textContent =
      points + " pts";

    document.getElementById("question").textContent =
      q[0];

    const answersContainer =
      document.getElementById("answers");

    answersContainer.innerHTML = "";

    q[1].forEach((answer, index) => {

      const button = document.createElement("button");

      button.className = "answer";

      button.textContent = answer;

      button.onclick = () => {

        chooseAnswer(button, index);

      };

      answersContainer.appendChild(button);

    });

    document.getElementById("result").textContent = "";

    answered = false;

    document.getElementById("next").style.display =
      "inline-block";

  }


  function chooseAnswer(button, index){

    if(answered) return;

    answered = true;

    const correct =
      questions[questionIndex][2];

    const buttons =
      document.querySelectorAll(".answer");

    buttons[correct].classList.add("correct");


    if(index === correct){

      points++;

      button.classList.add("correct");

      document.getElementById("result").textContent =
        "✓ Correcto. +1 punto";

    }else{

      button.classList.add("wrong");

      document.getElementById("result").textContent =
        "✕ No es esa. Mirá la respuesta marcada.";

    }

    document.getElementById("score").textContent =
      points + " pts";

  }


  document.getElementById("next").onclick = () => {

    if(!answered){

      document.getElementById("result").textContent =
        "Elegí una respuesta primero.";

      return;

    }

    questionIndex++;

    if(questionIndex < questions.length){

      renderQuestion();

    }else{

      document.getElementById("question").textContent =
        "¡Quiz terminado!";

      document.getElementById("answers").innerHTML = "";

      document.getElementById("next").style.display =
        "none";

      document.getElementById("result").textContent =
        `Resultado final: ${points}/${questions.length}. ${
          points >= 5
          ? "Excelente dominio del tema."
          : points >= 3
          ? "Muy bien, ya tenés una buena base."
          : "Repasá las secciones y probá de nuevo."
        }`;

      document.getElementById("qNumber").textContent =
        "FINALIZADO";

    }

  };


  renderQuestion();


  /* =========================
     EXPLICADOR GEOLÓGICO
  ========================= */

  const knowledge = {

    shale:
      "Shale es una roca sedimentaria de grano muy fino y baja permeabilidad. En sistemas no convencionales puede contener hidrocarburos que requieren técnicas específicas para ser producidos.",

    fractura:
      "La estimulación hidráulica consiste en inyectar un fluido a presión para generar una red de fracturas controladas que aumente la conductividad alrededor del pozo.",

    horizontal:
      "Un pozo horizontal desvía su trayectoria para recorrer una mayor longitud dentro de la formación objetivo y aumentar el contacto con el reservorio.",

    "vaca muerta":
      "Vaca Muerta es una formación geológica de la Cuenca Neuquina, reconocida por su riqueza orgánica y por su importancia en el desarrollo de petróleo y gas no convencional.",

    cuenca:
      "La Cuenca Neuquina es una cuenca sedimentaria del oeste argentino con una extensa historia geológica y gran importancia hidrocarburífera."

  };


  const askInput =
    document.getElementById("askInput");

  const askBtn =
    document.getElementById("askBtn");

  function askQuestion(){

    const question =
      askInput.value.toLowerCase();

    const key =
      Object.keys(knowledge)
        .find(item => question.includes(item));

    document.getElementById("askAnswer")
      .textContent = key
        ? knowledge[key]
        : "Probá con: shale, fractura, pozo horizontal, Vaca Muerta o cuenca.";

  }


  askBtn.onclick = askQuestion;


  askInput.onkeydown = event => {

    if(event.key === "Enter"){

      askQuestion();

    }

  };


  /* =========================
     QR
  ========================= */

  try{

    new QRCode(
      document.getElementById("qrcode"),
      {
        text: location.href,
        width:110,
        height:110,
        colorDark:"#111118",
        colorLight:"#ffffff"
      }
    );

  }catch(error){

    document.getElementById("qrcode")
      .textContent = "QR";

  }


});
