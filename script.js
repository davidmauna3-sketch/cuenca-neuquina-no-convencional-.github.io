document.addEventListener('DOMContentLoaded',()=>{

  setTimeout(()=>{
    document.body.classList.add('loaded');
  },500);

  const $=s=>document.querySelector(s);
  const $$=s=>document.querySelectorAll(s);

  /* =====================================================
     AÑO
  ===================================================== */

  $('#year').textContent=new Date().getFullYear();


  /* =====================================================
     MENÚ
  ===================================================== */

  const menu=$('#menuBtn');
  const nav=$('#nav');

  if(menu){
    menu.onclick=()=>{
      nav.classList.toggle('open');
    };
  }

  $$('#nav a').forEach(a=>{
    a.onclick=()=>{
      nav.classList.remove('open');
    };
  });


  /* =====================================================
     MODO PRESENTACIÓN
  ===================================================== */

  const stand=$('#standBtn');

  if(stand){

    stand.onclick=()=>{

      document.body.classList.toggle('stand-mode');

      stand.textContent=
        document.body.classList.contains('stand-mode')
        ? 'Salir del modo presentación'
        : 'Modo presentación';

    };

  }


  /* =====================================================
     MAPA INTERACTIVO
  ===================================================== */

  if(window.L && $('#basinMap')){

    const map=L.map('basinMap',{
      zoomControl:true,
      scrollWheelZoom:false,
      minZoom:5,
      maxZoom:12
    }).setView([-38.35,-69.55],6);


    const standard=L.tileLayer(
      'https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/capabaseargenmap@EPSG:3857@png/{z}/{x}/{-y}.png',
      {
        maxZoom:18,
        attribution:'© IGN · Argenmap'
      }
    ).addTo(map);


    const satellite=L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        maxZoom:19,
        attribution:'Tiles © Esri'
      }
    );


    const basinCoords=[
      [-35.10,-70.25],
      [-35.25,-69.25],
      [-35.65,-67.85],
      [-36.35,-67.25],
      [-37.25,-66.95],
      [-38.25,-67.05],
      [-39.25,-67.35],
      [-40.05,-68.15],
      [-40.55,-69.20],
      [-40.30,-70.25],
      [-39.55,-71.15],
      [-38.65,-71.75],
      [-37.45,-71.55],
      [-36.55,-70.95],
      [-35.65,-70.65]
    ];


    const vacaCoords=[
      [-35.95,-70.05],
      [-36.10,-69.35],
      [-36.45,-68.72],
      [-36.95,-68.35],
      [-37.55,-68.22],
      [-38.15,-68.48],
      [-38.72,-68.82],
      [-39.08,-69.38],
      [-39.05,-70.02],
      [-38.55,-70.55],
      [-37.90,-70.82],
      [-37.20,-70.72],
      [-36.55,-70.45]
    ];


    const basin=L.polygon(
      basinCoords,
      {
        color:'#9d7dff',
        weight:2,
        dashArray:'7 6',
        fillColor:'#9d7dff',
        fillOpacity:.09
      }
    ).addTo(map);


    basin.bindPopup(`
      <div class="map-popup-title">
        Cuenca Neuquina
      </div>

      <div class="map-popup-desc">
        Límite esquemático utilizado con fines educativos.
      </div>
    `);


    const vaca=L.polygon(
      vacaCoords,
      {
        color:'#ff9a3d',
        weight:2,
        fillColor:'#ff9a3d',
        fillOpacity:.25
      }
    ).addTo(map);


    vaca.bindPopup(`
      <div class="map-popup-title">
        Vaca Muerta
      </div>

      <div class="map-popup-desc">
        Área de referencia visual. No representa un límite oficial de la formación.
      </div>
    `);


    const points=[
      [
        'Añelo',
        -38.355,
        -68.789,
        'Centro estratégico del desarrollo no convencional'
      ],
      [
        'Loma Campana',
        -38.09,
        -69.04,
        'Área emblemática de Vaca Muerta'
      ],
      [
        'Rincón de los Sauces',
        -37.39,
        -68.92,
        'Nodo hidrocarburífero de la región'
      ],
      [
        'Malargüe',
        -35.47,
        -69.59,
        'Sector mendocino de la Cuenca Neuquina'
      ]
    ];


    const pointLayer=L.layerGroup().addTo(map);


    points.forEach(p=>{

      const icon=L.divIcon({
        className:'custom-marker',

        html:`
          <span
            style="
              display:block;
              width:10px;
              height:10px;
              border-radius:50%;
              background:#68d89a;
              box-shadow:
              0 0 0 5px #68d89a22,
              0 0 15px #68d89a88;
            ">
          </span>
        `,

        iconSize:[10,10]
      });


      L.marker(
        [p[1],p[2]],
        {icon}
      )
      .addTo(pointLayer)
      .bindPopup(`
        <div class="map-popup-title">
          ${p[0]}
        </div>

        <div class="map-popup-desc">
          ${p[3]}
        </div>
      `);

    });


    const bounds=L.latLngBounds(basinCoords);
    const vBounds=L.latLngBounds(vacaCoords);


    const setBtn=b=>{

      $$('.map-action')
      .forEach(x=>x.classList.remove('active'));

      b.classList.add('active');

    };


    $('#basinViewBtn').onclick=()=>{

      map.fitBounds(
        bounds.pad(.05),
        {duration:1}
      );

      setBtn($('#basinViewBtn'));

    };


    $('#vacaViewBtn').onclick=()=>{

      map.fitBounds(
        vBounds.pad(.16),
        {duration:1}
      );

      setBtn($('#vacaViewBtn'));

    };


    $('#resetMapBtn').onclick=()=>{

      map.setView(
        [-38.35,-69.55],
        6
      );

      setBtn($('#basinViewBtn'));

    };


    $('#satBtn').onclick=()=>{

      if(map.hasLayer(standard)){

        map.removeLayer(standard);

        satellite.addTo(map);

        $('#satBtn').textContent='◉ Mapa';

      }else{

        map.removeLayer(satellite);

        standard.addTo(map);

        $('#satBtn').textContent='◌ Satélite';

      }

    };


    $('#basinMap').addEventListener(
      'mouseenter',
      ()=>map.scrollWheelZoom.enable()
    );


    $('#basinMap').addEventListener(
      'mouseleave',
      ()=>map.scrollWheelZoom.disable()
    );


    setTimeout(()=>{

      map.invalidateSize();

      map.fitBounds(
        bounds.pad(.05)
      );

    },600);

  }


  /* =====================================================
     DESARROLLO DEL POZO
  ===================================================== */

  const process=[

    [
      'Perforación',
      'Se construye el pozo atravesando las unidades del subsuelo hasta alcanzar la profundidad objetivo.',
      'Objetivo: construir una trayectoria segura y controlada.'
    ],

    [
      'Desviación',
      'La trayectoria cambia progresivamente de dirección hasta orientar el pozo hacia la formación objetivo.',
      'Objetivo: posicionar el pozo dentro de la ventana geológica.'
    ],

    [
      'Tramo horizontal',
      'El lateral aumenta el contacto con la formación de interés.',
      'Objetivo: maximizar el contacto con la roca objetivo.'
    ],

    [
      'Completación',
      'Se preparan los elementos necesarios para dejar el pozo listo para la etapa de estimulación y producción.',
      'Objetivo: acondicionar el pozo para operar de forma controlada.'
    ],

    [
      'Estimulación',
      'Se aplican tratamientos hidráulicos para generar conductividad en la formación.',
      'Objetivo: favorecer el flujo hacia el pozo.'
    ],

    [
      'Producción',
      'Los fluidos ingresan al sistema de pozo y son conducidos a superficie para su tratamiento.',
      'Objetivo: mantener una operación segura y eficiente.'
    ]

  ];


  function setProcess(i){

    const d=process[i];

    $$('.process-step')
      .forEach((b,j)=>{
        b.classList.toggle(
          'active',
          i===j
        );
      });


    $('#processNumber').textContent=
      'ETAPA '+String(i+1).padStart(2,'0');


    $('#processTitle').textContent=d[0];

    $('#processText').textContent=d[1];

    $('#processTip').textContent=d[2];


    $('.well-line-h').style.width=
      (55+i*5)+'%';


    $$('.frac').forEach((f,j)=>{

      f.style.opacity=
        i>=4
        ? String(.35+j*.12)
        : i>=2
        ? '0.55'
        : '0.12';

    });

  }


  $$('.process-step')
    .forEach(b=>{
      b.onclick=()=>{
        setProcess(+b.dataset.step);
      };
    });


  setProcess(0);


  /* =====================================================
     SIMULADOR
  ===================================================== */

  const depth=$('#depth');
  const length=$('#length');
  const stages=$('#stages');


  function sim(){

    const d=+depth.value;
    const l=+length.value;
    const s=+stages.value;


    $('#depthValue').textContent=
      d+' m';


    $('#lengthValue').textContent=
      l+' m';


    $('#stagesValue').textContent=
      s;


    let score=Math.round(
      Math.min(
        100,
        Math.max(
          0,
          38+
          (l-500)/3000*42+
          (s-5)/35*20
        )
      )
    );


    $('#contactScore').textContent=
      score+'%';


    $('#contactBar').style.width=
      score+'%';


    $('#simText').textContent=
      score>78
      ? 'Alto contacto conceptual con la formación objetivo.'
      : score>58
      ? 'Buen contacto conceptual con la formación objetivo.'
      : 'Contacto conceptual reducido: aumentá la longitud horizontal o las etapas.';


    const y=
      22+
      (d-1800)/2000*58;


    $('#simDepthLine').style.top=
      y+'%';


    $('.sim-well-h').style.width=
      (35+l/3500*35)+'%';


    const n=
      Math.max(
        3,
        Math.round(s/3)
      );


    $('.sim-fracs').style.background=
      'repeating-linear-gradient('+
      '110deg,'+
      'transparent 0 '+
      (28-n/2)+'px,'+
      '#a98cff88 '+
      (29-n/2)+'px '+
      (31-n/2)+'px)';

  }


  [depth,length,stages]
    .forEach(x=>{
      x.oninput=sim;
    });


  sim();


  /* =====================================================
     CONTADORES
  ===================================================== */

  const counters=
    $$('[data-counter]');


  let counted=false;


  function runCounters(){

    if(counted)return;


    const box=$('.number-grid');

    if(!box)return;


    const r=
      box.getBoundingClientRect();


    if(r.top<innerHeight*.85){

      counted=true;


      counters.forEach(el=>{

        const target=
          +el.dataset.counter;


        let n=0;


        const step=
          Math.max(
            1,
            Math.ceil(target/30)
          );


        const timer=
          setInterval(()=>{

            n=Math.min(
              target,
              n+step
            );


            el.textContent=n;


            if(n>=target)
              clearInterval(timer);

          },25);

      });

    }

  }


  window.addEventListener(
    'scroll',
    runCounters
  );


  runCounters();


  /* =====================================================
     QUIZ
  ===================================================== */

  const questions=[

    [
      '¿Qué es Vaca Muerta?',
      [
        'Una formación geológica de la Cuenca Neuquina',
        'Una ciudad de la Patagonia',
        'Una empresa petrolera',
        'Un tipo de perforación'
      ],
      0
    ],

    [
      '¿Qué propiedad dificulta el flujo en una roca shale?',
      [
        'Alta permeabilidad',
        'Baja permeabilidad',
        'Ausencia de sedimentos',
        'Exceso de oxígeno'
      ],
      1
    ],

    [
      '¿Qué caracteriza a un pozo horizontal?',
      [
        'Recorre una mayor longitud dentro de la formación',
        'No tiene tramo vertical',
        'Se perfora desde una mina',
        'No puede producir hidrocarburos'
      ],
      0
    ],

    [
      '¿Para qué se utiliza la estimulación hidráulica?',
      [
        'Para enfriar la superficie',
        'Para aumentar la conductividad mediante fracturas',
        'Para medir la altura del terreno',
        'Para cambiar el nombre del pozo'
      ],
      1
    ],

    [
      '¿En qué intervalo se ubica principalmente el registro clásico de Vaca Muerta?',
      [
        'Tithoniano–Berriasiano',
        'Pérmico–Triásico',
        'Cretácico tardío–Paleógeno',
        'Neógeno–Cuaternario'
      ],
      0
    ],

    [
      '¿Qué significa que una roca tenga baja permeabilidad?',
      [
        'Permite mucho flujo',
        'Dificulta el movimiento de fluidos a través de la matriz',
        'No tiene poros',
        'Está siempre en superficie'
      ],
      1
    ],

    [
      '¿Qué etapa aumenta el contacto del pozo con la formación?',
      [
        'Tramo horizontal',
        'Cementación superficial',
        'Transporte',
        'Almacenamiento'
      ],
      0
    ],

    [
      '¿La simulación de esta página representa un pozo real?',
      [
        'Sí, predice producción',
        'No, es un modelo didáctico',
        'Sí, usa datos de un yacimiento específico',
        'Sí, reemplaza un estudio geológico'
      ],
      1
    ]

  ];


  let qi=0;
  let score=0;
  let answered=false;


  function renderQuiz(){

    const q=questions[qi];


    $('#qNumber').textContent=
      'Pregunta '+(qi+1)+
      ' de '+
      questions.length;


    $('#score').textContent=
      score+' pts';


    $('#question').textContent=
      q[0];


    $('#quizProgress').style.width=
      ((qi+1)/questions.length*100)+'%';


    $('#result').textContent='';


    $('#next').disabled=true;

    $('#next').style.opacity='.55';


    answered=false;


    $('#answers').innerHTML='';


    q[1].forEach((a,i)=>{

      const b=
        document.createElement('button');


      b.className='answer';

      b.textContent=a;


      b.onclick=()=>{

        if(answered)return;


        answered=true;


        $$('.answer')
          .forEach(x=>{
            x.disabled=true;
          });


        if(i===q[2]){

          b.classList.add('correct');

          score++;

          $('#result').textContent=
            '✓ Correcto';

        }else{

          b.classList.add('wrong');

          $$('.answer')[q[2]]
            .classList.add('correct');

          $('#result').textContent=
            '✗ Incorrecto';

        }


        $('#score').textContent=
          score+' pts';


        $('#next').disabled=false;

        $('#next').style.opacity='1';

      };


      $('#answers')
        .appendChild(b);

    });

  }


  $('#next').onclick=()=>{

    if(!answered)return;


    qi++;


    if(qi>=questions.length){

      $('#qNumber').textContent=
        'QUIZ COMPLETADO';


      $('#question').textContent=
        'Resultado final: '+
        score+
        ' de '+
        questions.length;


      $('#answers').innerHTML='';


      $('#result').textContent=
        score>=7
        ? 'Excelente: dominás los conceptos principales.'
        : score>=5
        ? 'Muy bien: tenés una buena base.'
        : 'Buen comienzo: recorré nuevamente la página y probá otra vez.';


      $('#next').textContent=
        'Reiniciar quiz';


      $('#next').onclick=()=>{

        qi=0;
        score=0;

        $('#next').textContent=
          'Siguiente →';

        renderQuiz();

      };

      return;

    }


    renderQuiz();

  };


  renderQuiz();


  /* =====================================================
     GLOSARIO
  ===================================================== */

  const glossary={

    shale:
      'Roca sedimentaria de grano muy fino y baja permeabilidad que puede contener materia orgánica e hidrocarburos.',

    permeabilidad:
      'Propiedad que describe qué tan fácilmente pueden desplazarse los fluidos a través de una roca conectada.',

    porosidad:
      'Proporción de espacios porales dentro de una roca. Tener porosidad no significa necesariamente tener buena permeabilidad.',

    lateral:
      'Tramo horizontal del pozo que se desarrolla dentro de la formación objetivo para aumentar el contacto con la roca.',

    fractura:
      'Tratamiento de estimulación hidráulica que busca crear conductividad en la formación mediante fracturas.',

    madurez:
      'Grado de evolución térmica de la materia orgánica. Influye en el tipo y cantidad de hidrocarburos que puede generar una roca.'

  };


  $$('.glossary button')
    .forEach(b=>{

      b.onclick=()=>{

        $('#glossaryAnswer').textContent=
          glossary[b.dataset.term];

      };

    });

});
