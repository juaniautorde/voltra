'use strict';

/* ==========================================================================
   VOLTRA · script.js
   --------------------------------------------------------------------------
   Todo lo que puede cambiar (precios, envíos, puntos, datos de contacto y la
   información de cada barrita) vive en los dos bloques de abajo: VOLTRA_CONFIG
   y PRODUCTS. El HTML no repite ningún precio: los toma de acá.
   ========================================================================== */

const VOLTRA_CONFIG = {
  // true = el checkout simula el pago (no hay backend). Pasar a false cuando
  // startMercadoPagoCheckout() esté conectado a un servidor real.
  demoMode: true,

  contactEmail: 'voltra.ecom@gmail.com',
  // Solo para consultas (los pedidos se toman únicamente en la web).
  // Formato internacional sin "+": 5491155555555. Vacío = el botón no se muestra.
  whatsappNumber: '',

  // TP4 / TP6: caja x4 de referencia + bundling x8 y x12.
  formats: [
    { size: 4, label: 'Caja x4', price: 11000, freeShipping: false },
    { size: 8, label: 'Pack x8', price: 20000, freeShipping: true },
    { size: 12, label: 'Pack x12', price: 28000, freeShipping: true }
  ],

  // Logística: solo CABA y GBA. El costo se define por zona según el código
  // postal. $1.800 es el costo de referencia del courier del modelo de costos.
  shipping: {
    referenceCost: 1800,
    zones: [
      { id: 'caba', name: 'CABA', from: 1000, to: 1499, cost: 1800 },
      { id: 'gba', name: 'GBA', from: 1500, to: 1899, cost: 1800 }
    ]
  },

  // Click & Collect: retiro sin cargo en el depósito.
  pickup: {
    area: 'Avellaneda',
    address: '', // completar cuando esté definida la dirección pública
    hours: ''    // ej.: 'Lunes a viernes de 10 a 18 h'
  },

  bankTransfer: { alias: '', cbu: '', holder: '', cuit: '' },

  // TP6: cada compra suma 1 punto; a los 3 se desbloquea un beneficio.
  loyalty: { pointsPerOrder: 1, pointsForBenefit: 3 },

  analytics: { googleMeasurementId: '', metaPixelId: '' }
};

/* Datos tomados del dorso de cada envoltorio (ingredientes, alérgenos y tabla
   nutricional). Si cambia el packaging, se actualiza acá y el sitio entero
   queda consistente. */
const PRODUCTS = [
  {
    key: 'energia',
    name: 'Energía',
    shortName: 'Energía',
    moment: 'Antes de entrenar',
    flavor: 'Banana, miel y cereales crocantes',
    color: '#536E1E',
    tint: '#D5E0C8',
    weight: 50,
    highlights: ['50 g', '155 kcal', '30 g de carbohidratos'],
    description: 'Banana, miel y cereales crocantes se combinan para aportar carbohidratos y energía antes de entrenar.',
    usage: 'Comela entre 30 y 45 minutos antes de entrenar.',
    taste: 'Sabe a banana con miel y un toque de canela y vainilla, con cereal crocante.',
    ingredients: 'Banana madura deshidratada en polvo, harina de avena, clara de huevo pasteurizada, avena instantánea, cereal de maíz crocante, miel, aceite de girasol alto oleico, extracto de vainilla, canela, aroma natural de banana y sal.',
    allergens: ['avena', 'huevo'],
    nutrition: { kcal: 155, kj: 648, carbs: 30, sugars: 10, addedSugars: 2.5, protein: 5, fat: 2.5, satFat: 0.4, transFat: 0, fiber: 3, sodium: 30 },
    dailyValue: { energy: 8, carbs: 10, protein: 7, fat: 5, satFat: 2, fiber: 12, sodium: 1 },
    front: 'images/adelanteverde.webp',
    back: 'images/atrasverde.webp'
  },
  {
    key: 'muscular',
    name: 'Recuperación muscular',
    shortName: 'Muscular',
    moment: 'Después de fuerza',
    flavor: 'Maní, almendras y proteína',
    color: '#861A4E',
    tint: '#EDB8BA',
    weight: 50,
    highlights: ['50 g', '185 kcal', '17 g de proteína'],
    description: 'Maní, almendras, avena y 17 g de proteína para acompañar la recuperación muscular después de un entrenamiento de fuerza.',
    usage: 'Comela después del entrenamiento de fuerza.',
    taste: 'Es la más contundente: maní y almendras tostadas, con un fondo suave de vainilla.',
    ingredients: 'Harina de avena, proteína aislada de suero, fibra soluble de tapioca o maíz, clara de huevo pasteurizada, proteína de leche, pasta de maní, crispies proteicos, miel, crema de almendras, almendras tostadas, glicerina vegetal, agua, vainilla y sal.',
    allergens: ['avena', 'leche', 'huevo', 'maní', 'almendras'],
    nutrition: { kcal: 185, kj: 774, carbs: 20, sugars: 4, addedSugars: 2.5, protein: 17, fat: 5.5, satFat: 1, transFat: 0, fiber: 6, sodium: 120 },
    dailyValue: { energy: 9, carbs: 7, protein: 23, fat: 10, satFat: 5, fiber: 24, sodium: 5 },
    front: 'images/adelanteroja.webp',
    back: 'images/atrasroja.webp'
  },
  {
    key: 'recuperacion',
    name: 'Recuperación',
    shortName: 'Recuperación',
    moment: 'Después de correr',
    flavor: 'Caramelo salado, vainilla y electrolitos',
    color: '#2F6D67',
    tint: '#D2F4F6',
    weight: 45,
    highlights: ['45 g', '135 kcal', 'Potasio y magnesio'],
    description: 'Caramelo salado, vainilla, dátiles y electrolitos para recuperar energía y minerales después de correr.',
    usage: 'Comela después de correr, junto con 400 a 500 ml de agua.',
    taste: 'Dulce con un toque salado: caramelo, vainilla y dátiles, con arroz crocante.',
    ingredients: 'Pasta de dátiles, harina de avena, cereal de arroz crocante, proteína de arroz, fibra de acacia, agua, citrato de potasio, vainilla natural, citrato de magnesio, sal marina y sabor natural a caramelo.',
    allergens: ['avena'],
    nutrition: { kcal: 135, kj: 565, carbs: 28, sugars: 11, addedSugars: 0, protein: 7, fat: 1, satFat: 0.2, transFat: 0, fiber: 4, sodium: 100, potassium: 200, magnesium: 30 },
    dailyValue: { energy: 7, carbs: 9, protein: 9, fat: 2, satFat: 1, fiber: 16, sodium: 4 },
    front: 'images/adelanteceleste.webp',
    back: 'images/atrasceleste.webp'
  },
  {
    key: 'gustito',
    name: 'Gustito saludable',
    shortName: 'Gustito',
    moment: 'Para ese antojo',
    flavor: 'Cacao, dátiles y avellanas',
    color: '#5A4D87',
    tint: '#EED9FB',
    weight: 45,
    highlights: ['45 g', '130 kcal', 'Sin azúcares añadidos'],
    description: 'Cacao, dátiles y avellanas en una barrita cremosa, con proteína, fibra y sin azúcares añadidos.',
    usage: 'Disfrutala cuando aparece el antojo de algo dulce.',
    taste: 'Cacao amargo y avellanas, endulzada solo con dátiles. Textura cremosa.',
    ingredients: 'Pasta de dátiles, harina de avena, harina de avellanas parcialmente desgrasada, fibra de acacia, proteína de arroz, agua, cacao amargo desgrasado, glicerina vegetal, pasta de avellanas, vainilla natural y sal.',
    allergens: ['avena', 'avellanas'],
    // OJO: el envoltorio dice "Azúcares totales: 55 g" en una barrita de 45 g.
    // Se asume 5,5 g; confirmar con el análisis nutricional y corregir el arte.
    nutrition: { kcal: 130, kj: 544, carbs: 18, sugars: 5.5, addedSugars: 0, protein: 7, fat: 3.5, satFat: 0.6, transFat: 0, fiber: 6, sodium: 35 },
    dailyValue: { energy: 7, carbs: 6, protein: 9, fat: 6, satFat: 3, fiber: 24, sodium: 1 },
    front: 'images/adelantevioleta.webp',
    back: 'images/atrasvioleta.webp'
  }
];

const PRODUCT_BY_KEY = Object.fromEntries(PRODUCTS.map((product) => [product.key, product]));
const BASE_FORMAT = VOLTRA_CONFIG.formats[0];

/* ==========================================================================
   Utilidades
   ========================================================================== */

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

function formatPrice(value) {
  return `$${Math.round(value).toLocaleString('es-AR')}`;
}

function formatNumber(value) {
  return Number(value).toLocaleString('es-AR', { maximumFractionDigits: 1 });
}

function escapeHTML(value) {
  return String(value).replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  })[character]);
}

function joinList(items) {
  if (items.length <= 1) return items.join('');
  return `${items.slice(0, -1).join(', ')} y ${items[items.length - 1]}`;
}

function plural(count, singular, pluralForm) {
  return count === 1 ? singular : pluralForm;
}

// localStorage puede fallar (modo privado, cuota): nunca debe romper la tienda.
const storage = {
  read(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch (error) {
      return fallback;
    }
  },
  write(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) { /* sin persistencia: se sigue con el estado en memoria */ }
  }
};

function getFormat(size) {
  return VOLTRA_CONFIG.formats.find((format) => format.size === Number(size));
}

function unitPrice(format) {
  return format.price / format.size;
}

// Ancla de precio (TP6): cuánto saldría la misma cantidad en cajas x4 sueltas.
function anchorPrice(format) {
  return (format.size / BASE_FORMAT.size) * BASE_FORMAT.price;
}

function trackEvent(name, parameters = {}) {
  if (typeof window.gtag === 'function' && VOLTRA_CONFIG.analytics.googleMeasurementId) {
    window.gtag('event', name, parameters);
  }
  window.dispatchEvent(new CustomEvent(`voltra:${name}`, { detail: parameters }));
}

/* ==========================================================================
   Textos con datos del negocio (data-bind)
   ========================================================================== */

function bindBusinessData() {
  const [f4, f8, f12] = VOLTRA_CONFIG.formats;
  const values = {
    price4: formatPrice(f4.price),
    price8: formatPrice(f8.price),
    price12: formatPrice(f12.price),
    unit4: formatPrice(unitPrice(f4)),
    unit8: formatPrice(unitPrice(f8)),
    unit12: formatPrice(unitPrice(f12)),
    saving8: formatPrice(anchorPrice(f8) - f8.price),
    saving12: formatPrice(anchorPrice(f12) - f12.price),
    shippingFrom: formatPrice(Math.min(...VOLTRA_CONFIG.shipping.zones.map((zone) => zone.cost))),
    pickupArea: VOLTRA_CONFIG.pickup.area,
    pointsGoal: String(VOLTRA_CONFIG.loyalty.pointsForBenefit),
    email: VOLTRA_CONFIG.contactEmail
  };
  $$('[data-bind]').forEach((element) => {
    const value = values[element.dataset.bind];
    if (value !== undefined) element.textContent = value;
  });
  $$('[data-mailto]').forEach((link) => {
    link.href = `mailto:${VOLTRA_CONFIG.contactEmail}`;
  });
}

/* ==========================================================================
   Navegación
   ========================================================================== */

const menuToggle = $('.menu-toggle');
const navLinks = $('#main-menu');

function closeMenu() {
  navLinks.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menú');
}

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
});

$$('a', navLinks).forEach((link) => link.addEventListener('click', closeMenu));

function scrollToSection(id) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.getElementById(id).scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
}

// Cerrar cualquier <dialog> al hacer clic en el fondo o en su botón de cierre.
$$('dialog').forEach((dialog) => {
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog || event.target.closest('[data-close-dialog]')) dialog.close();
  });
});

/* ==========================================================================
   Variedades + tabla comparativa
   ========================================================================== */

function renderVarieties() {
  $('#variety-grid').innerHTML = PRODUCTS.map((product) => `
    <article class="variety" style="--c:${product.color}; --tint:${product.tint}">
      <img src="${product.front}" alt="Barrita VOLTRA ${escapeHTML(product.name)}: ${escapeHTML(product.flavor.toLowerCase())}" width="1200" height="560" loading="lazy" />
      <div class="variety-copy">
        <p class="variety-moment">${escapeHTML(product.moment)}</p>
        <h3>${escapeHTML(product.name)}</h3>
        <p class="variety-flavor">${escapeHTML(product.flavor)}</p>
        <ul class="variety-facts">
          ${product.highlights.map((fact) => `<li>${escapeHTML(fact)}</li>`).join('')}
        </ul>
        <div class="variety-actions">
          <button class="button button-solid" type="button" data-add-variety="${product.key}">Sumar a mi caja</button>
          <button class="link-button" type="button" data-open-detail="${product.key}">Ingredientes y tabla nutricional</button>
        </div>
      </div>
    </article>
  `).join('');
}

function renderCompareTable() {
  $('#compare-body').innerHTML = PRODUCTS.map((product) => {
    const n = product.nutrition;
    return `
      <tr>
        <th scope="row"><span class="swatch" style="--c:${product.color}"></span>${escapeHTML(product.name)}</th>
        <td>${escapeHTML(product.moment)}</td>
        <td>${product.weight} g</td>
        <td>${n.kcal} kcal</td>
        <td>${formatNumber(n.protein)} g</td>
        <td>${formatNumber(n.carbs)} g</td>
        <td>${formatNumber(n.addedSugars)} g</td>
        <td>${formatNumber(n.fiber)} g</td>
        <td>${escapeHTML(joinList(product.allergens))}</td>
      </tr>`;
  }).join('');
}

/* ==========================================================================
   Detalle de producto (dialog)
   ========================================================================== */

const detailModal = $('#detail-modal');
const detailBody = $('#detail-body');

function nutritionRows(product) {
  const n = product.nutrition;
  const vd = product.dailyValue;
  const rows = [
    ['Valor energético', `${n.kcal} kcal = ${n.kj} kJ`, vd.energy],
    ['Carbohidratos', `${formatNumber(n.carbs)} g`, vd.carbs],
    ['Azúcares totales', `${formatNumber(n.sugars)} g`, null, true],
    ['Azúcares añadidos', `${formatNumber(n.addedSugars)} g`, null, true],
    ['Proteínas', `${formatNumber(n.protein)} g`, vd.protein],
    ['Grasas totales', `${formatNumber(n.fat)} g`, vd.fat],
    ['Grasas saturadas', `${formatNumber(n.satFat)} g`, vd.satFat, true],
    ['Grasas trans', `${formatNumber(n.transFat)} g`, null, true],
    ['Fibra alimentaria', `${formatNumber(n.fiber)} g`, vd.fiber],
    ['Sodio', `${formatNumber(n.sodium)} mg`, vd.sodium]
  ];
  if (n.potassium) rows.push(['Potasio', `${formatNumber(n.potassium)} mg`, null]);
  if (n.magnesium) rows.push(['Magnesio', `${formatNumber(n.magnesium)} mg`, null]);
  return rows.map(([label, amount, percent, isSub]) => `
    <tr${isSub ? ' class="sub"' : ''}>
      <th scope="row">${label}</th>
      <td>${amount}</td>
      <td>${percent === null || percent === undefined ? '' : `${percent}%`}</td>
    </tr>`).join('');
}

function openDetail(key) {
  const product = PRODUCT_BY_KEY[key];
  if (!product) return;
  detailBody.style.setProperty('--c', product.color);
  detailBody.style.setProperty('--tint', product.tint);
  detailBody.innerHTML = `
    <div class="detail-media">
      <img src="${product.front}" alt="Frente del envoltorio de VOLTRA ${escapeHTML(product.name)}" width="1200" height="560" />
      <img src="${product.back}" alt="Dorso del envoltorio de VOLTRA ${escapeHTML(product.name)}" width="1400" height="650" loading="lazy" />
    </div>
    <div class="detail-copy">
      <p class="variety-moment">${escapeHTML(product.moment)}</p>
      <h2 id="detail-title">${escapeHTML(product.name)}</h2>
      <p class="detail-lead">${escapeHTML(product.description)} ${escapeHTML(product.usage)}</p>

      <h3>Ingredientes</h3>
      <p>${escapeHTML(product.ingredients)}</p>
      <p class="allergens">Contiene ${escapeHTML(joinList(product.allergens))}.</p>

      <h3>Información nutricional</h3>
      <table class="nutrition-table">
        <caption>Porción: ${product.weight} g (1 barrita)</caption>
        <thead><tr><th scope="col">Cantidad por porción</th><th scope="col"></th><th scope="col">% VD*</th></tr></thead>
        <tbody>${nutritionRows(product)}</tbody>
      </table>
      <p class="fine-print">* % Valores Diarios con base en una dieta de 2.000 kcal u 8.400 kJ. Tus valores diarios pueden ser mayores o menores según tus necesidades energéticas.</p>
      <p class="fine-print">Conservar en lugar fresco, seco y protegido de la luz. Una vez abierta, consumir en el momento.</p>

      <button class="button button-solid" type="button" data-add-variety="${product.key}">Sumar a mi caja</button>
    </div>`;
  trackEvent('view_item', { product: key });
  detailModal.showModal();
  detailModal.scrollTop = 0;
}

/* ==========================================================================
   Armador de cajas (el cliente elige libremente variedades y cantidades)
   ========================================================================== */

const formatOptions = $('#format-options');
const mixRows = $('#mix-rows');
const boxSlots = $('#box-slots');
const builderStatus = $('#builder-status');
const builderFormatLabel = $('#builder-format-label');
const builderPrice = $('#builder-price');
const builderAdd = $('#builder-add');
const builderCancelEdit = $('#builder-cancel-edit');
const fillEvenButton = $('#fill-even');
const clearMixButton = $('#clear-mix');

const builder = { size: BASE_FORMAT.size, mix: {}, editingId: null, notice: '' };

function mixCount(mix) {
  return PRODUCTS.reduce((total, product) => total + (mix[product.key] || 0), 0);
}

function describeMix(mix) {
  return PRODUCTS
    .filter((product) => mix[product.key] > 0)
    .map((product) => `${mix[product.key]} ${product.name}`)
    .join(', ');
}

function renderFormatOptions() {
  formatOptions.innerHTML = VOLTRA_CONFIG.formats.map((format) => {
    const anchor = anchorPrice(format);
    const saving = anchor - format.price;
    const boxes = format.size / BASE_FORMAT.size;
    return `
      <label class="format-option">
        <input type="radio" name="format" value="${format.size}" ${format.size === builder.size ? 'checked' : ''} />
        <span class="format-name">${format.label}</span>
        <span class="format-price">${formatPrice(format.price)}</span>
        <span class="format-unit">${formatPrice(unitPrice(format))} por barrita</span>
        ${saving > 0
          ? `<span class="format-anchor"><s>${boxes} cajas x4: ${formatPrice(anchor)}</s></span>
             <span class="format-perk">Ahorrás ${formatPrice(saving)} y el envío va bonificado</span>`
          : '<span class="format-perk format-perk-plain">Envío aparte o retiro gratis</span>'}
      </label>`;
  }).join('');
}

function renderBuilder() {
  const format = getFormat(builder.size);
  const count = mixCount(builder.mix);
  const remaining = format.size - count;
  const perVariety = format.size / PRODUCTS.length;

  mixRows.innerHTML = PRODUCTS.map((product) => {
    const quantity = builder.mix[product.key] || 0;
    return `
      <div class="mix-row" style="--c:${product.color}">
        <span class="swatch"></span>
        <div class="mix-name"><strong>${escapeHTML(product.name)}</strong><small>${escapeHTML(product.moment)}</small></div>
        <div class="stepper">
          <button type="button" data-mix="dec" data-key="${product.key}" aria-label="Quitar una ${escapeHTML(product.name)}" ${quantity === 0 ? 'disabled' : ''}>−</button>
          <output aria-label="${quantity} de ${escapeHTML(product.name)}">${quantity}</output>
          <button type="button" data-mix="inc" data-key="${product.key}" aria-label="Sumar una ${escapeHTML(product.name)}" ${remaining === 0 ? 'disabled' : ''}>+</button>
        </div>
      </div>`;
  }).join('');

  const filled = PRODUCTS.flatMap((product) => Array(builder.mix[product.key] || 0).fill(product));
  boxSlots.style.setProperty('--columns', format.size / 4);
  boxSlots.dataset.columns = format.size / 4;
  boxSlots.innerHTML = Array.from({ length: format.size }, (_, index) => {
    const product = filled[index];
    return product
      ? `<button type="button" class="slot filled" style="--c:${product.color}" data-remove-slot="${product.key}" aria-label="Quitar una ${escapeHTML(product.name)} de la caja"><span>${escapeHTML(product.shortName)}</span></button>`
      : '<span class="slot" aria-hidden="true"></span>';
  }).join('');

  fillEvenButton.textContent = `Surtida: ${perVariety} de cada una`;
  clearMixButton.hidden = count === 0;

  let status;
  if (builder.notice) status = builder.notice;
  else if (count === 0) status = `Elegí ${format.size} barritas para completar tu ${format.label.toLowerCase()}.`;
  else if (remaining > 0) status = `${plural(remaining, 'Te falta', 'Te faltan')} ${remaining} ${plural(remaining, 'barrita', 'barritas')}.`;
  else status = format.freeShipping ? 'Listo. Este pack tiene el envío bonificado.' : 'Listo. Tu caja está completa.';
  builderStatus.textContent = status;
  builder.notice = '';

  builderFormatLabel.textContent = format.label;
  builderPrice.textContent = formatPrice(format.price);
  builderAdd.disabled = remaining !== 0;
  builderAdd.textContent = builder.editingId ? 'Actualizar carrito' : 'Agregar al carrito';
  builderCancelEdit.hidden = !builder.editingId;
}

function setBuilderSize(size) {
  builder.size = Number(size);
  // Si se achica el formato, se recorta empezando por la variedad con más unidades.
  while (mixCount(builder.mix) > builder.size) {
    const top = PRODUCTS.reduce((a, b) => ((builder.mix[b.key] || 0) > (builder.mix[a.key] || 0) ? b : a));
    builder.mix[top.key] -= 1;
  }
  $$('input[name="format"]').forEach((input) => { input.checked = Number(input.value) === builder.size; });
  renderBuilder();
}

function addVarietyToBuilder(key) {
  const format = getFormat(builder.size);
  if (mixCount(builder.mix) >= format.size) {
    const next = VOLTRA_CONFIG.formats.find((candidate) => candidate.size > format.size);
    builder.notice = next
      ? `Tu ${format.label.toLowerCase()} ya está completa. Elegí ${next.label.toLowerCase()} para sumar más barritas.`
      : 'Tu pack x12 ya está completo. Agregalo al carrito para armar otro.';
  } else {
    builder.mix[key] = (builder.mix[key] || 0) + 1;
    trackEvent('select_item', { product: key });
  }
  renderBuilder();
}

formatOptions.addEventListener('change', (event) => {
  if (event.target.name === 'format') setBuilderSize(event.target.value);
});

mixRows.addEventListener('click', (event) => {
  const button = event.target.closest('[data-mix]');
  if (!button) return;
  const key = button.dataset.key;
  if (button.dataset.mix === 'inc') addVarietyToBuilder(key);
  else {
    builder.mix[key] = Math.max(0, (builder.mix[key] || 0) - 1);
    renderBuilder();
  }
  // El render reemplaza los botones: se devuelve el foco al equivalente.
  const again = $(`[data-mix="${button.dataset.mix}"][data-key="${key}"]`, mixRows);
  if (again && !again.disabled) again.focus();
});

boxSlots.addEventListener('click', (event) => {
  const slot = event.target.closest('[data-remove-slot]');
  if (!slot) return;
  builder.mix[slot.dataset.removeSlot] -= 1;
  renderBuilder();
});

fillEvenButton.addEventListener('click', () => {
  const perVariety = builder.size / PRODUCTS.length;
  builder.mix = Object.fromEntries(PRODUCTS.map((product) => [product.key, perVariety]));
  renderBuilder();
});

clearMixButton.addEventListener('click', () => {
  builder.mix = {};
  renderBuilder();
});

builderCancelEdit.addEventListener('click', () => {
  builder.editingId = null;
  builder.mix = {};
  setBuilderSize(BASE_FORMAT.size);
});

builderAdd.addEventListener('click', () => {
  if (mixCount(builder.mix) !== builder.size) return;
  if (builder.editingId) {
    changeQuantity(builder.editingId, -1, { silent: true });
    builder.editingId = null;
  }
  addToCart(builder.size, builder.mix);
  builder.mix = {};
  setBuilderSize(BASE_FORMAT.size);
  openCart();
});

// "Sumar a mi caja" (tarjetas de variedad y detalle).
document.addEventListener('click', (event) => {
  const addButton = event.target.closest('[data-add-variety]');
  if (addButton) {
    addVarietyToBuilder(addButton.dataset.addVariety);
    if (detailModal.open) detailModal.close();
    scrollToSection('armar');
    return;
  }
  const detailButton = event.target.closest('[data-open-detail]');
  if (detailButton) openDetail(detailButton.dataset.openDetail);
});

/* ==========================================================================
   Carrito
   ========================================================================== */

const CART_KEY = 'voltra-cart-v2';
const cartModal = $('#cart-modal');
const cartItems = $('#cart-items');
const cartCount = $('#cart-count');
const cartSubtotal = $('#cart-subtotal');
const cartShipping = $('#cart-shipping');
const cartEmpty = $('#cart-empty');
const cartFilled = $('#cart-filled');
const cartUpsell = $('#cart-upsell');
const checkoutStart = $('#checkout-start');

function lineId(size, mix) {
  return `${size}:${PRODUCTS.map((product) => mix[product.key] || 0).join('-')}`;
}

function sanitizeCart(raw) {
  if (!Array.isArray(raw)) return [];
  return raw.filter((line) => (
    line && getFormat(line.size) && line.mix && typeof line.mix === 'object'
    && mixCount(line.mix) === Number(line.size)
    && Number.isInteger(line.quantity) && line.quantity > 0
  )).map((line) => {
    const mix = Object.fromEntries(PRODUCTS.map((product) => [product.key, Number(line.mix[product.key]) || 0]));
    return { id: lineId(line.size, mix), size: Number(line.size), mix, quantity: line.quantity };
  });
}

let cart = sanitizeCart(storage.read(CART_KEY, []));

function saveCart() {
  storage.write(CART_KEY, cart);
}

function addToCart(size, mix) {
  const cleanMix = Object.fromEntries(PRODUCTS.map((product) => [product.key, mix[product.key] || 0]));
  const id = lineId(size, cleanMix);
  const existing = cart.find((line) => line.id === id);
  if (existing) existing.quantity += 1;
  else cart.push({ id, size: Number(size), mix: cleanMix, quantity: 1 });
  saveCart();
  trackEvent('add_to_cart', { size, mix: describeMix(cleanMix) });
  renderCart();
}

function changeQuantity(id, delta, { silent = false } = {}) {
  const line = cart.find((candidate) => candidate.id === id);
  if (!line) return;
  line.quantity += delta;
  if (line.quantity <= 0) cart = cart.filter((candidate) => candidate.id !== id);
  saveCart();
  if (!silent) renderCart();
}

function cartHasFreeShipping() {
  return cart.some((line) => getFormat(line.size).freeShipping);
}

function findZone(postalCode) {
  const digits = String(postalCode || '').replace(/\D/g, '').slice(0, 4);
  if (digits.length < 4) return null;
  const code = Number(digits);
  return VOLTRA_CONFIG.shipping.zones.find((zone) => code >= zone.from && code <= zone.to) || null;
}

/* Regla del documento (7.3): el retiro siempre es gratis; los packs x8 y x12
   tienen el envío bonificado; la caja x4 paga el envío según la zona. */
function getTotals({ method = 'delivery', postalCode = '' } = {}) {
  const subtotal = cart.reduce((sum, line) => sum + line.quantity * getFormat(line.size).price, 0);
  let shipping = null;
  let shippingLabel = 'Se calcula con tu código postal';

  if (method === 'pickup') {
    shipping = 0;
    shippingLabel = 'Retiro gratis';
  } else if (cartHasFreeShipping()) {
    shipping = 0;
    shippingLabel = 'Bonificado';
  } else {
    const zone = findZone(postalCode);
    if (zone) {
      shipping = zone.cost;
      shippingLabel = `${formatPrice(zone.cost)} (${zone.name})`;
    }
  }
  return { subtotal, shipping, shippingLabel, total: subtotal + (shipping || 0) };
}

function mixDots(mix) {
  return PRODUCTS.flatMap((product) => Array(mix[product.key] || 0).fill(`<i style="--c:${product.color}"></i>`)).join('');
}

// Upselling de bundling en el carrito (TP6): x4 → x8 y x8 → x12.
function getUpsell() {
  const [f4, f8, f12] = VOLTRA_CONFIG.formats;
  const hasPack = cartHasFreeShipping();
  const lineX4 = cart.find((line) => line.size === f4.size);
  if (lineX4 && !hasPack) {
    return {
      lineId: lineX4.id,
      size: f8.size,
      text: `Pasá tu caja x4 a pack x8 por ${formatPrice(f8.price - f4.price)} más: sumás 4 barritas y el envío queda bonificado.`,
      action: 'Pasar a pack x8'
    };
  }
  const lineX8 = cart.find((line) => line.size === f8.size);
  if (lineX8 && !cart.some((line) => line.size === f12.size)) {
    return {
      lineId: lineX8.id,
      size: f12.size,
      text: `Pasá tu pack x8 a x12 por ${formatPrice(f12.price - f8.price)} más: cada barrita te queda en ${formatPrice(unitPrice(f12))} en vez de ${formatPrice(unitPrice(f8))}.`,
      action: 'Pasar a pack x12'
    };
  }
  return null;
}

function renderCart() {
  const units = cart.reduce((total, line) => total + line.quantity, 0);
  const { subtotal } = getTotals();
  cartCount.textContent = units;
  cartCount.hidden = units === 0;
  cartEmpty.hidden = cart.length > 0;
  cartFilled.hidden = cart.length === 0;

  cartItems.innerHTML = cart.map((line) => {
    const format = getFormat(line.size);
    return `
      <li class="cart-line">
        <div class="cart-line-info">
          <strong>${format.label}</strong>
          <span class="mix-dots" aria-hidden="true">${mixDots(line.mix)}</span>
          <span>${escapeHTML(describeMix(line.mix))}</span>
        </div>
        <div class="cart-line-side">
          <strong>${formatPrice(format.price * line.quantity)}</strong>
          <div class="stepper stepper-small">
            <button type="button" data-cart="dec" data-id="${line.id}" aria-label="Quitar una ${format.label}">−</button>
            <output>${line.quantity}</output>
            <button type="button" data-cart="inc" data-id="${line.id}" aria-label="Sumar otra ${format.label} igual">+</button>
          </div>
          <button type="button" class="link-button" data-cart="remove" data-id="${line.id}">Quitar</button>
        </div>
      </li>`;
  }).join('');

  cartSubtotal.textContent = formatPrice(subtotal);
  cartShipping.textContent = cartHasFreeShipping()
    ? 'Bonificado'
    : `Desde ${formatPrice(Math.min(...VOLTRA_CONFIG.shipping.zones.map((zone) => zone.cost)))}, o gratis si retirás`;

  const upsell = getUpsell();
  cartUpsell.hidden = !upsell;
  if (upsell) {
    cartUpsell.innerHTML = `<p>${escapeHTML(upsell.text)}</p><button type="button" class="button button-lime" data-upsell-line="${upsell.lineId}" data-upsell-size="${upsell.size}">${upsell.action}</button>`;
  }
}

function openCart() {
  renderCart();
  if (!cartModal.open) cartModal.showModal();
}

cartItems.addEventListener('click', (event) => {
  const button = event.target.closest('[data-cart]');
  if (!button) return;
  const { cart: action, id } = button.dataset;
  if (action === 'inc') changeQuantity(id, 1);
  if (action === 'dec') changeQuantity(id, -1);
  if (action === 'remove') changeQuantity(id, -Infinity);
});

cartUpsell.addEventListener('click', (event) => {
  const button = event.target.closest('[data-upsell-line]');
  if (!button) return;
  const line = cart.find((candidate) => candidate.id === button.dataset.upsellLine);
  if (!line) return;
  const target = getFormat(button.dataset.upsellSize);
  builder.editingId = line.id;
  builder.mix = { ...line.mix };
  builder.notice = `Estás ampliando tu ${getFormat(line.size).label.toLowerCase()}: elegí ${target.size - line.size} barritas más.`;
  setBuilderSize(target.size);
  trackEvent('upsell_click', { from: line.size, to: target.size });
  cartModal.close();
  scrollToSection('armar');
});

$$('[data-open-cart]').forEach((button) => button.addEventListener('click', openCart));

$('#continue-shopping').addEventListener('click', () => {
  cartModal.close();
  scrollToSection('armar');
});

$('#cart-empty-cta').addEventListener('click', () => {
  cartModal.close();
  scrollToSection('armar');
});

$('#clear-cart').addEventListener('click', () => {
  if (!cart.length || !window.confirm('¿Querés vaciar el carrito?')) return;
  cart = [];
  saveCart();
  renderCart();
});

/* ==========================================================================
   Checkout
   ========================================================================== */

const checkoutModal = $('#checkout-modal');
const checkoutForm = $('#checkout-form');
const checkoutSummary = $('#checkout-summary');
const checkoutSubtotal = $('#checkout-subtotal');
const checkoutShipping = $('#checkout-shipping');
const checkoutTotal = $('#checkout-total');
const checkoutSubmit = $('#checkout-submit');
const formMessage = $('#form-message');
const addressFields = $('#address-fields');
const pickupInfo = $('#pickup-info');
const postalCodeInput = $('#postal-code');
const postalHint = $('#postal-hint');
const cashOption = $('#cash-option');
const cashRadio = $('input[name="payment"][value="cash"]');
const cashHint = $('#cash-hint');
const transferDetails = $('#transfer-details');
const mercadoPagoDetails = $('#mercado-pago-details');

function selectedValue(name) {
  const checked = $(`input[name="${name}"]:checked`, checkoutForm);
  return checked ? checked.value : '';
}

function renderPickupInfo() {
  const { area, address, hours } = VOLTRA_CONFIG.pickup;
  pickupInfo.textContent = address
    ? `Retirás sin cargo en ${address}, ${area}${hours ? ` (${hours})` : ''}.`
    : `Retirás sin cargo en nuestro depósito de ${area}. Te mandamos la dirección y el horario por mail cuando el pedido esté listo.`;
}

function renderTransferDetails() {
  const { alias, cbu, holder, cuit } = VOLTRA_CONFIG.bankTransfer;
  transferDetails.textContent = alias || cbu
    ? `Transferí a ${[alias && `alias ${alias}`, cbu && `CBU ${cbu}`, holder && `titular ${holder}`, cuit && `CUIT ${cuit}`].filter(Boolean).join(', ')} y respondé el mail de confirmación con el comprobante.`
    : 'Al confirmar te enviamos por mail los datos de la cuenta. Preparamos tu pedido cuando se acredita la transferencia.';
}

function updateCheckout() {
  const method = selectedValue('delivery') || 'delivery';
  const payment = selectedValue('payment');
  const isPickup = method === 'pickup';

  // Un <fieldset disabled> no participa de la validación ni del envío.
  addressFields.disabled = isPickup;
  addressFields.hidden = isPickup;
  pickupInfo.hidden = !isPickup;

  // Efectivo: solo en retiros presenciales (documento, 6.1).
  cashRadio.disabled = !isPickup;
  cashOption.classList.toggle('is-disabled', !isPickup);
  cashHint.textContent = isPickup ? 'Pagás al retirar tu pedido' : 'Disponible solo si retirás tu pedido';
  if (!isPickup && cashRadio.checked) cashRadio.checked = false;

  transferDetails.hidden = payment !== 'transfer';
  mercadoPagoDetails.hidden = payment !== 'mercado-pago';

  const { subtotal, shipping, shippingLabel, total } = getTotals({ method, postalCode: postalCodeInput.value });
  checkoutSubtotal.textContent = formatPrice(subtotal);
  checkoutShipping.textContent = shippingLabel;
  checkoutTotal.textContent = formatPrice(total);

  // Cobertura: solo CABA y GBA.
  const typed = postalCodeInput.value.replace(/\D/g, '').length >= 4;
  const outOfZone = !isPickup && typed && !findZone(postalCodeInput.value);
  postalCodeInput.setCustomValidity(outOfZone ? 'Por ahora entregamos solo en CABA y GBA.' : '');
  postalHint.textContent = outOfZone
    ? `Por ahora entregamos solo en CABA y GBA. Podés elegir el retiro gratis en ${VOLTRA_CONFIG.pickup.area}.`
    : shipping === null && !isPickup ? 'Con tu código postal calculamos el envío.' : '';
  postalHint.classList.toggle('is-error', outOfZone);

  checkoutSubmit.textContent = payment === 'mercado-pago' ? 'Pagar con Mercado Pago' : 'Confirmar pedido';
}

checkoutStart.addEventListener('click', () => {
  if (!cart.length) return;
  trackEvent('begin_checkout', { lines: cart.length });
  checkoutSummary.innerHTML = cart.map((line) => {
    const format = getFormat(line.size);
    return `<li><span>${line.quantity} × ${format.label}<small>${escapeHTML(describeMix(line.mix))}</small></span><strong>${formatPrice(format.price * line.quantity)}</strong></li>`;
  }).join('');
  formMessage.textContent = '';
  updateCheckout();
  cartModal.close();
  checkoutModal.showModal();
  checkoutModal.scrollTop = 0;
});

checkoutForm.addEventListener('change', updateCheckout);
postalCodeInput.addEventListener('input', updateCheckout);

function nextOrderNumber() {
  const current = Number(storage.read('voltra-order-sequence', 0)) + 1;
  storage.write('voltra-order-sequence', current);
  return `VOL-${new Date().getFullYear()}-${String(current).padStart(4, '0')}`;
}

/* Punto de integración con Mercado Pago (única pasarela, acreditación a 10
   días, un solo pago sin cuotas). Crear la preferencia exige un backend con
   el access token: nunca va en el navegador. El servidor debe devolver
   { init_point } y acá se redirige a esa URL. */
async function startMercadoPagoCheckout(order) {
  throw new Error('Mercado Pago todavía no está conectado a un servidor.');
}

/* ==========================================================================
   Puntos VOLTRA (programa de fidelización, TP6)
   Sin cuentas de usuario, los puntos se guardan en este dispositivo.
   ========================================================================== */

const POINTS_KEY = 'voltra-points';

function getPoints() {
  const value = Number(storage.read(POINTS_KEY, 0));
  return Number.isInteger(value) && value > 0 ? value : 0;
}

function loyaltyMessage(points, earned) {
  const goal = VOLTRA_CONFIG.loyalty.pointsForBenefit;
  const progress = points % goal;
  const earnedText = `¡Sumaste ${earned} ${plural(earned, 'punto', 'puntos')} VOLTRA!`;
  if (progress === 0) return `${earnedText} Llegaste a ${goal}: desbloqueaste un beneficio para tu próximo pack.`;
  const missing = goal - progress;
  return `${earnedText} ${plural(missing, 'Te falta', 'Te faltan')} ${missing} ${plural(missing, 'punto', 'puntos')} para desbloquear un beneficio en tu próximo pack.`;
}

function renderPoints() {
  const goal = VOLTRA_CONFIG.loyalty.pointsForBenefit;
  const points = getPoints();
  const progress = points % goal;
  const benefits = Math.floor(points / goal);
  $('#points-pips').innerHTML = Array.from({ length: goal }, (_, index) => `<i class="${index < progress ? 'on' : ''}"></i>`).join('');
  let text;
  if (points === 0) text = `Todavía no sumaste puntos. Tu primera compra te da el primero.`;
  else if (progress === 0) text = `Tenés ${points} ${plural(points, 'punto', 'puntos')}: hay un beneficio esperándote en tu próximo pack.`;
  else text = `Tenés ${progress} de ${goal} puntos${benefits ? ` y ${benefits} ${plural(benefits, 'beneficio desbloqueado', 'beneficios desbloqueados')}` : ''}.`;
  $('#points-status').textContent = text;
}

/* ==========================================================================
   Confirmación
   ========================================================================== */

const confirmationModal = $('#confirmation-modal');
const confirmationDetails = $('#confirmation-details');

function finalizeOrder(order) {
  const earned = VOLTRA_CONFIG.loyalty.pointsPerOrder;
  const points = getPoints() + earned;
  storage.write(POINTS_KEY, points);

  const statusByPayment = {
    'mercado-pago': 'Pago aprobado. Ya estamos preparando tu pedido.',
    transfer: 'Pedido recibido. Lo preparamos cuando se acredite tu transferencia.',
    cash: 'Pedido recibido. Pagás en efectivo cuando lo retirás.'
  };

  confirmationDetails.innerHTML = `
    <p class="confirmation-status">${statusByPayment[order.payment]}</p>
    <dl class="confirmation-list">
      <div><dt>Pedido</dt><dd>${escapeHTML(order.number)}</dd></div>
      <div><dt>Productos</dt><dd>${order.lines.map((line) => `${line.quantity} × ${escapeHTML(line.label)} (${escapeHTML(line.mix)})`).join('<br>')}</dd></div>
      <div><dt>Entrega</dt><dd>${escapeHTML(order.deliveryText)}</dd></div>
      <div><dt>Pago</dt><dd>${escapeHTML(order.paymentLabel)}</dd></div>
      <div><dt>Envío</dt><dd>${escapeHTML(order.shippingLabel)}</dd></div>
      <div><dt>Total</dt><dd><strong>${formatPrice(order.total)}</strong></dd></div>
    </dl>
    <p class="confirmation-points">${escapeHTML(loyaltyMessage(points, earned))}</p>
    <p class="fine-print">${VOLTRA_CONFIG.demoMode
      ? 'Este sitio es una demostración: no se realizó ningún cobro ni se generó un envío o un mail real.'
      : `Te enviamos el detalle a ${escapeHTML(order.email)}.`}</p>`;

  trackEvent('purchase', { orderNumber: order.number, total: order.total, payment: order.payment });
  cart = [];
  saveCart();
  renderCart();
  renderPoints();
  checkoutForm.reset();
  updateCheckout();
  checkoutModal.close();
  confirmationModal.showModal();
}

checkoutForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!cart.length) return;
  updateCheckout();
  if (!checkoutForm.checkValidity()) {
    checkoutForm.reportValidity();
    return;
  }

  const data = new FormData(checkoutForm);
  const method = data.get('delivery');
  const payment = data.get('payment');
  const totals = getTotals({ method, postalCode: data.get('postal-code') || '' });
  const zone = findZone(data.get('postal-code'));
  const paymentLabels = {
    'mercado-pago': 'Mercado Pago (un pago)',
    transfer: 'Transferencia bancaria',
    cash: 'Efectivo al retirar'
  };

  const order = {
    number: nextOrderNumber(),
    name: `${data.get('first-name')} ${data.get('last-name')}`.trim(),
    email: data.get('email'),
    phone: data.get('phone'),
    payment,
    paymentLabel: paymentLabels[payment],
    delivery: method,
    deliveryText: method === 'pickup'
      ? `Retiro en depósito, ${VOLTRA_CONFIG.pickup.area}`
      : `Envío a ${data.get('street')} ${data.get('street-number')}${data.get('apartment') ? `, ${data.get('apartment')}` : ''}, ${data.get('locality')} (CP ${data.get('postal-code')}${zone ? `, ${zone.name}` : ''})`,
    lines: cart.map((line) => ({
      label: getFormat(line.size).label,
      mix: describeMix(line.mix),
      quantity: line.quantity,
      price: getFormat(line.size).price
    })),
    subtotal: totals.subtotal,
    shipping: totals.shipping || 0,
    shippingLabel: totals.shippingLabel,
    total: totals.total
  };

  if (payment === 'mercado-pago' && !VOLTRA_CONFIG.demoMode) {
    checkoutSubmit.disabled = true;
    try {
      const { init_point: initPoint } = await startMercadoPagoCheckout(order);
      window.location.href = initPoint;
    } catch (error) {
      formMessage.textContent = 'No pudimos iniciar el pago con Mercado Pago. Probá de nuevo o elegí transferencia.';
    } finally {
      checkoutSubmit.disabled = false;
    }
    return;
  }

  finalizeOrder(order);
});

$('#confirmation-close').addEventListener('click', () => confirmationModal.close());

/* ==========================================================================
   Asistente VOLTRA (respuestas armadas con los mismos datos del sitio)
   ========================================================================== */

const chatWindow = $('#chat-window');
const chatForm = $('#chat-form');
const chatInput = $('#chat-input');
const chatTabs = $('#chat-tabs');
let activeProduct = PRODUCTS[0].key;

function normalize(text) {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function getBotReply(product, question) {
  const q = normalize(question);
  const [f4, f8, f12] = VOLTRA_CONFIG.formats;
  const n = product.nutrition;

  if (/envio|entrega|zona|codigo postal|llega|demora|moto/.test(q)) {
    return `Entregamos en CABA y GBA. En la caja x4 el envío se paga aparte (desde ${formatPrice(VOLTRA_CONFIG.shipping.referenceCost)} según la zona) y en los packs x8 y x12 va bonificado. También podés retirar gratis en ${VOLTRA_CONFIG.pickup.area}.`;
  }
  if (/retir|pasar a buscar|deposito|click/.test(q)) {
    return `Sí: podés retirar tu pedido sin cargo en nuestro depósito de ${VOLTRA_CONFIG.pickup.area}. En el retiro también podés pagar en efectivo.`;
  }
  if (/cuota|financ/.test(q)) {
    return 'Por ahora no ofrecemos cuotas: las compras con tarjeta se pagan en un solo pago por Mercado Pago.';
  }
  if (/pago|pagar|mercado pago|transferencia|tarjeta|efectivo|debito|credito/.test(q)) {
    return 'Podés pagar con Mercado Pago (débito, crédito o dinero en cuenta, en un pago) o por transferencia bancaria. El efectivo está disponible solo si retirás tu pedido.';
  }
  if (/punto|fideli|beneficio/.test(q)) {
    return `Cada compra suma 1 punto VOLTRA. Con ${VOLTRA_CONFIG.loyalty.pointsForBenefit} puntos desbloqueás un beneficio para tu próximo pack: descuentos, upgrades a x8 o x12, productos gratis o acceso anticipado a nuevas variedades.`;
  }
  if (/precio|cuanto (sale|cuesta|vale)|pack|caja|promo|descuento|x4|x8|x12/.test(q)) {
    return `Caja x4: ${formatPrice(f4.price)}. Pack x8: ${formatPrice(f8.price)} (ahorrás ${formatPrice(anchorPrice(f8) - f8.price)}). Pack x12: ${formatPrice(f12.price)} (ahorrás ${formatPrice(anchorPrice(f12) - f12.price)}). En todos elegís las variedades que quieras.`;
  }
  if (/gluten|tacc|celiac/.test(q)) {
    return 'Las cuatro variedades contienen avena y no tienen certificación sin TACC, así que no son aptas para personas celíacas.';
  }
  if (/alerg|mani|leche|lactosa|huevo|fruto seco|almendra|avellana/.test(q)) {
    return `${product.name} contiene ${joinList(product.allergens)}.`;
  }
  if (/azucar/.test(q)) {
    return n.addedSugars === 0
      ? `${product.name} no tiene azúcares añadidos: los ${formatNumber(n.sugars)} g de azúcares totales vienen de los dátiles.`
      : `${product.name} tiene ${formatNumber(n.sugars)} g de azúcares totales, de los cuales ${formatNumber(n.addedSugars)} g son añadidos (lleva miel).`;
  }
  if (/proteina/.test(q)) {
    return `${product.name} aporta ${formatNumber(n.protein)} g de proteína por barrita de ${product.weight} g.${product.key !== 'muscular' ? ' Si buscás la más proteica, es Recuperación muscular, con 17 g.' : ''}`;
  }
  if (/caloria|kcal|nutri|carbo|fibra|grasa|sodio/.test(q)) {
    return `Por barrita de ${product.weight} g, ${product.name} aporta ${n.kcal} kcal, ${formatNumber(n.carbs)} g de carbohidratos, ${formatNumber(n.protein)} g de proteínas, ${formatNumber(n.fat)} g de grasas y ${formatNumber(n.fiber)} g de fibra.`;
  }
  if (/sabor|gusto|rica|dulce|salad/.test(q)) {
    return product.taste;
  }
  if (/ingrediente|que (trae|lleva|tiene)|compos/.test(q)) {
    return `${product.ingredients} Contiene ${joinList(product.allergens)}.`;
  }
  if (/cuando|momento|antes|despues|entren|correr|gym|gimnasio|sirve/.test(q)) {
    return `${product.name} es para ${product.moment.toLowerCase()}. ${product.usage}`;
  }
  return `${product.name}: ${product.flavor.toLowerCase()}. ${product.usage} Podés preguntarme por ingredientes, alérgenos, valores nutricionales, precios, envíos o pagos.`;
}

function appendMessage(type, text) {
  const message = document.createElement('p');
  message.className = `message ${type}`;
  message.textContent = text;
  chatWindow.appendChild(message);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function setChatProduct(key) {
  activeProduct = key;
  const product = PRODUCT_BY_KEY[key];
  $$('button', chatTabs).forEach((tab) => tab.setAttribute('aria-pressed', String(tab.dataset.chatProduct === key)));
  chatInput.placeholder = `Preguntá por ${product.name}…`;
  chatWindow.innerHTML = '';
  appendMessage('bot', `${product.name}: ${product.description} ${product.usage} ¿Qué querés saber?`);
}

function renderChatTabs() {
  chatTabs.innerHTML = PRODUCTS.map((product) => `<button type="button" data-chat-product="${product.key}" style="--c:${product.color}" aria-pressed="false">${escapeHTML(product.name)}</button>`).join('');
}

chatTabs.addEventListener('click', (event) => {
  const tab = event.target.closest('[data-chat-product]');
  if (tab) setChatProduct(tab.dataset.chatProduct);
});

function ask(question) {
  appendMessage('user', question);
  appendMessage('bot', getBotReply(PRODUCT_BY_KEY[activeProduct], question));
}

$('#chat-suggestions').addEventListener('click', (event) => {
  const suggestion = event.target.closest('button');
  if (suggestion) ask(suggestion.textContent);
});

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const value = chatInput.value.trim();
  if (!value) return;
  ask(value);
  chatInput.value = '';
});

/* ==========================================================================
   WhatsApp: solo consultas, y solo si hay un número configurado
   ========================================================================== */

const whatsappButton = $('#whatsapp-button');
if (VOLTRA_CONFIG.whatsappNumber) {
  whatsappButton.href = `https://wa.me/${VOLTRA_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hola VOLTRA, tengo una consulta sobre sus barritas.')}`;
  whatsappButton.hidden = false;
}

/* ==========================================================================
   Inicio
   ========================================================================== */

bindBusinessData();
renderVarieties();
renderCompareTable();
renderFormatOptions();
renderBuilder();
renderCart();
renderPoints();
renderPickupInfo();
renderTransferDetails();
renderChatTabs();
setChatProduct(activeProduct);
updateCheckout();
