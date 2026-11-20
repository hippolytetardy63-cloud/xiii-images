/* XIII Images — visionneuse : flèches du clavier, Échap, et glissement du doigt sur mobile.
   Sans ce fichier, tout fonctionne quand même avec les liens ← → ✕. */
(function () {
  function aller(selecteur) {
    var lien = document.querySelector(selecteur);
    if (lien) { window.location.href = lien.href; }
  }

  document.addEventListener('keydown', function (e) {
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) { return; }
    var cible = { ArrowLeft: 'a[rel="prev"]', ArrowRight: 'a[rel="next"]', Escape: 'a[data-fermer]' }[e.key];
    if (cible) { e.preventDefault(); aller(cible); }
  });

  var departX = null, departY = null;
  document.addEventListener('touchstart', function (e) {
    if (e.touches.length !== 1) { departX = null; return; }
    departX = e.touches[0].clientX;
    departY = e.touches[0].clientY;
  }, { passive: true });

  document.addEventListener('touchend', function (e) {
    if (departX === null) { return; }
    var dx = e.changedTouches[0].clientX - departX;
    var dy = e.changedTouches[0].clientY - departY;
    departX = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      aller(dx < 0 ? 'a[rel="next"]' : 'a[rel="prev"]');
    }
  }, { passive: true });
})();
