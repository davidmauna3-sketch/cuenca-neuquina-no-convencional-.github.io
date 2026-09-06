document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     CUENCA NEUQUINA — SCRIPT PRINCIPAL
     ========================================================= */


  /* =========================================================
     1. LOADER
     ========================================================= */

  setTimeout(() => {
    document.body.classList.add("loaded");
  }, 350);


  /* =========================================================
     2. MENÚ MÓVIL
     ========================================================= */

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


  /* =========================================================
     3. MODO STAND
     ========================================================= */

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


  /* =========================================================
     4. TIEMPO GEOLÓGICO
     ========================================================= */

  const timelineData = {

    jur: {
      label: "JURÁSICO",
      title: "La cuenca comienza a definirse",
      text: "La evolución tectónica y sedimentaria genera el espacio de acomodación donde posteriormente se acumularán grandes espesores de sedimentos.",
      className: "period-jur"
    },

    tit: {
      label: "TITHONIANO",
      title: "Se deposita la roca generadora",
      text: "En condiciones marinas relativamente restringidas se acumulan sedimentos ricos en materia orgánica que forman parte del sistema petrolero de la cuenca.",
      className: "period-tit"
    },

    ber: {
      label: "BERRIASIANO",
      title: "Continúa la evolución sedimentaria",
      text: "La sedimentación y los cambios ambientales modifican la arquitectura de la cuenca y contribuyen a la configuración de las unidades geológicas.",
      className: "period-ber"
    },

    act: {
      label: "ACTUALIDAD",
      title: "Desarrollo no convencional",
      text: "La combinación de perforación horizontal y estimulación hidráulica permite desarrollar recursos alojados en formaciones de muy baja permeabilidad.",
      className: "period-act"
    }

  };


  const timeButtons = document.querySelectorAll(".time");
  const timeLabel = document.getElementById("timeLabel");
  const timeTitle = document.getElementById("timeTitle");
  const timeText = document.getElementById("timeText");
  const timeVisual = document.querySelector(".time-visual");


  function changeGeologicalPeriod(key) {

    const data = timelineData[key];

    if (!data) return;


    timeButtons.forEach(button => {
      button.classList.remove("active");
    });


    const selectedButton =
      document.querySelector(`.time[data-time="${key}"]`);

    if (selectedButton) {
      selectedButton.classList.add("active");
    }


    if (timeLabel) {
      timeLabel.textContent = data.label;
    }


    if (timeTitle) {
      timeTitle.textContent = data.title;
    }


    if (timeText) {
      timeText.textContent = data.text;
    }


    /* Cambia visualmente el corte geológico */

    if (timeVisual) {

      timeVisual.classList.remove(
        "period-jur",
        "period-tit",
        "period-ber",
        "period-act"
      );

      timeVisual.classList.add(data.className);

    }

  }


  timeButtons.forEach(button => {

    button.addEventListener("click", () => {

      changeGeologicalPeriod(button.dataset.time);

    });

  });


  /* Estado inicial */

  changeGeologicalPeriod("jur");


  /* =========================================================
     5. MAPA INTERACTIVO — CUENCA NEUQUINA
     ========================================================= */

  const basinMapElement =
    document.getElementById("basinMap");


  if (
    basinMapElement &&
    typeof L !== "undefined"
  ) {

    const basinMap = L.map("basinMap", {

      zoomControl: true,
      attributionControl: true,

      minZoom: 5,
      maxZoom: 12,

      scrollWheelZoom: false

    }).setView(
      [-38.35, -69.55],
      6
    );


    /* ---------------------------------------------------------
       MAPA BASE
       --------------------------------------------------------- */

    const lightTiles = L.tileLayer(

      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",

      {
        subdomains: "abcd",
        maxZoom: 20,
        attribution: "&copy; OpenStreetMap &copy; CARTO"
      }

    ).addTo(basinMap);


    /* ---------------------------------------------------------
       SATÉLITE
       --------------------------------------------------------- */

    const satelliteTiles = L.tileLayer(

      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",

      {
        maxZoom: 19,
        attribution: "Tiles &copy; Esri"
      }

    );


    /* ---------------------------------------------------------
       CUENCA NEUQUINA
       --------------------------------------------------------- */

    const basinCoords = [

      [-35.10, -70.25],
      [-35.25, -69.25],
      [-35.65, -67.85],
      [-36.35, -67.25],
      [-37.25, -66.95],
      [-38.25, -67.05],
      [-39.25, -67.35],
      [-40.05, -68.15],
      [-40.55, -69.20],
      [-40.30, -70.25],
      [-39.55, -71.15],
      [-38.65, -71.75],
      [-37.45, -71.55],
      [-36.55, -70.95],
      [-35.65, -70.65]

    ];


    /* ---------------------------------------------------------
       VACA MUERTA
       --------------------------------------------------------- */

    const vacaCoords = [

      [-35.95, -70.05],
      [-36.10, -69.35],
      [-36.45, -68.72],
      [-36.95, -68.35],
      [-37.55, -68.22],
      [-38.15, -68.48],
      [-38.72, -68.82],
      [-39.08, -69.38],
      [-39.05, -70.02],
      [-38.55, -70.55],
      [-37.90, -70.82],
      [-37.20, -70.72],
      [-36.55, -70.45]

    ];


    const basinLayer =
      L.polygon(
        basinCoords,
        {
          color: "#8b63ff",
          weight: 2,
          opacity: 0.95,

          fillColor: "#8b63ff",
          fillOpacity: 0.10,

          dashArray: "7 6"
        }
      ).addTo(basinMap);


    basinLayer.bindTooltip(

      "<strong>CUENCA NEUQUINA</strong><br>" +
      "Extensión regional esquemática",

      {
        sticky: true,
        className: "map-label"
      }

    );


    const vacaLayer =
      L.polygon(
        vacaCoords,
        {
          color: "#ff9b3d",
          weight: 2,
          opacity: 1,

          fillColor: "#ff8a22",
          fillOpacity: 0.23
        }
      ).addTo(basinMap);


    vacaLayer.bindTooltip(

      "<strong>VACA MUERTA</strong><br>" +
      "Área de referencia visual",

      {
        sticky: true,
        className: "map-label"
      }

    );


    /* ---------------------------------------------------------
       PUNTOS DE INTERÉS
       --------------------------------------------------------- */

    const points = [

      {
        name: "Añelo",
        coords: [-38.355, -68.789],
        text: "Centro estratégico del desarrollo no convencional"
      },

      {
        name: "Loma Campana",
        coords: [-38.09, -69.04],
        text: "Área emblemática del desarrollo de Vaca Muerta"
      },

      {
        name: "Rincón de los Sauces",
        coords: [-37.39, -68.92],
        text: "Nodo hidrocarburífero de la región"
      },

      {
        name: "Malargüe",
        coords: [-35.47, -69.59],
        text: "Sector mendocino vinculado a la Cuenca Neuquina"
      }

    ];


    const pointLayer =
      L.layerGroup().addTo(basinMap);


    points.forEach(point => {

      const icon =
        L.divIcon({

          className: "",

          html:
            '<div class="map-marker-dot"></div>',

          iconSize: [12, 12],

          iconAnchor: [6, 6]

        });


      L.marker(
        point.coords,
        { icon: icon }
      )

        .addTo(pointLayer)

        .bindTooltip(

          `<strong>${point.name}</strong><br>${point.text}`,

          {
            direction: "top",
            offset: [0, -7],
            className: "map-label"
          }

        );

    });


    /* ---------------------------------------------------------
       PROVINCIAS DESDE IGN
       --------------------------------------------------------- */

    const ignUrl =
      "https://ide.ign.gob.ar/geoservicios/rest/services/" +
      "ANIDA/org_politica/MapServer/169/query";


    fetch(

      ignUrl +
      "?" +
      new URLSearchParams({

        where: "1=1",

        outFields: "FNA",

        returnGeometry: "true",

        outSR: "4326",

        f: "geojson"

      })

    )

      .then(response => {

        if (!response.ok) {
          throw new Error("No se pudo consultar IGN");
        }

        return response.json();

      })

      .then(data => {

        const target =
          new Set([

            "Neuquén",
            "Río Negro",
            "Mendoza",
            "La Pampa",

            "Provincia del Neuquén",
            "Provincia de Río Negro",
            "Provincia de Mendoza",
            "Provincia de La Pampa"

          ]);


        const filtered = {

          type: "FeatureCollection",

          features:
            (data.features || []).filter(feature => {

              const name =
                feature.properties?.FNA || "";

              return (

                target.has(name) ||

                /Neuquén|Río Negro|Mendoza|La Pampa/i
                  .test(name)

              );

            })

        };


        L.geoJSON(

          filtered,

          {

            style: {

              color: "#202633",

              weight: 1,

              opacity: 0.72,

              fillColor: "#eef1f5",

              fillOpacity: 0.05

            },


            onEachFeature:
              (feature, layer) => {

                const name =
                  feature.properties?.FNA ||
                  "Provincia";


                layer.bindTooltip(

                  name,

                  {
                    sticky: true,
                    className: "map-label"
                  }

                );

              }

          }

        ).addTo(basinMap);

      })

      .catch(() => {

        console.log(
          "Las provincias del IGN no pudieron cargarse."
        );

      });


    /* ---------------------------------------------------------
       BOTONES DEL MAPA
       --------------------------------------------------------- */

    const basinBounds =
      L.latLngBounds(basinCoords);


    const vacaBounds =
      L.latLngBounds(vacaCoords);


    const basinViewBtn =
      document.getElementById("basinViewBtn");


    const vacaViewBtn =
      document.getElementById("vacaViewBtn");


    function setActiveMapButton(button) {

      [
        basinViewBtn,
        vacaViewBtn

      ].forEach(btn => {

        if (btn) {

          btn.classList.toggle(
            "active",
            btn === button
          );

        }

      });

    }


    if (basinViewBtn) {

      basinViewBtn.addEventListener(
        "click",
        () => {

          basinMap.fitBounds(

            basinBounds.pad(0.06),

            {
              duration: 1.1
            }

          );

          setActiveMapButton(
            basinViewBtn
          );

        }
      );

    }


    if (vacaViewBtn) {

      vacaViewBtn.addEventListener(
        "click",
        () => {

          basinMap.fitBounds(

            vacaBounds.pad(0.18),

            {
              duration: 1.1
            }

          );

          setActiveMapButton(
            vacaViewBtn
          );

        }
      );

    }


    /* ---------------------------------------------------------
       DOBLE CLICK = SATÉLITE
       --------------------------------------------------------- */

    basinMap.on(
      "dblclick",
      () => {

        if (
          basinMap.hasLayer(lightTiles)
        ) {

          basinMap.removeLayer(
            lightTiles
          );

          satelliteTiles.addTo(
            basinMap
          );

        } else {

          basinMap.removeLayer(
            satelliteTiles
          );

          lightTiles.addTo(
            basinMap
          );

        }

      }
    );


    /* ---------------------------------------------------------
       ZOOM CON RUEDA SOLO DENTRO DEL MAPA
       --------------------------------------------------------- */

    basinMapElement.addEventListener(
      "mouseenter",
      () => {

        basinMap.scrollWheelZoom.enable();

      }
    );


    basinMapElement.addEventListener(
      "mouseleave",
      () => {

        basinMap.scrollWheelZoom.disable();

      }
    );


    /* ---------------------------------------------------------
       CORREGIR TAMAÑO DEL MAPA
       --------------------------------------------------------- */

    setTimeout(() => {

      basinMap.invalidateSize();

      basinMap.fitBounds(
        basinBounds.pad(0.06)
      );

    }, 500);

  }


  /* =========================================================
     6. LABORATORIO — PROFUNDIDAD
     ========================================================= */

  const depth =
    document.getElementById("depth");

  const depthValue =
    document.getElementById("depthValue");


  if (depth && depthValue) {

    const updateDepth = () => {

      const value =
        Number(depth.value);


      depthValue.textContent =
        `${value}%`;


      const horizontal =
        document.querySelector(
          ".well-horizontal"
        );


      const fractures =
        document.querySelectorAll(
          ".frac"
        );


      if (horizontal) {

        horizontal.style.top =
          `${Math.max(
            48,
            value * 0.82
          )}%`;

      }


      fractures.forEach(
        (fracture, index) => {

          fracture.style.top =
            `${Math.max(
              50,
              value * 0.82 +
              index * 6
            )}%`;

        }
      );

    };


    depth.addEventListener(
      "input",
      updateDepth
    );


    updateDepth();

  }


  /* =========================================================
     7. VALORES DEL LABORATORIO
     ========================================================= */

  const porosity =
    document.getElementById("porosity");

  const perm =
    document.getElementById("perm");

  const organic =
    document.getElementById("organic");


  const porosityValue =
    document.getElementById("porosityValue");

  const permValue =
    document.getElementById("permValue");

  const organicValue =
    document.getElementById("organicValue");


  const readingText =
    document.getElementById("readingText");


  function updateRockReading() {

    if (!porosity || !perm || !organic) {
      return;
    }


    const p =
      Number(porosity.value);

    const k =
      Number(perm.value);

    const o =
      Number(organic.value);


    if (porosityValue) {
      porosityValue.textContent =
        `${p}%`;
    }


    if (permValue) {
      permValue.textContent =
        `${k} mD`;
    }


    if (organicValue) {
      organicValue.textContent =
        `${o}%`;
    }


    if (!readingText) {
      return;
    }


    let reading =
      "Matriz compacta · flujo restringido";


    if (
      k <= 20 &&
      o >= 9
    ) {

      reading =
        "Baja permeabilidad · materia orgánica elevada";

    }

    else if (
      k > 60 &&
      p > 12
    ) {

      reading =
        "Mayor capacidad de flujo · porosidad relativamente alta";

    }

    else if (
      o >= 12
    ) {

      reading =
        "Contenido orgánico alto · potencial generador";

    }

    else if (
      p >= 12
    ) {

      reading =
        "Porosidad relativamente elevada · mayor espacio poral";

    }

    else if (
      k >= 40
    ) {

      reading =
        "Permeabilidad intermedia · flujo menos restringido";

    }


    readingText.textContent =
      reading;

  }


  [
    porosity,
    perm,
    organic

  ].forEach(control => {

    if (control) {

      control.addEventListener(
        "input",
        updateRockReading
      );

    }

  });


  updateRockReading();


  /* =========================================================
     8. QUIZ
     ========================================================= */

  const quizQuestions = [

    {
      question:
        "¿Qué es Vaca Muerta?",

      answers: [

        "Una formación geológica de la Cuenca Neuquina",

        "Una ciudad de la Patagonia",

        "Una empresa petrolera",

        "Un tipo de perforación"

      ],

      correct: 0

    },


    {
      question:
        "¿Por qué un recurso shale requiere técnicas especiales?",

      answers: [

        "Porque está siempre en la superficie",

        "Porque la roca presenta muy baja permeabilidad",

        "Porque no contiene hidrocarburos",

        "Porque solamente existe en pozos verticales"

      ],

      correct: 1

    },


    {
      question:
        "¿Qué caracteriza a un pozo horizontal?",

      answers: [

        "Recorre una mayor longitud dentro de la formación objetivo",

        "No tiene tramo vertical",

        "Se perfora solamente desde una mina",

        "No puede producir hidrocarburos"

      ],

      correct: 0

    },


    {
      question:
        "¿Para qué se utiliza la estimulación hidráulica?",

      answers: [

        "Para enfriar la superficie",

        "Para crear conductividad mediante fracturas en la roca",

        "Para cambiar el nombre del pozo",

        "Para medir la profundidad del terreno"

      ],

      correct: 1

    },


    {
      question:
        "¿Qué provincia está directamente asociada al desarrollo de Vaca Muerta?",

      answers: [

        "Neuquén",

        "Misiones",

        "Jujuy",

        "Santa Cruz"

      ],

      correct: 0

    },


    {
      question:
        "¿Qué propiedad dificulta el flujo en una roca shale?",

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


    const question =
      quizQuestions[currentQuestion];


    qNumber.textContent =
      `Pregunta ${currentQuestion + 1} de ${quizQuestions.length}`;


    scoreElement.textContent =
      `${score} pts`;


    questionElement.textContent =
      question.question;


    answersElement.innerHTML = "";

    resultElement.textContent = "";


    nextButton.disabled = true;

    nextButton.style.opacity =
      "0.55";


    answered = false;


    question.answers.forEach(
      (answer, index) => {

        const button =
          document.createElement(
            "button"
          );


        button.className =
          "answer";


        button.type =
          "button";


        button.textContent =
          answer;


        button.addEventListener(
          "click",
          () => {

            if (answered) {
              return;
            }


            answered = true;


            const allAnswers =
              answersElement.querySelectorAll(
                ".answer"
              );


            allAnswers.forEach(
              btn => {
                btn.disabled = true;
              }
            );


            if (
              index === question.correct
            ) {

              button.classList.add(
                "correct"
              );


              score++;


              scoreElement.textContent =
                `${score} pts`;


              resultElement.textContent =
                "✓ Correcto";

            }

            else {

              button.classList.add(
                "wrong"
              );


              if (
                allAnswers[question.correct]
              ) {

                allAnswers[
                  question.correct
                ].classList.add(
                  "correct"
                );

              }


              resultElement.textContent =
                "✗ Incorrecto";

            }


            nextButton.disabled =
              false;


            nextButton.style.opacity =
              "1";

          }
        );


        answersElement.appendChild(
          button
        );

      }
    );

  }


  if (
    questionElement &&
    answersElement &&
    nextButton
  ) {

    renderQuestion();


    nextButton.addEventListener(
      "click",
      () => {

        if (!answered) {
          return;
        }


        currentQuestion++;


        if (
          currentQuestion >=
          quizQuestions.length
        ) {

          qNumber.textContent =
            "QUIZ COMPLETADO";


          questionElement.textContent =
            `Resultado final: ${score} de ${quizQuestions.length} respuestas correctas.`;


          answersElement.innerHTML =
            "";


          if (
            score ===
            quizQuestions.length
          ) {

            resultElement.textContent =
              "¡Excelente! Dominás los conceptos principales.";

          }

          else if (
            score >= 4
          ) {

            resultElement.textContent =
              "¡Muy bien! Tenés una buena base sobre la cuenca.";

          }

          else {

            resultElement.textContent =
              "Buen comienzo. Volvé a recorrer las secciones y probá nuevamente.";

          }


          nextButton.textContent =
            "Reiniciar quiz";


          nextButton.disabled =
            false;


          nextButton.style.opacity =
            "1";


          nextButton.onclick = () => {

            currentQuestion = 0;

            score = 0;

            nextButton.textContent =
              "Siguiente →";

            nextButton.onclick =
              null;

            renderQuestion();

          };


          return;

        }


        renderQuestion();

      }
    );

  }


  /* =========================================================
     9. EXPLICADOR GEOLÓGICO
     ========================================================= */

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

    if (
      !askInput ||
      !askAnswer
    ) {

      return;

    }


    const query =
      askInput.value
        .trim()
        .toLowerCase();


    if (!query) {

      askAnswer.textContent =
        "Escribí una palabra o una pregunta, por ejemplo: ¿qué es shale?";

      return;

    }


    const match =
      explanations.find(
        item =>
          item.keywords.some(
            keyword =>
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

        if (
          event.key === "Enter"
        ) {

          answerQuestion();

        }

      }
    );

  }


  /* =========================================================
     10. CÓDIGO QR
     ========================================================= */

  const qrContainer =
    document.getElementById("qrcode");


  if (
    qrContainer &&
    typeof QRCode !== "undefined"
  ) {

    qrContainer.innerHTML = "";


    new QRCode(

      qrContainer,

      {

        text:
          window.location.href,

        width: 110,

        height: 110,

        correctLevel:
          QRCode.CorrectLevel.M

      }

    );

  }


  /* =========================================================
     11. AÑO AUTOMÁTICO
     ========================================================= */

  const yearElements =
    document.querySelectorAll(
      "[data-year]"
    );


  yearElements.forEach(
    element => {

      element.textContent =
        new Date().getFullYear();

    }
  );


});
