/* =========================================================
   CONTENIDO DE LA WEB
   Todo lo que se ve en la web sale de aquí. Cambia los textos
   entre comillas y guarda: no hace falta tocar nada más.
   Lo marcado con ← está pendiente de completar.
   ========================================================= */

const CONTENIDO = {
  nombre: "Jairo",
  nombreCompleto: "Jairo Martínez",
  fotoPortada: "assets/jairo-portada.webp",         // foto recortada, sin fondo (PNG/WebP con transparencia)

  // Frase corta bajo el nombre
  frase: "Fotografía, marketing y comercio internacional. Acostumbrado a liderar equipos y a trabajar en otros idiomas.",

  email: "jairomrfoto@gmail.com",
  linkedin: "",                                     // ← URL de tu LinkedIn (vacío = no se muestra)
  instagram: "https://www.instagram.com/jairomrfoto",
  cv: "assets/cv-jairo-martinez.pdf",             // CV en PDF (vacío = botones ocultos)
  youtubeId: "",                                    // ← ID del vídeo de presentación en YouTube (opcional)

  // ---------- Sobre mí: los tres pilares ----------
  pilares: [
    { verbo: "Mirar", area: "Fotografía y Artes Plásticas y Diseño",
      texto: "La fotografía y el diseño me dieron el ojo: encuadre, luz y composición." },
    { verbo: "Comunicar", area: "Marketing y Publicidad",
      texto: "El marketing y la publicidad me enseñaron a convertir una idea en un mensaje y una marca." },
    { verbo: "Llevar fuera", area: "Comercio Internacional",
      texto: "El comercio internacional, que estoy terminando, me prepara para llevar ese mensaje a otros mercados." },
  ],
  sobreMi:
    "Fuera de las aulas, años como entrenador de fútbol me han enseñado a liderar grupos, " +
    "y dos veranos trabajando en Estados Unidos, a desenvolverme en otro idioma y otra cultura.",

  // ---------- Trabajo (portfolio) ----------
  // disciplina: "Fotografía", "Marketing" o "Publicidad"
  // Opcional: rol, enlace { texto, url }, secciones [{ titulo, texto }]. Las imágenes pueden ser .mp4 (con poster).
  // imagenes: fotos que se ven al abrir el proyecto (la primera es la portada)
  trabajos: [
    {
      titulo: "Real Racing Club de Santander",
      pantalla: "assets/pantallas/racing.webp",   // imagen 16:10 para la pantalla del portátil
      disciplina: "Fotografía",
      anio: "2024",
      resumen:
        "Sesión de fotografía de moda para el Real Racing Club de Santander, realizada durante mis prácticas en el club. " +
        "Prendas del club fotografiadas en exteriores de la costa cántabra y en interior.",
      imagenes: [
        { src: "assets/fotos/moda-racing-01.webp", pie: "Camisetas del Racing entre los pinos, junto al mar" },
        { src: "assets/fotos/moda-racing-04.webp", pie: "Camiseta del Racing en interior" },
        { src: "assets/fotos/moda-racing-02.webp", pie: "Polo negro del Racing" },
        { src: "assets/fotos/moda-racing-03.webp", pie: "Polo blanco y verde del Racing" },
      ],
    },
    {
      titulo: "Gobierno de Cantabria",
      pantalla: "assets/pantallas/gobierno.webp",   // imagen 16:10 para la pantalla del portátil
      disciplina: "Fotografía",
      anio: "2023",
      resumen:
        "Fotografía institucional durante mis prácticas en el Gobierno de Cantabria: " +
        "actos públicos, firmas, atención a medios y una inauguración de exposición.",
      imagenes: [
        { src: "assets/fotos/gob-01.webp", pie: "Intervención en un acto de la Asociación Cántabra de la Empresa Familiar (ACEFAM)" },
        { src: "assets/fotos/gob-02.webp", pie: "Declaraciones a los medios" },
        { src: "assets/fotos/gob-03.webp", pie: "Firma en la sede del Gobierno de Cantabria" },
        { src: "assets/fotos/gob-04.webp", pie: "Asistentes antes del inicio de un acto" },
        { src: "assets/fotos/gob-05.webp", pie: "Inauguración de la exposición homenaje «Año Orallo 2023»" },
      ],
    },
    {
      titulo: "Xsoccer",
      pantalla: "assets/pantallas/xsoccer.webp",   // imagen 16:10 para la pantalla del portátil
      disciplina: "Marketing",
      anio: "2023 – 2025",
      resumen: "Marca de espinilleras de fútbol personalizadas creada desde cero, de la importación de la materia prima a la venta online.",
      rol: "Cofundador: naming, diseño gráfico, marca, tienda online y redes sociales.",   // ← revisa
      enlace: { texto: "Ver xsoccer.es", url: "https://xsoccer.es" },
      secciones: [
        { titulo: "El proyecto",
          texto: "Creamos una marca de espinilleras personalizadas para futbolistas. Importamos la materia prima desde China e incorporamos la maquinaria necesaria para producir cada pedido nosotros mismos. Yo me encargué del diseño gráfico de cada espinillera a partir de las fotos de los clientes." },
        { titulo: "Naming y producto",
          texto: "Elegimos el nombre Xsoccer y construimos un sistema alrededor de la X: Espinillera X, Mini X, XTape, XSocks y el KIT XSC. Así la marca se reconoce en todo el catálogo y es fácil ampliarlo. También creamos una línea para equipos y clubes." },
        { titulo: "Venta y comunidad",
          texto: "Tienda online propia en xsoccer.es, con personalización subiendo tus fotos, entrega en 2 o 3 días laborables y atención por WhatsApp Business. Abrimos Instagram y TikTok (@xsoccer.es) para enseñar los diseños de los clientes y generar comunidad." },
      ],
      imagenes: [
        { src: "assets/proyectos/xsoccer/proceso.webp", pie: "Proceso de trabajo y sistema de naming" },
      ],
    },
    {
      titulo: "Komix",
      pantalla: "assets/pantallas/komix.webp",   // imagen 16:10 para la pantalla del portátil
      disciplina: "Marketing",
      anio: "2026",
      resumen: "Plataforma de juegos para jugar en grupo, cara a cara: la tele hace de tablero y cada móvil, de mando.",
      rol: "Proyecto propio: idea, naming, identidad, estrategia y lanzamiento. Desarrollo apoyado en herramientas de IA.", // ← revisa
      enlace: { texto: "Ver la web", url: "https://play-it-jbvx.onrender.com" },
      secciones: [
        { titulo: "El reto",
          texto: "Crear juegos de fiesta que se jueguen mirando a las personas y no a la pantalla. Sin descargar nada ni registrarse: se crea una sala, se escanea un QR y a jugar. Ocho juegos y dos modos: Amigos y Bar, donde cada mesa es un equipo." },
        { titulo: "Naming",
          texto: "El prototipo se llamaba PLAYIT, un nombre genérico y sin nada propio que registrar. Exploré alternativas y fui descartándolas: Zasca ya tenía un competidor, Vicio estaba saturado, Dimoni chocaba con marcas de hostelería y Diábolo, con Diablo. El nombre final es Komix, acompañado de una mascota propia: un diablillo travieso." },
        { titulo: "Identidad",
          texto: "Fondo blanco, rojo y negro, con estética de cómic. Diseñé el vídeo de la portada y ocho tráilers, uno por juego, con escenas de cómic que se entienden sin sonido." },
        { titulo: "Problemas y soluciones",
          texto: "La competencia es fuerte: packs de apps con millones de descargas. La diferencia está en jugar sin instalar nada y cara a cara, y en el modo Bar, que abre un canal de venta a locales. La viabilidad salió ajustada, así que la decisión fue validar con bares antes de invertir en publicidad y comprobar dominio y registro de marca antes del lanzamiento." },
      ],
      imagenes: [
        { src: "assets/proyectos/komix/landing.webp", pie: "Portada de la web" },
        { src: "assets/proyectos/komix/naming.webp", pie: "Del nombre provisional a Komix: exploración, descartes y decisión" },
        { src: "assets/proyectos/komix/video.mp4", poster: "assets/proyectos/komix/video-poster.webp", pie: "Vídeo de la portada" },
        { src: "assets/proyectos/komix/movil.webp", pie: "Versión móvil" },
        { src: "assets/proyectos/komix/impostor.webp", pie: "Tráiler del juego El impostor" },
      ],
    },
    {
      titulo: "Fauniverse",
      pantalla: "assets/pantallas/fauniverse.webp",   // imagen 16:10 para la pantalla del portátil
      disciplina: "Marketing",
      anio: "2026",
      resumen: "App para zoos y parques naturales: busca cada especie en el mapa, hazle una foto y desbloquea su ficha.",
      rol: "Proyecto propio: idea, naming, identidad y estrategia comercial. Desarrollo apoyado en herramientas de IA.", // ← revisa
      enlace: { texto: "Ver fauniverse.com", url: "https://fauniverse.com" },
      secciones: [
        { titulo: "El reto",
          texto: "Convertir la visita al zoo o al parque natural en una colección. El visitante fotografía a los animales, la inteligencia artificial identifica la especie y se desbloquea su ficha con nombre, nombre científico y curiosidades. Pensada para venderse a zoos y parques." },
        { titulo: "Naming e identidad",
          texto: "Nació como Wildex, una Pokédex con estética de cuaderno de naturalista: oscura, científica y con tipografía serif. Evolucionó a Fauniverse, un nombre propio con dominio .com y correo de marca. El logo es una huella dentro de un visor de cámara, con un verde luminoso y un tono pensado para familias." },
        { titulo: "Problemas y soluciones",
          texto: "Enseñar el producto a un parque sin cámara ni conexión: lo resolví con un modo demo con perfil, especies de ejemplo y captura simulada. Evitar que se acepte cualquier foto: la app comprueba que hay un animal o una planta identificable y avisa si no está segura. Cada parque es distinto: el mapa y las zonas se configuran por parque. Y para que los correos a los clientes no acabaran en spam, configuré la autenticación del dominio." },
      ],
      imagenes: [
        { src: "assets/proyectos/fauniverse/landing.webp", pie: "Portada de fauniverse.com" },
        { src: "assets/proyectos/fauniverse/marca.webp", pie: "Evolución de marca: de Wildex a Fauniverse" },
        { src: "assets/proyectos/fauniverse/app.webp", pie: "Mapa del parque con especies por descubrir" },
      ],
    },
    {
      titulo: "Kamplay",
      pantalla: "assets/pantallas/kamplay.webp",   // imagen 16:10 para la pantalla del portátil
      disciplina: "Marketing",
      anio: "2026",
      resumen: "Software para campamentos y campus de verano: coordinación, monitores, familias y profesores en una sola app.",
      rol: "Proyecto propio: idea, marca, producto y modelo de negocio. Desarrollo apoyado en herramientas de IA.", // ← revisa
      secciones: [
        { titulo: "El reto",
          texto: "Los campamentos se gestionan con papeles, hojas de cálculo y grupos de WhatsApp. Kamplay lo reúne todo: participantes, área médica, actividades, menú, incidencias y comunicación con las familias." },
        { titulo: "Marca",
          texto: "Un nombre corto que une campamento y juego, una mascota guía, Kiko, que acompaña a cada perfil dentro de la app, y una paleta naranja y verde que habla de energía y naturaleza. El mensaje: «Gestiona tu campamento de verano sin caos»." },
        { titulo: "Problemas y soluciones",
          texto: "El primer prototipo no guardaba nada al recargar y cualquiera podía entrar en cualquier panel. Pasé a una base de datos real, con acceso por perfil y reglas de seguridad. Para poder enseñarlo a campamentos, añadí un modo demo con un campamento de ejemplo. Y definí el modelo de negocio: precio por evento, desde 9 €, sin permanencia." },
      ],
      imagenes: [
        { src: "assets/proyectos/kamplay/landing.webp", pie: "Portada de Kamplay" },
        { src: "assets/proyectos/kamplay/marca.webp", pie: "Marca, mascota y problemas resueltos" },
        { src: "assets/proyectos/kamplay/panel.webp", pie: "Panel de coordinación en modo demo" },
      ],
    },
    {
      titulo: "Jota Power",
      pantalla: "assets/pantallas/jotapower.webp",   // imagen 16:10 para la pantalla del portátil
      disciplina: "Marketing",
      anio: "",                                                  // ← año del TFG
      resumen: "Trabajo de Fin de Grado de Marketing y Publicidad: plan de marketing completo para lanzar una marca personal de creador de contenido.",
      rol: "Trabajo de Fin de Grado. Análisis, estrategia, identidad, campaña y viabilidad.",
      secciones: [
        { titulo: "El reto",
          texto: "Diseñar desde cero una marca personal para YouTube, TikTok e Instagram basada en el humor, la autenticidad y la superación, y demostrar que puede sostenerse como proyecto." },
        { titulo: "Análisis",
          texto: "Análisis PESTEL, sociodemográfico, socioeconómico y sociocultural, estudio de la competencia y DAFO, para definir el público (16 a 30 años, España y países de habla hispana) y el posicionamiento." },
        { titulo: "Naming e identidad",
          texto: "Puntué cinco nombres según cuatro criterios: fácil de recordar, diferenciación, conexión con el público y transmisión de valores. Jota Power ganó con 35 de 40. Diseñé el logotipo, el isotipo «JP», la paleta roja y amarilla y el manual de identidad." },
        { titulo: "Campaña y viabilidad",
          texto: "Campaña de lanzamiento con un documental para YouTube, «Una pieza más», piezas para redes, publicidad pagada en Instagram y TikTok y una propuesta de evento con creadores de Cantabria. Cierra con el estudio de viabilidad económica y las acciones de relaciones públicas." },
      ],
      imagenes: [
        { src: "assets/proyectos/jotapower/portada.webp", pie: "Portada del proyecto con el logotipo Jota Power" },
        { src: "assets/proyectos/jotapower/naming.webp", pie: "Matriz de naming e identidad" },
        { src: "assets/proyectos/jotapower/creator-fest.webp", pie: "Cartel de la propuesta de evento Cantabria Creator Fest" },
      ],
    },
  ],

  // ---------- Trayectoria ----------
  // tipo: "experiencia" o "formacion". id: palabra corta para enlazarla con las capacidades.
  trayectoria: [
    { id: "comercio", tipo: "formacion", fechas: "2026", titulo: "Comercio Internacional",
      lugar: "Centro de estudios",                               // ← centro
      texto: "Formación que estoy terminando." },
    { id: "futbol", tipo: "experiencia", fechas: "20XX – 2026",  // ← fechas
      titulo: "Entrenador de fútbol", lugar: "Club o clubes",     // ← club
      texto: "Equipos de todas las edades, desde niños de 5 años hasta categoría senior en Tercera División.",
      puntos: [
        "Dirección de grupos muy distintos: de la iniciación infantil al fútbol semiprofesional",
        "Planificación de entrenamientos, gestión de la plantilla y preparación de partidos",
        "Comunicación con jugadores, familias y cuerpo técnico",
      ] },
    { id: "xsoccer", tipo: "experiencia", fechas: "2023 – 2025",
      titulo: "Cofundador de Xsoccer", lugar: "Revilla de Camargo, Cantabria",
      texto: "Marca de espinilleras de fútbol personalizadas con producción propia y venta online.",
      puntos: [
        "Importación de materia prima desde China y producción con maquinaria propia",
        "Naming, identidad y diseño gráfico de cada pedido",
        "Tienda online, Instagram, TikTok y atención al cliente por WhatsApp Business",
      ] },
    { id: "proyectos", tipo: "experiencia", fechas: "2026",
      titulo: "Proyectos propios de producto y marca", lugar: "Komix, Fauniverse y Kamplay",
      texto: "Lanzamiento de productos digitales propios: idea, naming, identidad visual, estrategia y desarrollo apoyado en herramientas de IA.",
      puntos: ["Naming e identidad de marca con mascota y sistema visual propios", "Webs publicadas, vídeos y piezas de comunicación", "Análisis de competencia y viabilidad antes de invertir"] },
    { id: "racing", tipo: "experiencia", fechas: "2024",
      titulo: "Prácticas en el Real Racing Club de Santander", lugar: "Santander",
      texto: "Prácticas en el club, donde realicé sesiones de fotografía de moda con sus prendas.",
      puntos: ["Fotografía de moda para el club en exteriores e interiores"] },
    { id: "gobierno", tipo: "experiencia", fechas: "2023",
      titulo: "Prácticas en el Gobierno de Cantabria", lugar: "Santander",
      texto: "Prácticas en las que cubrí con fotografía actos institucionales, firmas y atención a medios.",
      puntos: ["Fotografía de actos oficiales, eventos y comparecencias ante la prensa"] },
    { id: "eeuu", tipo: "experiencia", fechas: "Veranos 20XX y 20XX", // ← años
      titulo: "Trabajo de verano en Estados Unidos", lugar: "Empresa o lugar, ciudad",  // ← completa
      texto: "Dos temporadas trabajando en Estados Unidos en un entorno 100 % en inglés." },
    { id: "marketing", tipo: "formacion", fechas: "20XX", titulo: "Marketing y Publicidad",
      lugar: "Centro de estudios",
      texto: "Trabajo de Fin de Grado: plan de marketing completo para la marca personal Jota Power." },                             // ← año y centro
    { id: "foto", tipo: "formacion", fechas: "20XX", titulo: "Fotografía (Artes Plásticas y Diseño)",
      lugar: "Centro de estudios" },                             // ← año y centro
  ],

  // ---------- Capacidades ----------
  // "donde": ids de la trayectoria donde aprendiste o usaste cada capacidad
  capacidades: [
    { nombre: "Fotografía", donde: ["foto", "racing", "gobierno"] },
    { nombre: "Diseño y composición visual", donde: ["foto", "xsoccer"] },
    { nombre: "Marketing", donde: ["marketing", "proyectos", "xsoccer"] },
    { nombre: "Branding y naming", donde: ["proyectos", "marketing"] },
    { nombre: "Publicidad", donde: ["marketing"] },
    { nombre: "Comercio internacional", donde: ["comercio", "xsoccer"] },
    { nombre: "Liderazgo de equipos", donde: ["futbol"] },
    { nombre: "Comunicación", donde: ["futbol", "marketing"] },
    { nombre: "Entornos internacionales", donde: ["eeuu", "comercio"] },
  ],
  // Idiomas, con tus palabras
  idiomas: [
    { idioma: "Español", nivel: "Nativo" },
    { idioma: "Inglés", nivel: "Con soltura" },
    { idioma: "Francés", nivel: "Me desenvuelvo bien" },
  ],
  // Herramientas que usas de verdad (vacío = no se muestra)
  herramientas: [],                                 // ← p. ej. ["Lightroom", "Photoshop"]
};
