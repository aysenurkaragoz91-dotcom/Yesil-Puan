# ⚙️ tech-stack.md — Teknoloji Yığını & Seçim Gerekçesi (v2)

## Genel Mimari

```
┌─────────────────────────────────────────────────────┐
│               KULLANICI (Mobil / Web)               │
│    iOS · Android · Chrome · Safari · Firefox        │
└──────────────────┬──────────────────────────────────┘
                   │ HTTPS
┌──────────────────▼──────────────────────────────────┐
│              FRONTEND KATMANI                       │
│     Next.js 14 (App Router) + Tailwind CSS          │
│   Mobil öncelikli, PWA destekli, SSG + ISR          │
│              Vercel / Netlify                       │
└──────────────────┬──────────────────────────────────┘
                   │ REST API / tRPC
┌──────────────────▼──────────────────────────────────┐
│               BACKEND KATMANI                       │
│         Node.js + Hono.js (Edge Runtime)            │
│              Cloudflare Workers                     │
└──────┬───────────┬──────────────────────────────────┘
       │           │
┌──────▼──┐  ┌─────▼──────────────────────────────────┐
│   DB    │  │           AI KATMANI                   │
│Supabase │  │   Anthropic Claude API                 │
│Postgres │  │   • Marka puanlama & analiz             │
│+ Auth   │  │   • Alternatif öneri                   │
│+ Storage│  │   • Rozet paylaşım metni üretme        │
└─────────┘  │   • Kişiselleştirilmiş haftalık özet   │
             └────────────────────────────────────────┘
```

---

## Frontend

### Next.js 14 (App Router)
**Seçim Gerekçesi:**
- Server Components ile marka sayfaları SEO-friendly render edilir
- ISR ile marka verileri önbelleklenir (saatte bir güncelleme)
- TypeScript-first; tip güvenliği
- PWA desteği ile mobil "uygulamaya ekle" deneyimi

### Tailwind CSS
**Seçim Gerekçesi:**
- Hızlı prototipleme, küçük bundle (PurgeCSS)
- Mobil-first breakpoint sistemi

### Mevcut Demo (features/index.html)
Sıfır bağımlılıklı, tarayıcıda doğrudan çalışan tek dosya demo. Vanilla JS + CSS Variables. Backend gerektirmez; tüm mantık client-side.

---

## Backend

### Hono.js
**Seçim Gerekçesi:**
- Express'ten ~3× hızlı
- Cloudflare Workers ile edge-native çalışır
- TypeScript desteği yerleşik

### Cloudflare Workers
**Seçim Gerekçesi:**
- Türkiye'ye yakın edge node → düşük gecikme
- Ücretsiz tier: 100k istek/gün
- KV store ile marka önbelleği

---

## Veritabanı

### Supabase (PostgreSQL)
**Seçim Gerekçesi:**
- OAuth (Google/Apple) dahil Auth sistemi
- Row-Level Security ile kullanıcı verisi izolasyonu
- Storage ile rozet görseli barındırma
- Realtime subscriptions (sıralama canlı güncelleme)

**Ana Tablolar:**
```sql
profiles        -- Kullanıcı adı, biyografi, avatar, XP, rozet listesi
brands          -- Marka bilgileri ve ham puan verileri (30+ kayıt)
scores          -- Hesaplanmış 6 boyut puanları
user_queries    -- Sorgu geçmişi (gamification için)
leaderboard     -- Haftalık sıralama önbelleği
badge_shares    -- Paylaşım olayları (platform + rozet ID + timestamp)
suggestions     -- Topluluk marka önerileri
```

---

## Yapay Zeka

### Anthropic Claude API (`claude-sonnet-4-20250514`)
**Seçim Gerekçesi:**
- Türkçe dil desteği güçlü
- Yapılandırılmış JSON çıktısı (tool_use)
- ESG/CSR raporlarını anlama kapasitesi yüksek

**Kullanım Alanları:**

| Kullanım | Prompt Türü | Çıktı |
|---|---|---|
| Marka puanlama | Structured output | JSON: 6 boyut + genel skor |
| Alternatif öneri | RAG + filtre | Sıralı marka listesi |
| Rozet paylaşım metni | Kısa form üretim | Tweet/caption metni |
| Haftalık özet | Kişiselleştirme | 3–4 cümle motivasyon |

---

## Sosyal Paylaşım Sistemi

### Paylaşım Akışı
```
Kullanıcı "Paylaş" → Platform seçer → Deep link veya Web Share API
```

### Platform Entegrasyonları
| Platform | Yöntem | URL Şablonu |
|---|---|---|
| Instagram | Web Share API (mobil) | `navigator.share({text, url})` |
| X/Twitter | Intent URL | `https://twitter.com/intent/tweet?text=...` |
| WhatsApp | wa.me linki | `https://wa.me/?text=...` |
| LinkedIn | Share URL | `https://linkedin.com/sharing/share-offsite/?url=...` |
| Kopyala | Clipboard API | `navigator.clipboard.writeText(url)` |

### Paylaşım Kartı Verisi
```json
{
  "badge_id": "green_start",
  "badge_emoji": "🌱",
  "badge_name": "Yeşil Başlangıç",
  "user_name": "Ahmet",
  "user_level": 3,
  "user_pts": 1640,
  "hashtags": ["YeşilPuan", "Sürdürülebilirlik", "TürkiyeYeşilleniyor"],
  "share_url": "https://yesilpuan.netlify.app/rozet/green_start"
}
```

---

## Profil Sistemi

### Client-Side State (Demo)
Demo versiyonunda profil verisi JavaScript `user` objesinde tutulur. Sayfa kapatılınca sıfırlanır. Gerçek versiyonda Supabase'e kaydedilir.

### Gerçek Versiyon (Supabase)
```typescript
interface Profile {
  id: string;          // Supabase auth UUID
  username: string;    // Görünen ad
  bio: string;         // Biyografi
  avatar: string;      // Emoji karakter
  xp: number;          // Toplam XP puanı
  level: number;       // Seviye (XP'ye göre hesaplanan)
  badges: string[];    // Kazanılan rozet ID'leri
  query_count: number; // Toplam sorgu sayısı
  created_at: string;
}
```

---

## Deploy & Altyapı

| Bileşen | Servis | Tier |
|---|---|---|
| Frontend | Netlify | Ücretsiz |
| Backend | Cloudflare Workers | Ücretsiz |
| Veritabanı | Supabase | Ücretsiz (500MB) |
| Domain | Namecheap | ~$12/yıl |
| CDN | Cloudflare | Otomatik |
| Monitoring | Sentry | Ücretsiz |

---

## Performans Hedefleri

| Metrik | Hedef |
|---|---|
| LCP | < 1.5s |
| INP | < 200ms |
| Marka sorgusu | < 300ms |
| AI öneri | < 2s |
| Lighthouse | > 90 |
| Mobil First Contentful Paint | < 1s |
