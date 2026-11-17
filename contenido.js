/* =========================================================
   CONTENIDO DE LA WEB
   Edita este archivo para cambiar textos, proyectos y fotos.
   No hace falta tocar index.html ni los estilos.
   ========================================================= */

const CONTENIDO = {
  nombre: "Jairo",                       // ← tu nombre completo
  titular: "Llevo marcas a nuevos mercados y me encargo de que se vean bien al llegar.",
  intro:
    "Comercio internacional, marketing y fotografía. Entiendo cómo se vende fuera, " +
    "sé construir una marca para ese mercado y produzco el contenido visual yo mismo.",
  disciplinas: ["Comercio internacional", "Marketing y branding", "Fotografía"],

  // Vídeo de presentación: sube el vídeo a YouTube como "oculto" y pega aquí su ID
  // (lo que va después de "v=" en la URL). Déjalo vacío para mostrar un aviso.
  youtubeId: "",

  email: "tu@email.com",
  linkedin: "https://www.linkedin.com/in/tu-perfil",
  instagram: "https://www.instagram.com/jairomrfoto",
  cv: "assets/cv.pdf",                   // ← sube tu CV en PDF con este nombre

  // ---------- Proyectos de marketing y branding ----------
  proyectos: [
    {
      titulo: "Nombre del proyecto 1",
      tipo: "Branding · Lanzamiento internacional",
      imagen: "assets/proyectos/proyecto-1.webp",
      reto: "Qué problema tenía la marca o el cliente. Una o dos frases.",
      hice: "Qué hiciste tú: estrategia, identidad visual, fotografía, plan de mercado…",
      resultado: "Qué se consiguió. Si hay un dato (ventas, alcance, nota), ponlo aquí.",
    },
    {
      titulo: "Nombre del proyecto 2",
      tipo: "Identidad visual · Redes sociales",
      imagen: "assets/proyectos/proyecto-2.webp",
      reto: "Qué problema tenía la marca o el cliente.",
      hice: "Qué hiciste tú.",
      resultado: "Qué se consiguió.",
    },
    {
      titulo: "Nombre del proyecto 3",
      tipo: "Plan de exportación · Marketing",
      imagen: "assets/proyectos/proyecto-3.webp",
      reto: "Qué problema tenía la marca o el cliente.",
      hice: "Qué hiciste tú.",
      resultado: "Qué se consiguió.",
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
  retrato: "assets/retrato.webp",
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
