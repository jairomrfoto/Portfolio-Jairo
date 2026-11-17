/* =========================================================
   CONTENIDO DE LA WEB
   Edita este archivo para cambiar textos, proyectos y fotos.
   No hace falta tocar index.html ni los estilos.
   ========================================================= */

const CONTENIDO = {
  nombre: "Jairo",                       // ← tu nombre completo
  // Foto principal (portada): sube tu foto como assets/foto-portada.jpg o cambia la ruta
  fotoPortada: "assets/retrato.webp",
  // Tu frase de presentación
  frase: "Comercio internacional, marketing y fotografía. Acostumbrado a liderar equipos y a trabajar en otros idiomas.",
  disciplinas: ["Comercio internacional", "Marketing y publicidad", "Fotografía", "Liderazgo de equipos"],

  // Vídeo de presentación (opcional): súbelo a YouTube como "oculto" y pega aquí su ID
  // (lo que va después de "v=" en la URL). Si lo dejas vacío, la sección no aparece.
  youtubeId: "",

  email: "tu@email.com",
  linkedin: "https://www.linkedin.com/in/tu-perfil",
  instagram: "https://www.instagram.com/jairomrfoto",
  cv: "assets/cv.pdf",                   // ← sube tu CV en PDF con este nombre

  // ---------- Experiencia previa ----------
  // Trabajos, prácticas, proyectos de clase o encargos. La imagen es opcional:
  // si no tienes, borra la línea "imagen".
  experiencia: [
    {
      puesto: "Entrenador de fútbol",
      lugar: "Club o clubes donde has entrenado",        // ← pon el nombre
      fechas: "20XX – 2026",                            // ← ajusta las fechas
      descripcion:
        "Entrenador de equipos de todas las edades, desde niños de 5 años hasta categoría senior en Tercera División.",
      logros: [
        "Dirección de grupos muy distintos: de la iniciación infantil al fútbol semiprofesional",
        "Planificación de entrenamientos, gestión de la plantilla y preparación de partidos",
        "Comunicación con jugadores, familias y cuerpo técnico",
      ],
    },
    {
      puesto: "Trabajo de verano en Estados Unidos",    // ← pon el puesto concreto
      lugar: "Empresa o lugar, ciudad (EE. UU.)",       // ← pon dónde fue
      fechas: "Veranos 20XX y 20XX",                    // ← ajusta los años
      descripcion: "Dos temporadas trabajando en Estados Unidos en un entorno 100 % en inglés.",
      logros: [
        "Qué hacías allí (tareas concretas)",           // ← completa
        "Adaptación a otra cultura y forma de trabajar",
      ],
    },
  ],

  // ---------- Fotografía ----------
  // Añade tus fotos a assets/fotos/ (mejor en .webp o .jpg de unos 1600 px de lado)
  fotos: [
    { src: "assets/fotos/foto-01.webp", pie: "Título o lugar de la foto" },
    { src: "assets/fotos/foto-02.webp", pie: "Título o lugar de la foto" },
    { src: "assets/fotos/foto-03.webp", pie: "Título o lugar de la foto" },
    { src: "assets/fotos/foto-04.webp", pie: "Título o lugar de la foto" },
    { src: "assets/fotos/foto-05.webp", pie: "Título o lugar de la foto" },
    { src: "assets/fotos/foto-06.webp", pie: "Título o lugar de la foto" },
    { src: "assets/fotos/foto-07.webp", pie: "Título o lugar de la foto" },
    { src: "assets/fotos/foto-08.webp", pie: "Título o lugar de la foto" },
  ],

  // ---------- Sobre mí ----------
  sobreMi:
    "Me he formado en tres áreas que se complementan: la fotografía y el diseño me dan el ojo visual, " +
    "el marketing y la publicidad me enseñaron a comunicar una marca, y el comercio internacional, " +
    "que estoy terminando, me prepara para llevarla fuera. Fuera de las aulas, años como entrenador " +
    "de fútbol me han enseñado a liderar grupos, y dos veranos trabajando en Estados Unidos, a " +
    "desenvolverme en otro idioma y otra cultura.",
  formacion: [
    { anio: "2026", titulo: "Comercio Internacional", centro: "Centro de estudios" },          // ← centro
    { anio: "20XX", titulo: "Marketing y Publicidad", centro: "Centro de estudios" },          // ← año y centro
    { anio: "20XX", titulo: "Fotografía (Artes Plásticas y Diseño)", centro: "Centro de estudios" },
  ],
  idiomas: ["Español: nativo", "Inglés: nivel avanzado", "Francés: nivel intermedio"],
  herramientas: ["Adobe Lightroom", "Photoshop", "Illustrator", "Meta Ads", "Canva", "Excel"],
};
