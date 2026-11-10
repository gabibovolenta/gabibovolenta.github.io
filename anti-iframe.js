// Impede que outro site abra o Influence dentro de um quadro (iframe) para enganar cliques.
// O GitHub Pages não deixa mandar o cabeçalho X-Frame-Options, então a proteção é feita aqui.
(function () {
  if (window.top === window.self) return;
  try {
    window.top.location.replace(window.self.location.href);
  } catch (e) {
    document.documentElement.style.display = 'none';
  }
})();
