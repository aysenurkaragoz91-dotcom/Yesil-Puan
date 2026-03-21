/**
 * gamification.js — YeşilPuan Oyunlaştırma Sistemi v2
 *
 * Rozet tanımları, XP kuralları, sıralama mantığı,
 * sosyal paylaşım URL üretimi ve profil yönetimi.
 */

// ─── ROZET TANIMLARI ───────────────────────────────────────────────
const BADGES = [
  {
    id: 'green_start',
    emoji: '🌱',
    name: 'Yeşil Başlangıç',
    desc: 'İlk 5 markayı sorgula',
    xp: 100,
    condition: (s) => s.totalQueries >= 5,
    earned: false,
  },
  {
    id: 'label_reader',
    emoji: '🔍',
    name: 'Etiket Okuyucu',
    desc: '30 farklı marka sorgula',
    xp: 200,
    condition: (s) => s.uniqueBrandsQueried >= 30,
    earned: false,
  },
  {
    id: 'plastic_fighter',
    emoji: '♻️',
    name: 'Plastik Düşmanı',
    desc: '1 hafta plastiksiz marka seç',
    xp: 250,
    condition: (s) => s.plasticFreeWeeks >= 1,
    earned: false,
  },
  {
    id: 'local_friend',
    emoji: '🤝',
    name: 'Yerel Dostu',
    desc: '10 yerel Türk markası tercih et',
    xp: 300,
    condition: (s) => s.localBrandChoices >= 10,
    earned: false,
  },
  {
    id: 'carbon_hunter',
    emoji: '🌍',
    name: 'Karbon Avcısı',
    desc: 'Ayda 50kg CO₂ tasarrufu sağla',
    xp: 400,
    condition: (s) => s.monthlyCO2Saved >= 50,
    earned: false,
  },
  {
    id: 'super_consumer',
    emoji: '⭐',
    name: 'Süper Tüketici',
    desc: '3 ay üst üste 80+ ortalama puan',
    xp: 500,
    condition: (s) => s.consecutiveHighScoreMonths >= 3,
    earned: false,
  },
  {
    id: 'ambassador',
    emoji: '📣',
    name: 'Farkındalık Elçisi',
    desc: '5 arkadaşını platforma davet et',
    xp: 350,
    condition: (s) => s.referrals >= 5,
    earned: false,
  },
  {
    id: 'sector_expert',
    emoji: '🏭',
    name: 'Sektör Uzmanı',
    desc: 'Aynı kategoride 10 farklı marka karşılaştır',
    xp: 200,
    condition: (s) => Object.values(s.queriesByCategory || {}).some(v => v >= 10),
    earned: false,
  },
];

// ─── XP KAZANMA KURALLARI ──────────────────────────────────────────
const XP_RULES = {
  queryBrand:       10,   // Her marka sorgusu
  chooseSustainable:50,   // Alternatiften daha iyi markayı seç
  chooseHighScore:  20,   // 70+ puanlı markayı tercih et
  chooseLocal:      30,   // Yerel markayı tercih et
  shareScore:       15,   // Puan kartını paylaş
  shareBadge:       25,   // Rozet paylaş (sosyal medya)
  suggestBrand:    100,   // Veritabanına yeni marka öner (onaylanınca)
  dailyLogin:        5,   // Günlük giriş bonusu
  weeklyStreak:     75,   // 7 gün üst üste giriş
};

// ─── PROFIL YÖNETİMİ ──────────────────────────────────────────────
const AVATAR_OPTIONS = [
  '😊','🌿','🌍','♻️','🦋',
  '🌱','⭐','🐸','🌻','🦊',
  '🐧','🌊','🏔️','🌈','🦁',
];

/**
 * Profil nesnesi oluşturur.
 * @param {string} name
 * @param {string} bio
 * @param {string} avatar
 */
function createProfile(name = 'Kullanıcı', bio = 'Sürdürülebilir yaşam', avatar = '😊') {
  return { name, bio, avatar, xp: 0, level: 1, badges: [], queryCount: 0, createdAt: new Date().toISOString() };
}

/**
 * Profili günceller. Değişmeyen alanlar korunur.
 * @param {Object} profile
 * @param {Object} updates - { name?, bio?, avatar? }
 */
function updateProfile(profile, updates) {
  return { ...profile, ...updates, updatedAt: new Date().toISOString() };
}

// ─── SOSYAL PAYLAŞIM URL ÜRETİCİ ─────────────────────────────────
const BASE_URL = 'https://yesilpuan.netlify.app';
const HASHTAGS = ['YeşilPuan', 'Sürdürülebilirlik', 'TürkiyeYeşilleniyor'];

/**
 * Rozet için paylaşım URL ve metni üretir.
 * @param {Object} badge    - { emoji, name }
 * @param {Object} profile  - { name, xp, level }
 * @param {string} platform - 'twitter' | 'whatsapp' | 'linkedin' | 'instagram' | 'copy'
 * @returns {{ url: string, text: string }}
 */
function generateShareContent(badge, profile, platform) {
  const text = `${badge.emoji} "${badge.name}" rozetini kazandım! YeşilPuan'da ${profile.xp.toLocaleString('tr')} XP ile Seviye ${profile.level}'deyim. #${HASHTAGS.join(' #')}`;
  const shareUrl = `${BASE_URL}/rozet/${badge.id}?ref=${encodeURIComponent(profile.name)}`;

  const urls = {
    twitter:   `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`,
    whatsapp:  `https://wa.me/?text=${encodeURIComponent(text + '\n' + shareUrl)}`,
    linkedin:  `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    instagram: shareUrl,  // Instagram deep link — mobilde Story'e açılır
    copy:      shareUrl,
  };

  return { url: urls[platform] || shareUrl, text };
}

/**
 * Tüm kazanılan rozetler için toplu paylaşım içeriği üretir.
 * @param {Object[]} earnedBadges
 * @param {Object} profile
 * @param {string} platform
 */
function generateAllBadgesShareContent(earnedBadges, profile, platform) {
  const emojis = earnedBadges.map(b => b.emoji).join(' ');
  const fakeBadge = {
    id: 'all',
    emoji: emojis,
    name: `${earnedBadges.length} rozet kazandım`,
  };
  return generateShareContent(fakeBadge, profile, platform);
}

// ─── ROZET KONTROLÜ ───────────────────────────────────────────────
/**
 * Kullanıcının istatistiklerine göre yeni kazanılan rozetleri bulur.
 * @param {Object} stats
 * @param {string[]} alreadyEarned - Daha önce kazanılmış rozet ID'leri
 * @returns {Object[]} - Yeni kazanılan rozetler
 */
function evaluateBadges(stats, alreadyEarned = []) {
  return BADGES.filter(b => !alreadyEarned.includes(b.id) && b.condition(stats));
}

// ─── SIRALAMА ─────────────────────────────────────────────────────
/**
 * Haftalık sıralama puanını hesaplar.
 */
function calculateLeaderboardScore(user) {
  const base = user.weeklyXP || 0;
  const diversity = Math.min((user.uniqueCategoriesThisWeek || 0) * 10, 50);
  const streak = user.loginStreakDays >= 7 ? 30 : (user.loginStreakDays || 0) * 4;
  return base + diversity + streak;
}

/**
 * Kullanıcı + arkadaşlar listesini sıralanmış liderboard olarak döner.
 */
function buildLeaderboard(currentUser, friends) {
  const all = [{ ...currentUser, isMe: true }, ...friends.map(f => ({ ...f, isMe: false }))];
  return all
    .map(u => ({ ...u, lbScore: calculateLeaderboardScore(u) }))
    .sort((a, b) => b.lbScore - a.lbScore)
    .map((u, i) => ({ ...u, rank: i + 1 }));
}

// ─── HAFTALIK ÖZET PROMPT (Claude API için) ────────────────────────
function buildWeeklySummaryPrompt(profile, stats, topBrands, avoidedBrands) {
  return `
Sen YeşilPuan sürdürülebilirlik asistanısın. Kullanıcı için kısa, samimi ve motive edici Türkçe bir haftalık özet yaz.

Kullanıcı adı: ${profile.name}
Avatar: ${profile.avatar}
Bu hafta:
- ${stats.weeklyQueries} marka sorguladı
- ${stats.sustainableChoices} kez daha iyi alternatif seçti
- ${stats.weeklyXP} XP kazandı
- Sıralamadaki yeri: #${stats.rank}
- Kazandığı yeni rozetler: ${stats.newBadges.map(b => b.name).join(', ') || 'yok'}

Yüksek puanlı tercihler: ${topBrands.join(', ')}
Kaçındığı düşük puanlı markalar: ${avoidedBrands.join(', ')}

Tonu sıcak ve motive edici tut. 3–4 cümle yaz. Emoji kullanabilirsin.
  `.trim();
}

module.exports = {
  BADGES,
  XP_RULES,
  AVATAR_OPTIONS,
  createProfile,
  updateProfile,
  generateShareContent,
  generateAllBadgesShareContent,
  evaluateBadges,
  calculateLeaderboardScore,
  buildLeaderboard,
  buildWeeklySummaryPrompt,
};
