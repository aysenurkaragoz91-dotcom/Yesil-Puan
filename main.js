const WEIGHTS = { karbon: .25, su: .15, emek: .2, ambalaj: .15, seffaflik: .15, yerellik: .1 };
const MLABELS = { karbon: "Karbon", su: "Su", emek: "Emek", ambalaj: "Ambalaj", seffaflik: "Seffaflik", yerellik: "Yerellik" };
const BADGES = [
  { id: "first_query", emoji: "🌱", name: "Ilk Sorgu", xp: 50, condition: s => s.totalQueries >= 1 },
  { id: "five_queries", emoji: "🌳", name: "5 Sorgu", xp: 100, condition: s => s.totalQueries >= 5 },
  { id: "ten_queries", emoji: "🌲", name: "10 Sorgu", xp: 200, condition: s => s.totalQueries >= 10 },
  { id: "switcher", emoji: "♻️", name: "Donusturucu", xp: 75, condition: s => (s.switchCount || 0) >= 1 },
  { id: "explorer", emoji: "🔭", name: "Kasif", xp: 80, condition: s => s.searchedBrands.size >= 5 },
];

const BRANDS = [
  { id: "arcelik", name: "Arcelik", cat: "Elektronik & Beyaz Esya", scores: { karbon: 75, su: 72, emek: 82, ambalaj: 80, seffaflik: 78, yerellik: 84 }, issues: ["E-atik geri donusum kapasitesi artirilabilir"], certifications: ["ISO 14001", "ISO 50001"] },
  { id: "vestel", name: "Vestel", cat: "Elektronik & Beyaz Esya", scores: { karbon: 68, su: 65, emek: 70, ambalaj: 72, seffaflik: 64, yerellik: 80 }, issues: ["Karbon raporu eksik", "Tedarik zinciri belirsiz"], certifications: ["ISO 14001"] },
  { id: "koton", name: "Koton", cat: "Tekstil & Moda", scores: { karbon: 38, su: 35, emek: 44, ambalaj: 48, seffaflik: 40, yerellik: 42 }, issues: ["Su tuketimi yuksek", "Emek kosullari belirsiz"], certifications: [] },
  { id: "mavi", name: "Mavi", cat: "Tekstil & Moda", scores: { karbon: 58, su: 52, emek: 62, ambalaj: 60, seffaflik: 56, yerellik: 70 }, issues: ["Denim uretiminde su kullanimi yuksek"], certifications: ["Better Cotton Initiative"] },
  { id: "sutas", name: "Sutas", cat: "Sut & Sut Urunleri", scores: { karbon: 65, su: 68, emek: 74, ambalaj: 64, seffaflik: 70, yerellik: 82 }, issues: ["Ambalaj plastik orani azaltilabilir"], certifications: ["ISO 14001"] },
  { id: "yoruk", name: "Yoruk Sut", cat: "Sut & Sut Urunleri", scores: { karbon: 80, su: 78, emek: 84, ambalaj: 76, seffaflik: 82, yerellik: 92 }, issues: ["Dagitim agi sinirli"], certifications: ["Organik Tarim Sertifikasi"] },
  { id: "migros", name: "Migros", cat: "Supermarket & Perakende", scores: { karbon: 62, su: 66, emek: 70, ambalaj: 60, seffaflik: 68, yerellik: 72 }, issues: ["Gida israfi programi guclendirilebilir"], certifications: ["ISO 14001"] },
  { id: "bim", name: "BIM", cat: "Supermarket & Perakende", scores: { karbon: 54, su: 58, emek: 62, ambalaj: 54, seffaflik: 60, yerellik: 62 }, issues: ["Surdurulebilirlik raporu yok"], certifications: [] },
  { id: "trendyol", name: "Trendyol", cat: "E-Ticaret", scores: { karbon: 50, su: 56, emek: 62, ambalaj: 50, seffaflik: 58, yerellik: 62 }, issues: ["Fast fashion tesviki", "Karbon raporlamasi yok"], certifications: [] },
  { id: "hepsiburada", name: "Hepsiburada", cat: "E-Ticaret", scores: { karbon: 54, su: 58, emek: 64, ambalaj: 54, seffaflik: 62, yerellik: 64 }, issues: ["Ambalaj israfi", "Kargo emisyonlari"], certifications: [] }
];

const INITIAL_SHOWN = 8;
const state = {
  brands: [],
  selectedBrand: null,
  allShown: false,
  user: { name: "Kullanici", avatarType: "emoji", avatarValue: "🌿", xp: 0, totalQueries: 0, switchCount: 0, searchedBrands: new Set(), earnedBadges: [] },
};

function norm(v) { return (v || "").toLowerCase().replaceAll("ç", "c").replaceAll("ğ", "g").replaceAll("ı", "i").replaceAll("ö", "o").replaceAll("ş", "s").replaceAll("ü", "u").trim(); }
function calcScore(s) { let t = 0; for (const [k, w] of Object.entries(WEIGHTS)) t += (s[k] || 0) * w; return Math.round(t); }
function getGrade(s) { if (s >= 80) return { label: "Mukemmel", cls: "score-good" }; if (s >= 70) return { label: "Iyi", cls: "score-good" }; if (s >= 55) return { label: "Orta", cls: "score-warn" }; if (s >= 40) return { label: "Zayif", cls: "score-bad" }; return { label: "Cok Kotu", cls: "score-bad" }; }
function findAlts(brand) { const cur = calcScore(brand.scores); return state.brands.filter(b => b.id !== brand.id && b.cat === brand.cat).map(b => ({ ...b, computedScore: calcScore(b.scores) })).filter(b => b.computedScore > cur).sort((a, b) => b.computedScore - a.computedScore).slice(0, 3); }

function showToast(msg) {
  document.querySelectorAll(".badge-toast").forEach(t => t.remove());
  const el = document.createElement("div");
  el.className = "badge-toast";
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3500);
}

function evalBadges() {
  const earned = [];
  for (const b of BADGES) {
    if (!state.user.earnedBadges.includes(b.id) && b.condition(state.user)) {
      state.user.earnedBadges.push(b.id);
      state.user.xp += b.xp;
      earned.push(b);
    }
  }
  return earned;
}

function renderQuickList() {
  const el = document.getElementById("quickList");
  const shown = state.allShown ? state.brands : state.brands.slice(0, INITIAL_SHOWN);
  const btns = shown.map(b => `<button class="alt" data-id="${b.id}">${b.name}</button>`).join("");
  const remaining = state.brands.length - INITIAL_SHOWN;
  const moreBtn = !state.allShown && remaining > 0
    ? `<button class="show-more-btn" id="showMoreBtn">+${remaining} marka daha</button>`
    : state.allShown ? `<button class="show-more-btn" id="showMoreBtn">Daha az goster</button>` : "";
  el.innerHTML = btns + moreBtn;
  document.getElementById("showMoreBtn")?.addEventListener("click", () => { state.allShown = !state.allShown; renderQuickList(); });
}

function renderProfile() {
  const el = document.getElementById("profile");
  const level = Math.floor(state.user.xp / 500) + 1;
  const avatarInner = state.user.avatarType === "img" ? `<img src="${state.user.avatarValue}" alt="avatar">` : state.user.avatarValue;
  const badgesHtml = state.user.earnedBadges.length
    ? state.user.earnedBadges.map(id => {
      const b = BADGES.find(x => x.id === id); if (!b) return "";
      return `<div class="badge-row"><span class="chip">${b.emoji} ${b.name}</span><button class="badge-share-btn" data-badge="${b.id}">paylas</button></div>`;
    }).join("")
    : `<span class="muted" style="font-size:.85rem">Henuz rozet yok.</span>`;

  el.innerHTML = `
    <div class="profile-top">
      <div class="avatar-wrap" id="avatarWrap"><div class="avatar">${avatarInner}</div><div class="avatar-edit-hint">✏</div></div>
      <div class="profile-meta">
        <div class="profile-name-row">
          <span class="profile-name">${state.user.name}</span>
          <button class="edit-name-btn" id="editProfileBtn">duzenle</button>
        </div>
        <div class="profile-stats">
          <div class="stat-box"><div class="stat-val">${state.user.xp}</div><div class="stat-lbl">XP</div></div>
          <div class="stat-box"><div class="stat-val">${level}</div><div class="stat-lbl">Seviye</div></div>
          <div class="stat-box"><div class="stat-val">${state.user.totalQueries}</div><div class="stat-lbl">Sorgu</div></div>
        </div>
      </div>
    </div>
    <div style="margin-top:14px">${badgesHtml}</div>`;

  document.getElementById("editProfileBtn")?.addEventListener("click", openProfileModal);
  document.getElementById("avatarWrap")?.addEventListener("click", openProfileModal);
  el.querySelectorAll(".badge-share-btn").forEach(btn => btn.addEventListener("click", () => openShareModal(btn.dataset.badge)));
}

function renderResult(brand, alts = []) {
  const el = document.getElementById("result");
  const score = calcScore(brand.scores);
  const grade = getGrade(score);
  const metrics = Object.entries(brand.scores).map(([k, v]) => `
    <div class="metric-item">
      <div class="metric-row"><span class="metric-key">${MLABELS[k] || k}</span><span class="metric-val">${v}</span></div>
      <div class="bar"><div class="bar-fill" style="width:${v}%"></div></div>
    </div>`).join("");
  const issues = brand.issues?.length ? `<ul class="issue-list">${brand.issues.map(i => `<li>${i}</li>`).join("")}</ul>` : `<p class="muted" style="font-size:.875rem">Risk/issue bulunamadi.</p>`;
  const certs = brand.certifications?.length ? brand.certifications.map(c => `<span class="chip">✓ ${c}</span>`).join("") : `<span class="muted" style="font-size:.85rem">Sertifika bilgisi yok.</span>`;
  const altsHtml = alts.length ? alts.map(a => `<div class="alt-card" data-id="${a.id}"><span>${a.name}</span><span class="alt-score">${a.computedScore}</span></div>`).join("") : `<span class="muted" style="font-size:.85rem">Ayni kategoride daha yuksek puanli alternatif bulunamadi.</span>`;
  const lowHint = score < 55 && alts.length ? `<div class="switch-hint">Bu marka dusuk puanli. Daha surdurulebilir secenege gecebilirsin.</div><div class="action-row"><button id="switchBtn">Onerilen Markaya Gec (+50 XP)</button></div>` : "";

  el.innerHTML = `
    <div class="score-header">
      <div><div class="brand-name">${brand.name}</div><div class="brand-cat">${brand.cat}</div></div>
      <div class="score-badge ${grade.cls}"><span class="score-num">${score}</span><span class="score-grade">${grade.label}</span></div>
    </div>
    <h3>Boyut Skorlari</h3><div class="metrics-grid">${metrics}</div>
    <h3>Risk & Sorunlar</h3>${issues}
    <h3>Sertifikalar</h3><div class="chips">${certs}</div>
    <h3>Alternatif Oneriler</h3><div class="chips">${altsHtml}</div>
    ${lowHint}`;

  el.querySelectorAll(".alt-card[data-id]").forEach(card => card.addEventListener("click", () => {
    const b = state.brands.find(x => x.id === card.dataset.id);
    if (b) { document.getElementById("searchInput").value = b.name; runSearch(b); }
  }));

  document.getElementById("switchBtn")?.addEventListener("click", () => {
    const best = alts[0];
    if (!best) return;
    state.user.xp += 50;
    state.user.switchCount = (state.user.switchCount || 0) + 1;
    state.selectedBrand = best;
    const earned = evalBadges();
    renderProfile();
    renderResult(best, findAlts(best));
    if (earned.length) earned.forEach(b => showToast(`${b.emoji} ${b.name} rozeti kazanildi! +${b.xp} XP`));
    else showToast("Gecis yapildi! +50 XP");
  });
}

function openProfileModal() {
  document.getElementById("editName").value = state.user.name;
  document.querySelectorAll(".avatar-opt").forEach(o => o.classList.toggle("selected", o.dataset.emoji === state.user.avatarValue));
  document.getElementById("profileModal").classList.add("open");
}
function closeProfileModal() { document.getElementById("profileModal").classList.remove("open"); }

function openShareModal(badgeId) {
  const badge = BADGES.find(b => b.id === badgeId); if (!badge) return;
  document.getElementById("shareBadgeEmoji").textContent = badge.emoji;
  document.getElementById("shareBadgeName").textContent = badge.name;
  document.getElementById("shareBadgeUser").textContent = `@${state.user.name} · YesilPuan`;
  const shareText = `${badge.emoji} "${badge.name}" rozetini YesilPuan'da kazandim!`;
  document.getElementById("shareTwitter").onclick = () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, "_blank");
  document.getElementById("shareWhatsApp").onclick = () => window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank");
  document.getElementById("shareCopy").onclick = () => navigator.clipboard.writeText(shareText).then(() => showToast("Metin kopyalandi"));
  document.getElementById("shareModal").classList.add("open");
}
function closeShareModal() { document.getElementById("shareModal").classList.remove("open"); }

function findBrand(q) { const n = norm(q); if (!n) return null; return state.brands.find(b => norm(b.name) === n || norm(b.id) === n) || null; }
function runSearch(brand) {
  const msg = document.getElementById("searchMessage");
  if (!brand) { msg.textContent = "Marka bulunamadi. Ornek: Koton, Arcelik, Trendyol."; msg.className = "danger"; return; }
  state.selectedBrand = brand;
  state.user.totalQueries += 1;
  state.user.xp += 10;
  state.user.searchedBrands.add(brand.id);
  const earned = evalBadges();
  renderProfile();
  renderResult(brand, findAlts(brand));
  if (earned.length) { earned.forEach(b => showToast(`${b.emoji} ${b.name} rozeti kazanildi! +${b.xp} XP`)); msg.textContent = "Rozet kazanildi"; }
  else msg.textContent = "Sonuc guncellendi.";
  msg.className = "muted";
}

function bindEvents() {
  const inp = document.getElementById("searchInput");
  document.getElementById("searchBtn").addEventListener("click", () => runSearch(findBrand(inp.value)));
  inp.addEventListener("keydown", e => { if (e.key === "Enter") runSearch(findBrand(inp.value)); });
  document.getElementById("quickList").addEventListener("click", e => {
    const id = e.target.getAttribute("data-id"); if (!id) return;
    const b = state.brands.find(x => x.id === id); if (!b) return;
    inp.value = b.name; runSearch(b);
  });
  document.getElementById("cancelEdit").addEventListener("click", closeProfileModal);
  document.getElementById("profileModal").addEventListener("click", e => { if (e.target === e.currentTarget) closeProfileModal(); });
  document.getElementById("avatarPicker").addEventListener("click", e => {
    const opt = e.target.closest(".avatar-opt"); if (!opt) return;
    document.querySelectorAll(".avatar-opt").forEach(o => o.classList.remove("selected"));
    opt.classList.add("selected");
  });
  document.getElementById("avatarUpload").addEventListener("change", e => {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => { state.user.avatarType = "img"; state.user.avatarValue = ev.target.result; renderProfile(); closeProfileModal(); };
    reader.readAsDataURL(file);
  });
  document.getElementById("saveEdit").addEventListener("click", () => {
    const nv = document.getElementById("editName").value.trim(); if (nv) state.user.name = nv;
    const sel = document.querySelector(".avatar-opt.selected");
    if (sel) { state.user.avatarType = "emoji"; state.user.avatarValue = sel.dataset.emoji; }
    renderProfile(); closeProfileModal();
  });
  document.getElementById("closeShare").addEventListener("click", closeShareModal);
  document.getElementById("shareModal").addEventListener("click", e => { if (e.target === e.currentTarget) closeShareModal(); });
}

async function initialize() {
  try {
    const r = await fetch("./brands.json");
    if (!r.ok) throw new Error("fetch fail");
    state.brands = await r.json();
  } catch {
    state.brands = BRANDS;
    const msg = document.getElementById("searchMessage");
    msg.textContent = "Offline mod: Yerel yedek veri kullaniliyor.";
    msg.className = "muted";
  }
  renderQuickList();
  renderProfile();
  bindEvents();
}

initialize().catch(() => {
  const msg = document.getElementById("searchMessage");
  msg.textContent = "Veriler yuklenemedi.";
  msg.className = "danger";
});
