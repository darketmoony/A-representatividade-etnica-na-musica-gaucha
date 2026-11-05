/* =========================================================
   Gráficos da página Resultados (página 8).
   Tudo é calculado a partir de CLASSIFICACAO (dados/resultados.js),
   então os números se atualizam sozinhos se a classificação mudar.
   ========================================================= */
(function () {
  var C = CATEGORIAS;
  var total = MUSICAS.length;
  var porId = {};
  MUSICAS.forEach(function (m) { porId[m.id] = m; });

  function h(tag, attrs, filhos) {
    var e = document.createElement(tag);
    for (var k in attrs || {}) {
      if (k === "texto") e.textContent = attrs[k];
      else if (k === "estilo") e.style.cssText = attrs[k];
      else e.setAttribute(k, attrs[k]);
    }
    (filhos || []).forEach(function (f) { if (f) e.appendChild(f); });
    return e;
  }
  function pct(n) { return Math.round((n / total) * 100) + "%"; }
  function musicasOnde(fn) { return MUSICAS.filter(function (m) { return fn(CLASSIFICACAO[m.id] || {}); }); }

  // ---------- contagens ----------
  var grupos = {
    nenhum: musicasOnde(function (c) { return !c.grupos || !c.grupos.length; }),
    negra: musicasOnde(function (c) { return (c.grupos || []).indexOf("negra") >= 0; }),
    indigena: musicasOnde(function (c) { return (c.grupos || []).indexOf("indigena") >= 0; }),
    mestica: musicasOnde(function (c) { return (c.grupos || []).indexOf("mestica") >= 0; }),
    europeus: musicasOnde(function (c) { return (c.grupos || []).indexOf("europeus") >= 0; })
  };
  function porCategoria(campo) {
    var r = {};
    C[campo].forEach(function (cat) { r[cat.id] = musicasOnde(function (c) { return c[campo] === cat.id; }); });
    return r;
  }
  var padr = porCategoria("padronizacao");
  var plur = porCategoria("pluralidade");

  // ---------- dica (tooltip) ----------
  var dica = document.getElementById("dica");
  function mostrarDica(alvo, ev) {
    dica.innerHTML = "";
    dica.appendChild(h("strong", { texto: alvo.getAttribute("data-valor") }));
    dica.appendChild(h("span", { texto: alvo.getAttribute("data-rotulo") }));
    dica.hidden = false;
    var r = ev && ev.clientX != null ? { x: ev.clientX, y: ev.clientY } : (function () {
      var b = alvo.getBoundingClientRect(); return { x: b.left + b.width / 2, y: b.top };
    })();
    var w = dica.offsetWidth;
    dica.style.left = Math.max(8, Math.min(window.innerWidth - w - 8, r.x - w / 2)) + "px";
    dica.style.top = (r.y - dica.offsetHeight - 12 + window.scrollY) + "px";
  }
  function ligarDica(el, valor, rotulo) {
    el.setAttribute("data-valor", valor);
    el.setAttribute("data-rotulo", rotulo);
    el.setAttribute("tabindex", "0");
    el.setAttribute("aria-label", rotulo + ": " + valor);
    el.addEventListener("pointermove", function (ev) { mostrarDica(el, ev); });
    el.addEventListener("pointerleave", function () { dica.hidden = true; });
    el.addEventListener("focus", function () { mostrarDica(el); });
    el.addEventListener("blur", function () { dica.hidden = true; });
  }
  function valorTxt(n) { return n + (n === 1 ? " música" : " músicas") + " (" + pct(n) + ")"; }

  // ---------- KPIs ----------
  var reforcam = padr.reforca.length + padr.estereotipo.length;
  var kpis = [
    { v: total, l: "músicas analisadas, de 4 artistas" },
    { v: grupos.nenhum.length, l: "não nomeiam nenhum grupo étnico" },
    { v: reforcam, l: "reforçam a padronização identitária ou estereotipam grupos" },
    { v: grupos.negra.length, l: "trazem a população negra" }
  ];
  var kpiBox = document.getElementById("kpis");
  kpis.forEach(function (k) {
    kpiBox.appendChild(h("div", { "class": "kpi" }, [h("span", { "class": "kpi-valor", texto: String(k.v) }), h("span", { "class": "kpi-rotulo", texto: k.l })]));
  });

  // ---------- 1. Barras horizontais: grupos ----------
  (function () {
    var alvo = document.getElementById("g-grupos");
    var max = Math.max.apply(null, C.grupos.map(function (g) { return grupos[g.id].length; }));
    var lista = h("div", { "class": "barras", role: "list" });
    C.grupos.forEach(function (g) {
      var n = grupos[g.id].length;
      var barra = h("span", { "class": "barra" + (g.id === "nenhum" ? " barra-neutra" : ""), estilo: "width:" + (n / max * 100) + "%" });
      var trilho = h("span", { "class": "barra-trilho" }, [barra, h("span", { "class": "barra-valor", texto: String(n) })]);
      var linha = h("div", { "class": "barra-linha", role: "listitem" }, [h("span", { "class": "barra-nome", texto: g.nome }), trilho]);
      ligarDica(linha, valorTxt(n), g.nome);
      lista.appendChild(linha);
    });
    alvo.appendChild(lista);
    document.getElementById("n-grupos").textContent =
      "Mais da metade das músicas (" + pct(grupos.nenhum.length) + ") não nomeia nenhum grupo étnico: o “gaúcho” aparece como figura universal. " +
      "Nenhuma música identifica explicitamente imigrantes alemães, italianos ou açorianos — a matriz europeia permanece implícita na figura do gaúcho.";
    tabelaListas("t-grupos", C.grupos.map(function (g) { return { nome: g.nome, musicas: grupos[g.id] }; }));
  })();

  // ---------- barra segmentada alta ----------
  function segmentada(alvoId, cats, dados) {
    var alvo = document.getElementById(alvoId);
    var barra = h("div", { "class": "segmentada", role: "img" });
    var desc = [];
    cats.forEach(function (c) {
      var n = dados[c.id].length; if (!n) return;
      var seg = h("span", { "class": "segmento", estilo: "flex:" + n + ";background:" + c.cor + ";color:" + c.texto },
        [h("span", { "class": "segmento-txt", texto: n >= 3 ? pct(n) : "" })]);
      ligarDica(seg, valorTxt(n), c.nome);
      barra.appendChild(seg);
      desc.push(c.nome + ": " + n);
    });
    barra.setAttribute("aria-label", desc.join("; "));
    alvo.appendChild(barra);
    alvo.appendChild(legenda(cats, dados));
  }
  function legenda(cats, dados) {
    var ul = h("ul", { "class": "legenda-graf" });
    cats.forEach(function (c) {
      ul.appendChild(h("li", {}, [h("span", { "class": "chave", estilo: "background:" + c.cor }),
        h("span", { texto: c.nome + (dados ? " — " + dados[c.id].length : "") })]));
    });
    return ul;
  }

  // ---------- 2. Padronização ----------
  segmentada("g-padronizacao", C.padronizacao, padr);
  document.getElementById("n-padronizacao").textContent =
    reforcam + " das " + total + " músicas (" + pct(reforcam) + ") reproduzem o padrão identitário ou constroem estereótipos. " +
    "As que tensionam ou questionam o padrão são, em geral, as que colocam pessoas negras e mestiças no centro da narrativa.";
  tabelaListas("t-padronizacao", C.padronizacao.map(function (c) { return { nome: c.nome, musicas: padr[c.id] }; }));

  // ---------- 3. Por artista: barras empilhadas ----------
  (function () {
    var alvo = document.getElementById("g-artistas");
    var max = 0;
    var linhas = ARTISTAS.map(function (a) {
      var doArtista = MUSICAS.filter(function (m) { return m.artista === a; });
      max = Math.max(max, doArtista.length);
      return { artista: a, musicas: doArtista };
    });
    var lista = h("div", { "class": "barras", role: "list" });
    linhas.forEach(function (l) {
      var pilha = h("span", { "class": "pilha", estilo: "width:" + (l.musicas.length / max * 100) + "%" });
      C.padronizacao.forEach(function (c) {
        var n = l.musicas.filter(function (m) { return (CLASSIFICACAO[m.id] || {}).padronizacao === c.id; }).length;
        if (!n) return;
        var seg = h("span", { "class": "pilha-seg", estilo: "flex:" + n + ";background:" + c.cor + ";color:" + c.texto },
          [h("span", { "class": "segmento-txt", texto: String(n) })]);
        ligarDica(seg, n + (n === 1 ? " música" : " músicas"), l.artista + " · " + c.nome);
        pilha.appendChild(seg);
      });
      lista.appendChild(h("div", { "class": "barra-linha", role: "listitem", "aria-label": l.artista }, [
        h("span", { "class": "barra-nome", texto: l.artista }),
        h("span", { "class": "barra-trilho" }, [pilha, h("span", { "class": "barra-valor", texto: String(l.musicas.length) })])
      ]));
    });
    alvo.appendChild(lista);
    alvo.appendChild(legenda(C.padronizacao));
    document.getElementById("n-artistas").textContent =
      "Luiz Marenco e Elton Saldanha concentram as músicas que reforçam o padrão. César Passarinho é o artista cujas canções mais questionam a figura do gaúcho tradicional, e Wilson Paim tem a maior parte de suas canções tensionando o padrão.";

    // tabela artista × categoria
    var t = h("table", { "class": "tabela-dados" });
    var cab = h("tr", {}, [h("th", { scope: "col", texto: "Artista" })].concat(C.padronizacao.map(function (c) { return h("th", { scope: "col", texto: c.nome }); })));
    t.appendChild(h("thead", {}, [cab]));
    var tb = h("tbody");
    linhas.forEach(function (l) {
      tb.appendChild(h("tr", {}, [h("th", { scope: "row", texto: l.artista })].concat(C.padronizacao.map(function (c) {
        return h("td", { texto: String(l.musicas.filter(function (m) { return (CLASSIFICACAO[m.id] || {}).padronizacao === c.id; }).length) });
      }))));
    });
    t.appendChild(tb);
    document.getElementById("t-artistas").appendChild(t);
  })();

  // ---------- 4. Pluralidade ----------
  segmentada("g-pluralidade", C.pluralidade, plur);
  document.getElementById("n-pluralidade").textContent =
    plur.baixa.length + " músicas têm pluralidade cultural baixa: retratam um único universo campeiro, sem diferenciar origens étnicas. " +
    "Em parte das músicas, a diversidade que aparece é territorial ou profissional, e não étnica.";
  tabelaListas("t-pluralidade", C.pluralidade.map(function (c) { return { nome: c.nome, musicas: plur[c.id] }; }));

  // ---------- listas (visão em tabela) ----------
  function tabelaListas(id, grupos) {
    var box = document.getElementById(id);
    grupos.forEach(function (g) {
      box.appendChild(h("h3", { texto: g.nome + " (" + g.musicas.length + ")" }));
      if (!g.musicas.length) { box.appendChild(h("p", { "class": "vazio", texto: "Nenhuma música." })); return; }
      var ul = h("ul", { "class": "lista-cat" });
      g.musicas.forEach(function (m) {
        ul.appendChild(h("li", {}, [h("a", { href: "musica.html?id=" + m.id, texto: m.titulo }), h("span", { texto: " — " + m.artista })]));
      });
      box.appendChild(ul);
    });
  }

  // ---------- abas ----------
  var abas = [].slice.call(document.querySelectorAll("#abas [role=tab]"));
  function ativar(aba, foco) {
    abas.forEach(function (a) {
      var sel = a === aba;
      a.setAttribute("aria-selected", sel ? "true" : "false");
      a.setAttribute("tabindex", sel ? "0" : "-1");
      document.getElementById(a.getAttribute("aria-controls")).hidden = !sel;
    });
    if (foco) aba.focus();
    dica.hidden = true;
  }
  abas.forEach(function (a, i) {
    a.addEventListener("click", function () { ativar(a); });
    a.addEventListener("keydown", function (ev) {
      if (ev.key === "ArrowRight") ativar(abas[(i + 1) % abas.length], true);
      if (ev.key === "ArrowLeft") ativar(abas[(i - 1 + abas.length) % abas.length], true);
    });
  });
})();
