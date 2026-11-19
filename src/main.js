import { site, tel } from './data/site.js';
import { slides, specialties, departments, stats, doctors, facilities, partners, press, posts } from './data/content.js';

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

// ===== Điền thông tin chung =====
$$('[data-site]').forEach((el) => (el.textContent = site[el.dataset.site]));
const links = { tel: tel(site.hotline), tel2: tel(site.phone2), mailto: 'mailto:' + site.email, facebook: site.facebook, zalo: site.zalo,
  messenger: site.messenger, youtube: site.youtube, tiktok: site.tiktok, map: site.map };
$$('[data-href]').forEach((el) => (el.href = links[el.dataset.href]));
$('#year').textContent = new Date().getFullYear();

// ===== Icon chuyên khoa =====
const icons = {
  steth: '<path d="M6 3v6a5 5 0 0 0 10 0V3"/><path d="M11 14v2a5 5 0 0 0 10 0v-3"/><circle cx="21" cy="11" r="2"/>',
  scalpel: '<path d="M3 21l9-9"/><path d="M12 12l7-7a2.8 2.8 0 0 1 0 4l-5 5z"/>',
  lab: '<path d="M9 3h6M10 3v6L4 19a2 2 0 0 0 1.7 3h12.6A2 2 0 0 0 20 19l-6-10V3"/><path d="M7 15h10"/>',
  xray: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M12 6v12M8 9h8M8 12h8M9 15h6"/>',
  shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M12 9v6M9 12h6"/>',
  chat: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/><path d="M12 9v6M9 12h6"/>',
};
const svg = (n) => `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[n]}</svg>`;

// ===== Render nội dung =====
$('#slides').innerHTML = slides
  .map((s, i) => `
    <div class="slide tone-${s.tone} ${i === 0 ? 'active' : ''}" role="group" aria-roledescription="slide" aria-label="${i + 1} / ${slides.length}">
      <div class="container"><div class="slide__content">
        <h2>${s.title}</h2><p>${s.text}</p><button class="btn" data-open-modal>${s.cta}</button>
      </div></div>
    </div>`)
  .join('');

$('#specialties').innerHTML = specialties
  .map((s) => `<a href="#dat-lich" class="card spec reveal" data-dept="${s.name}"><div class="spec__icon">${svg(s.icon)}</div><h3>${s.name}</h3><p>${s.text}</p></a>`)
  .join('');

$('#stats').innerHTML = stats
  .map((s) => `<div class="stat"><strong data-count="${s.num}" data-suffix="${s.suffix}">0${s.suffix}</strong><span>${s.label}</span></div>`)
  .join('');

$('#doctors').innerHTML = doctors
  .map((d) => `<article class="card doctor reveal"><div class="ph tone-${d.tone}" role="img" aria-label="${d.name}"></div><div class="card__body"><h3>${d.name}</h3><p>${d.role}</p></div></article>`)
  .join('');

$('#facilities').innerHTML = facilities
  .map((f) => `<figure class="reveal"><div class="ph tone-${f.tone}" role="img" aria-label="${f.name}"></div><figcaption>${f.name}</figcaption></figure>`)
  .join('');

// Nhân đôi danh sách để chạy vòng lặp liền mạch
$('#partners').innerHTML = [...partners, ...partners].map((p, i) => `<div class="partner" ${i >= partners.length ? 'aria-hidden="true"' : ''}>${p}</div>`).join('');

$('#press').innerHTML = press
  .map((p) => `<article class="card press-card reveal"><div class="ph tone-${p.tone}" role="img" aria-label="${p.source}"></div><div class="card__body"><small>${p.source}</small><h3>${p.title}</h3><a href="#" class="card__more">Đọc bài viết →</a></div></article>`)
  .join('');

$('#posts').innerHTML = posts
  .map((p) => `<article class="card reveal"><div class="ph tone-${p.tone}" role="img" aria-label="${p.title}"></div><div class="card__body"><span class="muted">${p.date}</span><h3>${p.title}</h3><p>${p.text}</p><a href="#tin-tuc" class="card__more">Xem thêm →</a></div></article>`)
  .join('');

const deptLinks = departments.map((d) => `<li><a href="#dat-lich" data-dept="${d}">${d}</a></li>`).join('');
$('#nav-departments').innerHTML = deptLinks;
$('#footer-departments').innerHTML = deptLinks;

// ===== Form đặt lịch (dùng chung cho form trang và popup) =====
const today = new Date().toISOString().slice(0, 10);
const formHTML = (id) => `
  <div class="field"><label for="${id}-name">Họ và tên *</label><input id="${id}-name" name="name" type="text" placeholder="Họ và tên*" autocomplete="name" /><small class="error"></small></div>
  <div class="field"><label for="${id}-phone">Số điện thoại *</label><input id="${id}-phone" name="phone" type="tel" placeholder="Số điện thoại*" inputmode="numeric" autocomplete="tel" /><small class="error"></small></div>
  <div class="field"><label for="${id}-year">Năm sinh</label><input id="${id}-year" name="year" type="text" placeholder="Năm sinh" inputmode="numeric" maxlength="4" /><small class="error"></small></div>
  <div class="field"><label for="${id}-dept">Chuyên khoa</label><select id="${id}-dept" name="department"><option value="">-- Chọn chuyên khoa --</option>${departments.map((d) => `<option>${d}</option>`).join('')}</select></div>
  <div class="field"><label for="${id}-date">Ngày khám</label><input id="${id}-date" name="date" type="date" min="${today}" /><small class="error"></small></div>
  <div class="field"><label for="${id}-ref">Mã giới thiệu</label><input id="${id}-ref" name="ref" type="text" placeholder="Mã giới thiệu" /></div>
  <div class="field field--full"><label for="${id}-note">Ghi chú</label><textarea id="${id}-note" name="note" placeholder="Ghi chú yêu cầu (không bắt buộc)"></textarea></div>
  <button type="submit" class="btn btn--block">Đăng ký khám</button>
  <p class="form__msg" role="status" aria-live="polite"></p>`;
$('#booking').innerHTML = formHTML('b');
$('#booking-modal').innerHTML = formHTML('m');

// ===== Header sticky + lên đầu trang =====
const header = $('#header');
const toTop = $('#to-top');
const onScroll = () => {
  header.classList.toggle('is-stuck', scrollY > 40);
  toTop.classList.toggle('show', scrollY > 400);
};
addEventListener('scroll', onScroll, { passive: true });
onScroll();
toTop.addEventListener('click', () => scrollTo({ top: 0 }));

// ===== Menu mobile =====
const burger = $('.burger');
const nav = $('#nav');
const setMenu = (open) => {
  nav.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
  burger.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu');
};
burger.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
nav.addEventListener('click', (e) => e.target.closest('a') && setMenu(false));

// ===== Slider banner =====
const slideEls = $$('.slide');
const dots = $('#hero-dots');
dots.innerHTML = slides.map((_, i) => `<button role="tab" aria-label="Slide ${i + 1}"></button>`).join('');
let current = 0;
const show = (i) => {
  current = (i + slideEls.length) % slideEls.length;
  slideEls.forEach((s, j) => s.classList.toggle('active', j === current));
  $$('button', dots).forEach((b, j) => b.setAttribute('aria-selected', j === current));
};
let timer;
const restart = () => { clearInterval(timer); timer = setInterval(() => show(current + 1), 5000); };
$$('button', dots).forEach((b, i) => b.addEventListener('click', () => (show(i), restart())));
$('.hero__arrow--prev').addEventListener('click', () => (show(current - 1), restart()));
$('.hero__arrow--next').addEventListener('click', () => (show(current + 1), restart()));
show(0);
restart();

// ===== Hiệu ứng xuất hiện + đếm số =====
const countUp = (el) => {
  const target = +el.dataset.count;
  const start = performance.now();
  const step = (t) => {
    const p = Math.min((t - start) / 1500, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))).toLocaleString('vi-VN') + el.dataset.suffix;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};
const io = new IntersectionObserver(
  (entries) => entries.forEach((en) => {
    if (!en.isIntersecting) return;
    en.target.dataset.count ? countUp(en.target) : en.target.classList.add('in');
    io.unobserve(en.target);
  }),
  { threshold: 0.12 }
);
$$('.reveal, [data-count]').forEach((el) => io.observe(el));

// ===== Popup đặt lịch =====
const modal = $('#modal');
let lastFocus;
const openModal = () => {
  lastFocus = document.activeElement;
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  $('input', modal).focus();
};
const closeModal = () => {
  modal.hidden = true;
  document.body.style.overflow = '';
  lastFocus?.focus();
};
document.addEventListener('click', (e) => {
  if (e.target.closest('[data-open-modal]')) openModal();
  const dept = e.target.closest('[data-dept]');
  if (dept) $('#b-dept').value = dept.dataset.dept;
});
$('.modal__close').addEventListener('click', closeModal);
modal.addEventListener('click', (e) => e.target === modal && closeModal());
addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if (!modal.hidden) closeModal();
  setMenu(false);
});

// ===== Validate + gửi form =====
const PHONE_RE = /^0\d{9}$/;
const setError = (input, msg) => {
  const field = input.closest('.field');
  field.classList.toggle('invalid', !!msg);
  const err = $('.error', field);
  if (err) err.textContent = msg;
  return !msg;
};

const validate = (form) => {
  const { name, phone, year, date } = form.elements;
  const phoneVal = phone.value.replace(/[\s.]/g, '');
  const thisYear = new Date().getFullYear();
  let ok = setError(name, name.value.trim().length < 2 ? 'Vui lòng nhập họ và tên.' : '');
  ok = setError(phone, !phoneVal ? 'Vui lòng nhập số điện thoại.' : !PHONE_RE.test(phoneVal) ? 'Số điện thoại gồm 10 chữ số, bắt đầu bằng 0.' : '') && ok;
  ok = setError(year, year.value && !(+year.value >= 1900 && +year.value <= thisYear) ? `Năm sinh từ 1900 đến ${thisYear}.` : '') && ok;
  ok = setError(date, date.value && date.value < today ? 'Vui lòng chọn ngày từ hôm nay trở đi.' : '') && ok;
  return ok;
};

$$('#booking, #booking-modal').forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = $('.form__msg', form);
    if (!validate(form)) {
      msg.textContent = '';
      $('.invalid input', form)?.focus();
      return;
    }
    console.log('Đăng ký khám:', Object.fromEntries(new FormData(form)));
    msg.textContent = 'Đăng ký thành công! Chúng tôi sẽ liên hệ xác nhận sớm.';
    alert('Đăng ký thành công! Chúng tôi sẽ liên hệ xác nhận sớm.');
    form.reset();
  });
  form.addEventListener('input', (e) => e.target.closest('.field.invalid') && setError(e.target, ''));
});
