# 🗺️ user-flow.md — Kullanıcı Akışı (v2)

## 1. Ana Akış: Marka Sorgulama

```
[Kullanıcı uygulamayı açar]
        │
        ▼
[Ana Sayfa]
  • Kişisel karşılama ("Merhaba, [Ad] 👋")
  • Toplam puan + sıralama kartı
  • Arama kutusu
  • Hızlı erişim etiketleri (8 popüler marka)
  • Tüm markalar listesi (30 marka)
        │
        ├──► [Arama kutusuna yazar → Ara butonuna basar / Enter]
        │         │
        │         ├──► Marka BULUNURSA → [Sonuç Ekranı]
        │         │         • Marka adı + kategori
        │         │         • Genel puan (0–100) + derece etiketi
        │         │         • 6 boyutlu animasyonlu çubuk grafik
        │         │         • Etiketler (Türk Markası, ESG Raporu vb.)
        │         │         • Sorun uyarıları (⚠ kırmızı liste)
        │         │         • [Düşük puanlıysa] Alternatif marka kartları
        │         │               └── Tıklayınca o marka sorgulanır
        │         │
        │         └──► Marka BULUNAMAZSA → "Bulunamadı" mesajı
        │
        └──► [Listeden marka tıklar] → Aynı Sonuç Ekranı akışı
```

---

## 2. Profil Düzenleme Akışı

```
[Profil sekmesi (alt nav)]
        │
        ▼
[Profil Sayfası]
  • Yeşil header: avatar + ad + biyografi + istatistikler
  • "Profili Düzenle" satırı
  • "Rozetlerim" satırı
  • "Rozetleri Paylaş" satırı
  • Ortalama puan, toplam XP istatistikleri
        │
        ├──► ["Profili Düzenle" tıklar]
        │         │
        │         ▼
        │    [Modal: Profili Düzenle]
        │      • Kullanıcı adı input alanı
        │      • Biyografi input alanı
        │      • [Kaydet] → profil anında güncellenir
        │                   ana sayfa karşılaması güncellenir
        │                   sıralama adı güncellenir
        │                   toast bildirim gösterilir
        │
        └──► [Avatar ikonuna veya kalem butonuna tıklar]
                  │
                  ▼
             [Modal: Avatar Seç]
               • 15 emoji grid (3×5)
               • Seçili avatar yeşil border ile işaretlenir
               • [Seç] → avatar profil + ana sayfa'da güncellenir
```

---

## 3. Rozet Paylaşım Akışı

```
[Rozetler sekmesi]
        │
        ▼
[Rozetler Sayfası]
  • XP ilerleme çubuğu (Seviye / toplam XP)
  • 2×4 rozet grid
    - Kazanılmış: yeşil border + "📤 Paylaş" butonu
    - Kilitli: %45 opaklık, buton yok
        │
        ├──► [Rozet "📤 Paylaş" butonuna tıklar]
        │         │
        │         ▼
        │    [Modal: Rozeti Paylaş]
        │      ┌──────────────────────────┐
        │      │  Paylaşım Önizlemesi     │
        │      │  [rozet emojisi]         │
        │      │  "[Ad] rozeti kazandı!"  │
        │      │  YeşilPuan • Seviye 3    │
        │      │  #YeşilPuan #Sürdür...   │
        │      └──────────────────────────┘
        │      • Instagram  → toast: "Instagram'a yönlendiriliyorsunuz"
        │      • X/Twitter  → toast: "X'e yönlendiriliyorsunuz"
        │      • WhatsApp   → toast: "WhatsApp'a yönlendiriliyorsunuz"
        │      • LinkedIn   → toast: "LinkedIn'e yönlendiriliyorsunuz"
        │      • Bağlantı   → toast: "Bağlantı kopyalandı! 🔗"
        │
        └──► [Profil > "Rozetleri Paylaş" tıklar]
                  │
                  ▼
             Tüm kazanılan rozetlerin emojileri + özet kart
             → Aynı paylaşım modal akışı
```

---

## 4. Rozet Kazanma Akışı (Otomatik)

```
[Kullanıcı marka sorgular]
        │
        ▼
[+10 XP eklenir, sorgu sayacı artar]
        │
        ▼
[Koşul kontrolü: totalQueries >= 5?]
        │
        ├──► EVET → "Yeşil Başlangıç" rozeti açılır
        │           +100 XP eklenir
        │           Toast bildirimi: "🌱 Rozet kazandın!"
        │           Rozetler grid'i güncellenir
        │
        └──► HAYIR → Devam
```

---

## 5. Sayfa Haritası (v2)

| Sayfa | Erişim | İçerik |
|---|---|---|
| Ana Sayfa | Alt nav → ev ikonu | Arama + hızlı etiketler + 30 marka listesi |
| Sonuç Ekranı | Marka tıklama / arama | Puan kartı + grafikler + alternatifler |
| Rozetler | Alt nav → yıldız ikonu | XP bar + 8 rozet + paylaş butonları |
| Sıralama | Alt nav → grup ikonu | 10 kişilik haftalık liderboard |
| Profil | Alt nav → kişi ikonu | Profil kartı + düzenleme + istatistikler |
| Modal: Profil Düzenle | Profil → düzenle | Ad + biyografi inputları |
| Modal: Avatar Seç | Profil → avatar | 15 emoji grid |
| Modal: Rozet Paylaş | Rozet → paylaş | Önizleme + 5 platform seçeneği |
