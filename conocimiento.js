/* 25 temas × 4 preguntas de referencia = 100. */
const FINUNI_INTENTS = [
  {
    "id": "presentacion",
    "examples": [
      "que es finuni",
      "para que sirve finuni",
      "quien eres",
      "como me puedes ayudar"
    ],
    "answer": "Soy FinUni, un asistente cognitivo educativo del Proyecto CORTEX. Ayudo a estudiantes universitarios a comprender ingresos, gastos, presupuestos, becas y metas de ahorro. Funciono con reglas locales y no uso una IA externa."
  },
  {
    "id": "funcionamiento",
    "examples": [
      "como funcionas",
      "eres una inteligencia artificial",
      "utilizas gemini",
      "puedes contestar sin internet"
    ],
    "answer": "Funciono con un motor de reglas, detección de intenciones y cálculos: no soy un modelo generativo ni aprendo por mi cuenta. Esta demostración puede ejecutarse sin conexión después de cargar la página."
  },
  {
    "id": "registro_ingresos",
    "examples": [
      "como registro un ingreso",
      "como agrego mi beca",
      "donde anoto mi salario",
      "registrar ayuda familiar"
    ],
    "answer": "En Movimientos, pulsa «Agregar movimiento», selecciona Ingreso, escribe descripción, categoría, valor y fecha. El ingreso aparecerá en el resumen del mes correspondiente."
  },
  {
    "id": "registro_gastos",
    "examples": [
      "como registro un gasto",
      "donde anoto transporte",
      "como agrego alimentacion",
      "registrar materiales de la universidad"
    ],
    "answer": "En Movimientos, pulsa «Agregar movimiento», selecciona Gasto, indica categoría, cantidad y fecha. Así podrás revisar en qué gastas y ver el gráfico por categoría."
  },
  {
    "id": "presupuesto",
    "examples": [
      "que es un presupuesto",
      "como hacer un presupuesto",
      "quiero organizar mi dinero",
      "como distribuir mi beca"
    ],
    "answer": "Un presupuesto compara lo que recibes con lo que gastas. Separa primero matrícula, alimentación, transporte y vivienda; luego reserva un margen para imprevistos y, si alcanza, define un ahorro realista. Podemos partir de tus ingresos y gastos registrados."
  },
  {
    "id": "becas",
    "examples": [
      "que es una beca",
      "como administrar una beca",
      "consejos para una beca universitaria",
      "como usar la ayuda economica"
    ],
    "answer": "Una beca es un apoyo para los estudios y puede cubrir gastos distintos según el programa. Revisa sus condiciones, registra el monto como ingreso cuando lo recibas y planifica matrícula, materiales, transporte y alimentación antes de otros gastos."
  },
  {
    "id": "ahorro",
    "examples": [
      "como puedo ahorrar",
      "consejos para ahorrar",
      "quiero empezar a ahorrar",
      "habitos de ahorro"
    ],
    "answer": "Empieza registrando tus gastos durante varias semanas. Elige una meta concreta, revisa compras flexibles y separa un monto pequeño que no afecte alimentación, transporte ni estudios. No ahorres dinero que ya necesitas para obligaciones."
  },
  {
    "id": "metas",
    "examples": [
      "como creo una meta",
      "donde veo mis metas",
      "que son las metas de ahorro",
      "quiero ahorrar para un computador"
    ],
    "answer": "En Metas de ahorro puedes crear un objetivo y registrar lo acumulado. FinUni calcula el progreso, pero esos aportes no se descuentan automáticamente del balance mensual."
  },
  {
    "id": "balance",
    "examples": [
      "cuanto dinero me queda",
      "cual es mi balance",
      "cual es mi saldo",
      "cuanto tengo disponible"
    ],
    "answer": "Tu balance mensual se calcula restando gastos a ingresos; no equivale necesariamente al saldo de tu banco ni considera obligaciones pendientes."
  },
  {
    "id": "gastos",
    "examples": [
      "cuanto he gastado",
      "mis gastos del mes",
      "en que gasto mas",
      "cual es mi mayor gasto"
    ],
    "answer": "Consulta la sección Resumen y el gráfico Gastos por categoría; si autorizas una pregunta sobre tus registros, también puedo resumirlos desde este chat."
  },
  {
    "id": "ingresos",
    "examples": [
      "cuanto he ganado",
      "mis ingresos del mes",
      "cuanto recibo al mes",
      "cuanto me ingresa"
    ],
    "answer": "En el resumen puedes consultar los ingresos registrados en el mes. Recuerda que un ingreso futuro no debe contarse como dinero recibido hasta que lo registres."
  },
  {
    "id": "deficit",
    "examples": [
      "mis gastos superan ingresos",
      "estoy gastando mas de lo que gano",
      "mi balance es negativo",
      "no me alcanza el dinero"
    ],
    "answer": "Si tus gastos superan tus ingresos, prioriza alimentación, transporte y compromisos esenciales. Revisa gastos flexibles y evita comprometer nuevos ahorros hasta equilibrar el presupuesto. Puedo ayudarte a revisar categorías."
  },
  {
    "id": "emergencias",
    "examples": [
      "que es un fondo de emergencia",
      "cuanto guardar para imprevistos",
      "ahorro para una emergencia",
      "que hago ante un gasto inesperado"
    ],
    "answer": "Un fondo de emergencia sirve para gastos inesperados. Empieza con un monto alcanzable y mantenlo separado de las metas de compras. Su tamaño depende de tus gastos esenciales y de la estabilidad de tus ingresos."
  },
  {
    "id": "deudas",
    "examples": [
      "como salir de deudas",
      "tengo una deuda",
      "como pagar un prestamo",
      "debo dinero"
    ],
    "answer": "Anota todas tus deudas, tasas, fechas y pagos mínimos. Prioriza compromisos urgentes y evita endeudarte para cubrir gastos frecuentes. Si hay intereses altos o no puedes pagar, busca orientación profesional o institucional."
  },
  {
    "id": "matricula",
    "examples": [
      "como pagar la matricula",
      "ahorrar para semestre",
      "presupuesto para universidad",
      "gastos de la matricula"
    ],
    "answer": "Averigua el valor y la fecha exacta de la matrícula. Divide el faltante entre los meses disponibles y verifica si ese ahorro mensual cabe en tu presupuesto. Pregunta también por apoyos y calendarios de tu institución."
  },
  {
    "id": "transporte",
    "examples": [
      "gasto mucho en transporte",
      "como ahorrar en pasajes",
      "presupuesto de transporte",
      "cuanto destinar a transporte"
    ],
    "answer": "Calcula pasaje de ida y vuelta por los días de clase. Compara rutas seguras, descuentos estudiantiles y horarios. Registra Transporte como categoría para conocer su peso en el mes."
  },
  {
    "id": "alimentacion",
    "examples": [
      "gasto mucho en comida",
      "como ahorrar en alimentacion",
      "presupuesto de comida",
      "comer barato en la universidad"
    ],
    "answer": "Planifica comidas y compras según tus horarios, compara opciones y evita saltarte comidas por ahorrar. Registra Alimentación para detectar gastos repetidos sin descuidar tu salud."
  },
  {
    "id": "trabajo_estudio",
    "examples": [
      "como administrar mi salario",
      "trabajo y estudio",
      "ingresos como estudiante trabajador",
      "tengo un empleo de medio tiempo"
    ],
    "answer": "Si estudias y trabajas, calcula el ingreso neto real, registra gastos de transporte y materiales, y deja un margen para semanas de exámenes o cambios de horario. Tu tiempo de descanso también importa."
  },
  {
    "id": "datos_privados",
    "examples": [
      "mis datos son privados",
      "guardas mis datos",
      "otros pueden ver mis movimientos",
      "donde se almacena mi informacion"
    ],
    "answer": "Tus movimientos y metas se guardan en el almacenamiento local de este navegador. No hay inicio de sesión ni sincronización; otra persona que use el mismo perfil del navegador podría verlos. Puedes exportar o borrar los datos desde el pie de página."
  },
  {
    "id": "exportar",
    "examples": [
      "como exportar mis datos",
      "puedo guardar una copia",
      "hacer respaldo finuni",
      "descargar mis movimientos"
    ],
    "answer": "En la parte inferior encontrarás «Exportar mis datos JSON». Conserva esa copia en un lugar privado; contiene información financiera. Para recuperarla utiliza «Importar datos JSON»."
  },
  {
    "id": "presion_social",
    "examples": [
      "mis amigos gastan mucho",
      "me da pena no tener dinero",
      "compararme con otros estudiantes",
      "todos compran cosas menos yo"
    ],
    "answer": "No tienes que gastar al ritmo de otras personas. Puedes decidir límites acordes con tus posibilidades sin dar explicaciones sobre tus finanzas. Tus metas y bienestar son más importantes que las comparaciones."
  },
  {
    "id": "emociones",
    "examples": [
      "me siento preocupado por el dinero",
      "estoy frustrado con mis gastos",
      "me desmotiva no ahorrar",
      "estoy enojado por mis finanzas"
    ],
    "answer": "Entiendo que organizar el dinero puede generar estrés. Vamos por partes: identifiquemos el gasto que más te preocupa, lo que necesitas cubrir primero y una acción pequeña que sí puedas controlar."
  },
  {
    "id": "sarcasmo",
    "examples": [
      "que maravilla otra vez sin dinero",
      "genial me quede sin plata",
      "fantastico otra vez estoy quebrado",
      "excelente perdi todo mi presupuesto"
    ],
    "answer": "Suena frustrante quedarte sin dinero antes de fin de mes. No voy a tomar ese «qué maravilla» literalmente. Si quieres, revisemos juntos qué gasto apareció y cómo evitar que se repita."
  },
  {
    "id": "limitaciones",
    "examples": [
      "puedes enviar whatsapp",
      "puedes conectarte a mi calendario",
      "puedes entrar a mi banco",
      "puedes hacer transferencias"
    ],
    "answer": "No puedo entrar a tus cuentas, enviar WhatsApp, conectarme al calendario ni hacer transacciones. Esta versión ofrece orientación y cálculos con los datos que tú registras en el navegador."
  },
  {
    "id": "cortex",
    "examples": [
      "que es proyecto cortex",
      "que fases tiene cortex",
      "que es la memoria de trabajo",
      "como razona finuni"
    ],
    "answer": "CORTEX definió 6 fases en 18 semanas: perfil, percepción y atención, memoria, lenguaje, razonamiento y ética, motivación y empatía, e integración. Esta demo implementa reglas de atención, una ventana de conversación breve, clasificación de intenciones, cálculos verificables y respuestas empáticas; no constituye una IA entrenada."
  }
];
