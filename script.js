document.addEventListener("DOMContentLoaded", () => {

  // =========================================================
  // CUENCA NEUQUINA — SCRIPT PRINCIPAL
  // =========================================================


  // =========================================================
  // 1. LOADER
  // =========================================================

  // Oculta la pantalla "Cargando experiencia geológica..."
  setTimeout(() => {
    document.body.classList.add("loaded");
  }, 350);


  // =========================================================
  // 2. MENÚ MÓVIL
  // =========================================================

  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("nav");

  if (menuBtn && nav) {

    menuBtn.addEventListener("click", () => {
      nav.classList.toggle("open");
    });

    nav.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {
        nav.classList.remove("open");
      });

    });

  }


  // =========================================================
  // 3. MODO STAND
  // =========================================================

  const standBtn = document.getElementById("standBtn");

  if (standBtn) {

    standBtn.addEventListener("click", () => {

      document.body.classList.toggle("stand-mode");

      if (document.body.classList.contains("stand-mode")) {
        standBtn.textContent = "Salir del modo stand";
      } else {
        standBtn.textContent = "Modo Stand";
      }

    });

  }


  // =========================================================
  // 4. LÍNEA DE TIEMPO GEOLÓGICA
  // =========================================================

  const timelineData = {

    jur: {
      label: "JURÁSICO",
      title: "La cuenca comienza a definirse",
      text: "La evolución tectónica y sedimentaria genera el espacio de acomodación donde posteriormente se acumularán grandes espesores de sedimentos."
    },

    tit: {
      label: "TITHONIANO",
      title: "Se deposita la roca generadora",
      text: "En condiciones marinas relativamente restringidas se acumulan sedimentos ricos en materia orgánica que forman parte del sistema petrolero de la cuenca."
    },

    ber: {
      label: "BERRIASIANO",
      title: "Continúa la evolución sedimentaria",
      text: "La sedimentación y los cambios ambientales modifican la arquitectura de la cuenca y contribuyen a la configuración de las unidades geológicas."
    },

    act: {
      label: "ACTUALIDAD",
      title: "Desarrollo no convencional",
      text: "La combinación de perforación horizontal y estimulación hidráulica permite desarrollar recursos alojados en formaciones de muy baja permeabilidad."
    }

  };


  const timeButtons = document.querySelectorAll(".time");
  const timeLabel = document.getElementById("timeLabel");
  const timeTitle = document.getElementById("timeTitle");
  const timeText = document.getElementById("timeText");


  timeButtons.forEach(button => {

    button.addEventListener("click", () => {

      const key = button.dataset.time;
      const data = timelineData[key];

      if (!data) return;

      timeButtons.forEach(btn => {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      if (timeLabel) {
        timeLabel.textContent = data.label;
      }

      if (timeTitle) {
        timeTitle.textContent = data.title;
      }

      if (timeText) {
        timeText.textContent = data.text;
      }

    });

  });


  // =========================================================
  // 5. CONTROL DE PROFUNDIDAD
  // =========================================================

  const depth = document.getElementById("depth");
  const depthValue = document.getElementById("depthValue");


  if (depth && depthValue) {

    const updateDepth = () => {

      depthValue.textContent = `${depth.value}%`;

      const horizontal =
        document.querySelector(".well-horizontal");

      const fractures =
        document.querySelectorAll(".frac");


      if (horizontal) {

        horizontal.style.top =
          `${Math.max(48, Number(depth.value) * 0.82)}%`;

      }


      fractures.forEach((fracture, index) => {

        fracture.style.top =
          `${Math.max(
            50,
            Number(depth.value) * 0.82 + index * 6
          )}%`;

      });

    };


    depth.addEventListener("input", updateDepth);

    updateDepth();

  }


  // =========================================================
  // 6. LABORATORIO — PROPIEDADES DE LA ROCA
  // =========================================================

  const porosity = document.getElementById("porosity");
  const perm = document.getElementById("perm");
  const organic = document.getElementById("organic");
  const readingText = document.getElementById("readingText");


  const updateReading = () => {

    if (
      !porosity ||
      !perm ||
      !organic ||
      !readingText
    ) {
      return;
    }


    const p = Number(porosity.value);
    const k = Number(perm.value);
    const o = Number(organic.value);


    let reading =
      "Matriz compacta · flujo restringido";


    if (k <= 20 && o >= 9) {

      reading =
        "Baja permeabilidad · materia orgánica elevada";

    }

    else if (k > 60 && p > 12) {

      reading =
        "Mayor capacidad de flujo · porosidad relativamente alta";

    }

    else if (o >= 12) {

      reading =
        "Contenido orgánico alto · potencial generador";

    }

    else if (p >= 12) {

      reading =
        "Porosidad relativamente elevada · mayor espacio poral";

    }

    else if (k >= 40) {

      reading =
        "Permeabilidad intermedia · flujo menos restringido";

    }


    readingText.textContent = reading;

  };


  [porosity, perm, organic].forEach(control => {

    if (control) {

      control.addEventListener(
        "input",
        updateReading
      );

    }

  });


  updateReading();


  // =========================================================
  // 7. QUIZ
  // =========================================================

  const quizQuestions = [

    {
      question: "¿Qué es Vaca Muerta?",

      answers: [
        "Una formación geológica de la Cuenca Neuquina",
        "Una ciudad de la Patagonia",
        "Una empresa petrolera",
        "Un tipo de perforación"
      ],

      correct: 0
    },


    {
      question: "¿Por qué un recurso shale requiere técnicas especiales?",

      answers: [
        "Porque está siempre en la superficie",
        "Porque la roca presenta muy baja permeabilidad",
        "Porque no contiene hidrocarburos",
        "Porque solamente existe en pozos verticales"
      ],

      correct: 1
    },


    {
      question: "¿Qué caracteriza a un pozo horizontal?",

      answers: [
        "Recorre una mayor longitud dentro de la formación objetivo",
        "No tiene tramo vertical",
        "Se perfora solamente desde una mina",
        "No puede producir hidrocarburos"
      ],

      correct: 0
    },


    {
      question: "¿Para qué se utiliza la estimulación hidráulica?",

      answers: [
        "Para enfriar la superficie",
        "Para crear conductividad mediante fracturas en la roca",
        "Para cambiar el nombre del pozo",
        "Para medir la profundidad del terreno"
      ],

      correct: 1
    },


    {
      question: "¿Qué provincia está directamente asociada al desarrollo de Vaca Muerta?",

      answers: [
        "Neuquén",
        "Misiones",
        "Jujuy",
        "Santa Cruz"
      ],

      correct: 0
    },


    {
      question: "¿Qué propiedad dificulta el flujo en una roca shale?",

      answers: [
        "Alta permeabilidad",
        "Baja permeabilidad",
        "Ausencia de sedimentos",
        "Exceso de oxígeno"
      ],

      correct: 1
    }

  ];


  const qNumber =
    document.getElementById("qNumber");

  const scoreElement =
    document.getElementById("score");

  const questionElement =
    document.getElementById("question");

  const answersElement =
    document.getElementById("answers");

  const nextButton =
    document.getElementById("next");

  const resultElement =
    document.getElementById("result");


  let currentQuestion = 0;
  let score = 0;
  let answered = false;


  function renderQuestion() {

    if (
      !qNumber ||
      !scoreElement ||
      !questionElement ||
      !answersElement ||
      !nextButton ||
      !resultElement
    ) {
      return;
    }


    const q =
      quizQuestions[currentQuestion];


    qNumber.textContent =
      `Pregunta ${currentQuestion + 1} de ${quizQuestions.length}`;


    scoreElement.textContent =
      `${score} pts`;


    questionElement.textContent =
      q.question;


    answersElement.innerHTML = "";

    resultElement.textContent = "";

    nextButton.disabled = true;

    nextButton.style.opacity = "0.55";

    answered = false;


    q.answers.forEach((answer, index) => {

      const button =
        document.createElement("button");


      button.className = "answer";

      button.type = "button";

      button.textContent = answer;


      button.addEventListener("click", () => {

        if (answered) return;

        answered = true;


        const allAnswers =
          answersElement.querySelectorAll(".answer");


        allAnswers.forEach(btn => {
          btn.disabled = true;
        });


        if (index === q.correct) {

          button.classList.add("correct");

          score++;

          scoreElement.textContent =
            `${score} pts`;

          resultElement.textContent =
            "✓ Correcto";

        }

        else {

          button.classList.add("wrong");

          if (allAnswers[q.correct]) {
            allAnswers[q.correct].classList.add("correct");
          }

          resultElement.textContent =
            "✗ Incorrecto";

        }


        nextButton.disabled = false;

        nextButton.style.opacity = "1";

      });


      answersElement.appendChild(button);

    });

  }


  if (
    questionElement &&
    answersElement &&
    nextButton
  ) {

    renderQuestion();


    nextButton.addEventListener("click", () => {

      if (!answered) return;


      currentQuestion++;


      if (
        currentQuestion >= quizQuestions.length
      ) {

        if (qNumber) {
          qNumber.textContent =
            "QUIZ COMPLETADO";
        }


        if (questionElement) {

          questionElement.textContent =
            `Resultado final: ${score} de ${quizQuestions.length} respuestas correctas.`;

        }


        if (answersElement) {
          answersElement.innerHTML = "";
        }


        if (resultElement) {

          if (
            score === quizQuestions.length
          ) {

            resultElement.textContent =
              "¡Excelente! Dominás los conceptos principales.";

          }

          else if (score >= 4) {

            resultElement.textContent =
              "¡Muy bien! Tenés una buena base sobre la cuenca.";

          }

          else {

            resultElement.textContent =
              "Buen comienzo. Volvé a recorrer las secciones y probá nuevamente.";

          }

        }


        nextButton.textContent =
          "Reiniciar quiz";

        nextButton.disabled = false;

        nextButton.style.opacity = "1";


        nextButton.onclick = () => {

          currentQuestion = 0;

          score = 0;

          nextButton.textContent =
            "Siguiente →";

          nextButton.onclick = null;

          renderQuestion();

        };


        return;

      }


      renderQuestion();

    });

  }


  // =========================================================
  // 8. EXPLICADOR GEOLÓGICO
  // =========================================================

  const askInput =
    document.getElementById("askInput");

  const askBtn =
    document.getElementById("askBtn");

  const askAnswer =
    document.getElementById("askAnswer");


  const explanations = [

    {
      keywords: [
        "shale",
        "esquisto"
      ],

      answer:
        "El shale es una roca sedimentaria de muy baja permeabilidad. Puede contener hidrocarburos en su matriz y requiere técnicas de desarrollo específicas para favorecer su flujo hacia el pozo."
    },


    {
      keywords: [
        "fractura",
        "fracturación",
        "fractura hidraulica",
        "fractura hidráulica",
        "hidraulica",
        "hidráulica"
      ],

      answer:
        "La estimulación hidráulica utiliza un fluido presurizado para generar o reactivar fracturas en la formación, aumentando la conductividad y facilitando el flujo de hidrocarburos hacia el pozo."
    },


    {
      keywords: [
        "horizontal",
        "pozo horizontal"
      ],

      answer:
        "Un pozo horizontal comienza con un tramo vertical y luego se desvía hasta recorrer una sección extensa dentro de la formación objetivo. Esto aumenta el contacto con la roca productiva."
    },


    {
      keywords: [
        "vaca muerta"
      ],

      answer:
        "Vaca Muerta es una formación geológica de la Cuenca Neuquina, rica en materia orgánica y de muy baja permeabilidad, que contiene importantes recursos de petróleo y gas no convencionales."
    },


    {
      keywords: [
        "cuenca",
        "neuquina"
      ],

      answer:
        "La Cuenca Neuquina es una extensa cuenca sedimentaria del oeste argentino. Su evolución geológica generó un sistema petrolero de gran importancia, especialmente por el desarrollo de recursos no convencionales."
    },


    {
      keywords: [
        "permeabilidad"
      ],

      answer:
        "La permeabilidad describe la capacidad de una roca para permitir el movimiento de fluidos a través de sus poros y conexiones. En el shale suele ser muy baja, lo que dificulta el flujo natural."
    },


    {
      keywords: [
        "porosidad"
      ],

      answer:
        "La porosidad es la proporción del volumen de una roca que corresponde a espacios porales. Es importante porque esos espacios pueden almacenar fluidos, aunque porosidad y permeabilidad no significan lo mismo."
    },


    {
      keywords: [
        "materia organica",
        "materia orgánica"
      ],

      answer:
        "La materia orgánica presente en una roca generadora puede transformarse en hidrocarburos durante su evolución térmica. Su cantidad y madurez son variables importantes del sistema petrolero."
    }

  ];


  function answerQuestion() {

    if (!askInput || !askAnswer) return;


    const query =
      askInput.value.trim().toLowerCase();


    if (!query) {

      askAnswer.textContent =
        "Escribí una palabra o una pregunta, por ejemplo: ¿qué es shale?";

      return;

    }


    const match =
      explanations.find(item =>
        item.keywords.some(keyword =>
          query.includes(keyword)
        )
      );


    if (match) {

      askAnswer.textContent =
        match.answer;

    }

    else {

      askAnswer.textContent =
        "No encontré esa palabra en el explicador rápido. Probá con: shale, fractura, pozo horizontal, Vaca Muerta, cuenca, permeabilidad, porosidad o materia orgánica.";

    }

  }


  if (askBtn) {

    askBtn.addEventListener(
      "click",
      answerQuestion
    );

  }


  if (askInput) {

    askInput.addEventListener(
      "keydown",
      event => {

        if (event.key === "Enter") {
          answerQuestion();
        }

      }
    );

  }


  // =========================================================
  // 9. CÓDIGO QR
  // =========================================================

  const qrContainer =
    document.getElementById("qrcode");


  if (
    qrContainer &&
    typeof QRCode !== "undefined"
  ) {

    qrContainer.innerHTML = "";


    new QRCode(qrContainer, {

      text: window.location.href,

      width: 110,

      height: 110,

      correctLevel: QRCode.CorrectLevel.M

    });

  }


  // =========================================================
  // 10. AÑO AUTOMÁTICO
  // =========================================================

  const yearElements =
    document.querySelectorAll("[data-year]");


  yearElements.forEach(element => {

    element.textContent =
      new Date().getFullYear();

  });

});
