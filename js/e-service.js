// PEA e-Service: กรองบริการตามหมวดหมู่ (chips) และคำค้นหา
(function () {
  var chips = document.querySelectorAll('.es-chip');
  var groups = document.querySelectorAll('.es-group');
  var form = document.getElementById('es-search-form');
  var input = document.getElementById('es-search-input');
  var empty = document.getElementById('es-empty');
  var clear = document.getElementById('es-search-clear');
  if (!chips.length || !groups.length) return;

  var activeCategory = 'all';

  function apply() {
    var q = (input && input.value || '').trim().toLowerCase();
    var visibleTotal = 0;
    groups.forEach(function (group) {
      var inCategory = activeCategory === 'all' || group.dataset.category === activeCategory;
      var visibleInGroup = 0;
      group.querySelectorAll('.es-card').forEach(function (card) {
        var match = inCategory && (!q || card.textContent.toLowerCase().indexOf(q) !== -1);
        card.hidden = !match;
        if (match) visibleInGroup++;
      });
      group.hidden = visibleInGroup === 0;
      visibleTotal += visibleInGroup;
    });
    if (empty) empty.hidden = visibleTotal !== 0;
  }

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (c) {
        c.classList.toggle('active', c === chip);
        c.setAttribute('aria-pressed', c === chip ? 'true' : 'false');
      });
      activeCategory = chip.dataset.filter;
      apply();
    });
  });

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      apply();
      document.getElementById('es-services').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
  if (input) {
    input.addEventListener('input', function () {
      if (clear) clear.hidden = !input.value;
      apply();
    });
  }
  if (clear) {
    clear.addEventListener('click', function () {
      input.value = '';
      clear.hidden = true;
      apply();
      input.focus();
    });
  }
})();
