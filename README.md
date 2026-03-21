# 🌿 YeşilPuan — Türkiye'nin Sürdürülebilirlik Puanlama Platformu

## Proje Açıklaması

**YeşilPuan**, kullanıcıların Türkiye'deki markaların sürdürülebilirlik skorlarını anında sorgulayabildiği, düşük puanlı markalar yerine daha iyi alternatifleri keşfedebildiği ve oyunlaştırma mekanizmaları (rozetler, sıralama, XP sistemi) sayesinde sürdürülebilir alışveriş alışkanlıkları geliştirebildiği mobil öncelikli bir web uygulamasıdır.

## Problem

Mevcut sürdürülebilirlik platformları (Good On You, EcoChain vb.) Türkiye'deki yerel markaları kapsamıyor. Kullanıcılar yerel bir süt markasının, tekstil firmasının veya gıda şirketinin çevresel ve sosyal sorumluluklarını kolayca öğrenemiyor. Ayrıca bu platformlar "ansiklopedi" gibi çalışır: kullanıcı giriyor, bakıyor, çıkıyor. Sürdürülebilir tüketimi bir yaşam tarzına dönüştüren bir motivasyon mekanizması yok.

## Çözüm

YeşilPuan şu özellikleri sunar:
- 🇹🇷 **30+ Türk markası veritabanı** — Arçelik'ten Trendyol'a, Yörük Süt'ten Koç Holding'e
- 🔄 **Akıllı alternatif önerileri** — Düşük puanlı markalar için yüksek puanlı rakipler
- 🏅 **Rozet sistemi + sosyal paylaşım** — Instagram, X, WhatsApp, LinkedIn paylaşımı
- 🏆 **Arkadaş sıralaması** — Duolingo benzeri rekabetçi motivasyon
- 👤 **Kişiselleştirilmiş profil** — Ad, biyografi, 15 emoji avatar seçeneği
- 📊 **6 boyutlu analiz** — Karbon, Su, Emek, Ambalaj, Şeffaflık, Yerellik

## Nasıl Çalıştırılır

### Hızlı Başlangıç (Statik Versiyon)
```bash
git clone https://github.com/yesilpuan/platform.git
cd platform
open features/index.html   # macOS
# veya tarayıcıda features/index.html dosyasını aç
```

### Geliştirme Ortamı
```bash
npm install
npm run dev
# → http://localhost:3000
```

### Canlı Deploy (Netlify)
```bash
npm run build
netlify deploy --prod --dir=out
```

## Yayın Linki

🌐 **Canlı Demo:** [https://yesilpuan.netlify.app](https://yesilpuan.netlify.app)

## Demo Video

▶️ **Loom:** [https://loom.com/share/yesilpuan-demo-v2](https://loom.com/share/yesilpuan-demo-v2)

## Proje Yapısı

```
yesilpuan/
├── README.md                  ← Bu dosya
├── idea.md                    ← Problem tanımı ve vizyon
├── user-flow.md               ← Kullanıcı akışı + sayfa haritası
├── tech-stack.md              ← Teknoloji seçimleri ve gerekçe
└── features/
    ├── index.html             ← Ana uygulama (tek dosya, çalışır halde)
    ├── brands.json            ← 30 Türk markası veritabanı
    ├── scoring.js             ← Puanlama algoritması (6 boyut)
    └── gamification.js        ← Rozet + paylaşım + sıralama sistemi
```

## v2 Özellikleri

| Özellik | Açıklama |
|---|---|
| Marka sorgulama | 30 Türk markası, arama kutusu + liste |
| 6 boyutlu puan | Karbon, Su, Emek, Ambalaj, Şeffaflık, Yerellik |
| Alternatif öneri | Düşük puanlı markaya otomatik öneri |
| Profil düzenleme | Ad, biyografi, 15 emoji avatar seçeneği |
| Rozet sistemi | 8 rozet, XP bar, seviye sistemi |
| Sosyal paylaşım | Instagram, X, WhatsApp, LinkedIn, link kopyala |
| Arkadaş sıralaması | 10 kişilik haftalık liderboard |
| Puan sistemi | Her sorgu +10 XP, rozet açılınca +100–500 XP |

## Katkıda Bulunma

Türkiye'deki bir markayı eklemek veya güncellemek için `features/brands.json` dosyasını düzenleyip pull request gönder. Kaynakları belirt (CSR raporu, CDP skoru vb.).

İletişim: [veri@yesilpuan.app](mailto:veri@yesilpuan.app)
