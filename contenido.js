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
  frase: "Estudiante de comercio internacional con formación en marketing, publicidad y fotografía.",
  disciplinas: ["Comercio internacional", "Marketing y branding", "Fotografía"],

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
      puesto: "Puesto o proyecto",
      lugar: "Empresa, cliente o centro de estudios",
      fechas: "2025 – 2026",
      descripcion: "Qué hacías allí, en una o dos frases.",
      logros: [
        "Una tarea o logro concreto",
        "Otra tarea o logro concreto",
      ],
      imagen: "assets/proyectos/proyecto-1.webp",
    },
    {
      puesto: "Puesto o proyecto",
      lugar: "Empresa, cliente o centro de estudios",
      fechas: "2024",
      descripcion: "Qué hacías allí, en una o dos frases.",
      logros: ["Una tarea o logro concreto", "Otra tarea o logro concreto"],
      imagen: "assets/proyectos/proyecto-2.webp",
    },
    {
      puesto: "Puesto o proyecto",
      lugar: "Empresa, cliente o centro de estudios",
      fechas: "2023",
      descripcion: "Qué hacías allí, en una o dos frases.",
      logros: ["Una tarea o logro concreto"],
      imagen: "assets/proyectos/proyecto-3.webp",
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
    "Escribe aquí dos o tres frases sobre ti: qué te mueve, qué tipo de empresa buscas " +
    "y qué aportas que otros perfiles no.",
  formacion: [
    { anio: "2026", titulo: "Comercio Internacional", centro: "Centro de estudios" },
    { anio: "20XX", titulo: "Marketing y Publicidad", centro: "Centro de estudios" },
    { anio: "20XX", titulo: "Fotografía", centro: "Centro de estudios" },
  ],
  idiomas: ["Español: nativo", "Inglés: nivel", "Otro idioma: nivel"],
  herramientas: ["Adobe Lightroom", "Photoshop", "Illustrator", "Meta Ads", "Canva", "Excel"],
};
