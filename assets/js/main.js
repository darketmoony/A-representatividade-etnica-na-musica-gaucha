/* =========================================================
   Comportamentos compartilhados por todas as páginas:
   cabeçalho/menu, rodapé, navegação "anterior/próxima" e janelas.
   Cada página informa qual ela é em <body data-pagina="...">.
   ========================================================= */

// Ordem das páginas (usada no menu e na navegação anterior/próxima).
var PAGINAS = [
  { id: "inicio",     href: "index.html",      menu: "Início",     titulo: "Quem é o gaúcho?" },
  { id: "mapa",       href: "mapa.html",       menu: "Mapa",       titulo: "Um estado, muitas histórias" },
  { id: "gaucho",     href: "gaucho.html",     menu: "O Gaúcho",   titulo: "Como se construiu a ideia de gaúcho?" },
  { id: "festivais",  href: "festivais.html",  menu: "Festivais",  titulo: "Os festivais" },
  { id: "artistas",   href: "artistas.html",   menu: "Artistas",   titulo: "Quem canta essa história?" },
  { id: "musicas",    href: "musicas.html",    menu: "Músicas",    titulo: "27 músicas, 5 perguntas" },
  { id: "resultados", href: "resultados.html", menu: "Resultados", titulo: "O que aparece e o que não aparece?" },
  { id: "conclusao",  href: "conclusao.html",  menu: "Conclusão",  titulo: "Então, afinal… quem é o gaúcho?" },
  { id: "sobre",      href: "sobre.html",      menu: "Sobre",      titulo: "Sobre a pesquisa" }
];

var TITULO_PROJETO = "A Representatividade Étnica na Música Gaúcha";

(function () {
  var body = document.body;
  var atual = body.getAttribute("data-pagina");
  // A ficha de música (página 7) pertence à seção "Músicas" no menu.
  var menuAtivo = atual === "musica" ? "musicas" : atual;

  /* ---------- Cabeçalho ---------- */
  var itens = PAGINAS.map(function (p) {
    var ativo = p.id === menuAtivo ? ' aria-current="page"' : "";
    return '<li><a href="' + p.href + '"' + ativo + ">" + p.menu + "</a></li>";
  }).join("");

  var header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML =
    '<div class="container">' +
      '<a class="brand" href="index.html">' +
        '<span class="brand-mark" aria-hidden="true">g</span>' +
        "<span>" + TITULO_PROJETO + "</span>" +
      "</a>" +
      '<button class="nav-toggle" aria-label="Abrir menu" aria-expanded="false" aria-controls="menu-principal"><span></span></button>' +
      '<nav class="site-nav" id="menu-principal" aria-label="Menu principal"><ul>' + itens + "</ul></nav>" +
    "</div>";

  var skip = document.createElement("a");
  skip.className = "skip-link";
  skip.href = "#conteudo";
  skip.textContent = "Pular para o conteúdo";

  body.insertBefore(header, body.firstChild);
  body.insertBefore(skip, header);

  var toggle = header.querySelector(".nav-toggle");
  toggle.addEventListener("click", function () {
    var aberto = body.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", aberto ? "true" : "false");
    toggle.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  });

  /* ---------- Navegação anterior / próxima ---------- */
  var idx = -1;
  PAGINAS.forEach(function (p, i) { if (p.id === atual) idx = i; });
  var main = document.querySelector("main");
  if (idx > 0 && main && !body.hasAttribute("data-sem-pager")) {
    var ant = PAGINAS[idx - 1];
    var prox = PAGINAS[idx + 1];
    var pager = document.createElement("nav");
    pager.className = "pager";
    pager.setAttribute("aria-label", "Navegação entre páginas");
    pager.innerHTML =
      '<div class="container">' +
        '<a href="' + ant.href + '"><small>← Anterior</small><strong>' + ant.titulo + "</strong></a>" +
        (prox ? '<a class="proxima" href="' + prox.href + '"><small>Próxima →</small><strong>' + prox.titulo + "</strong></a>" : "") +
      "</div>";
    main.appendChild(pager);
  }

  /* ---------- Rodapé (provisório — conteúdo ainda a definir) ---------- */
  var footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML =
    '<div class="container">' +
      '<p class="frase">Música é memória, é povo, é identidade.</p>' +
    "</div>";
  body.appendChild(footer);

  /* ---------- Janelas (dialog) ----------
     Um botão com data-abrir="id-da-janela" abre o <dialog id="id-da-janela">. */
  document.addEventListener("click", function (e) {
    var gatilho = e.target.closest("[data-abrir]");
    if (gatilho) {
      var dlg = document.getElementById(gatilho.getAttribute("data-abrir"));
      if (dlg && dlg.showModal) dlg.showModal();
      return;
    }
    if (e.target.closest(".janela-fechar")) {
      e.target.closest("dialog").close();
      return;
    }
    // Clique fora do conteúdo fecha a janela
    if (e.target.tagName === "DIALOG") e.target.close();
  });
})();
