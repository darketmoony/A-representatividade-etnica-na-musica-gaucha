/* =========================================================
   Mapa interativo e temporal (página 2).
   Dados: MAPA_RS (dados/mapa.js), POVOS (dados/povos.js), ICONES (icones.js)

   Etapas: Povos originários → 1626 → 1737 → 1752 → 1824 → 1875 → Síntese
   - Povos originários: territórios indígenas antes da colonização.
   - 1626 a 1875: as regiões dos povos que chegam são pintadas por cima
     dos territórios originários (acumulativo).
   - Síntese: as 9 regiões do desenho da pesquisa.
   ========================================================= */
(function () {
  var NS = "http://www.w3.org/2000/svg";
  var M = MAPA_RS, ETAPAS = M.etapas;
  var INDIGENAS = ["kaingangs", "guaranis", "pampeanos"];
  var atual = 0, selecionado = null, timer = null;

  function el(tag, attrs, pai) {
    var e = document.createElementNS(NS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (pai) pai.appendChild(e);
    return e;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  // Povos presentes até a etapa i (inclusive)
  function chegaramAte(i) {
    var lista = INDIGENAS.slice();
    for (var k = 1; k <= Math.min(i, ETAPAS.length - 1); k++) lista = lista.concat(ETAPAS[k].chegam);
    return lista;
  }
  function indiceEtapa(id) {
    for (var k = 0; k < ETAPAS.length; k++) if (ETAPAS[k].id === id) return k;
    return 0;
  }

  /* ---------- SVG ---------- */
  var fig = document.getElementById("mapa");
  var svg = el("svg", { viewBox: "-30 -30 " + (M.largura + 60) + " " + (M.altura + 60), role: "group", "aria-label": "Regiões do Rio Grande do Sul" });
  fig.appendChild(svg);
  var gOrig = el("g", { "class": "camada-orig" }, svg);
  var gReg = el("g", { "class": "camada-reg" }, svg);
  var gPin = el("g", { "class": "camada-pinos" }, svg);

  var pathsOrig = {}, pathsReg = {}, pinos = {};
  INDIGENAS.forEach(function (p) {
    var e = el("path", { d: M.originarios[p].d, fill: POVOS[p].cor, "class": "area area-orig", "data-povo": p }, gOrig);
    pathsOrig[p] = e;
  });
  ORDEM_POVOS.forEach(function (p) {
    pathsReg[p] = el("path", { d: M.regioes[p].d, fill: POVOS[p].cor, "class": "area area-reg", "data-povo": p }, gReg);
  });
  ORDEM_POVOS.forEach(function (p) {
    var g = el("g", { "class": "pino", "data-povo": p, tabindex: "0", role: "button", "aria-label": POVOS[p].nome + " — " + POVOS[p].data }, gPin);
    el("circle", { r: 24, fill: POVOS[p].cor, "class": "pino-fundo" }, g);
    var ic = el("g", { transform: "translate(-13 -13) scale(1.08)", fill: "none", stroke: "#fffdf8", "stroke-width": "1.7", "stroke-linecap": "round", "stroke-linejoin": "round" }, g);
    ic.innerHTML = ICONES[p];
    pinos[p] = g;
  });

  /* ---------- Legenda ---------- */
  var legenda = document.getElementById("legenda");
  legenda.innerHTML = ORDEM_POVOS.map(function (p) {
    return '<li><button class="povo-btn" data-povo="' + p + '">' +
      '<span class="povo-icone" style="background:' + POVOS[p].cor + '">' + iconeSVG(p, 18) + "</span>" +
      '<span class="povo-nome">' + esc(POVOS[p].nome) + "</span>" +
      '<span class="povo-data">' + esc(POVOS[p].data) + "</span></button></li>";
  }).join("");

  /* ---------- Linha do tempo ---------- */
  var linha = document.getElementById("linha");
  linha.innerHTML = ETAPAS.map(function (e, i) {
    return '<li><button class="tempo-ponto" data-i="' + i + '"><span class="tempo-ano">' + esc(e.rotulo) + "</span>" +
      '<span class="tempo-sub">' + esc(e.sub) + "</span></button></li>";
  }).join("");

  /* ---------- Caixinha de informações ---------- */
  var card = document.getElementById("card");
  function abrir(p) {
    selecionado = p;
    var d = POVOS[p];
    card.innerHTML =
      '<button class="janela-fechar" aria-label="Fechar">×</button>' +
      '<div class="card-topo"><span class="povo-icone grande" style="background:' + d.cor + '">' + iconeSVG(p, 24) + "</span>" +
      "<div><h2>" + esc(d.nome) + '</h2><span class="card-data">' +
      (INDIGENAS.indexOf(p) >= 0 ? "Povo originário — antes da colonização europeia" : "Chegada ao RS: " + esc(d.data)) +
      "</span></div></div>" +
      '<p class="card-onde"><strong>Onde:</strong> ' + esc(d.onde) + "</p>" +
      "<p>" + esc(d.resumo) + "</p>" +
      '<p class="card-rotulo">Contribuições</p><ul class="card-contrib">' +
      d.contrib.map(function (c) { return "<li>" + esc(c) + "</li>"; }).join("") + "</ul>" +
      '<button class="card-voltar">← Ver todos os povos</button>';
    card.hidden = false;
    legenda.hidden = true;
    marcarSelecao();
    // No celular a caixinha fica abaixo do mapa: rola até ela
    if (window.matchMedia("(max-width: 900px)").matches) card.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
  function fechar() { selecionado = null; card.hidden = true; legenda.hidden = false; marcarSelecao(); }
  function marcarSelecao() {
    [].forEach.call(svg.querySelectorAll("[data-povo]"), function (n) {
      n.classList.toggle("ativo", n.getAttribute("data-povo") === selecionado);
    });
    [].forEach.call(legenda.querySelectorAll(".povo-btn"), function (b) {
      b.classList.toggle("ativo", b.getAttribute("data-povo") === selecionado);
    });
  }

  /* ---------- Aplicar etapa ---------- */
  function irPara(i) {
    atual = Math.max(0, Math.min(ETAPAS.length - 1, i));
    var e = ETAPAS[atual];
    var sintese = e.id === "sintese";
    var presentes = chegaramAte(atual);

    INDIGENAS.forEach(function (p) {
      var o = pathsOrig[p];
      o.classList.toggle("oculta", sintese);
      o.classList.toggle("esmaecida", !sintese && atual > 0);
    });
    ORDEM_POVOS.forEach(function (p) {
      var indig = INDIGENAS.indexOf(p) >= 0;
      var visivel = sintese || (!indig && presentes.indexOf(p) >= 0);
      pathsReg[p].classList.toggle("visivel", visivel);
      pathsReg[p].classList.toggle("nova", !sintese && e.chegam.indexOf(p) >= 0);

      var pos = null;
      if (sintese || !indig) pos = visivel ? M.regioes[p].icone : null;
      else pos = (e.icones_originarios || {})[p] || null;
      var pino = pinos[p];
      if (pos) {
        pino.style.transform = "translate(" + pos[0] + "px," + pos[1] + "px)";
        pino.classList.remove("oculto");
        pino.removeAttribute("aria-hidden"); pino.setAttribute("tabindex", "0");
      } else {
        pino.classList.add("oculto");
        pino.setAttribute("aria-hidden", "true"); pino.setAttribute("tabindex", "-1");
      }
    });

    [].forEach.call(linha.querySelectorAll(".tempo-ponto"), function (b, k) {
      if (k === atual) b.setAttribute("aria-current", "step"); else b.removeAttribute("aria-current");
      b.classList.toggle("passado", k < atual);
    });
    [].forEach.call(legenda.querySelectorAll(".povo-btn"), function (b) {
      b.classList.toggle("ausente", presentes.indexOf(b.getAttribute("data-povo")) < 0);
    });

    var txt = sintese
      ? "Síntese: as nove regiões da pesquisa, onde cada matriz étnica se destaca na formação do estado."
      : atual === 0
        ? "Antes da colonização europeia, o território era ocupado pelos povos Kaingang, Guarani e Pampeanos."
        : e.rotulo + " — chegam: " + e.chegam.map(function (p) { return POVOS[p].nome; }).join(" e ") + " (" + e.sub + ").";
    document.getElementById("tempo-legenda").textContent = txt;

    document.getElementById("t-ant").disabled = atual === 0;
    document.getElementById("t-prox").disabled = atual === ETAPAS.length - 1;

    // Se o povo selecionado não está mais visível, fecha a caixinha
    if (selecionado && pinos[selecionado].classList.contains("oculto")) fechar();
  }

  function parar() {
    clearInterval(timer); timer = null;
    var b = document.getElementById("t-play");
    b.textContent = "▶"; b.setAttribute("aria-label", "Reproduzir linha do tempo");
  }
  function tocar() {
    if (timer) return parar();
    if (atual === ETAPAS.length - 1) irPara(0);
    var b = document.getElementById("t-play");
    b.textContent = "❚❚"; b.setAttribute("aria-label", "Pausar linha do tempo");
    timer = setInterval(function () {
      if (atual >= ETAPAS.length - 1) return parar();
      irPara(atual + 1);
    }, 2600);
  }

  /* ---------- Eventos ---------- */
  svg.addEventListener("click", function (ev) {
    var n = ev.target.closest("[data-povo]");
    if (!n || n.classList.contains("oculta") || n.classList.contains("oculto")) return;
    var p = n.getAttribute("data-povo");
    // Áreas originárias esmaecidas continuam clicáveis (mostram o povo originário)
    abrir(p);
  });
  svg.addEventListener("keydown", function (ev) {
    if ((ev.key === "Enter" || ev.key === " ") && ev.target.classList.contains("pino")) {
      ev.preventDefault(); abrir(ev.target.getAttribute("data-povo"));
    }
  });
  legenda.addEventListener("click", function (ev) {
    var b = ev.target.closest(".povo-btn"); if (!b) return;
    var p = b.getAttribute("data-povo");
    var alvo = indiceEtapa(POVOS[p].etapa);
    if (chegaramAte(atual).indexOf(p) < 0) { parar(); irPara(alvo); }
    abrir(p);
  });
  linha.addEventListener("click", function (ev) {
    var b = ev.target.closest(".tempo-ponto"); if (!b) return;
    parar(); irPara(+b.getAttribute("data-i"));
  });
  card.addEventListener("click", function (ev) { if (ev.target.closest(".janela-fechar, .card-voltar")) fechar(); });
  document.addEventListener("keydown", function (ev) { if (ev.key === "Escape" && !card.hidden) fechar(); });
  document.getElementById("t-ant").addEventListener("click", function () { parar(); irPara(atual - 1); });
  document.getElementById("t-prox").addEventListener("click", function () { parar(); irPara(atual + 1); });
  document.getElementById("t-play").addEventListener("click", tocar);

  irPara(0);
})();
