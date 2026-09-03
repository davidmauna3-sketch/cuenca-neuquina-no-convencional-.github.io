/* =========================================================
   MENÚ MOBILE
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const mainMenu = document.getElementById("mainMenu");

menuToggle.addEventListener("click", () => {

    mainMenu.classList.toggle("open");

});


document.querySelectorAll("#mainMenu a").forEach(link => {

    link.addEventListener("click", () => {

        mainMenu.classList.remove("open");

    });

});



/* =========================================================
   MAPA INTERACTIVO
========================================================= */

const map = L.map("map").setView(
    [-38.5, -69.5],
    7
);


L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        attribution:
            '&copy; OpenStreetMap contributors'
    }
).addTo(map);


/* Marcador Neuquén */

const neuquen = L.marker(
    [-38.9516, -68.0591]
).addTo(map);

neuquen.bindPopup(`
    <strong>Neuquén Capital</strong>
    <br>
    Centro administrativo de la provincia.
`);


/* Añelo */

const anelo = L.marker(
    [-38.355, -68.788]
).addTo(map);

anelo.bindPopup(`
    <strong>Añelo</strong>
    <br>
    Localidad estratégica vinculada al desarrollo
    hidrocarburífero de Vaca Muerta.
`);


/* Área educativa aproximada de Vaca Muerta */

const vacaMuerta = L.circle(
    [-38.3, -69.2],
    {
        radius: 85000,
        color: "#9c4dcc",
        fillColor: "#7026a8",
        fillOpacity: 0.18,
        weight: 2
    }
).addTo(map);

vacaMuerta.bindPopup(`
    <strong>Área de referencia de Vaca Muerta</strong>
    <br>
    Representación educativa aproximada.
`);


/* Marcador Mendoza */

const mendoza = L.marker(
    [-35.675, -69.58]
).addTo(map);

mendoza.bindPopup(`
    <strong>Sectores mendocinos</strong>
    <br>
    La Cuenca Neuquina también se extiende
    hacia sectores de Mendoza.
`);


/* Reset mapa */

document.getElementById("resetMap")
    .addEventListener("click", () => {

        map.setView(
            [-38.5, -69.5],
            7
        );

    });



/* =========================================================
   TABS DEL PROCESO
========================================================= */

const processTabs =
    document.querySelectorAll(".process-tab");

const processPanels =
    document.querySelectorAll(".process-panel");


processTabs.forEach(tab => {

    tab.addEventListener("click", () => {

        processTabs.forEach(t =>
            t.classList.remove("active")
        );

        processPanels.forEach(panel =>
            panel.classList.remove("active")
        );


        tab.classList.add("active");

        const target =
            document.getElementById(
                tab.dataset.process
            );

        target.classList.add("active");

    });

});



/* =========================================================
   ANIMACIONES AL HACER SCROLL
========================================================= */

const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


document.querySelectorAll(".reveal")
    .forEach(element => {

        observer.observe(element);

    });



/* =========================================================
   CONTADORES
========================================================= */

let countersStarted = false;


const numbersSection =
    document.querySelector(".numbers-section");


const counterObserver =
    new IntersectionObserver(
        entries => {

            if (
                entries[0].isIntersecting &&
                !countersStarted
            ) {

                countersStarted = true;

                document
                    .querySelectorAll("[data-count]")
                    .forEach(counter => {

                        const target =
                            Number(
                                counter.dataset.count
                            );

                        let current = 0;

                        const duration = 1300;

                        const start =
                            performance.now();


                        function update(time) {

                            const progress =
                                Math.min(
                                    (time - start) /
                                    duration,
                                    1
                                );

                            current =
                                Math.floor(
                                    progress * target
                                );

                            counter.textContent =
                                current;

                            if (progress < 1) {

                                requestAnimationFrame(
                                    update
                                );

                            } else {

                                counter.textContent =
                                    target + "+";

                            }

                        }

                        requestAnimationFrame(update);

                    });

            }

        }
    );


counterObserver.observe(numbersSection);



/* =========================================================
   LABORATORIO
========================================================= */

const labButtons =
    document.querySelectorAll(".lab-button");

const labResult =
    document.getElementById("labResult");


const labData = {

    organica: `
        <strong>Materia orgánica</strong>
        <br><br>
        La materia orgánica preservada en los sedimentos
        es fundamental para la generación de hidrocarburos.
        Su transformación térmica durante el enterramiento
        geológico puede generar petróleo y gas.
    `,

    porosidad: `
        <strong>Porosidad</strong>
        <br><br>
        Representa el espacio disponible dentro de la roca
        donde pueden encontrarse fluidos. En rocas
        no convencionales, estos espacios pueden ser muy
        pequeños.
    `,

    permeabilidad: `
        <strong>Permeabilidad</strong>
        <br><br>
        Indica la capacidad de la roca para permitir el
        movimiento de fluidos. La baja permeabilidad es una
        de las características que hace necesaria la
        estimulación hidráulica en muchos desarrollos
        no convencionales.
    `

};


labButtons.forEach(button => {

    button.addEventListener("click", () => {

        const key =
            button.dataset.lab;

        labResult.innerHTML =
            labData[key];

    });

});



/* =========================================================
   QUIZ
========================================================= */

const questions = [

    {
        question:
            "¿En qué región de Argentina se encuentra principalmente la Cuenca Neuquina?",

        answers: [
            "Centro-oeste",
            "Noreste",
            "Extremo sur",
            "Región pampeana exclusivamente"
        ],

        correct: 0
    },


    {
        question:
            "¿Qué es Vaca Muerta?",

        answers: [
            "Una formación geológica",
            "Una provincia",
            "Una ciudad",
            "Una cuenca independiente"
        ],

        correct: 0
    },


    {
        question:
            "¿Qué técnica permite aumentar el contacto del pozo con la formación?",

        answers: [
            "Perforación horizontal",
            "Perforación exclusivamente vertical",
            "Explosión superficial",
            "Dragado"
        ],

        correct: 0
    },


    {
        question:
            "¿Qué busca lograr la fractura hidráulica?",

        answers: [
            "Generar fracturas controladas y aumentar la conductividad",
            "Crear una nueva cuenca",
            "Eliminar la roca generadora",
            "Cerrar el pozo"
        ],

        correct: 0
    },


    {
        question:
            "¿Cuál de estas provincias forma parte del ámbito de la Cuenca Neuquina?",

        answers: [
            "Neuquén",
            "Misiones",
            "Jujuy",
            "Tierra del Fuego exclusivamente"
        ],

        correct: 0
    }

];


let currentQuestion = 0;

let score = 0;

let answered = false;


const questionElement =
    document.getElementById("question");

const answersElement =
    document.getElementById("answers");

const nextQuestion =
    document.getElementById("nextQuestion");

const quizMessage =
    document.getElementById("quizMessage");

const questionNumber =
    document.getElementById("questionNumber");

const scoreElement =
    document.getElementById("score");

const quizProgress =
    document.getElementById("quizProgress");


function loadQuestion() {

    answered = false;

    const q =
        questions[currentQuestion];


    questionElement.textContent =
        q.question;


    questionNumber.textContent =
        `Pregunta ${currentQuestion + 1} de ${questions.length}`;


    quizProgress.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;


    answersElement.innerHTML = "";


    q.answers.forEach((answer, index) => {

        const button =
            document.createElement("button");

        button.textContent =
            answer;

        button.addEventListener(
            "click",
            () => checkAnswer(index, button)
        );

        answersElement.appendChild(button);

    });


    quizMessage.textContent = "";

    nextQuestion.style.display =
        "none";
}


function checkAnswer(index, button) {

    if (answered) return;

    answered = true;

    const correct =
        questions[currentQuestion].correct;


    if (index === correct) {

        score++;

        button.classList.add("correct");

        quizMessage.textContent =
            "✓ ¡Correcto! Muy bien.";

        quizMessage.style.color =
            "#39905b";

    } else {

        button.classList.add("wrong");

        answersElement
            .children[correct]
            .classList.add("correct");

        quizMessage.textContent =
            "✗ No exactamente. La respuesta correcta está marcada.";

        quizMessage.style.color =
            "#b44c4c";

    }


    scoreElement.textContent =
        `Puntaje: ${score}`;

    nextQuestion.style.display =
        "inline-flex";

}


nextQuestion.addEventListener(
    "click",
    () => {

        currentQuestion++;

        if (
            currentQuestion >=
            questions.length
        ) {

            questionElement.innerHTML =
                `
                ¡Quiz terminado! 🎉
                <br>
                Obtuviste ${score} de ${questions.length}.
                `;

            answersElement.innerHTML = "";

            quizMessage.innerHTML =
                score >= 4
                    ? "Excelente. ¡Ya conocés bastante sobre la Cuenca Neuquina!"
                    : "¡Buen trabajo! Recorré nuevamente la web y volvé a intentarlo.";

            nextQuestion.textContent =
                "Volver a empezar";

            nextQuestion.style.display =
                "inline-flex";

            nextQuestion.onclick = () => {

                currentQuestion = 0;

                score = 0;

                scoreElement.textContent =
                    "Puntaje: 0";

                nextQuestion.textContent =
                    "Siguiente";

                loadQuestion();

            };

        } else {

            loadQuestion();

        }

    }
);


loadQuestion();



/* =========================================================
   FAQ
========================================================= */

document.querySelectorAll(".faq")
    .forEach(faq => {

        faq.addEventListener("click", () => {

            faq.classList.toggle("open");

        });

    });



/* =========================================================
   PREGUNTARLE AL GEOLOGO
========================================================= */

const questionInput =
    document.getElementById(
        "geologistQuestion"
    );

const askButton =
    document.getElementById(
        "askGeologist"
    );

const geologistAnswer =
    document.getElementById(
        "geologistAnswer"
    );


function answerQuestion() {

    const question =
        questionInput.value
            .toLowerCase()
            .trim();


    if (!question) {

        geologistAnswer.innerHTML =
            "Escribí una pregunta para comenzar.";

        return;

    }


    if (
        question.includes("vaca muerta")
    ) {

        geologistAnswer.innerHTML =
            `
            <strong>Respuesta:</strong><br><br>
            Vaca Muerta es una formación geológica
            de la Cuenca Neuquina. Está compuesta por
            rocas sedimentarias ricas en materia orgánica
            y es uno de los principales objetivos del
            desarrollo no convencional argentino.
            `;

        return;

    }


    if (
        question.includes("fracking") ||
        question.includes("fractura")
    ) {

        geologistAnswer.innerHTML =
            `
            <strong>Respuesta:</strong><br><br>
            La fractura hidráulica es una técnica de
            estimulación que utiliza fluidos a alta presión
            para generar fracturas controladas en la roca,
            aumentando la conductividad hacia el pozo.
            `;

        return;

    }


    if (
        question.includes("horizontal") ||
        question.includes("pozo")
    ) {

        geologistAnswer.innerHTML =
            `
            <strong>Respuesta:</strong><br><br>
            La perforación horizontal permite que una sección
            del pozo se desarrolle dentro de la formación
            objetivo, aumentando la longitud de contacto
            con la roca.
            `;

        return;

    }


    if (
        question.includes("cuenca")
    ) {

        geologistAnswer.innerHTML =
            `
            <strong>Respuesta:</strong><br><br>
            La Cuenca Neuquina es una cuenca sedimentaria
            ubicada principalmente en el centro-oeste de
            Argentina y abarca sectores de varias provincias.
            `;

        return;

    }


    geologistAnswer.innerHTML =
        `
        <strong>Respuesta educativa:</strong><br><br>
        Esa pregunta no está incluida todavía en nuestra
        base de respuestas. Podés consultar las secciones
        de Geología, Vaca Muerta y Proceso para encontrar
        más información.
        `;

}


askButton.addEventListener(
    "click",
    answerQuestion
);


questionInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            answerQuestion();

        }

    }
);



/* =========================================================
   MODO STAND
========================================================= */

const standButton =
    document.getElementById(
        "standMode"
    );


standButton.addEventListener(
    "click",
    async () => {

        document.body.classList.toggle(
            "stand-mode"
        );


        if (
            !document.fullscreenElement
        ) {

            try {

                await document.documentElement
                    .requestFullscreen();

            } catch (error) {

                console.log(
                    "Fullscreen no disponible."
                );

            }

        } else {

            try {

                await document.exitFullscreen();

            } catch (error) {}

        }

    }
);



/* =========================================================
   QR
========================================================= */

const qrElement =
    document.getElementById(
        "qrcode"
    );


if (qrElement) {

    new QRCode(
        qrElement,
        {
            text: window.location.href,

            width: 150,

            height: 150,

            colorDark: "#111111",

            colorLight: "#ffffff",

            correctLevel:
                QRCode.CorrectLevel.H
        }
    );

}



/* =========================================================
   BOTÓN VOLVER ARRIBA
========================================================= */

const topButton =
    document.getElementById(
        "topBtn"
    );


window.addEventListener(
    "scroll",
    () => {

        if (window.scrollY > 500) {

            topButton.classList.add(
                "visible"
            );

        } else {

            topButton.classList.remove(
                "visible"
            );

        }

    }
);


topButton.addEventListener(
    "click",
    () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);



/* =========================================================
   NAVBAR AL HACER SCROLL
========================================================= */

window.addEventListener(
    "scroll",
    () => {

        const navbar =
            document.getElementById(
                "navbar"
            );


        if (window.scrollY > 100) {

            navbar.style.background =
                "rgba(7,6,10,0.97)";

        } else {

            navbar.style.background =
                "rgba(9,7,13,0.88)";

        }

    }
);
