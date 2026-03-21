/**
 * scoring.js — YeşilPuan Marka Puanlama Algoritması v2
 *
 * Her marka 6 boyutta 0–100 arası puanlanır.
 * Genel puan bu 6 boyutun ağırlıklı ortalamasıdır.
 */

const WEIGHTS = {
  karbon:      0.25,  // Karbon ayak izi ve iklim taahhütleri
  su:          0.15,  // Su kullanımı ve geri dönüşüm
  emek:        0.20,  // Çalışan hakları, ücretler, koşullar
  ambalaj:     0.15,  // Ambalaj sürdürülebilirliği
  seffaflik:   0.15,  // Raporlama şeffaflığı (CSR/ESG/CDP)
  yerellik:    0.10,  // Yerel tedarik, yerel istihdam
};

/**
 * Genel sürdürülebilirlik skorunu hesaplar.
 * @param {Object} subScores - 6 boyutun alt puanları (0–100)
 * @returns {number} - Genel puan (tam sayı)
 */
function calculateOverallScore(subScores) {
  let total = 0;
  for (const [key, weight] of Object.entries(WEIGHTS)) {
    total += (subScores[key] ?? 0) * weight;
  }
  return Math.round(total);
}

/**
 * Puan derecesini ve görsel renklerini döndürür.
 * @param {number} score
 */
function getGrade(score) {
  if (score >= 80) return { grade: 'Mükemmel', color: '#27500A', bg: '#EAF3DE', emoji: '🌟' };
  if (score >= 70) return { grade: 'İyi',      color: '#3B6D11', bg: '#EAF3DE', emoji: '✅' };
  if (score >= 55) return { grade: 'Orta',     color: '#854F0B', bg: '#FAEEDA', emoji: '⚠️' };
  if (score >= 40) return { grade: 'Zayıf',    color: '#993C1D', bg: '#FAECE7', emoji: '❌' };
  return               { grade: 'Çok Kötü', color: '#501313', bg: '#FCEBEB', emoji: '🚫' };
}

/**
 * Aynı kategoride daha yüksek puanlı alternatifleri bulur.
 * @param {string} category
 * @param {number} currentScore
 * @param {Array} allBrands
 * @returns {Array} - En iyi 3 alternatif
 */
function findAlternatives(category, currentScore, allBrands) {
  return allBrands
    .filter(b => b.cat === category && b.score > currentScore)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

/**
 * Kullanıcının sorgu geçmişinden XP hesaplar.
 * @param {Array} queryHistory
 * @returns {number}
 */
function calculateUserXP(queryHistory) {
  let xp = 0;
  for (const q of queryHistory) {
    xp += 10;                              // Her sorgu: +10
    if (q.choseSustainable) xp += 50;     // Alternatif seçildiyse: +50
    if (q.brandScore >= 70) xp += 20;     // Yüksek puanlı marka: +20
    if (q.brandScore < 40)  xp += 5;      // Düşük puanı öğrenmek de değerli: +5
  }
  return xp;
}

/**
 * XP'ye göre seviye hesaplar.
 * @param {number} xp
 * @returns {{ level: number, title: string, nextLevelXP: number }}
 */
function calculateLevel(xp) {
  const levels = [
    { min: 0,    title: 'Yeni Başlayan',   next: 500   },
    { min: 500,  title: 'Yeşil Aday',      next: 1500  },
    { min: 1500, title: 'Yeşil Avcı',      next: 3000  },
    { min: 3000, title: 'Sürdürülebilir',  next: 5000  },
    { min: 5000, title: 'Yeşil Uzman',     next: 8000  },
    { min: 8000, title: 'Eko Şampiyon',    next: 99999 },
  ];
  let level = 1;
  let entry = levels[0];
  for (let i = levels.length - 1; i >= 0; i--) {
    if (xp >= levels[i].min) { level = i + 1; entry = levels[i]; break; }
  }
  return { level, title: entry.title, nextLevelXP: entry.next };
}

module.exports = {
  WEIGHTS,
  calculateOverallScore,
  getGrade,
  findAlternatives,
  calculateUserXP,
  calculateLevel,
};
