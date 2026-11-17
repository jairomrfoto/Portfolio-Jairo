/* =========================================================
   Jairo · Portfolio — interacciones
   Sin dependencias. Todo el movimiento se desactiva si el
   sistema pide reducir movimiento.
   ========================================================= */
(() => {
  const C = CONTENIDO;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const el = (tag, cls, txt) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (txt != null) n.textContent = txt;
    return n;
  };
  const reducir = matchMedia("(prefers-reduced-motion: reduce)");
  const ratonFino = matchMedia("(hover: hover) and (pointer: fine)");
  const esEscritorio = matchMedia("(min-width: 900px)");
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  /* ---------- Contenido ---------- */
  $$("[data-nombre]").forEach((n) => (n.textContent = C.nombre));
  $("[data-anio]").textContent = new Date().getFullYear();
  $("[data-frase]").textContent = C.frase;
  const portada = $("[data-foto-portada]");
  portada.src = C.fotoPortada;
  portada.alt = `Retrato de ${C.nombre}`;

  // Nombre grande, letra a letra
  const nombreGrande = $("[data-nombre-grande]");
  nombreGrande.setAttribute("aria-label", C.nombre);
  nombreGrande.textContent = "";
  [...C.nombre].forEach((ch, i) => {
    const l = el("span", "letra");
    l.setAttribute("aria-hidden", "true");
    const s = el("span", null, ch === " " ? " " : ch);
    s.style.setProperty("--i", i);
    l.append(s);
    nombreGrande.append(l);
  });
  $$(".hero-texto > *").forEach((n, i) => n.style.setProperty("--i", i));

  // Pilares
  const pilares = $("[data-pilares]");
  C.pilares.forEach((p) => {
    const li = el("li", "pilar");
    li.append(el("span", "pilar-verbo", p.verbo));
    const d = el("div", "pilar-detalle");
    d.append(el("span", "pilar-area", p.area), el("p", "pilar-texto", p.texto));
    li.append(d);
    pilares.append(li);
  });
  $("[data-sobre]").textContent = C.sobreMi;
  const idiomas = $("[data-idiomas]");
  C.idiomas.forEach((x) => {
    const d = el("div");
    d.append(el("dt", null, x.idioma), el("dd", null, x.nivel));
    idiomas.append(d);
  });

  // Vídeo
  if (C.youtubeId) {
    const f = document.createElement("iframe");
    f.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(C.youtubeId)}?rel=0`;
    f.title = `Presentación de ${C.nombre}`;
    f.allow = "accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen";
    f.loading = "lazy";
    $("[data-video]").append(f);
    $("[data-seccion-video]").hidden = false;
  }

  /* ---------- Trabajo ---------- */
  const pista = $("[data-pista]");
  const formas = ["alta", "ancha", "media"];
  C.trabajos.forEach((t, i) => {
    const li = el("li", `tarjeta ${formas[i % 3]}${t.secciones ? " captura" : ""}`);
    li.dataset.disciplina = t.disciplina;
    const b = el("button", "tarjeta-boton");
    b.type = "button";
    b.dataset.cursor = "Abrir";
    b.setAttribute("aria-label", `Abrir proyecto: ${t.titulo}, ${t.disciplina}`);
    const fig = el("div", "tarjeta-imagen");
    const img = el("img");
    img.src = (t.imagenes.find((x) => !/\.(mp4|webm)$/i.test(x.src)) || t.imagenes[0]).src;
    img.alt = "";
    img.loading = "lazy";
    img.decoding = "async";
    fig.append(img);
    if (t.imagenes.length > 1) fig.append(el("span", "tarjeta-cuantas", t.secciones ? "Caso completo" : `${t.imagenes.length} imágenes`));
    const info = el("div", "tarjeta-info");
    const meta = el("span", "tarjeta-meta");
    meta.append(el("b", null, t.disciplina), document.createTextNode(t.anio ? `, ${t.anio}` : ""));
    info.append(el("span", "tarjeta-titulo", t.titulo), meta);
    b.append(fig, info);
    b.addEventListener("click", () => abrirFicha(t));
    li.append(b);
    pista.append(li);
  });

  // Filtros por disciplina (solo las que existen)
  const filtros = $("[data-filtros]");
  const disciplinas = ["Todo", ...new Set(C.trabajos.map((t) => t.disciplina))];
  disciplinas.forEach((d) => {
    const b = el("button", null, d);
    b.type = "button";
    b.setAttribute("aria-pressed", d === "Todo" ? "true" : "false");
    const n = d === "Todo" ? C.trabajos.length : C.trabajos.filter((t) => t.disciplina === d).length;
    b.append(el("span", "cuenta", String(n)));
    b.addEventListener("click", () => {
      $$("button", filtros).forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      $$(".tarjeta", pista).forEach((t) => (t.hidden = d !== "Todo" && t.dataset.disciplina !== d));
      $(".pista-marco").scrollTo({ left: 0 });
      medirGaleria();
      if (galeriaFijada) {
        const top = trabajo.getBoundingClientRect().top + scrollY;
        if (scrollY > top) scrollTo({ top, behavior: reducir.matches ? "auto" : "smooth" });
      }
    });
    filtros.append(b);
  });

  // Ficha de proyecto
  const ficha = $("[data-ficha]");
  let origenFicha = null;
  function abrirFicha(t) {
    origenFicha = document.activeElement;
    const meta = $("[data-ficha-meta]");
    meta.textContent = "";
    meta.append(el("b", null, t.disciplina), document.createTextNode(t.anio ? `, ${t.anio}` : ""));
    $("[data-ficha-titulo]").textContent = t.titulo;
    $("[data-ficha-resumen]").textContent = t.resumen;
    $("[data-ficha-rol]").textContent = t.rol || "";
    const enl = $("[data-ficha-enlace]");
    enl.hidden = !t.enlace;
    if (t.enlace) { enl.href = t.enlace.url; enl.textContent = t.enlace.texto; }
    const secs = $("[data-ficha-secciones]");
    secs.textContent = "";
    (t.secciones || []).forEach((sec) => {
      const d = el("section");
      d.append(el("h3", null, sec.titulo), el("p", null, sec.texto));
      secs.append(d);
    });
    $(".ficha-cab").scrollTop = 0;
    const cont = $("[data-ficha-imagenes]");
    cont.textContent = "";
    t.imagenes.forEach((im) => {
      const f = el("figure");
      let i;
      if (/\.(mp4|webm)$/i.test(im.src)) {
        i = document.createElement("video");
        i.src = im.src;
        if (im.poster) i.poster = im.poster;
        i.controls = true; i.muted = true; i.loop = true; i.playsInline = true;
        i.preload = "none";
        i.setAttribute("aria-label", im.pie || t.titulo);
      } else {
        i = el("img");
        i.src = im.src;
        i.alt = im.pie || t.titulo;
        i.decoding = "async";
      }
      f.append(i);
      if (im.pie) f.append(el("figcaption", null, im.pie));
      cont.append(f);
    });
    cont.scrollTop = 0;
    ficha.showModal();
    document.body.classList.add("ficha-abierta");
    $("[data-ficha-cerrar]").focus();
  }
  const cerrarFicha = () => ficha.close();
  $("[data-ficha-cerrar]").addEventListener("click", cerrarFicha);
  ficha.addEventListener("close", () => {
    $$("video", ficha).forEach((v) => v.pause());
    document.body.classList.remove("ficha-abierta");
    origenFicha?.focus?.();
  });

  /* ---------- Trayectoria ---------- */
  const tray = $("[data-trayectoria]");
  const etiquetaTipo = { experiencia: "Experiencia", formacion: "Formación" };
  C.trayectoria.forEach((h) => {
    const li = el("li", "hito");
    li.id = `hito-${h.id}`;
    li.dataset.tipo = h.tipo;
    const izq = el("div");
    izq.append(el("span", "hito-fechas", h.fechas), el("span", "hito-tipo", etiquetaTipo[h.tipo] || ""));
    const der = el("div");
    der.append(el("h3", "hito-titulo", h.titulo));
    if (h.lugar) der.append(el("p", "hito-lugar", h.lugar));
    if (h.texto) der.append(el("p", "hito-texto", h.texto));
    if (h.puntos?.length) {
      const ul = el("ul", "hito-puntos");
      h.puntos.forEach((p) => ul.append(el("li", null, p)));
      der.append(ul);
    }
    li.append(izq, der);
    tray.append(li);
  });
  $$("[data-filtros-tray] button").forEach((b) =>
    b.addEventListener("click", () => {
      $$("[data-filtros-tray] button").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      $$(".hito", tray).forEach((h) => (h.hidden = b.dataset.tipo !== "todo" && h.dataset.tipo !== b.dataset.tipo));
    })
  );

  /* ---------- Capacidades ---------- */
  const porId = Object.fromEntries(C.trayectoria.map((h) => [h.id, h]));
  const muro = $("[data-capacidades]");
  const evidencia = $("[data-evidencia]");
  const pintaEvidencia = (cap) => {
    evidencia.textContent = "";
    if (!cap) {
      evidencia.append(el("p", "evidencia-vacia", "Elige una capacidad para ver de dónde viene."));
      return;
    }
    evidencia.append(el("h3", null, cap.nombre));
    const ul = el("ul");
    cap.donde.map((id) => porId[id]).filter(Boolean).forEach((h) => {
      const li = el("li");
      li.append(el("b", null, h.titulo), el("span", null, [h.lugar, h.fechas].filter(Boolean).join(", ")));
      ul.append(li);
    });
    evidencia.append(ul);
    const primero = cap.donde.find((id) => porId[id]);
    if (primero) {
      const a = el("a", null, "Verlo en la trayectoria");
      a.href = `#hito-${primero}`;
      a.addEventListener("click", () => resaltar(cap.donde));
      evidencia.append(a);
    }
  };
  const resaltar = (ids) => {
    $$(".hito").forEach((h) => h.classList.toggle("resaltado", ids.includes(h.id.replace("hito-", ""))));
    $$("[data-filtros-tray] button")[0]?.click();
    setTimeout(() => $$(".hito.resaltado").forEach((h) => h.classList.remove("resaltado")), 3500);
  };
  C.capacidades.forEach((cap) => {
    const li = el("li");
    const b = el("button", null, cap.nombre);
    b.type = "button";
    b.setAttribute("aria-pressed", "false");
    const elegir = () => {
      $$("button", muro).forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      pintaEvidencia(cap);
    };
    b.addEventListener("click", elegir);
    if (ratonFino.matches) b.addEventListener("mouseenter", elegir);
    li.append(b);
    muro.append(li);
  });
  pintaEvidencia(null);
  if (C.herramientas?.length) {
    C.herramientas.forEach((h) => $("[data-herramientas]").append(el("li", null, h)));
    $("[data-herramientas-bloque]").hidden = false;
  }

  /* ---------- Contacto ---------- */
  const email = $("[data-email]");
  email.href = `mailto:${C.email}`;
  email.setAttribute("aria-label", `Escríbeme a ${C.email}`);
  const enlaces = $("[data-enlaces]");
  const enlace = (texto, href, extra = {}) => {
    if (!href) return;
    const li = el("li");
    const a = el("a", null, texto);
    a.href = href;
    Object.assign(a, extra);
    if (/^https?:/.test(href)) { a.target = "_blank"; a.rel = "noopener"; }
    li.append(a);
    enlaces.append(li);
  };
  enlace(C.email, `mailto:${C.email}`);
  enlace("LinkedIn", C.linkedin);
  enlace("Instagram", C.instagram);
  if (C.cv) enlace("Descargar CV en PDF", C.cv, { download: "" });
  $$("[data-cv-enlace]").forEach((a) => {
    if (!C.cv) return;
    a.href = C.cv;
    a.hidden = false;
  });

  /* ---------- Menú móvil ---------- */
  const menuBoton = $(".menu-boton");
  const menu = $("#menu-movil");
  const cierraMenu = () => {
    menu.hidden = true;
    menuBoton.setAttribute("aria-expanded", "false");
    menuBoton.textContent = "Menú";
    document.body.classList.remove("menu-abierto");
  };
  menuBoton.addEventListener("click", () => {
    const abrir = menu.hidden;
    if (!abrir) return cierraMenu();
    menu.hidden = false;
    menuBoton.setAttribute("aria-expanded", "true");
    menuBoton.textContent = "Cerrar";
    document.body.classList.add("menu-abierto");
  });
  $$("a", menu).forEach((a) => a.addEventListener("click", cierraMenu));
  addEventListener("keydown", (e) => e.key === "Escape" && !menu.hidden && cierraMenu());

  /* ---------- Revelados de texto ---------- */
  $$("[data-reveal-texto]").forEach((h) => {
    const palabras = h.textContent.trim().split(/\s+/);
    h.setAttribute("aria-label", h.textContent.trim());
    h.textContent = "";
    palabras.forEach((w, i) => {
      const p = el("span", "palabra");
      p.setAttribute("aria-hidden", "true");
      const s = el("span", null, w);
      s.style.setProperty("--i", i);
      p.append(s);
      h.append(p, document.createTextNode(" "));
    });
  });

  const observador = new IntersectionObserver(
    (entradas) =>
      entradas.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          observador.unobserve(e.target);
        }
      }),
    { rootMargin: "0px 0px -12% 0px" }
  );
  $$("[data-reveal], [data-reveal-texto], .hito").forEach((n) => observador.observe(n));
  // Las tarjetas se revelan al entrar en pantalla, también en horizontal
  const obsTarjetas = new IntersectionObserver(
    (entradas) => entradas.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
    { threshold: 0.15 }
  );
  $$(".tarjeta").forEach((t) => obsTarjetas.observe(t));

  /* ---------- Movimiento ligado al scroll ---------- */
  const hero = $(".hero");
  const heroFijo = $(".hero-fijo");
  const trabajo = $(".trabajo");
  const pistaMarco = $(".pista-marco");
  const progreso = $("[data-progreso]");
  const eje = $("[data-eje]");
  const lineaTiempo = $(".linea-tiempo");
  const cab = $(".cab");
  let galeriaFijada = false;
  let recorrido = 0;

  function medirGaleria() {
    galeriaFijada = esEscritorio.matches && !reducir.matches;
    trabajo.classList.toggle("fijada", galeriaFijada);
    pista.style.transform = "";
    if (galeriaFijada) {
      recorrido = Math.max(0, pista.scrollWidth - innerWidth);
      trabajo.style.height = `${innerHeight + recorrido}px`;
    } else {
      recorrido = 0;
      trabajo.style.height = "";
    }
    enScroll();
  }

  let ultimoY = scrollY;
  function enScroll() {
    const y = scrollY;
    const vh = innerHeight;

    if (!reducir.matches) {
      // Portada: la foto se encuadra y el nombre se estira
      const recorridoHero = hero.offsetHeight - vh;
      const pHero = recorridoHero > vh * 0.2 ? clamp(y / recorridoHero, 0, 1) : 0;
      heroFijo.style.setProperty("--p", pHero.toFixed(4));
    }

    // Galería horizontal
    if (galeriaFijada) {
      const top = trabajo.getBoundingClientRect().top;
      const p = clamp(-top / (recorrido || 1), 0, 1);
      pista.style.transform = `translate3d(${-p * recorrido}px,0,0)`;
      progreso.style.setProperty("--avance", p.toFixed(4));
    }

    // Línea de tiempo
    const r = lineaTiempo.getBoundingClientRect();
    eje.style.setProperty("--avance", clamp((vh * 0.6 - r.top) / (r.height || 1), 0, 1).toFixed(4));

    // Pilar activo: el que cruza el centro de la pantalla
    let activo = null;
    $$(".pilar").forEach((p) => {
      const b = p.getBoundingClientRect();
      if (b.top < vh * 0.62 && b.bottom > vh * 0.3) activo = p;
    });
    $$(".pilar").forEach((p) => p.classList.toggle("activo", p === activo));

    // Cabecera: se esconde al bajar y vuelve al subir
    if (!document.body.classList.contains("menu-abierto")) {
      cab.classList.toggle("escondida", y > ultimoY && y > vh * 0.6);
    }
    ultimoY = y;

    // Enlace de navegación activo
    $$('.nav a[href^="#"]').forEach((a) => {
      const s = $(a.getAttribute("href"));
      const b = s?.getBoundingClientRect();
      a.setAttribute("aria-current", String(!!b && b.top < vh * 0.4 && b.bottom > vh * 0.4));
    });
  }

  let pendiente = false;
  addEventListener("scroll", () => {
    if (pendiente) return;
    pendiente = true;
    requestAnimationFrame(() => {
      pendiente = false;
      enScroll();
    });
  }, { passive: true });
  addEventListener("resize", medirGaleria);
  esEscritorio.addEventListener("change", medirGaleria);
  reducir.addEventListener("change", medirGaleria);

  // En móvil, la barra de progreso sigue el desplazamiento táctil
  pistaMarco.addEventListener("scroll", () => {
    if (galeriaFijada) return;
    const max = pistaMarco.scrollWidth - pistaMarco.clientWidth;
    progreso.style.setProperty("--avance", max > 0 ? (pistaMarco.scrollLeft / max).toFixed(4) : 1);
  }, { passive: true });

  // Recalcular cuando carguen fuentes e imágenes
  document.fonts?.ready.then(medirGaleria);
  addEventListener("load", medirGaleria);
  medirGaleria();

  /* ---------- Cursor de enfoque y botón magnético ---------- */
  if (ratonFino.matches && !reducir.matches) {
    const cursor = $(".cursor");
    const texto = $(".cursor-texto");
    let mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my;
    document.documentElement.classList.add("cursor-activo");
    addEventListener("pointermove", (e) => { mx = e.clientX; my = e.clientY; cursor.classList.remove("oculto"); });
    document.addEventListener("pointerleave", () => cursor.classList.add("oculto"));
    const bucle = () => {
      cx += (mx - cx) * 0.22;
      cy += (my - cy) * 0.22;
      cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      requestAnimationFrame(bucle);
    };
    bucle();
    document.addEventListener("pointerover", (e) => {
      const t = e.target.closest("[data-cursor]");
      cursor.classList.toggle("grande", !!t);
      texto.textContent = t ? t.dataset.cursor : "";
    });

    $$("[data-iman]").forEach((b) => {
      const span = $("span", b);
      b.addEventListener("pointermove", (e) => {
        const r = b.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        b.style.transform = `translate(${dx * 0.3}px, ${dy * 0.3}px)`;
        span.style.transform = `translate(${dx * 0.12}px, ${dy * 0.12}px)`;
      });
      b.addEventListener("pointerleave", () => { b.style.transform = ""; span.style.transform = ""; });
    });
  }
  $$("[data-iman]").forEach((b) => (b.dataset.cursor = "Email"));

  /* ---------- Entrada ---------- */
  if (!reducir.matches) {
    document.body.classList.add("intro");
    setTimeout(() => document.body.classList.remove("intro"), 2600);
  }
})();
