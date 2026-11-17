# Portfolio de Jairo

Web personal y currículum: fotografía, marketing, publicidad y comercio internacional.
Publicada con GitHub Pages en https://jairomrfoto.github.io/Portfolio-Jairo/

## Cómo editarla
Todo el contenido está en **`contenido.js`**. Lo marcado con `←` está pendiente de completar.

- **Tu foto de portada:** súbela a `assets/` y cambia `fotoPortada`.
- **Proyectos (sección Trabajo):** añade o edita entradas en `trabajos`. Cada proyecto tiene título, disciplina (Fotografía, Marketing o Publicidad), año, resumen y sus imágenes. Los filtros se crean solos.
- **Fotos:** súbelas a `assets/fotos/` (mejor `.webp` o `.jpg` de unos 1600 px de lado).
- **Trayectoria:** experiencia y formación en `trayectoria`.
- **Capacidades:** en `capacidades`, cada una enlazada a los puntos de la trayectoria donde la aprendiste (`donde`).
- **CV:** el PDF está en `assets/cv-jairo-martinez.pdf`. Para cambiarlo, sustituye ese archivo.
- **Vídeo:** súbelo a YouTube como "oculto" y pega su ID en `youtubeId`.

## Técnica
HTML, CSS y JavaScript sin dependencias ni proceso de compilación. Tipografía Bricolage Grotesque
(licencia OFL) alojada en `assets/fuentes/`. Las animaciones se desactivan si el sistema pide reducir movimiento.

## Dominio propio
1. En tu proveedor de dominio añade 4 registros **A** para `@`: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
2. Añade un **CNAME** para `www` → `jairomrfoto.github.io`
3. En GitHub → Settings → Pages → Custom domain, escribe tu dominio y activa *Enforce HTTPS*.
