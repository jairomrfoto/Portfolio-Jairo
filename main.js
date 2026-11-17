(() => {
  const C = CONTENIDO;
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);
  const el = (tag, cls, txt) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (txt != null) n.textContent = txt;
    return n;
  };

  // Textos básicos
  $$("[data-nombre]").forEach((n) => (n.textContent = C.nombre));
  document.title = `${C.nombre} · ${C.disciplinas.join(", ")}`;
  $("[data-frase]").textContent = C.frase;
  const portada = $("[data-foto-portada]");
  portada.src = C.fotoPortada;
  portada.alt = `Foto de ${C.nombre}`;
  C.disciplinas.forEach((d) => $("[data-disciplinas]").append(el("li", null, d)));
  $("[data-anio]").textContent = new Date().getFullYear();

  // Vídeo (solo si hay ID de YouTube)
  if (C.youtubeId) {
    const f = document.createElement("iframe");
    f.src = `https://www.youtube-nocookie.com/embed/${C.youtubeId}?rel=0`;
    f.title = `Presentación de ${C.nombre}`;
    f.allow = "accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen";
    f.loading = "lazy";
    $("[data-video]").append(f);
    $("[data-seccion-video]").hidden = false;
  }

  // Tira de película con las fotos
  const tira = $("[data-tira]");
  const fotosTira = [...C.fotos, ...C.fotos];
  fotosTira.forEach((f, i) => {
    const marco = el("div", "fotograma");
    const img = el("img");
    img.src = f.src;
    img.alt = "";
    img.loading = "lazy";
    marco.append(img, el("span", "fotograma-num", `${(i % C.fotos.length) + 1}A`));
    tira.append(marco);
  });

  // Experiencia
  const exp = $("[data-experiencia]");
  C.experiencia.forEach((x) => {
    const art = el("article", x.imagen ? "puesto con-imagen" : "puesto");
    const cab = el("div", "puesto-cab");
    cab.append(el("p", "puesto-fechas", x.fechas), el("h3", null, x.puesto), el("p", "puesto-lugar", x.lugar));
    const cuerpo = el("div", "puesto-cuerpo");
    if (x.descripcion) cuerpo.append(el("p", null, x.descripcion));
    if (x.logros && x.logros.length) {
      const ul = el("ul");
      x.logros.forEach((l) => ul.append(el("li", null, l)));
      cuerpo.append(ul);
    }
    art.append(cab, cuerpo);
    if (x.imagen) {
      const img = el("img");
      img.src = x.imagen;
      img.alt = `${x.puesto}, ${x.lugar}`;
      img.loading = "lazy";
      art.append(img);
    }
    exp.append(art);
  });

  // Galería y visor
  const gal = $("[data-galeria]");
  const visor = $("[data-visor]");
  const vImg = $("[data-visor-img]");
  const vPie = $("[data-visor-pie]");
  let actual = 0;
  const mostrar = (i) => {
    actual = (i + C.fotos.length) % C.fotos.length;
    vImg.src = C.fotos[actual].src;
    vImg.alt = C.fotos[actual].pie;
    vPie.textContent = C.fotos[actual].pie;
  };
  C.fotos.forEach((f, i) => {
    const b = el("button", "foto");
    b.setAttribute("aria-label", `Ver en grande: ${f.pie}`);
    const img = el("img");
    img.src = f.src;
    img.alt = f.pie;
    img.loading = "lazy";
    b.append(img);
    b.addEventListener("click", () => {
      mostrar(i);
      visor.showModal();
    });
    gal.append(b);
  });
  $("[data-cerrar]").addEventListener("click", () => visor.close());
  $("[data-ant]").addEventListener("click", () => mostrar(actual - 1));
  $("[data-sig]").addEventListener("click", () => mostrar(actual + 1));
  visor.addEventListener("click", (e) => e.target === visor && visor.close());
  visor.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") mostrar(actual - 1);
    if (e.key === "ArrowRight") mostrar(actual + 1);
  });

  // Sobre mí
  $("[data-sobre]").textContent = C.sobreMi;
  C.formacion.forEach((f) => {
    const li = el("li");
    li.append(el("span", "anio", f.anio), el("strong", null, f.titulo), el("span", "centro", f.centro));
    $("[data-formacion]").append(li);
  });
  C.idiomas.forEach((x) => $("[data-idiomas]").append(el("li", null, x)));
  C.herramientas.forEach((x) => $("[data-herramientas]").append(el("li", null, x)));

  // Contacto
  const em = $("[data-email]");
  em.textContent = C.email;
  em.href = `mailto:${C.email}`;
  $$("[data-cv]").forEach((a) => (a.href = C.cv));
  $("[data-linkedin]").href = C.linkedin;
  $("[data-instagram]").href = C.instagram;
})();
