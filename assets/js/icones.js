/* =========================================================
   Ícones das etnias (traço branco, 24×24), inspirados nas
   contribuições citadas no PFI. Usados no mapa e na legenda.
   ========================================================= */
var ICONES = {
  // cesto trançado — cestaria
  kaingangs: '<path d="M8 9a4 4 0 0 1 8 0"/><path d="M4 9h16l-2 11H6z"/><path d="M5 13h14M6 16.5h12M9.5 9l.8 11M14.5 9l-.8 11"/>',
  // boleadeiras — três pedras unidas por tiras
  pampeanos: '<path d="M12 12.5L6 18M12 12.5L18 18M12 12.5V6.5"/><circle cx="12" cy="4.5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/>',
  // cuia com bomba — erva-mate
  guaranis: '<path d="M6 10h12"/><path d="M7 10c0 5 2 9 5 9s5-4 5-9"/><path d="M13.5 10l4.5-7"/><path d="M17 2.5l2 1.2"/>',
  // fachada de igreja missioneira — Sete Povos das Missões
  espanhois: '<path d="M5 21V11l7-5 7 5v10z"/><path d="M12 6V2M10.3 3.6h3.4"/><path d="M10 21v-4a2 2 0 0 1 4 0v4"/><circle cx="12" cy="11.5" r="1.4"/>',
  // forte com ameias — Forte Jesus-Maria-José
  portugueses: '<path d="M4 21V9h2.7v2h2.6V9h2.7v2h2.6V9h2.7v2h2.7v10z" transform="translate(-1 0)"/><path d="M10 21v-4a2 2 0 0 1 4 0v4"/>',
  // tambor de sopapo
  negros: '<ellipse cx="12" cy="6" rx="6" ry="2.2"/><path d="M6 6v11c0 1.2 2.7 2.2 6 2.2s6-1 6-2.2V6"/><path d="M6 8l6 11.2L18 8"/>',
  // caravela — chegada pelo mar
  acorianos: '<path d="M3 15h18l-3 4.5H6z"/><path d="M12 3v12"/><path d="M12 4.5l6 8h-6"/><path d="M12 6l-5 6.5h5"/>',
  // engrenagem — primeiras fábricas e ofícios
  alemaes: '<path d="M18.97 10.21L21.47 10.44L21.47 13.56L18.97 13.79L18.20 15.67L19.80 17.59L17.59 19.80L15.67 18.20L13.79 18.97L13.56 21.47L10.44 21.47L10.21 18.97L8.33 18.20L6.41 19.80L4.20 17.59L5.80 15.67L5.03 13.79L2.53 13.56L2.53 10.44L5.03 10.21L5.80 8.33L4.20 6.41L6.41 4.20L8.33 5.80L10.21 5.03L10.44 2.53L13.56 2.53L13.79 5.03L15.67 5.80L17.59 4.20L19.80 6.41L18.20 8.33Z"/><circle cx="12" cy="12" r="3"/>',
  // cacho de uva — vitivinicultura
  italianos: '<path d="M12 6V3M12 4.5c1.5-1.8 3.5-2 5-1.2"/><circle cx="8.5" cy="9" r="2.2"/><circle cx="12" cy="9" r="2.2"/><circle cx="15.5" cy="9" r="2.2"/><circle cx="10.2" cy="13" r="2.2"/><circle cx="13.8" cy="13" r="2.2"/><circle cx="12" cy="17" r="2.2"/>'
};

function iconeSVG(povo, tamanho) {
  return '<svg viewBox="0 0 24 24" width="' + (tamanho || 20) + '" height="' + (tamanho || 20) +
    '" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    ICONES[povo] + "</svg>";
}
