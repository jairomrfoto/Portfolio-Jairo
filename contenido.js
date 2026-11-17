/* =========================================================
   CONTENIDO DE LA WEB
   Todo lo que se ve en la web sale de aquí. Cambia los textos
   entre comillas y guarda: no hace falta tocar nada más.
   Lo marcado con ← está pendiente de completar.
   ========================================================= */

const CONTENIDO = {
  nombre: "Jairo",                                  // ← nombre completo si quieres
  fotoPortada: "assets/retrato.webp",               // ← tu foto (vertical, ~1200×1500 px)

  // Frase corta bajo el nombre
  frase: "Fotografía, marketing y comercio internacional. Acostumbrado a liderar equipos y a trabajar en otros idiomas.",

  email: "tu@email.com",                            // ← tu email
  linkedin: "",                                     // ← URL de tu LinkedIn (vacío = no se muestra)
  instagram: "https://www.instagram.com/jairomrfoto",
  cv: "",                                           // ← "assets/cv.pdf" cuando subas el PDF (vacío = botón oculto)
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
  // imagenes: fotos que se ven al abrir el proyecto (la primera es la portada)
  trabajos: [
    {
      titulo: "Real Racing Club de Santander",
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
      titulo: "Proyecto de marketing",                           // ← nombre real
      disciplina: "Marketing",
      anio: "20XX",
      resumen: "Qué era el proyecto, qué hiciste y qué salió.",   // ← completa
      imagenes: [{ src: "assets/proyectos/proyecto-1.webp", pie: "Pie de imagen" }],
    },
    {
      titulo: "Proyecto de publicidad",                          // ← nombre real
      disciplina: "Publicidad",
      anio: "20XX",
      resumen: "Qué era el proyecto, qué hiciste y qué salió.",   // ← completa
      imagenes: [{ src: "assets/proyectos/proyecto-2.webp", pie: "Pie de imagen" }],
    },
    {
      titulo: "Serie fotográfica",                               // ← nombre real
      disciplina: "Fotografía",
      anio: "20XX",
      resumen: "Describe la serie: tema, lugar, intención.",      // ← completa
      imagenes: [
        { src: "assets/fotos/foto-05.webp", pie: "Pie de foto" },
        { src: "assets/fotos/foto-06.webp", pie: "Pie de foto" },
        { src: "assets/fotos/foto-07.webp", pie: "Pie de foto" },
      ],
    },
    {
      titulo: "Proyecto de branding",                            // ← nombre real
      disciplina: "Marketing",
      anio: "20XX",
      resumen: "Qué era el proyecto, qué hiciste y qué salió.",   // ← completa
      imagenes: [{ src: "assets/proyectos/proyecto-3.webp", pie: "Pie de imagen" }],
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
    { id: "racing", tipo: "experiencia", fechas: "2024",
      titulo: "Prácticas en el Real Racing Club de Santander", lugar: "Santander",
      texto: "Prácticas en el club, donde realicé sesiones de fotografía de moda con sus prendas.",
      puntos: ["Fotografía de moda para el club en exteriores e interiores"] },
    { id: "eeuu", tipo: "experiencia", fechas: "Veranos 20XX y 20XX", // ← años
      titulo: "Trabajo de verano en Estados Unidos", lugar: "Empresa o lugar, ciudad",  // ← completa
      texto: "Dos temporadas trabajando en Estados Unidos en un entorno 100 % en inglés." },
    { id: "marketing", tipo: "formacion", fechas: "20XX", titulo: "Marketing y Publicidad",
      lugar: "Centro de estudios" },                             // ← año y centro
    { id: "foto", tipo: "formacion", fechas: "20XX", titulo: "Fotografía (Artes Plásticas y Diseño)",
      lugar: "Centro de estudios" },                             // ← año y centro
  ],

  // ---------- Capacidades ----------
  // "donde": ids de la trayectoria donde aprendiste o usaste cada capacidad
  capacidades: [
    { nombre: "Fotografía", donde: ["foto", "racing"] },
    { nombre: "Diseño y composición visual", donde: ["foto"] },
    { nombre: "Marketing", donde: ["marketing"] },
    { nombre: "Publicidad", donde: ["marketing"] },
    { nombre: "Comercio internacional", donde: ["comercio"] },
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
