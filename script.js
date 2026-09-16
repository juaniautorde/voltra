const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menú');
  });
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const productData = {
  energia: {
    name: 'Voltra Energía',
    price: 11000,
    pricesByBox: { 4: 11000, 8: 20000, 12: 28000 },
    tag: 'Energía – Preentrenamiento',
    title: 'Banana, miel y cereales crocantes se combinan para aportar carbohidratos y energía antes de entrenar.',
    description: 'Ideal para correr, entrenar o moverte con más fuerza. La mezcla de fruta real y cereal crocante ofrece un sabor más natural y una energía que se siente desde el primer minuto.',
    features: ['Carbohidratos reales', 'Sin azúcar añadida', 'Proteína y fibra'],
    front: 'images/adelanteverde.png',
    back: 'images/atrasverde.png',
    graphic: 'images/info_barritaverde.png',
    quickInfo: 'Perfecta para tomar 30 a 45 minutos antes del entrenamiento y arrancar con más energía.',
    taste: 'Tiene un sabor a banana con miel y cereal, muy natural y crocante.',
    ingredients: 'Banana, miel, cereales, proteína y fibra, sin sabores artificiales.'
  },
  recuperacion: {
    name: 'Voltra Recuperación',
    price: 11000,
    pricesByBox: { 4: 11000, 8: 20000, 12: 28000 },
    tag: 'Recuperación – Después de entrenar',
    title: 'Caramelo salado y vainilla ayudan a recargar energías cuando la sesión terminó.',
    description: 'Pensada para los momentos post-entrenamiento, cuando tu cuerpo necesita volver a activar la energía y recuperar mejor la sensación de fuerza.',
    features: ['Electrolitos', 'Recarga rápida', 'Sabor equilibrado'],
    front: 'images/adelanteceleste.png',
    back: 'images/atrasceleste.png',
    graphic: 'images/info_barritaceleste.png',
    quickInfo: 'Es muy útil para reponer energía y acompañar la vuelta a la rutina.',
    taste: 'Tiene un perfil dulce con un toque salado y vainilla, muy suave y equilibrado.',
    ingredients: 'Vainilla, caramelo salado, electrolitos, proteínas y granos naturales.'
  },
  muscular: {
    name: 'Voltra Recuperación muscular',
    price: 11000,
    pricesByBox: { 4: 11000, 8: 20000, 12: 28000 },
    tag: 'Fuerza – Recuperación muscular',
    title: 'Maní, almendras y proteína acompañan la recuperación para volver a mover el cuerpo con más fuerza.',
    description: 'Está pensada para quienes entrenan con peso, fuerza o intensidad y quieren una opción más contundente para recuperar y sostener la energía.',
    features: ['Proteína', 'Acompaña la recuperación', 'Sabor intenso'],
    front: 'images/adelanteroja.png',
    back: 'images/atrasroja.png',
    graphic: 'images/info_barritaroja.png',
    quickInfo: 'Ideal para después de un entrenamiento intenso o cuando necesitás soporte muscular.',
    taste: 'Tiene un sabor más intenso, con nutty y un toque de maní y almendra.',
    ingredients: 'Maní, almendras, proteína, granos y mezcla de frutos secos.'
  },
  saludable: {
    name: 'Voltra Gusto saludable',
    price: 11000,
    pricesByBox: { 4: 11000, 8: 20000, 12: 28000 },
    tag: 'Antojo – Opción más saludable',
    title: 'Cacao, dátiles y avellanas crean una barrita cremosa, sabrosa y más balanceada.',
    description: 'Es la opción más indulgente para un momento de antojo, pero mantiene un perfil más saludable con ingredientes reales y un sabor que invita a repetir.',
    features: ['Sabor a cacao', 'Dátiles y avellanas', 'Opción más cremosa'],
    front: 'images/adelantevioleta.png',
    back: 'images/atrasvioleta.png',
    graphic: 'images/info_barritavioleta.png',
    quickInfo: 'Muy buena para un snack de media mañana o para cerrar la tarde sin exceso de artificios.',
    taste: 'Tiene un sabor a cacao y frutos secos, con una textura más cremosa y sabrosa.',
    ingredients: 'Cacao, dátiles, avellanas, proteína y mezcla de ingredientes de origen natural.'
  },
  mixta: {
    name: 'Caja mixta Voltra',
    price: 28000,
    pricesByBox: { 12: 28000 },
    quickInfo: 'Incluye 12 barritas: 3 de Energía, 3 de Recuperación, 3 de Recuperación muscular y 3 de Gusto saludable.'
  },
  mixta4: {
    name: 'Caja mixta Voltra',
    price: 11000,
    pricesByBox: { 4: 11000 },
    quickInfo: 'Incluye 4 barritas: 1 de Energía, 1 de Recuperación, 1 de Recuperación muscular y 1 de Gusto saludable.'
  }
};

const VOLTRA_CONFIG = {
  wholesaleMinimum: 200000,
  whatsappNumber: '',
  bankTransfer: {
    alias: '',
    cbu: '',
    holder: '',
    cuit: ''
  },
  shipping: {
    freeFrom: 20000,
    defaultCost: 1800,
    wholesaleCost: 1800,
    ratesByPostalPrefix: {}
  },
  analytics: {
    googleMeasurementId: '',
    metaPixelId: ''
  }
};

Object.values(productData).forEach((product) => {
  product.sku = product.sku || '';
  product.stock = product.stock ?? null;
  product.wholesaleTiers = product.wholesaleTiers || [];
  product.allergens = product.allergens || '';
  product.nutrition = product.nutrition || '';
  product.minimumQuantity = product.minimumQuantity || 1;
});

const detailFront = document.getElementById('detail-front');
const detailBack = document.getElementById('detail-back');
const detailTag = document.getElementById('detail-tag');
const detailTitle = document.getElementById('detail-title');
const detailDescription = document.getElementById('detail-description');
const detailFeatures = document.getElementById('detail-features');
const detailGraphic = document.getElementById('detail-graphic');
const chatProductLabel = document.getElementById('chat-product-label');
const chatWindow = document.getElementById('chat-window');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');

let activeProduct = 'energia';

function renderProduct(productKey) {
  const product = productData[productKey];
  if (!product) return;

  activeProduct = productKey;
  detailFront.src = product.front;
  detailFront.alt = `${product.name} frontal`;
  detailBack.src = product.back;
  detailBack.alt = `${product.name} trasero`;
  detailTag.textContent = product.tag;
  detailTitle.textContent = product.title;
  detailDescription.textContent = product.description;
  detailFeatures.innerHTML = product.features.map((feature) => `<li>${feature}</li>`).join('');
  detailGraphic.src = product.graphic;
  detailGraphic.alt = `Información de ${product.name}`;
  chatProductLabel.textContent = product.name;
  chatInput.placeholder = `Pregunta por ${product.name}...`;
  document.querySelectorAll('.product-detail .add-to-cart').forEach((button) => {
    button.dataset.product = productKey;
  });

  chatWindow.innerHTML = `
    <div class="message bot">${product.quickInfo} Si querés, preguntame por sabor, ingredientes, momento de consumo o si sirve para entrenar.</div>
  `;
}

function getBotReply(product, question) {
  const q = question.toLowerCase();

  if (/mayorista|comercio|revender|negocio|distribui/.test(q)) {
    return '¿Querés comprar para tu comercio? Podés acceder a nuestra modalidad mayorista desde $200.000.';
  }

  if (/env[ií]o|entrega|c[oó]digo postal|retiro/.test(q)) {
    return 'El envío se calcula con el código postal durante el checkout. El retiro por punto queda pendiente de configurar.';
  }

  if (/pago|mercado pago|transferencia|tarjeta|efectivo/.test(q)) {
    return 'Podés elegir Mercado Pago cuando la integración esté conectada, transferencia bancaria o efectivo si corresponde. VOLTRA no solicita datos de tarjeta directamente.';
  }

  if (/sabor|gusto|dulce|salado|sabore|paladar/.test(q)) {
    return product.taste;
  }

  if (/ingrediente|composicion|qué trae|qué lleva|qué tiene|componentes|ingredientes/.test(q)) {
    return product.ingredients;
  }

  if (/para qué sirve|cuando|momento|antes|después|entrenar|recuper/.test(q)) {
    return product.quickInfo;
  }

  if (/azúcar|sin azúcar|sugar/.test(q)) {
    return `La ${product.name} está pensada para ser más limpia y real, con menos artificios y un enfoque más saludable.`;
  }

  if (/proteína|proteina|muscular/.test(q)) {
    return `La ${product.name} tiene un enfoque orientado a acompañar la energía o la recuperación según el caso, con ingredientes que ayudan a ese esfuerzo.`;
  }

  return `La ${product.name} está diseñada para ${product.tag.toLowerCase()}. Si te interesa, la mejor forma de usarla es ${product.quickInfo.toLowerCase()}`;
}

function appendMessage(type, text) {
  const message = document.createElement('div');
  message.className = `message ${type}`;
  message.textContent = text;
  chatWindow.appendChild(message);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function trackEvent(name, parameters = {}) {
  if (typeof window.gtag === 'function' && VOLTRA_CONFIG.analytics.googleMeasurementId) {
    window.gtag('event', name, parameters);
  }
  window.dispatchEvent(new CustomEvent(`voltra:${name}`, { detail: parameters }));
}

async function startMercadoPagoCheckout(orderData) {
  return { status: 'pending', orderData };
}

const cartButton = document.getElementById('cart-button');
const cartSectionButton = document.getElementById('cart-section-button');
const cartModal = document.getElementById('cart-modal');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const cartSubtotal = document.getElementById('cart-subtotal');
const cartShipping = document.getElementById('cart-shipping');
const cartEmpty = document.getElementById('cart-empty');
const customerType = document.getElementById('customer-type');
const wholesaleNote = document.getElementById('wholesale-note');
const businessFields = document.getElementById('business-fields');
const businessInputs = businessFields.querySelectorAll('input');
const checkoutStart = document.getElementById('checkout-start');
const checkoutSummary = document.getElementById('checkout-summary');
const cartClose = document.querySelector('.cart-close');
const clearCartButton = document.getElementById('clear-cart');
const cartStorageKey = 'voltra-cart-v1';
const wholesaleThreshold = VOLTRA_CONFIG.wholesaleMinimum;
let cart = {};
try {
  cart = JSON.parse(localStorage.getItem(cartStorageKey) || '{}');
} catch (error) {
  cart = {};
}
cart = Object.fromEntries(Object.entries(cart).filter(([, item]) => (
  item && productData[item.productKey] && [4, 8, 12].includes(Number(item.boxSize)) && Number.isInteger(item.quantity) && item.quantity > 0
)).map(([key, item]) => [key, {
  productKey: item.productKey,
  boxSize: Number(item.boxSize),
  quantity: item.quantity
}]));
const customerModal = document.getElementById('customer-modal');
const customerOptions = document.querySelectorAll('.customer-option');
const wholesaleAccess = document.getElementById('wholesale-access');
const entryCuit = document.getElementById('entry-cuit');
const enterWholesale = document.getElementById('enter-wholesale');
let customerSegment = '';
let wholesaleCuit = '';

document.querySelectorAll('input[name="cuit"], #entry-cuit').forEach((input) => {
  input.addEventListener('input', () => {
    input.value = input.value.replace(/\D/g, '').slice(0, 11);
  });
});

function formatPrice(value) {
  return `$${value.toLocaleString('es-AR')}`;
}

function escapeHTML(value) {
  return String(value).replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  })[character]);
}
const continueShoppingButton = document.getElementById('continue-shopping');

function getCartProduct(item) {
  const product = productData[item.productKey];
  const volumeTier = product.wholesaleTiers.find((tier) => item.quantity >= tier.minimumBoxes);
  return {
    ...product,
    displayName: `${product.name} - Caja x${item.boxSize}`,
    boxPrice: customerSegment === 'wholesale' && volumeTier?.price
      ? volumeTier.price
      : product.pricesByBox?.[item.boxSize] || product.price
  };
}

function saveCart() {
  localStorage.setItem(cartStorageKey, JSON.stringify(cart));
}

function calculateShipping(postalCode = '') {
  const prefix = postalCode.trim().slice(0, 2);
  if (typeof VOLTRA_CONFIG.shipping.ratesByPostalPrefix[prefix] === 'number') {
    return VOLTRA_CONFIG.shipping.ratesByPostalPrefix[prefix];
  }
  return customerSegment === 'wholesale'
    ? VOLTRA_CONFIG.shipping.wholesaleCost
    : VOLTRA_CONFIG.shipping.defaultCost;
}

function getCartTotals(postalCode = '') {
  const entries = Object.values(cart);
  const subtotal = entries.reduce((sum, item) => sum + item.quantity * getCartProduct(item).boxPrice, 0);
  const shipping = VOLTRA_CONFIG.shipping.freeFrom !== null && subtotal >= VOLTRA_CONFIG.shipping.freeFrom
    ? 0
    : calculateShipping(postalCode);
  return { subtotal, shipping, total: shipping === null ? null : subtotal + shipping };
}

function renderCart() {
  const entries = Object.entries(cart);
  const quantity = entries.reduce((total, [, item]) => total + item.quantity, 0);
  const { subtotal, shipping } = getCartTotals();
  const isWholesale = subtotal >= wholesaleThreshold;

  cartCount.textContent = quantity;
  cartSubtotal.textContent = formatPrice(subtotal);
  cartShipping.textContent = shipping === null ? 'A calcular' : shipping === 0 ? 'Bonificado' : formatPrice(shipping);
  cartTotal.textContent = shipping === null ? formatPrice(subtotal) : formatPrice(subtotal + shipping);
  cartEmpty.hidden = entries.length > 0;
  const selectedWholesale = customerSegment === 'wholesale';
  const classifiedWholesale = isWholesale || selectedWholesale;
  checkoutStart.disabled = entries.length === 0 || (selectedWholesale && subtotal < wholesaleThreshold);
  customerType.textContent = classifiedWholesale ? 'Compra mayorista' : 'Compra minorista';
  customerType.classList.toggle('is-wholesale', classifiedWholesale);
  wholesaleNote.textContent = classifiedWholesale && subtotal >= wholesaleThreshold
    ? 'Tu pedido mayorista cumple el mínimo de $200.000.'
    : selectedWholesale
      ? `Compra mayorista: te faltan ${formatPrice(wholesaleThreshold - subtotal)} para llegar al mínimo.`
      : 'Superando $200.000, tu pedido se identifica como mayorista.';
  businessFields.hidden = !classifiedWholesale;
  businessInputs.forEach((input) => input.toggleAttribute('required', classifiedWholesale));
  if (wholesaleCuit) document.querySelector('input[name="cuit"]').value = wholesaleCuit;

  cartItems.innerHTML = entries.map(([key, item]) => `
    <div class="cart-item">
      <div>
        <strong>${getCartProduct(item).displayName}</strong>
        <span>${formatPrice(getCartProduct(item).boxPrice)}</span>
      </div>
      <div class="cart-item-actions">
        <button type="button" class="quantity-button" data-cart-action="decrease" data-cart-key="${key}" aria-label="Quitar una unidad">−</button>
        <b>${item.quantity}</b>
        <button type="button" class="quantity-button" data-cart-action="increase" data-cart-key="${key}" aria-label="Agregar una unidad">+</button>
        <button type="button" class="remove-item" data-cart-action="remove" data-cart-key="${key}">Quitar</button>
      </div>
    </div>
  `).join('');
}

function addToCart(productKey, boxSize = 12) {
  if (!productData[productKey]) return;
  const cartKey = `${productKey}-${boxSize}`;
  cart[cartKey] = cart[cartKey] || { productKey, boxSize, quantity: 0 };
  if (productData[productKey].stock !== null && cart[cartKey].quantity >= productData[productKey].stock) return;
  cart[cartKey].quantity += 1;
  saveCart();
  trackEvent('add_to_cart', { product: productKey, boxSize });
  renderCart();
}

function openCart() {
  renderCart();
  cartModal.showModal();
}

document.querySelectorAll('.add-to-cart').forEach((button) => {
  button.addEventListener('click', (event) => {
    event.stopPropagation();
    addToCart(button.dataset.product, Number(button.dataset.boxSize) || 12);
    openCart();
  });
});

cartItems.addEventListener('click', (event) => {
  const actionButton = event.target.closest('[data-cart-action]');
  if (!actionButton) return;
  const key = actionButton.dataset.cartKey;
  const action = actionButton.dataset.cartAction;

  if (action === 'increase') {
    const product = productData[cart[key].productKey];
    if (product.stock === null || cart[key].quantity < product.stock) cart[key].quantity += 1;
  }
  if (action === 'decrease') cart[key].quantity -= 1;
  if (action === 'remove' || cart[key].quantity <= 0) delete cart[key];
  saveCart();
  renderCart();
});

cartButton.addEventListener('click', openCart);
cartSectionButton.addEventListener('click', openCart);
cartClose.addEventListener('click', () => cartModal.close());
cartModal.addEventListener('click', (event) => {

  continueShoppingButton.addEventListener('click', () => {
    cartModal.close();
    document.getElementById('producto').scrollIntoView({ behavior: 'smooth' });
  });
  if (event.target === cartModal) cartModal.close();
});

clearCartButton.addEventListener('click', () => {
  if (!Object.keys(cart).length) return;
  if (!window.confirm('¿Querés vaciar el carrito?')) return;
  cart = {};
  saveCart();
  renderCart();
});

customerOptions.forEach((option) => {
  option.addEventListener('click', () => {
    if (option.dataset.segment === 'retail') {
      customerSegment = 'retail';
      customerModal.close();
      renderCart();
      return;
    }

    wholesaleAccess.hidden = false;
    entryCuit.focus();
  });
});

enterWholesale.addEventListener('click', () => {
  if (!entryCuit.checkValidity()) {
    entryCuit.reportValidity();
    return;
  }

  customerSegment = 'wholesale';
  wholesaleCuit = entryCuit.value;
  customerModal.close();
  renderCart();
});

customerModal.addEventListener('cancel', (event) => {
  event.preventDefault();
});

const productLinks = document.querySelectorAll('.product-link');
productLinks.forEach((button) => {
  button.addEventListener('click', () => {
    const key = button.dataset.product;
    trackEvent('view_item', { product: key });
    renderProduct(key);
    document.getElementById('detalle-producto').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

document.querySelectorAll('.product-card').forEach((card) => {
  card.addEventListener('click', (event) => {
    if (event.target.closest('.product-link') || event.target.closest('a[href="#comprar"]')) return;
    renderProduct(card.dataset.product);
    trackEvent('view_item', { product: card.dataset.product });
    document.getElementById('detalle-producto').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      renderProduct(card.dataset.product);
      document.getElementById('detalle-producto').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const value = chatInput.value.trim();
  if (!value) return;

  appendMessage('user', value);
  const reply = getBotReply(productData[activeProduct], value);
  appendMessage('bot', reply);
  chatInput.value = '';
});

const checkoutModal = document.querySelector('#checkout-modal');
const closeModal = document.querySelector('.checkout-modal .close-modal');
const checkoutForm = document.querySelector('#checkout-form');
const formMessage = document.querySelector('#form-message');
const confirmationModal = document.getElementById('confirmation-modal');
const confirmationDetails = document.getElementById('confirmation-details');
const confirmationWhatsapp = document.getElementById('confirmation-whatsapp');
const confirmationClose = document.getElementById('confirmation-close');
const mercadoPagoButton = document.getElementById('mercado-pago-button');
const cardPaymentButton = document.getElementById('card-payment-button');

function nextOrderNumber() {
  const current = Number(localStorage.getItem('voltra-order-sequence') || '0') + 1;
  localStorage.setItem('voltra-order-sequence', String(current));
  return `VOL-${new Date().getFullYear()}-${String(current).padStart(4, '0')}`;
}

function buildWhatsAppMessage(order) {
  const products = order.products.map((product) => `${product.name} x${product.quantity}`).join(', ');
  return `Hola VOLTRA, quiero consultar por el pedido ${order.number}. Nombre: ${order.name}. Total: ${formatPrice(order.total)}. Método: ${order.payment}. Productos: ${products}.`;
}

function openWhatsApp(message) {
  if (!VOLTRA_CONFIG.whatsappNumber) return '#';
  return `https://wa.me/${VOLTRA_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

if (closeModal) {
  closeModal.addEventListener('click', () => checkoutModal.close());
}

checkoutStart.addEventListener('click', () => {
  const entries = Object.entries(cart);
  if (!entries.length) return;
  trackEvent('begin_checkout', { itemCount: entries.length });
  const { subtotal } = getCartTotals();
  const segmentLabel = subtotal >= wholesaleThreshold ? 'Compra mayorista' : 'Compra minorista';
  checkoutSummary.innerHTML = `<small>${segmentLabel}</small>${entries.map(([, item]) => `<span>${getCartProduct(item).displayName} × ${item.quantity}</span>`).join('')}<strong>${formatPrice(subtotal)}</strong>`;
  checkoutSubtotal.textContent = formatPrice(subtotal);
  checkoutDiscount.textContent = 'Sin descuento configurado';
  checkoutShipping.textContent = 'A calcular';
  checkoutTotal.textContent = formatPrice(subtotal);
  cartModal.close();
  checkoutModal.showModal();
});

mercadoPagoButton.addEventListener('click', () => {
  startMercadoPagoCheckout({ items: Object.values(cart) });
  formMessage.textContent = 'Mercado Pago queda pendiente de conectar con un backend seguro. No se registró ningún pago.';
  formMessage.style.color = 'var(--orange)';
});
cardPaymentButton.addEventListener('click', () => {
  startMercadoPagoCheckout({ items: Object.values(cart), paymentMethod: 'card' });
  formMessage.textContent = 'El pago con tarjeta queda pendiente de conectar con Mercado Pago. No se registró ningún pago.';
  formMessage.style.color = 'var(--orange)';
});
if (checkoutModal) {
  checkoutModal.addEventListener('click', (event) => {
    if (event.target === checkoutModal) checkoutModal.close();
  });
}

const postalCodeInput = document.querySelector('input[name="postal-code"]');
const checkoutShipping = document.getElementById('checkout-shipping');
const checkoutSubtotal = document.getElementById('checkout-subtotal');
const checkoutTotal = document.getElementById('checkout-total');
const checkoutDiscount = document.getElementById('checkout-discount');
postalCodeInput.addEventListener('input', () => {
  const { subtotal, shipping, total } = getCartTotals(postalCodeInput.value);
  checkoutSubtotal.textContent = formatPrice(subtotal);
  checkoutShipping.textContent = shipping === null ? 'A calcular' : formatPrice(shipping);
  checkoutTotal.textContent = total === null ? formatPrice(subtotal) : formatPrice(total);
});

// Payment method visibility toggle
const paymentRadios = document.querySelectorAll('input[name="payment"]');
const transferDetails = document.getElementById('transfer-details');
const cardDetails = document.getElementById('card-details');
const mercadoPagoDetails = document.getElementById('mercado-pago-details');
const whatsappInput = document.querySelector('input[name="whatsapp"]');

function updatePaymentFields(value) {
  const hasTransfer = value === 'transfer';
  const hasMercadoPago = value === 'mercado-pago';
  const hasCard = value === 'card';

  transferDetails.classList.toggle('visible', hasTransfer);
  mercadoPagoDetails.classList.toggle('visible', hasMercadoPago);
  cardDetails.classList.toggle('visible', hasCard);

  if (hasTransfer) {
    whatsappInput.setAttribute('required', 'required');
  } else {
    whatsappInput.removeAttribute('required');
  }
}

paymentRadios.forEach((radio) => {
  radio.addEventListener('change', (event) => updatePaymentFields(event.target.value));
});

const checkedPayment = document.querySelector('input[name="payment"]:checked');
if (checkedPayment) {
  updatePaymentFields(checkedPayment.value);
}

checkoutForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!checkoutForm.checkValidity()) {
    checkoutForm.reportValidity();
    return;
  }
  
  const formData = new FormData(checkoutForm);
  const customerName = `${formData.get('first-name')} ${formData.get('last-name')}`;
  const payment = formData.get('payment');
  if (payment === 'mercado-pago' || payment === 'card') {
    formMessage.textContent = 'La integración con Mercado Pago todavía no está conectada. No se registró ningún pago.';
    formMessage.style.color = 'var(--orange)';
    return;
  }

  const { subtotal, shipping, total } = getCartTotals(formData.get('postal-code'));
  const paymentLabel = payment === 'transfer'
    ? 'Transferencia bancaria'
    : 'Efectivo contra entrega';
  const order = {
    number: nextOrderNumber(),
    date: new Date(),
    name: customerName,
    payment: paymentLabel,
    products: Object.values(cart).map((item) => ({ name: getCartProduct(item).displayName, quantity: item.quantity })),
    subtotal,
    shipping,
    total: total ?? subtotal,
    address: `${formData.get('street')} ${formData.get('street-number')}${formData.get('apartment') ? `, ${formData.get('apartment')}` : ''}, ${formData.get('locality')}, ${formData.get('province')} (${formData.get('postal-code')})`,
    status: 'Pedido recibido'
  };

    confirmationDetails.innerHTML = `<p><strong>${escapeHTML(order.number)}</strong> · ${order.date.toLocaleDateString('es-AR')}</p><p>${order.products.map((product) => `${escapeHTML(product.name)} × ${product.quantity}`).join('<br>')}</p><p>Subtotal: ${formatPrice(order.subtotal)}<br>Envío: ${order.shipping === null ? 'A confirmar' : formatPrice(order.shipping)}<br><strong>Total: ${formatPrice(order.total)}</strong></p><p>Método: ${escapeHTML(order.payment)}<br>Entrega: ${escapeHTML(order.address)}<br>Estado: ${escapeHTML(order.status)}</p>`;
  trackEvent('purchase', { orderNumber: order.number, total: order.total });
  confirmationWhatsapp.href = openWhatsApp(buildWhatsAppMessage(order));
  formMessage.textContent = 'Pedido recibido. Revisá el resumen de confirmación.';
  formMessage.style.color = 'var(--green)';
  cart = {};
  saveCart();
  renderCart();
  checkoutForm.reset();
  checkoutModal.close();
  confirmationModal.showModal();
});

confirmationClose.addEventListener('click', () => confirmationModal.close());

const whatsappButton = document.getElementById('whatsapp-button');
whatsappButton.addEventListener('click', (event) => {

  const wholesaleForm = document.getElementById('wholesale-form');
  const wholesaleMessage = document.getElementById('wholesale-message');
  wholesaleForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!wholesaleForm.checkValidity()) {
      wholesaleForm.reportValidity();
      return;
    }
    if (!VOLTRA_CONFIG.whatsappNumber) {
      wholesaleMessage.textContent = 'Formulario válido. Falta configurar el WhatsApp oficial de VOLTRA para enviarlo.';
      wholesaleMessage.style.color = 'var(--orange)';
      return;
    }
    const data = new FormData(wholesaleForm);
    const message = `Hola, quiero consultar por compras mayoristas de VOLTRA. Mi comercio es ${data.get('wholesale-business')} y estoy interesado/a en comprar ${data.get('wholesale-products') || 'cajas de barritas'}.`;
    window.open(openWhatsApp(message), '_blank', 'noopener');
    trackEvent('wholesale_contact', { business: data.get('wholesale-business') });
  });
  if (!VOLTRA_CONFIG.whatsappNumber) {
    event.preventDefault();
    whatsappButton.textContent = 'WhatsApp pendiente de configurar';
    return;
  }
  const message = customerSegment === 'wholesale'
    ? 'Hola VOLTRA, quiero realizar una compra mayorista. Mi comercio es ______ y estoy interesado/a en comprar ______.'
    : 'Hola VOLTRA, tengo una consulta sobre sus productos.';
  whatsappButton.href = openWhatsApp(message);
});

document.querySelectorAll('.accordion details').forEach((currentDetails) => {
  currentDetails.addEventListener('toggle', () => {
    if (currentDetails.open) {
      document.querySelectorAll('.accordion details').forEach((otherDetails) => {
        if (otherDetails !== currentDetails) otherDetails.removeAttribute('open');
      });
    }
  });
});

customerModal.showModal();