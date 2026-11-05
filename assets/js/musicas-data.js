/* =========================================================
   Dados das 27 músicas analisadas.
   Gera as páginas "Músicas" (lista) e "musica.html?id=..." (ficha).

   Campos de cada música:
     titulo, artista
     ano     → ano de lançamento/festival (opcional)
     aviso   → texto do aviso de conteúdo (deixe "" para não exibir).
               Só preencher após aprovação da pesquisadora/orientador.
   As análises ficam em dados/analises.js e as letras/links em dados/letras.js
   (esses arquivos devem ser carregados ANTES deste).
   ========================================================= */

var ARTISTAS = ["Elton Saldanha", "César Passarinho", "Wilson Paim", "Luiz Marenco"];

var EIXOS = [
  { chave: "grupos",       titulo: "Grupos étnicos identificados" },
  { chave: "figura",       titulo: "Construção da figura do gaúcho" },
  { chave: "pluralidade",  titulo: "Presença de pluralidade cultural" },
  { chave: "padronizacao", titulo: "Padronização identitária" },
  { chave: "ausencias",    titulo: "Ausências e invisibilização" }
];

var MUSICAS = [
  // Elton Saldanha
  { titulo: "Canta Catarina",                      artista: "Elton Saldanha" },
  { titulo: "Entrando no M'Bororé",                artista: "Elton Saldanha" },
  { titulo: "Eu Sou do Sul",                       artista: "Elton Saldanha" },
  { titulo: "Farroupilha de Guerra",               artista: "Elton Saldanha" },
  { titulo: "O Missioneiro",                       artista: "Elton Saldanha" },
  { titulo: "Quilombo dos Mamau",                  artista: "Elton Saldanha" },
  // César Passarinho
  { titulo: "Cambicho",                            artista: "César Passarinho" },
  { titulo: "Gauchada",                            artista: "César Passarinho" },
  { titulo: "Manoel Preto",                        artista: "César Passarinho" },
  { titulo: "Negado ao Negro",                     artista: "César Passarinho" },
  { titulo: "Negro Bonifácio",                     artista: "César Passarinho" },
  { titulo: "Negro da Gaita",                      artista: "César Passarinho" },
  { titulo: "O Negro de 35",                       artista: "César Passarinho" },
  { titulo: "Tropeiro dos Quatro Ventos",          artista: "César Passarinho" },
  // Wilson Paim
  { titulo: "A Gaita do Negro",                    artista: "Wilson Paim" },
  { titulo: "Barranca e Fronteira",                artista: "Wilson Paim" },
  { titulo: "Memórias de um Velho Peão",           artista: "Wilson Paim" },
  { titulo: "Mulato Serafim",                      artista: "Wilson Paim" },
  { titulo: "Negra Maria",                         artista: "Wilson Paim" },
  // Luiz Marenco
  { titulo: "A Moda Martin Fierro",                artista: "Luiz Marenco" },
  { titulo: "Alma de Campo",                       artista: "Luiz Marenco" },
  { titulo: "Funeral da Coxilha",                  artista: "Luiz Marenco" },
  { titulo: "Gaúcho",                              artista: "Luiz Marenco" },
  { titulo: "Milonga Missioneira",                 artista: "Luiz Marenco" },
  { titulo: "Milongão Pra Assobiar Desencilhando", artista: "Luiz Marenco" },
  { titulo: "Os da Última Tropa",                  artista: "Luiz Marenco" },
  { titulo: "Um Gaúcho Vem da Fronteira",          artista: "Luiz Marenco" }
];

// Gera número e identificador (usado na URL) de cada música e junta
// as análises (dados/analises.js) e as letras (dados/letras.js).
(function () {
  var analises = window.ANALISES || {};
  var letras = window.LETRAS || {};
  function slug(t) {
    return t.normalize("NFD").replace(/[̀-ͯ]/g, "")
      .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }
  MUSICAS.forEach(function (m, i) {
    m.n = i + 1;
    m.id = m.id || slug(m.titulo);
    m.ano = m.ano || "";
    m.aviso = m.aviso || "";
    var l = letras[m.id] || {};
    m.letra = (m.letra || l.letra || "").trim();
    m.link = m.link || l.link || "";
    m.analise = m.analise || analises[m.id] || {};
  });
})();
