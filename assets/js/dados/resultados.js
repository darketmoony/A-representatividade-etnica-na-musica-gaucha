/* =========================================================
   Classificação das 27 músicas para os gráficos de Resultados.
   Cada classificação foi lida das análises do PFI (dados/analises.js):
     grupos       ← "Grupo étnico presente"
     padronizacao ← "Existe padronização identitária?"
     pluralidade  ← primeira frase de "Presença de pluralidade cultural"
   Revisado pela pesquisadora (2026-11-06). Mudar aqui atualiza todos os gráficos.

   grupos:       "negra" | "indigena" | "mestica"  (lista; vazia = nenhum grupo nomeado)
   padronizacao: "estereotipo" | "reforca" | "parcial" | "questiona"
   pluralidade:  "baixa" | "limitada" | "ampla"
   ========================================================= */

var CLASSIFICACAO = {
  // Elton Saldanha
  "canta-catarina":             { grupos: ["indigena"],           padronizacao: "reforca",     pluralidade: "limitada" },
  "entrando-no-m-borore":       { grupos: [],                     padronizacao: "reforca",     pluralidade: "limitada" },
  "eu-sou-do-sul":              { grupos: [],                     padronizacao: "reforca",     pluralidade: "ampla" },
  "farroupilha-de-guerra":      { grupos: [],                     padronizacao: "reforca",     pluralidade: "baixa" },
  "o-missioneiro":              { grupos: [],                     padronizacao: "reforca",     pluralidade: "limitada" },
  "quilombo-dos-mamau":         { grupos: ["negra", "indigena"],  padronizacao: "estereotipo", pluralidade: "limitada" },
  // César Passarinho
  "cambicho":                   { grupos: ["negra", "mestica"],   padronizacao: "parcial",     pluralidade: "ampla" },
  "gauchada":                   { grupos: [],                     padronizacao: "reforca",     pluralidade: "baixa" },
  "manoel-preto":               { grupos: ["negra"],              padronizacao: "questiona",   pluralidade: "ampla" },
  "negado-ao-negro":            { grupos: ["negra"],              padronizacao: "questiona",   pluralidade: "ampla" },
  "negro-bonifacio":            { grupos: ["negra"],              padronizacao: "questiona",   pluralidade: "ampla" },
  "negro-da-gaita":             { grupos: ["negra"],              padronizacao: "parcial",     pluralidade: "ampla" },
  "o-negro-de-35":              { grupos: ["negra"],              padronizacao: "questiona",   pluralidade: "ampla" },
  "tropeiro-dos-quatro-ventos": { grupos: [],                     padronizacao: "reforca",     pluralidade: "baixa" },
  // Wilson Paim
  "a-gaita-do-negro":           { grupos: ["negra"],              padronizacao: "parcial",     pluralidade: "ampla" },
  "barranca-e-fronteira":       { grupos: [],                     padronizacao: "parcial",     pluralidade: "ampla" },
  "memorias-de-um-velho-peao":  { grupos: [],                     padronizacao: "reforca",     pluralidade: "baixa" },
  "mulato-serafim":             { grupos: ["mestica"],            padronizacao: "parcial",     pluralidade: "limitada" },
  "negra-maria":                { grupos: ["negra"],              padronizacao: "parcial",     pluralidade: "ampla" },
  // Luiz Marenco
  "a-moda-martin-fierro":       { grupos: ["indigena"],           padronizacao: "reforca",     pluralidade: "limitada" },
  "alma-de-campo":              { grupos: [],                     padronizacao: "reforca",     pluralidade: "baixa" },
  "funeral-da-coxilha":         { grupos: [],                     padronizacao: "reforca",     pluralidade: "baixa" },
  "gaucho":                     { grupos: [],                     padronizacao: "reforca",     pluralidade: "baixa" },
  "milonga-missioneira":        { grupos: ["indigena"],           padronizacao: "reforca",     pluralidade: "limitada" },
  "milongao-pra-assobiar-desencilhando": { grupos: [],            padronizacao: "reforca",     pluralidade: "baixa" },
  "os-da-ultima-tropa":         { grupos: [],                     padronizacao: "reforca",     pluralidade: "baixa" },
  "um-gaucho-vem-da-fronteira": { grupos: [],                     padronizacao: "reforca",     pluralidade: "baixa" }
};

// Rótulos e cores (validadas: escala divergente para padronização,
// escala de um só tom para pluralidade). Ordem fixa — nunca reordenar por valor.
var CATEGORIAS = {
  grupos: [
    { id: "nenhum",   nome: "Nenhum grupo nomeado" },
    { id: "negra",    nome: "População negra" },
    { id: "indigena", nome: "Povos indígenas" },
    { id: "mestica",  nome: "População mestiça" },
    { id: "europeus", nome: "Imigrantes europeus (alemães, italianos, açorianos)" }
  ],
  padronizacao: [
    { id: "estereotipo", nome: "Estereotipa grupos étnicos", cor: "#3a0606", texto: "#fffdf8" },
    { id: "reforca",     nome: "Reforça a padronização",     cor: "#6b0f0f", texto: "#fffdf8" },
    { id: "parcial",     nome: "Tensiona em parte",          cor: "#a9a193", texto: "#2a1d17" },
    { id: "questiona",   nome: "Questiona o padrão",         cor: "#2f4e3b", texto: "#fffdf8" }
  ],
  pluralidade: [
    { id: "baixa",    nome: "Baixa",    cor: "#9fb39f", texto: "#2a1d17" },
    { id: "limitada", nome: "Limitada", cor: "#62806a", texto: "#fffdf8" },
    { id: "ampla",    nome: "Ampla",    cor: "#2f4e3b", texto: "#fffdf8" }
  ]
};
