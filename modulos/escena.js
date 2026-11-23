/* =========================================================
   Módulo «Escena» · portada + portátil 3D ligado al scroll
   API: window.Escena.montar(raiz, contenido, { onAbrir(trabajo, i) })
        → { irA(indice), destruir() }
   Sin dependencias. Solo transform / opacity por fotograma.
   ========================================================= */
(function () {
  "use strict";

  var P1 = 0.28;   // fin de la portada quieta
  var P2 = 0.62;   // portátil abierto
  var P_ANCLA = 0.74;
  var W = 1000;    // ancho de diseño del portátil (px)

  function clamp(v, a, b) { return v < (a || 0) ? (a || 0) : v > (b == null ? 1 : b) ? (b == null ? 1 : b) : v; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function eio(t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function eo(t) { return 1 - Math.pow(1 - t, 3); }
  function dos(n) { return (n < 10 ? "0" : "") + n; }

  function el(tag, attrs, hijos) {
    var n = document.createElement(tag);
    if (attrs) for (var k in attrs) {
      if (attrs[k] == null || attrs[k] === false) continue;
      if (k === "class") n.className = attrs[k];
      else if (k === "text") n.textContent = attrs[k];
      else if (k === "html") n.innerHTML = attrs[k];
      else n.setAttribute(k, attrs[k] === true ? "" : attrs[k]);
    }
    (hijos || []).forEach(function (h) { if (h) n.appendChild(h); });
    return n;
  }

  var FLECHA_IZQ = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M19 12H5M11 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var FLECHA_DER = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function montar(raiz, contenido, opciones) {
    if (!raiz) throw new Error("Escena: falta el elemento raíz");
    var C = contenido || {};
    var O = opciones || {};
    var trabajos = (C.trabajos || []).filter(Boolean);
    var total = trabajos.length;
    var nombre = String(C.nombre || "Jairo").toUpperCase();

    var mqReducido = window.matchMedia("(prefers-reduced-motion: reduce)");
    var reducido = mqReducido.matches;

    /* ---------------- DOM ---------------- */
    raiz.innerHTML = "";
    raiz.classList.add("escena");

    var ancla = el("span", { id: "trabajo", class: "escena-ancla", "aria-hidden": "true" });

    // Portada
    var nombreH = el("h1", { class: "escena-nombre", "aria-label": C.nombre || "Jairo" });
    Array.prototype.forEach.call(nombre, function (ch, i) {
      var s = el("span", { class: "letra", "aria-hidden": "true" });
      s.style.setProperty("--i", i);
      s.textContent = ch === " " ? " " : ch;
      nombreH.appendChild(s);
    });
    var anotacion = el("p", { class: "escena-anotacion" }, [
      el("span", { class: "escena-anotacion-texto", text: "comercio · marketing · foto" }),
      el("span", { "aria-hidden": "true", html: '<svg viewBox="0 0 60 40"><path d="M3 6 C 20 4, 38 10, 46 30 M38 25 l8 6 l2 -10"/></svg>' })
    ]);
    var titular = el("div", { class: "escena-titular" }, [nombreH]);
    var anotCapa = el("div", { class: "escena-titular escena-anotacion-capa" }, [anotacion]);

    var mesa = el("div", { class: "escena-mesa", "aria-hidden": "true" }, [
      el("div", { class: "escena-mesa-in", html:
        '<div class="mesa-sombra"></div>' +
        '<div class="mesa-pata p3"></div><div class="mesa-pata p4"></div>' +
        '<div class="mesa-tablero"></div><div class="mesa-canto"></div>' +
        '<div class="mesa-pata p1"></div><div class="mesa-pata p2"></div>' +
        '<div class="mesa-carpetas"><i></i><i></i><i></i></div>' +
        '<div class="mesa-taza"><b></b></div>' })
    ]);

    var fotoImg = el("img", {
      src: C.fotoPortada || "assets/jairo-portada.webp",
      alt: "Jairo con su cámara Sony delante del ojo",
      width: 1282, height: 1400, decoding: "async", fetchpriority: "high", draggable: "false"
    });
    var fotoMover = el("div", { class: "escena-foto-mover" }, [fotoImg]);
    var foto = el("div", { class: "escena-foto" }, [fotoMover]);
    var carnet = el("div", { class: "escena-carnet", "data-carnet-slot": "" });

    var portada = el("div", { class: "escena-portada" }, [titular, mesa, foto, anotCapa, carnet]);

    // Portátil
    var imgs = trabajos.map(function (t, i) {
      return el("img", {
        class: "pt-img" + (i === 0 ? " activa" : ""),
        src: t.pantalla || (t.imagenes && t.imagenes[0] && t.imagenes[0].src) || "",
        alt: "", width: 1600, height: 1000, decoding: "async",
        loading: i === 0 ? "eager" : "lazy", draggable: "false"
      });
    });
    var apagada = el("span", { class: "pt-apagada", "aria-hidden": "true" });
    var pantalla = el("button", { class: "pt-pantalla", type: "button", "data-cursor": "Ver" },
      imgs.concat([el("span", { class: "pt-brillo", "aria-hidden": "true" }), apagada]));

    var sombra = el("div", { class: "pt-sombra" });
    var sombraC = el("div", { class: "pt-sombra-contacto" });
    var tapa = el("div", { class: "pt-tapa" }, [
      el("div", { class: "pt-dorso", html: '<span class="pt-logo"><i></i><i></i><i></i><i></i></span>' }),
      el("div", { class: "pt-canto" }),
      el("div", { class: "pt-canto-lado izq" }),
      el("div", { class: "pt-canto-lado der" }),
      el("div", { class: "pt-frente" }, [
        el("div", { class: "pt-bisel" }, [el("span", { class: "pt-camara" }), pantalla])
      ])
    ]);
    var portatil = el("div", { class: "portatil", "aria-hidden": "false" }, [
      sombra, sombraC,
      el("div", { class: "pt-lado izq" }),
      el("div", { class: "pt-lado der" }),
      el("div", { class: "pt-cubierta", html:
        '<span class="pt-teclado"></span><span class="pt-trackpad"></span><span class="pt-muesca"></span><span class="pt-reflejo"></span>' }),
      el("div", { class: "pt-labio" }),
      tapa
    ]);
    var alfa3d = el("div", { class: "escena-3d-alfa" }, [portatil]);
    var capa3d = el("div", { class: "escena-3d" }, [alfa3d]);

    // UI del carrusel
    var marca = el("p", { class: "escena-marca escena-ui", "aria-hidden": "true",
      html: "<b>" + (C.nombre || "Jairo") + "</b> <span>— trabajo seleccionado</span>" });

    var rutaT = el("span");
    var resumen = el("p", { class: "caso-resumen" });
    var srMeta = el("span", { class: "escena-oculto-sr" });
    var contadorN = el("b");
    var contador = el("p", { class: "caso-contador" }, [contadorN, document.createTextNode(" / " + dos(total))]);
    var verCaso = el("button", { class: "caso-ver", type: "button", html: "ver caso " + FLECHA_DER });
    var vivo = el("div", { "aria-live": "polite", "aria-atomic": "true" }, [
      el("p", { class: "caso-ruta" }, [el("span", { text: "// " }), rutaT]), srMeta, resumen
    ]);
    var caso = el("div", { class: "escena-caso escena-ui" }, [
      vivo, el("div", { class: "caso-pie" }, [contador, verCaso])
    ]);

    var etTitulo = el("p", { class: "etiqueta-titulo" });
    var etMeta = el("p", { class: "etiqueta-meta" });
    var etGiro = el("div", { class: "etiqueta-giro" }, [
      el("div", { class: "etiqueta-cuerpo" }, [
        el("span", { class: "etiqueta-esq tl" }), el("span", { class: "etiqueta-esq tr" }),
        el("span", { class: "etiqueta-esq bl" }), el("span", { class: "etiqueta-esq br" }),
        etTitulo, etMeta
      ])
    ]);
    var etiqueta = el("div", { class: "escena-etiqueta escena-ui", "aria-hidden": "true" }, [etGiro]);

    var btnAnt = el("button", { type: "button", "aria-label": "Trabajo anterior", html: FLECHA_IZQ });
    var btnSig = el("button", { type: "button", "aria-label": "Trabajo siguiente", html: FLECHA_DER });
    var ctrlAnt = el("div", { class: "escena-control escena-control--ant escena-ui" }, [btnAnt, el("span", { text: "anterior", "aria-hidden": "true" })]);
    var ctrlSig = el("div", { class: "escena-control escena-control--sig escena-ui" }, [btnSig, el("span", { text: "siguiente", "aria-hidden": "true" })]);
    var contadorMovil = el("p", { class: "controles-contador", "aria-hidden": "true" });
    var controles = el("div", { class: "escena-controles" }, [ctrlAnt, contadorMovil, ctrlSig]);

    var panel = el("div", { class: "escena-panel escena-ui" }, [etiqueta, caso, controles]);
    var carrusel = el("div", {
      class: "escena-carrusel", role: "region",
      "aria-roledescription": "carrusel", "aria-label": "Trabajos seleccionados"
    }, [panel]);

    var trabajo = el("div", { class: "escena-trabajo" }, [capa3d, marca, carrusel]);

    // Navegación diminuta
    var aTrabajo = el("a", { class: "escena-mini", href: "#trabajo", text: "trabajo" });
    var aSobre = el("a", { class: "escena-mini solo-ancho", href: "#sobre-mi", text: "sobre mí" });
    var aContacto = el("a", { class: "escena-mini", href: "#contacto", text: "contacto" });
    var aCv = el("a", { class: "escena-mini", href: C.cv || "#", download: "", text: "descargar CV" });
    var aCvMovil = el("a", { class: "escena-mini solo-movil", href: C.cv || "#", download: "", text: "descargar CV" });
    if (!C.cv) { aCv.hidden = true; aCvMovil.hidden = true; }
    var navIzq = el("div", { class: "escena-nav-grupo izq" }, [aTrabajo, aSobre, aCvMovil]);
    var navDer = el("div", { class: "escena-nav-grupo der" }, [aContacto, aCv]);
    var nav = el("nav", { class: "escena-nav", "aria-label": "Accesos de la portada" }, [navIzq, navDer]);

    var escenario = el("div", { class: "escena-escenario" }, [
      el("div", { class: "escena-fondo", "aria-hidden": "true" }), portada, trabajo, nav
    ]);
    raiz.appendChild(ancla);
    raiz.appendChild(escenario);

    /* ---------------- Estado ---------------- */
    var m = { w: 0, h: 0, top: 0, rango: 1, modo: "ancho", conMesa: true };
    var A = null, B = null;     // poses inicial y final del portátil
    var indice = 0;
    var p = -1;                 // progreso aplicado
    var raf = 0;
    var activo = null;
    var visible = true;
    var vivoListo = false;
    var destruido = false;

    function modoActual() {
      if (reducido) return "quieta";
      return m.modo;
    }

    /* ---------------- Contenido del caso ---------------- */
    function pintarCaso(i) {
      var t = trabajos[i];
      if (!t) return;
      rutaT.textContent = t.titulo;
      resumen.textContent = t.resumen || "";
      srMeta.textContent = [t.disciplina, t.anio].filter(Boolean).join(", ") + ". ";
      contadorN.textContent = dos(i + 1);
      contadorMovil.innerHTML = "<b>" + dos(i + 1) + "</b> / " + dos(total);
      etTitulo.textContent = t.titulo;
      etMeta.innerHTML = "";
      etMeta.appendChild(document.createTextNode(t.disciplina || ""));
      if (t.anio) { etMeta.appendChild(el("i", { "aria-hidden": "true" })); etMeta.appendChild(document.createTextNode(t.anio)); }
      pantalla.setAttribute("aria-label", "Ver caso: " + t.titulo);
      verCaso.setAttribute("aria-label", "Ver caso: " + t.titulo);
    }

    function irA(n, dir) {
      if (!total) return;
      var nuevo = ((n % total) + total) % total;
      if (nuevo === indice) return;
      var d = dir || (nuevo > indice ? 1 : -1);
      pantalla.style.setProperty("--dir", d);
      var viejo = imgs[indice];
      imgs.forEach(function (im) { im.classList.remove("saliendo"); });
      viejo.classList.remove("activa");
      viejo.classList.add("saliendo");
      imgs[nuevo].loading = "eager";
      imgs[nuevo].classList.add("activa");
      // precarga del siguiente
      var sig = imgs[(nuevo + d + total) % total]; if (sig) sig.loading = "eager";
      indice = nuevo;
      if (!vivoListo) { vivoListo = true; }
      var anima = !reducido && typeof etGiro.animate === "function";
      if (anima) {
        var salida = etGiro.animate(
          [{ transform: "perspective(600px) rotateX(0deg)", opacity: 1 }, { transform: "perspective(600px) rotateX(-88deg)", opacity: .2 }],
          { duration: 170, easing: "cubic-bezier(.5,0,.9,.4)", fill: "forwards" });
        caso.animate([{ opacity: 1, transform: getComputedTransform(caso) }, { opacity: 0, transform: getComputedTransform(caso) }],
          { duration: 160, easing: "ease-in", fill: "forwards" });
        salida.onfinish = function () {
          pintarCaso(indice);
          etGiro.animate(
            [{ transform: "perspective(600px) rotateX(88deg)", opacity: .2 }, { transform: "perspective(600px) rotateX(0deg)", opacity: 1 }],
            { duration: 420, easing: "cubic-bezier(.2,.9,.25,1.25)", fill: "forwards" });
          var anims = caso.getAnimations ? caso.getAnimations() : [];
          anims.forEach(function (a) { a.cancel(); });
          caso.animate([{ opacity: 0, translate: (d * 14) + "px 0" }, { opacity: 1, translate: "0 0" }],
            { duration: 420, easing: "cubic-bezier(.2,.8,.2,1)" });
        };
      } else {
        pintarCaso(indice);
      }
    }
    function getComputedTransform(n) { return n.style.transform || "none"; }

    /* ---------------- Medidas y poses ---------------- */
    function aplicarPose(q) {
      portatil.style.transform =
        "translate3d(" + q.x.toFixed(2) + "px," + q.y.toFixed(2) + "px,0) scale(" + q.s.toFixed(4) + ") rotateX(" + q.rx.toFixed(2) + "deg) rotateY(" + q.ry.toFixed(2) + "deg)";
      tapa.style.transform = "translate3d(0,-1px,-326px) rotateX(" + q.lid.toFixed(2) + "deg)";
      sombra.style.transform = "translate3d(0," + (31 + q.gap).toFixed(1) + "px,0) rotateX(90deg)";
      sombra.style.opacity = q.sOp.toFixed(3);
      sombraC.style.opacity = q.cOp.toFixed(3);
      apagada.style.opacity = (1 - q.luz).toFixed(3);
    }

    function cajaPortatil(ref) {
      var piezas = [tapa.querySelector(".pt-frente"), portatil.querySelector(".pt-labio"), portatil.querySelector(".pt-cubierta")];
      var L = Infinity, T = Infinity, R = -Infinity, Bt = -Infinity;
      piezas.forEach(function (n) {
        var r = n.getBoundingClientRect();
        L = Math.min(L, r.left); T = Math.min(T, r.top); R = Math.max(R, r.right); Bt = Math.max(Bt, r.bottom);
      });
      return { l: L - ref.left, t: T - ref.top, r: R - ref.left, b: Bt - ref.top, w: R - L, h: Bt - T };
    }

    function medir() {
      if (destruido) return;
      var ancho = escenario.clientWidth || window.innerWidth;
      m.modo = ancho < 760 ? "movil" : ancho < 1200 ? "medio" : "ancho";
      raiz.setAttribute("data-modo", m.modo);
      raiz.classList.toggle("escena--quieta", reducido);

      var marco = reducido ? trabajo : escenario;
      m.w = marco.clientWidth; m.h = marco.clientHeight;
      if (reducido) {
        m.h = Math.max(560, window.innerHeight);
      }
      var w = m.w, h = m.h;
      m.conMesa = !reducido && m.modo !== "movil" && w / h > 1.15;
      mesa.style.display = m.conMesa || reducido ? "" : "none";
      if (reducido && m.modo === "movil") mesa.style.display = "none";

      // Foto: altura según el formato
      var fotoAlto = m.modo === "movil" ? Math.min(h * 0.68, w * 1.28 / 0.916) :
        Math.min(h * 0.9, w * 1.02 / 0.916);
      raiz.style.setProperty("--foto-alto", Math.round(fotoAlto) + "px");

      // Nombre: ocupa el ancho
      ajustarNombre(w);

      alfa3d.style.setProperty("--persp", Math.round(Math.max(w, h) * 3) + "px");

      // Pose final (B): medir en el propio DOM una vez por redimensionado
      var ref = (reducido ? trabajo : escenario).getBoundingClientRect();
      var base = { rx: -7, ry: 0, lid: 7, gap: 90, sOp: 1, cOp: 0, luz: 1 };
      var q = Object.assign({ x: w / 2, y: h / 2, s: 1 }, base);
      aplicarPose(q);
      var c = cajaPortatil(ref);
      var objetivoW, maxH, zonaSup, zonaInf;
      if (m.modo === "ancho") {
        objetivoW = Math.min(w * 0.7, 1100, w - 2 * (w * 0.03 + 250));
        zonaSup = 150; zonaInf = h - 46;
      } else if (m.modo === "medio") {
        objetivoW = Math.min(w - 230, w * 0.74, 860);
        zonaSup = 176; zonaInf = h - 168;
      } else {
        objetivoW = w * 0.92;
        zonaSup = 118; zonaInf = h - 330;
      }
      if (reducido) { zonaSup = m.modo === "movil" ? 40 : 90; zonaInf = h - (m.modo === "ancho" ? 50 : m.modo === "medio" ? 150 : 330); }
      maxH = Math.max(120, zonaInf - zonaSup);
      q.s = Math.min(objetivoW / c.w, maxH / c.h);
      aplicarPose(q);
      c = cajaPortatil(ref);
      var dx = (c.l + c.r) / 2 - q.x, dy = (c.t + c.b) / 2 - q.y;
      var extra = m.modo === "movil" && !reducido ? Math.max(0, (h - zonaSup - c.h - 350) / 2) : 0;
      var cy = m.modo === "movil" ? zonaSup + extra + c.h / 2 : (zonaSup + zonaInf) / 2;
      q.x = w / 2 - dx; q.y = cy - dy;
      aplicarPose(q);
      c = cajaPortatil(ref);
      B = q;
      raiz.style.setProperty("--lap-izq", Math.round(c.l) + "px");
      raiz.style.setProperty("--lap-der", Math.round(c.r) + "px");
      raiz.style.setProperty("--lap-sup", Math.round(c.t) + "px");
      raiz.style.setProperty("--lap-inf", Math.round(c.b) + "px");
      raiz.style.setProperty("--lap-cy", Math.round((c.t + c.b) / 2) + "px");
      if (reducido) {
        var alto = m.modo === "movil" ? c.b + 360 : h;
        raiz.style.setProperty("--quieta-alto", Math.round(alto) + "px");
      }

      // Pose inicial (A)
      if (m.conMesa) {
        var mr = mesa.getBoundingClientRect();
        var sup = parseFloat(getComputedStyle(mesa).getPropertyValue("--mesa-sup")) || 34;
        var sA = (mr.width * 0.4) / W;
        A = { x: mr.left - ref.left + mr.width * 0.55, y: mr.top - ref.top + sup * 0.42 - 30 * sA, s: sA,
              rx: -19, ry: 7, lid: -90, gap: 0, sOp: 0, cOp: 1, luz: 0 };
      } else {
        A = { x: B.x, y: B.y + h * 0.22, s: B.s * 0.78, rx: -34, ry: 0, lid: -90, gap: 0, sOp: 0, cOp: 1, luz: 0 };
      }

      // Recorrido del scroll y ancla
      var rr = raiz.getBoundingClientRect();
      m.top = rr.top + window.scrollY;
      m.rango = Math.max(1, raiz.offsetHeight - escenario.offsetHeight);
      var pad = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      if (reducido) {
        ancla.style.top = (trabajo.offsetTop + escenario.offsetTop) + "px";
      } else {
        ancla.style.top = Math.round(m.rango * P_ANCLA + pad) + "px";
      }

      [panel, caso, etiqueta, ctrlAnt, ctrlSig, marca].forEach(function (n) { n.style.opacity = ""; n.style.transform = ""; });
      p = -1;
      if (reducido) pintarQuieta(); else pintar(progreso());
    }

    function ajustarNombre(w) {
      nombreH.style.fontSize = "100px";
      var natural = nombreH.scrollWidth || 1;
      var objetivo = w * (m.modo === "movil" ? 0.92 : 0.95);
      var tam = Math.min(100 * objetivo / natural, m.h * (m.modo === "movil" ? 0.3 : 0.5));
      nombreH.style.fontSize = tam.toFixed(1) + "px";
      // la anotación se coloca sobre la primera mitad del nombre
      var anchoReal = natural * tam / 100;
      raiz.style.setProperty("--anot-x", Math.round(anchoReal * (m.modo === "movil" ? 0.47 : 0.45)) + "px");
    }

    function progreso() {
      return clamp((window.scrollY - m.top) / m.rango);
    }

    /* ---------------- Pintado por fotograma ---------------- */
    var uiNodos = function () {
      return m.modo === "movil" ? [panel] : [caso, etiqueta, ctrlAnt, ctrlSig, marca];
    };

    function pintar(np) {
      if (np === p) return;
      p = np;
      var w = m.w, h = m.h;
      var t = clamp((p - P1) / (P2 - P1));
      var sal = eio(clamp(t / 0.55));

      titular.style.transform = anotCapa.style.transform = "translate3d(0," + (-sal * h * 0.14).toFixed(1) + "px,0)";
      titular.style.opacity = anotCapa.style.opacity = (1 - eo(clamp(t / 0.5))).toFixed(3);
      fotoMover.style.transform = "translate3d(0," + (sal * 16).toFixed(2) + "%,0)";
      fotoMover.style.opacity = (1 - clamp((t - 0.05) / 0.45)).toFixed(3);
      mesa.style.opacity = (1 - clamp((t - 0.06) / 0.3)).toFixed(3);
      var cOp = 1 - clamp(t / 0.3);
      carnet.style.opacity = cOp.toFixed(3);
      carnet.style.transform = "translate3d(0," + (-(1 - cOp) * 30).toFixed(1) + "px,0)";
      carnet.classList.toggle("escena-oculto", cOp <= 0.001);

      // Portátil
      var mov = eio(clamp((t - 0.02) / 0.62));
      var esc = eio(clamp((t - 0.1) / 0.72));
      var gir = eio(clamp((t - 0.08) / 0.62));
      var tap = eio(clamp((t - 0.4) / 0.55));
      var sube = eo(clamp(t / 0.25));
      var arco = m.conMesa ? Math.sin(Math.PI * mov) * h * 0.07 + sube * h * 0.02 * (1 - mov) : 0;
      aplicarPose({
        x: lerp(A.x, B.x, mov),
        y: lerp(A.y, B.y, mov) - arco,
        s: lerp(A.s, B.s, esc),
        rx: lerp(A.rx, B.rx, gir),
        ry: lerp(A.ry, B.ry, gir) - (m.conMesa ? 30 : 0) * Math.sin(Math.PI * Math.min(1, gir * 1.15)),
        lid: lerp(-90, B.lid, tap),
        gap: lerp(0, B.gap, sube),
        sOp: sube,
        cOp: 1 - sube,
        luz: eo(clamp((t - 0.78) / 0.22))
      });
      if (!m.conMesa) alfa3d.style.opacity = eo(clamp(t / 0.35)).toFixed(3);
      else alfa3d.style.opacity = "";

      // UI
      var u = eo(clamp((p - P2) / 0.1));
      uiNodos().forEach(function (n, i) {
        var uu = eo(clamp((p - P2 - i * 0.012) / 0.1));
        n.style.opacity = uu.toFixed(3);
        n.style.transform = uu >= 1 ? "" : "translate3d(0," + ((1 - uu) * 14).toFixed(1) + "px,0)";
      });

      var esActivo = p > P2 + 0.03;
      if (esActivo !== activo) {
        activo = esActivo;
        trabajo.classList.toggle("activo", activo);
        if (activo) trabajo.removeAttribute("inert"); else trabajo.setAttribute("inert", "");
        aTrabajo.classList.toggle("activo", activo);
      }
      visible = window.scrollY < m.top + raiz.offsetHeight - h * 0.5 && window.scrollY > m.top - h * 0.5;
    }

    function pintarQuieta() {
      [titular, anotCapa, fotoMover, mesa, carnet, alfa3d].forEach(function (n) { n.style.transform = ""; n.style.opacity = ""; });
      carnet.classList.remove("escena-oculto");
      [panel, caso, etiqueta, ctrlAnt, ctrlSig, marca].forEach(function (n) { n.style.opacity = ""; n.style.transform = ""; });
      aplicarPose(Object.assign({}, B, { gap: 90, sOp: 1, cOp: 0, luz: 1 }));
      trabajo.classList.add("activo");
      trabajo.removeAttribute("inert");
      activo = true;
    }

    function enScroll() {
      if (raf || reducido) return;
      raf = requestAnimationFrame(function () {
        raf = 0;
        pintar(progreso());
      });
    }

    var tRes = 0;
    function enResize() {
      clearTimeout(tRes);
      tRes = setTimeout(medir, 120);
    }

    /* ---------------- Interacción ---------------- */
    function abrir() {
      if (typeof O.onAbrir === "function" && trabajos[indice]) O.onAbrir(trabajos[indice], indice);
    }
    pantalla.addEventListener("click", abrir);
    aTrabajo.addEventListener("click", function (e) {
      // Desplazamiento exacto al punto donde el portátil ya está abierto
      e.preventDefault();
      var pad = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      var destino = reducido ? ancla.getBoundingClientRect().top + window.scrollY - pad : m.top + m.rango * P_ANCLA;
      window.scrollTo({ top: destino, behavior: reducido ? "auto" : "smooth" });
      if (history.replaceState) history.replaceState(null, "", "#trabajo");
      var foco = function () { if (activo) btnSig.focus({ preventScroll: true }); };
      setTimeout(foco, reducido ? 0 : 900);
    });
    verCaso.addEventListener("click", abrir);
    btnAnt.addEventListener("click", function () { irA(indice - 1, -1); });
    btnSig.addEventListener("click", function () { irA(indice + 1, 1); });

    function enTecla(e) {
      if (!activo || e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      if (!reducido && !visible) return;
      if (reducido) {
        var r = trabajo.getBoundingClientRect();
        if (r.bottom < window.innerHeight * 0.3 || r.top > window.innerHeight * 0.7) return;
      }
      var a = document.activeElement;
      if (a && (a.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName))) return;
      if (document.querySelector("dialog[open], [aria-modal='true']:not([hidden])")) return;
      e.preventDefault();
      irA(indice + (e.key === "ArrowRight" ? 1 : -1), e.key === "ArrowRight" ? 1 : -1);
    }

    var tx = 0, ty = 0, tOk = false;
    function tIni(e) {
      if (!activo || !e.touches || e.touches.length !== 1) { tOk = false; return; }
      tOk = true; tx = e.touches[0].clientX; ty = e.touches[0].clientY;
    }
    function tFin(e) {
      if (!tOk) return; tOk = false;
      var t = e.changedTouches && e.changedTouches[0]; if (!t) return;
      var dx = t.clientX - tx, dy = t.clientY - ty;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.3) irA(indice + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
    }

    function enCambioMovimiento() { reducido = mqReducido.matches; medir(); }

    window.addEventListener("scroll", enScroll, { passive: true });
    window.addEventListener("resize", enResize);
    window.addEventListener("keydown", enTecla);
    window.addEventListener("load", medir);
    escenario.addEventListener("touchstart", tIni, { passive: true });
    escenario.addEventListener("touchend", tFin, { passive: true });
    if (mqReducido.addEventListener) mqReducido.addEventListener("change", enCambioMovimiento);

    /* ---------------- Arranque ---------------- */
    pintarCaso(0);
    trabajo.setAttribute("inert", "");
    medir();

    var fuentes = document.fonts && document.fonts.load
      ? Promise.all([
          document.fonts.load('800 100px "Escena Grotesk"', nombre),
          document.fonts.load('400 30px "Escena Rotulador"', "fotografía")
        ]).catch(function () {})
      : Promise.resolve();
    var fotoLista = fotoImg.decode ? fotoImg.decode().catch(function () {}) : Promise.resolve();
    var listo = false;
    function arrancar() {
      if (listo || destruido) return; listo = true;
      medir();
      requestAnimationFrame(function () { raiz.classList.add("escena--lista"); });
    }
    fuentes.then(function () { if (!destruido) medir(); });
    Promise.all([fuentes, fotoLista]).then(arrancar);
    setTimeout(arrancar, 1800);

    return {
      irA: function (i) { irA(+i || 0); },
      destruir: function () {
        destruido = true;
        cancelAnimationFrame(raf);
        clearTimeout(tRes);
        window.removeEventListener("scroll", enScroll);
        window.removeEventListener("resize", enResize);
        window.removeEventListener("keydown", enTecla);
        window.removeEventListener("load", medir);
        if (mqReducido.removeEventListener) mqReducido.removeEventListener("change", enCambioMovimiento);
        raiz.innerHTML = "";
        raiz.classList.remove("escena", "escena--lista", "escena--quieta");
        raiz.removeAttribute("data-modo");
        ["--foto-alto", "--anot-x", "--lap-izq", "--lap-der", "--lap-sup", "--lap-inf", "--lap-cy", "--quieta-alto"]
          .forEach(function (v) { raiz.style.removeProperty(v); });
      }
    };
  }

  window.Escena = { montar: montar };
})();
