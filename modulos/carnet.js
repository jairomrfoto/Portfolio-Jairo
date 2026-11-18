/* =========================================================
   Carnet colgante — Jairo Martínez
   window.Carnet.montar(contenedor, datos, opciones) -> { destruir() }
   datos    = { nombre, foto, cargo, campos: [[etiqueta, valor], ...], anio, titulo? }
   opciones = { onClick?(evento) }
   Física: cuerda de 2 segmentos con integración de Verlet (ancla fija ->
   mosquetón -> centro de la tarjeta), amortiguada. Un único bucle rAF que
   se duerme cuando está en reposo y fuera de pantalla. Solo transform.
   ========================================================= */
(function () {
  "use strict";

  var contadorId = 0;
  var GRADO = Math.PI / 180;

  function esc(t) {
    return String(t == null ? "" : t).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function svgMosqueton(id) {
    var m = "cm" + id;
    // viewBox 40 x 84: argolla giratoria arriba, cuerpo de langosta, anilla abajo
    return (
      '<svg class="carnet__mosqueton" viewBox="0 0 40 84" aria-hidden="true" focusable="false">' +
      "<defs>" +
      '<linearGradient id="' + m + 'a" x1="0" y1="0" x2="1" y2="0">' +
      '<stop offset="0" stop-color="#6f767e"/><stop offset=".22" stop-color="#dfe3e7"/>' +
      '<stop offset=".38" stop-color="#ffffff"/><stop offset=".58" stop-color="#a9b0b7"/>' +
      '<stop offset=".8" stop-color="#eef1f3"/><stop offset="1" stop-color="#6a7179"/></linearGradient>' +
      '<linearGradient id="' + m + 'b" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="#ffffff"/><stop offset=".35" stop-color="#c3c9cf"/>' +
      '<stop offset=".6" stop-color="#8b929a"/><stop offset=".85" stop-color="#e6e9ec"/>' +
      '<stop offset="1" stop-color="#7a8189"/></linearGradient>' +
      "</defs>" +
      // argolla superior (enganchada al remate de la cinta)
      '<ellipse cx="20" cy="6" rx="5.2" ry="4.6" fill="none" stroke="#5f666d" stroke-width="3.4"/>' +
      '<ellipse cx="20" cy="6" rx="5.2" ry="4.6" fill="none" stroke="url(#' + m + 'b)" stroke-width="2.4"/>' +
      // eje giratorio
      '<rect x="15.6" y="9.6" width="8.8" height="9.6" rx="2" fill="url(#' + m + 'a)" stroke="#5f666d" stroke-width=".6"/>' +
      '<rect x="15.6" y="13.6" width="8.8" height="1" fill="#6a7178" opacity=".6"/>' +
      // cuerpo de la langosta: contorno oscuro, metal, brillo
      '<path d="M20 19.5 C27.5 19.5 34.5 31 33.6 46 C32.7 59.5 26.5 69.5 19.4 69.5 C12.6 69.5 8.4 63.5 8.4 56.5 L8.4 34.5 C8.4 26.5 14.5 19.5 20 19.5 Z" fill="none" stroke="#565d64" stroke-width="5.8" stroke-linejoin="round"/>' +
      '<path d="M20 19.5 C27.5 19.5 34.5 31 33.6 46 C32.7 59.5 26.5 69.5 19.4 69.5 C12.6 69.5 8.4 63.5 8.4 56.5 L8.4 34.5 C8.4 26.5 14.5 19.5 20 19.5 Z" fill="none" stroke="url(#' + m + 'a)" stroke-width="4.4" stroke-linejoin="round"/>' +
      '<path d="M21 21 C28.5 22.5 32.6 32 32 44" fill="none" stroke="#fff" stroke-width="1" stroke-linecap="round" opacity=".85"/>' +
      // gatillo (lado izquierdo) con muesca de apertura
      '<path d="M8.4 36 L8.4 56" stroke="#4d545b" stroke-width="1" />' +
      '<path d="M8.4 41 l-3.4 1.4 l0 5 l3.4 1" fill="url(#' + m + 'a)" stroke="#565d64" stroke-width=".7" stroke-linejoin="round"/>' +
      '<path d="M6 43 l0 3.6" stroke="#5a6168" stroke-width=".5"/><path d="M7 43 l0 3.6" stroke="#5a6168" stroke-width=".5"/>' +
      // anilla inferior que atraviesa la funda
      '<ellipse cx="20" cy="74.5" rx="7" ry="5.4" fill="none" stroke="#5f666d" stroke-width="3.2"/>' +
      '<ellipse cx="20" cy="74.5" rx="7" ry="5.4" fill="none" stroke="url(#' + m + 'b)" stroke-width="2.2"/>' +
      '<path d="M14.2 72.2 C15.6 70.2 17.6 69.4 20 69.3" fill="none" stroke="#fff" stroke-width=".8" stroke-linecap="round" opacity=".9"/>' +
      "</svg>"
    );
  }

  function construir(id, datos) {
    var titulo = datos.titulo || "Portfolio / Card";
    var partes = String(titulo).split("/");
    var tituloHtml = partes.length > 1
      ? esc(partes[0].trim()) + "<span>/</span><br>" + esc(partes.slice(1).join("/").trim())
      : esc(titulo);
    var campos = (datos.campos || []).map(function (c) {
      return "<div><dt>" + esc(c[0]) + "</dt><dd>" + esc(c[1]) + "</dd></div>";
    }).join("");
    var foto = datos.foto
      ? '<img src="' + esc(datos.foto) + '" alt="" draggable="false" decoding="async">'
      : "";
    return (
      '<div class="carnet__cinta" aria-hidden="true">' +
      '<div class="carnet__tela"><div class="carnet__cinta-texto"></div></div>' +
      '<div class="carnet__remate"></div>' +
      "</div>" +
      '<div class="carnet__colgante" aria-hidden="true">' +
      svgMosqueton(id) +
      '<div class="carnet__funda">' +
      '<span class="carnet__ojal"></span><span class="carnet__ranura"></span>' +
      '<div class="carnet__tarjeta">' +
      '<div class="carnet__cab"><div class="carnet__titulo">' + tituloHtml + "</div>" +
      '<div class="carnet__anio">' + esc(datos.anio || "") + "</div></div>" +
      '<p class="carnet__cargo">' + esc(datos.cargo || "").replace(/ · /g, " ·\u00a0") + "</p>" +
      '<div class="carnet__medio">' +
      '<div class="carnet__foto"><div class="carnet__foto-recorte">' + foto + "</div>" +
      '<i class="carnet__esq carnet__esq--si"></i><i class="carnet__esq carnet__esq--sd"></i>' +
      '<i class="carnet__esq carnet__esq--ii"></i><i class="carnet__esq carnet__esq--id"></i></div>' +
      '<div class="carnet__lateral"><span class="carnet__rec">REC</span>' +
      '<span class="carnet__codigo"></span><span class="carnet__num">N.º 0001</span></div>' +
      "</div>" +
      '<dl class="carnet__campos">' + campos + "</dl>" +
      "</div>" +
      '<span class="carnet__brillo"></span><span class="carnet__plastico"></span>' +
      "</div></div>"
    );
  }

  function montar(contenedor, datos, opciones) {
    if (!contenedor) throw new Error("Carnet.montar: falta el contenedor");
    datos = datos || {};
    opciones = opciones || {};
    var id = ++contadorId;

    var raiz = document.createElement("div");
    raiz.className = "carnet";
    raiz.setAttribute("role", "img");
    var resumen = ["Carnet de " + (datos.nombre || "")];
    if (datos.cargo) resumen.push(datos.cargo);
    (datos.campos || []).forEach(function (c) { resumen.push(c[0] + ": " + c[1]); });
    raiz.setAttribute("aria-label", resumen.join(". "));
    raiz.innerHTML = construir(id, datos);
    if (typeof opciones.onClick === "function") raiz.classList.add("tiene-click");
    contenedor.appendChild(raiz);

    var cinta = raiz.querySelector(".carnet__cinta");
    var textoCinta = raiz.querySelector(".carnet__cinta-texto");
    var colgante = raiz.querySelector(".carnet__colgante");
    var funda = raiz.querySelector(".carnet__funda");
    var mosqueton = raiz.querySelector(".carnet__mosqueton");
    var brillo = raiz.querySelector(".carnet__brillo");

    var nombreCinta = String(datos.nombre || "Jairo Martínez").toUpperCase();
    textoCinta.innerHTML = new Array(14).join(esc(nombreCinta) + "<b>·</b>");

    var mq = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : { matches: false };
    var reducido = mq.matches;

    /* ---------- Geometría ---------- */
    var EXTRA = 80;           // la cinta sube por encima del borde
    var W = 0, H = 0, L1 = 0, L2 = 0, ax = 0;
    var A = { x: 0, y: 0 };
    var B = { x: 0, y: 0, px: 0, py: 0 };
    var C = { x: 0, y: 0, px: 0, py: 0 };
    var g = 3000;

    function medir() {
      W = raiz.clientWidth;
      H = raiz.clientHeight;
      if (!W || !H) return false;
      ax = W / 2;
      A.x = ax; A.y = 0;
      var hColgante = colgante.offsetHeight;
      var hMosq = mosqueton.offsetHeight || mosqueton.getBoundingClientRect().height;
      // La funda empieza ~36 % de la altura -> la tarjeta queda entre el 35 y el 45 %
      var objetivo = 0.36 * H - hMosq * 0.82;
      var maximo = H - hColgante - 8;
      L1 = Math.max(28, Math.min(objetivo, maximo));
      L2 = hColgante * 0.56;
      var periodo = 1.9;
      g = (L1 + L2) * Math.pow((2 * Math.PI) / periodo, 2);
      cinta.style.top = -EXTRA + "px";
      cinta.style.height = (L1 + EXTRA) + "px";
      cinta.style.transformOrigin = "50% " + EXTRA + "px";
      return true;
    }

    function reposo() {
      B.x = B.px = ax; B.y = B.py = L1;
      C.x = C.px = ax; C.y = C.py = L1 + L2;
    }

    /* ---------- Estado ---------- */
    var arrastrando = false, idPuntero = null, offX = 0, offY = 0, objX = 0, objY = 0;
    var inicioX = 0, inicioY = 0, inicioT = 0, movido = false;
    var visible = true, raf = 0, tAnterior = 0, acumulado = 0, tiempo = 0;
    var ang2Anterior = 0, giro = 0, impulso = 0;
    var PASO = 1 / 120;

    function paso(dt) {
      var amort = 0.9935;
      // B (mosquetón, ligero)
      var vx = (B.x - B.px) * amort, vy = (B.y - B.py) * amort;
      B.px = B.x; B.py = B.y;
      B.x += vx; B.y += vy + g * 0.6 * dt * dt;
      if (!arrastrando) {
        vx = (C.x - C.px) * amort; vy = (C.y - C.py) * amort;
        C.px = C.x; C.py = C.y;
        C.x += vx + impulso; C.y += vy + g * dt * dt;
      } else {
        C.px = C.x; C.py = C.y;
        // límite: la cinta no estira
        var dx = objX - A.x, dy = objY - A.y, d = Math.hypot(dx, dy), max = (L1 + L2) * 0.999;
        if (d > max) { dx *= max / d; dy *= max / d; }
        if (dy < L2 * 0.5) dy = L2 * 0.5;
        // seguimiento suave para que el movimiento sea orgánico
        C.x += (A.x + dx - C.x) * 0.45;
        C.y += (A.y + dy - C.y) * 0.45;
      }
      impulso *= 0.5;
      for (var i = 0; i < 8; i++) {
        // A-B (A fija)
        var ex = B.x - A.x, ey = B.y - A.y, el = Math.hypot(ex, ey) || 1, k = (el - L1) / el;
        B.x -= ex * k; B.y -= ey * k;
        // B-C (C más pesada)
        ex = C.x - B.x; ey = C.y - B.y; el = Math.hypot(ex, ey) || 1; k = (el - L2) / el;
        if (arrastrando) { B.x += ex * k; B.y += ey * k; }
        else {
          B.x += ex * k * 0.72; B.y += ey * k * 0.72;
          C.x -= ex * k * 0.28; C.y -= ey * k * 0.28;
        }
      }
    }

    function energia() {
      return Math.abs(C.x - C.px) + Math.abs(C.y - C.py) + Math.abs(B.x - B.px) +
        Math.abs(C.x - ax) * 0.02 + Math.abs(giro) * 0.1;
    }

    function pintar(dtReal) {
      var a1 = Math.atan2(B.x - A.x, B.y - A.y);
      var a2 = Math.atan2(C.x - B.x, C.y - B.y);
      var idle1 = 0, idle2 = 0;
      if (!reducido) {
        var t = tiempo;
        var w = (2 * Math.PI) / 4.6;
        idle1 = 1.1 * GRADO * Math.sin(t * w);
        idle2 = 2.2 * GRADO * Math.sin(t * w - 0.7) + 0.45 * GRADO * Math.sin(t * 1.9 + 1.3);
      }
      var f1 = a1 + idle1, f2 = a2 + idle2;
      var bx = A.x + L1 * Math.sin(f1), by = A.y + L1 * Math.cos(f1);
      // giro en Y según velocidad angular: hace bailar el brillo del plástico
      if (dtReal > 0) {
        var va = (f2 - ang2Anterior) / dtReal;
        giro += (Math.max(-9, Math.min(9, -va * 6)) - giro) * Math.min(1, dtReal * 6);
      }
      ang2Anterior = f2;
      cinta.style.transform = "rotate(" + (-f1 / GRADO).toFixed(3) + "deg)";
      // Sin giro 3D apreciable se usa una transformación 2D: el texto se rasteriza nítido
      var t3d = Math.abs(giro) > 0.35
        ? " perspective(900px) rotateY(" + giro.toFixed(2) + "deg)" : "";
      colgante.style.transform =
        "translate(" + (bx - ax).toFixed(2) + "px," + by.toFixed(2) + "px) rotate(" +
        (-f2 / GRADO).toFixed(3) + "deg)" + t3d;
      brillo.style.transform = "translate3d(" + (-f2 * 160 + giro * 1.4).toFixed(2) + "%,0,0)";
    }

    function bucle(ahora) {
      raf = 0;
      var dtReal = tAnterior ? Math.min(0.05, (ahora - tAnterior) / 1000) : PASO;
      tAnterior = ahora;
      tiempo += dtReal;
      acumulado += dtReal;
      while (acumulado >= PASO) { paso(PASO); acumulado -= PASO; }
      pintar(dtReal);
      if (!arrastrando && !visible && energia() < 0.05) { tAnterior = 0; return; }
      raf = requestAnimationFrame(bucle);
    }
    function despertar() {
      if (reducido || raf) return;
      tAnterior = 0;
      raf = requestAnimationFrame(bucle);
    }

    /* ---------- Puntero ---------- */
    function local(e) {
      var r = raiz.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    }
    function alBajar(e) {
      if (e.button != null && e.button > 0) return;
      inicioX = e.clientX; inicioY = e.clientY; inicioT = performance.now(); movido = false;
      if (reducido) return;
      e.preventDefault();
      arrastrando = true;
      idPuntero = e.pointerId;
      try { funda.setPointerCapture(e.pointerId); } catch (_) {}
      var p = local(e);
      offX = C.x - p.x; offY = C.y - p.y;
      objX = C.x; objY = C.y;
      raiz.classList.add("es-arrastrando");
      despertar();
    }
    function alMover(e) {
      if (!arrastrando || e.pointerId !== idPuntero) return;
      if (Math.hypot(e.clientX - inicioX, e.clientY - inicioY) > 6) movido = true;
      var p = local(e);
      objX = p.x + offX; objY = p.y + offY;
    }
    function alSoltar(e) {
      var fueClick = !movido && performance.now() - inicioT < 600 &&
        Math.hypot(e.clientX - inicioX, e.clientY - inicioY) <= 6;
      if (arrastrando && e.pointerId === idPuntero) {
        arrastrando = false;
        idPuntero = null;
        raiz.classList.remove("es-arrastrando");
        try { funda.releasePointerCapture(e.pointerId); } catch (_) {}
        // limita la velocidad de salida
        var vx = C.x - C.px, vy = C.y - C.py, v = Math.hypot(vx, vy), lim = 22;
        if (v > lim) { C.px = C.x - vx * lim / v; C.py = C.y - vy * lim / v; }
        despertar();
      }
      if (e.type === "pointerup" && fueClick && typeof opciones.onClick === "function") {
        opciones.onClick(e);
      }
    }
    funda.addEventListener("pointerdown", alBajar);
    funda.addEventListener("pointermove", alMover);
    funda.addEventListener("pointerup", alSoltar);
    funda.addEventListener("pointercancel", alSoltar);
    funda.addEventListener("dragstart", function (e) { e.preventDefault(); });

    /* ---------- Scroll ---------- */
    var ultimoScroll = window.scrollY || 0;
    function alScroll() {
      var y = window.scrollY || 0, d = y - ultimoScroll;
      ultimoScroll = y;
      if (reducido || arrastrando) return;
      impulso += Math.max(-2.2, Math.min(2.2, d * 0.035));
      despertar();
    }
    window.addEventListener("scroll", alScroll, { passive: true });

    /* ---------- Observadores ---------- */
    var io = null, ro = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(function (ent) {
        visible = ent[ent.length - 1].isIntersecting;
        if (visible) despertar();
      });
      io.observe(raiz);
    }
    if ("ResizeObserver" in window) {
      ro = new ResizeObserver(function () {
        if (medir()) { reposo(); pintar(0); despertar(); }
      });
      ro.observe(raiz);
    }

    function aplicarModo() {
      reducido = mq.matches;
      raiz.classList.toggle("es-estatico", reducido);
      if (reducido) {
        if (raf) cancelAnimationFrame(raf);
        raf = 0; arrastrando = false;
        reposo(); giro = 0; pintar(0);
      } else {
        despertar();
      }
    }
    if (mq.addEventListener) mq.addEventListener("change", aplicarModo);
    else if (mq.addListener) mq.addListener(aplicarModo);

    if (medir()) reposo();
    pintar(0);
    aplicarModo();
    // Re-mide cuando la imagen o la fuente cambian la altura de la tarjeta
    var img = raiz.querySelector(".carnet__foto img");
    if (img && !img.complete) img.addEventListener("load", function () { if (medir()) pintar(0); }, { once: true });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { if (raiz.isConnected && medir()) pintar(0); });

    return {
      destruir: function () {
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
        window.removeEventListener("scroll", alScroll);
        if (mq.removeEventListener) mq.removeEventListener("change", aplicarModo);
        else if (mq.removeListener) mq.removeListener(aplicarModo);
        if (io) io.disconnect();
        if (ro) ro.disconnect();
        if (raiz.parentNode) raiz.parentNode.removeChild(raiz);
      }
    };
  }

  window.Carnet = { montar: montar };
})();
