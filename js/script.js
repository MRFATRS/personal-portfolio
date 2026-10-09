/* ===== DATA YANG BISA ANDA UBAH ===== */
// Isi dengan data asli. Kosongkan ("") jika belum ada: tombol/tautan akan otomatis dinonaktifkan.
const CONFIG = {
  email: "faturrahmansyakib95@gmail.com",      // contoh: "nama@email.com"
  github: "https://github.com/MRFATRS",     // contoh: "https://github.com/username"
  linkedin: "https://www.linkedin.com/in/muhammad-faturrahman-syakib-465901377",   // contoh: "https://www.linkedin.com/in/username"
  instagram: "@smfaturrahman"   // opsional
};

// icon = nama class Devicon (opsional). Tanpa icon, tampil monogram.
const SKILLS = {
  "Programming Languages": [["Python","python-plain"],["C++","cplusplus-plain"],["Java","java-plain"],["Pascal"]],
  "Web Development": [["HTML5","html5-plain"],["CSS3","css3-plain"],["JavaScript","javascript-plain"],["PHP Native","php-plain"]],
  "Database": [["MySQL","mysql-plain"],["Oracle SQL","oracle-original"],["Database Management"]],
  "Development Tools": [["Git","git-plain"],["GitHub","github-original"],["XAMPP","xampp-original"],["Linux","linux-plain"],["Lazarus"]],
  "Additional Knowledge": [["R Programming","r-plain"],["Scilab"],["UI/UX Design","figma-plain"],["Data Science Fundamentals"]]
};

// category: web | software | data. status: Completed | In Progress | Concept
// demo/source: isi URL asli; kosong = tombol ditampilkan nonaktif.
const PROJECTS = [
  { title:"Blue Arena Futsal", cat:"web", catLabel:"Web Development", status:"Completed", mock:"web",
    desc:"Website pemesanan lapangan futsal yang dilengkapi halaman utama, galeri, informasi layanan, testimoni, FAQ, serta dashboard admin untuk mengelola data booking.",
    tech:["PHP Native","MySQL","HTML","CSS","JavaScript","XAMPP"], demo:"", source:"" },
  { title:"Rental Alat Pendakian", cat:"web", catLabel:"Web Development", status:"In Progress", mock:"web",
    desc:"Sistem manajemen penyewaan alat pendakian berbasis web untuk mempermudah proses pemesanan inventaris, pencatatan data penyewa, dan rekapitulasi transaksi secara real-time.",
    tech:["HTML","CSS","PHP Native","MySQL","XAMPP"], techNote:"Rencana", demo:"", source:"" },
  { title:"Personal Portfolio Website", cat:"web", catLabel:"Web Development", status:"In Progress", mock:"web",
    desc:"Website personal yang dirancang untuk menampilkan profil, pengalaman, keterampilan, dan proyek di bidang teknologi informasi.",
    tech:["HTML5","CSS3","JavaScript"], demo:"", source:"" }
];

/* ===== UTIL ===== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => s.replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
document.documentElement.classList.add("js");
$("#year").textContent = new Date().getFullYear();

/* ===== SOCIAL & CONTACT ===== */
const links = [["GitHub", CONFIG.github], ["LinkedIn", CONFIG.linkedin]];
$$("[data-social]").forEach(box => {
  box.innerHTML = links.map(([n, u]) => u
    ? `<a href="${esc(u)}" target="_blank" rel="noopener noreferrer">${n}</a>`
    : `<span title="URL ${n} belum diisi" aria-disabled="true">${n}</span>`).join("");
});
const contactRows = [
  ["Email", CONFIG.email, CONFIG.email && "mailto:" + CONFIG.email],
  ["GitHub", CONFIG.github, CONFIG.github],
  ["LinkedIn", CONFIG.linkedin, CONFIG.linkedin],
  ["Instagram", CONFIG.instagram, CONFIG.instagram]
];
$("#contactList").innerHTML = contactRows.map(([n, text, href]) =>
  `<li><b>${n}</b>${href ? `<a href="${esc(href)}" ${n !== "Email" ? 'target="_blank" rel="noopener noreferrer"' : ""}>${esc(text.replace(/^https?:\/\//, ""))}</a>` : '<span>Belum diisi</span>'}</li>`).join("");

/* ===== SKILLS ===== */
$("#skillGrid").innerHTML = Object.entries(SKILLS).map(([g, items]) => `
  <div class="sgroup reveal"><h3>${g}</h3><div class="sgrid">${items.map(([n, ic]) => `
    <div class="skill">${ic ? `<i class="devicon-${ic}" aria-hidden="true"></i>` : `<span class="mono" aria-hidden="true">${esc(n.slice(0, 2))}</span>`}<b>${esc(n)}</b></div>`).join("")}
  </div></div>`).join("");

/* ===== PROJECTS ===== */
const mockHTML = { web:'<div class="mock m-web"><b></b><i></i><i></i><i></i><i></i></div>',
  ai:'<div class="mock m-ai"><b></b><i></i><i></i><i></i></div>',
  data:'<div class="mock m-data"><b></b><i></i><i></i><i></i><i></i><i></i></div>' };
const btn = (label, url) => url ? `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${label}</a>`
  : `<span title="Belum tersedia" aria-disabled="true">${label} (belum tersedia)</span>`;
$("#projectGrid").innerHTML = PROJECTS.map(p => `
  <article class="proj" data-cat="${p.cat}">
    <div class="thumb" aria-hidden="true">${mockHTML[p.mock]}</div>
    <div class="pbody">
      <div class="ptop"><span class="cat">${esc(p.catLabel)}</span><span class="status ${p.status.replace(" ", "")}">${p.status}</span></div>
      <h3>${esc(p.title)}</h3><p>${esc(p.desc)}</p>
      ${p.tech.length ? `<div class="tech" aria-label="${p.techNote || "Teknologi"}">${p.tech.map(t => `<span>${esc(t)}</span>`).join("")}</div>` : ""}
      <div class="pbtn">${btn("Live Demo", p.demo)}${btn("Source Code", p.source)}</div>
    </div>
  </article>`).join("");

const filterBtns = $$(".filters button");
filterBtns.forEach(b => b.addEventListener("click", () => {
  filterBtns.forEach(x => x.classList.toggle("on", x === b));
  let shown = 0;
  $$(".proj").forEach(c => {
    const ok = b.dataset.f === "all" || c.dataset.cat === b.dataset.f;
    c.classList.toggle("hide", !ok); shown += ok;
  });
  const msg = $("#emptyMsg");
  msg.hidden = shown > 0;
  msg.textContent = `Belum ada proyek pada kategori ${b.textContent}.`;
}));

/* ===== NAVBAR ===== */
const nav = $("#nav"), burger = $("#burger"), menu = $("#menu");
const onScroll = () => {
  nav.classList.toggle("scrolled", scrollY > 20);
  $("#top").style.visibility = scrollY > 400 ? "visible" : "hidden";
};
onScroll(); addEventListener("scroll", onScroll, { passive: true });
const setMenu = open => {
  menu.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", open);
  burger.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
};
burger.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
menu.addEventListener("click", e => e.target.closest("a") && setMenu(false));
addEventListener("keydown", e => e.key === "Escape" && setMenu(false));
$("#top").addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));

/* Active link berdasarkan section terlihat */
const navLinks = $$("#menu a:not(.btn)");
const secObs = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
}), { rootMargin: "-45% 0px -50% 0px" });
$$("main section[id]").forEach(s => secObs.observe(s));

/* ===== SCROLL REVEAL ===== */
const revObs = new IntersectionObserver((es, o) => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add("in"); o.unobserve(e.target); }
}), { threshold: .12 });
$$(".reveal").forEach(el => revObs.observe(el));

/* ===== FORM (mailto, tanpa backend) ===== */
const form = $("#form"), note = $("#formNote");
const rules = {
  name: v => v.trim().length >= 2 || "Nama minimal 2 karakter.",
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || "Masukkan alamat email yang valid, misalnya nama@email.com.",
  subject: v => v.trim().length >= 3 || "Subjek minimal 3 karakter.",
  message: v => v.trim().length >= 10 || "Pesan minimal 10 karakter."
};
const check = id => {
  const el = $("#" + id), r = rules[id](el.value);
  el.classList.toggle("invalid", r !== true);
  el.setAttribute("aria-invalid", r !== true);
  $("#e-" + id).textContent = r === true ? "" : r;
  return r === true;
};
Object.keys(rules).forEach(id => $("#" + id).addEventListener("blur", () => check(id)));
form.addEventListener("submit", e => {
  e.preventDefault();
  const ok = Object.keys(rules).map(check).every(Boolean);
  if (!ok) { $(".invalid", form)?.focus(); return; }
  if (!CONFIG.email) {
    note.textContent = "Alamat email tujuan belum diatur. Isi CONFIG.email di js/script.js agar formulir dapat membuka aplikasi email.";
    return;
  }
  const body = `Nama: ${$("#name").value}\nEmail: ${$("#email").value}\n\n${$("#message").value}`;
  location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent($("#subject").value)}&body=${encodeURIComponent(body)}`;
  note.textContent = "Aplikasi email Anda seharusnya terbuka. Pesan baru terkirim setelah Anda menekan kirim di sana.";
});
