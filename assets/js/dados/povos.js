/* =========================================================
   Textos do mapa interativo — resumos do PFI (seção 2.2.2).
   Revisado pela pesquisadora (2026-11-06).

   data    → texto curto mostrado na linha do tempo e na caixinha
   etapa   → id da etapa em que a região aparece no mapa
   onde    → onde se estabeleceram / territórios
   resumo  → quem eram / como chegaram
   contrib → principais contribuições citadas no PFI
   ========================================================= */

var POVOS = {
  kaingangs: {
    nome: "Kaingang", cor: "#b0287f", etapa: "originarios", data: "Povo originário",
    onde: "Planalto Meridional e Encosta da Serra (norte e nordeste do estado).",
    resumo: "Também chamados Jês, eram divididos em várias tribos, como Guarás, Coroados e Xoklengs. Foram o grupo mais dedicado à agricultura, e os povos indígenas que ainda vivem no Rio Grande do Sul descendem dos Jês.",
    contrib: ["Cestaria com fibras vegetais", "Coivara (preparo da terra para o plantio)", "Agricultura"]
  },
  pampeanos: {
    nome: "Pampeanos", cor: "#d9772b", etapa: "originarios", data: "Povo originário",
    onde: "Região da Campanha e Serra do Herval.",
    resumo: "Charruas, Minuanos, Guenoas, Iarós, Chanás e Guaicurus. Nômades, caçadores, pescadores e coletores, tornaram-se grandes cavaleiros depois da chegada do gado e do cavalo ao território.",
    contrib: ["Boleadeiras e laço", "Poncho", "Chiripá primitivo"]
  },
  guaranis: {
    nome: "Guarani", cor: "#5b2d82", etapa: "originarios", data: "Povo originário",
    onde: "Margem leste do Rio Uruguai, serras e planícies litorâneas.",
    resumo: "Tapes, Carijós, Arachanes e Patos. Eram o grupo mais populoso; caçavam, pescavam e praticavam a agricultura. Foram o primeiro grupo reunido nas reduções e missões jesuíticas.",
    contrib: ["Erva-mate", "Nomes de rios e lugares", "Pala, chiripá e lança", "Mitos como Curupira e Boitatá"]
  },
  espanhois: {
    nome: "Espanhóis", cor: "#8a8580", etapa: "1626", data: "1626",
    onde: "Região das Missões, na margem esquerda do Rio Uruguai.",
    resumo: "Primeiros europeus a chegar, com os padres jesuítas que atravessaram o Rio Uruguai para catequizar os indígenas e fundaram as Reduções (1626). A partir de 1682, os Sete Povos das Missões formaram os primeiros núcleos urbanos do estado.",
    contrib: ["Primeiros núcleos urbanos (Sete Povos)", "Ofícios: artesãos, ferreiros, comerciantes (após 1885)", "Organização sindical no início do século XX"]
  },
  portugueses: {
    nome: "Portugueses", cor: "#c99a1e", etapa: "1737", data: "1737",
    onde: "Barra do Rio Grande e litoral sul.",
    resumo: "A ocupação portuguesa começou com o Forte Jesus-Maria-José, fundado pelo brigadeiro José da Silva Paes para garantir a posse do território, defender a barra do Rio Grande e servir de base para a primeira vila gaúcha.",
    contrib: ["Língua portuguesa", "Manifestações religiosas populares", "A maioria das danças tradicionalistas", "Trajes de estancieiro"]
  },
  negros: {
    nome: "Negros", cor: "#a3123a", etapa: "1737", data: "1737",
    onde: "Charqueadas, agricultura litorânea e cidades — com forte presença no sul do estado.",
    resumo: "Trazidos à força e escravizados, sua presença começou com a ocupação portuguesa e se intensificou a partir de 1737–1750, com as charqueadas. Em 1780 eram cerca de 30% da população. Os Lanceiros Negros lutaram na Revolução Farroupilha sob promessa de liberdade e foram massacrados em Porongos, em 1844.",
    contrib: ["Base do desenvolvimento econômico do estado", "Religiões de matriz africana (batuque, nação, umbanda)", "Tambor de sopapo e dança do bambaquerê", "Culinária e vocabulário"]
  },
  acorianos: {
    nome: "Açorianos", cor: "#2f7d4f", etapa: "1752", data: "1752",
    onde: "Porto dos Casais (atual Porto Alegre) e litoral.",
    resumo: "Sessenta casais vindos do arquipélago dos Açores se estabeleceram no Porto de São Francisco dos Casais, hoje Porto Alegre, para reforçar a presença portuguesa entre Santa Catarina e o Rio da Prata.",
    contrib: ["Agricultura familiar", "Fortalecimento da língua portuguesa na região"]
  },
  alemaes: {
    nome: "Alemães", cor: "#2c4fa0", etapa: "1824", data: "1824",
    onde: "Vale do Rio dos Sinos e, depois, Serra, vales do Pardo e do Taquari e região central.",
    resumo: "A imigração oficial começou em 25 de julho de 1824, com 38 casais na colônia de São Leopoldo. Depois, imigrantes e descendentes ocuparam a Serra, os vales dos rios Pardo e Taquari e, em 1858, fundaram São Lourenço do Sul.",
    contrib: ["Primeiras fábricas e o comércio", "Artesanato: ferramentas, calçados, tecidos", "Produção de cerveja"]
  },
  italianos: {
    nome: "Italianos", cor: "#2a8fa8", etapa: "1875", data: "1875",
    onde: "Encosta superior do planalto — a Serra.",
    resumo: "Os primeiros chegaram em 1872, mas a imigração em massa começou em 1875. Fundaram as colônias que deram origem a Garibaldi, Bento Gonçalves e Caxias do Sul, tornando-se pequenos proprietários de terra.",
    contrib: ["Vitivinicultura e cooperativismo", "Dialeto vêneto", "Polenta, massas e vinho", "O filó, encontro entre vizinhos"]
  }
};

// Ordem de exibição na legenda
var ORDEM_POVOS = ["kaingangs", "pampeanos", "guaranis", "espanhois", "portugueses", "negros", "acorianos", "alemaes", "italianos"];
