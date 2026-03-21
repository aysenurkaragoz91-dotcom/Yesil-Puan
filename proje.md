# YeşilPuan Proje Metni

## Proje Adı
**YeşilPuan** - Türkiye odaklı sürdürülebilirlik puanlama ve davranış değişikliği platformu.

## Proje Özeti
YeşilPuan, kullanıcıların Türkiye'deki markaların sürdürülebilirlik performansını hızlıca görmesini, düşük puanlı markalar yerine daha iyi alternatifler bulmasını ve bu süreci oyunlaştırma ile kalıcı alışkanlığa dönüştürmesini hedefleyen mobil öncelikli bir web uygulamasıdır.

Sistem, markaları 6 boyutta puanlar (karbon, su, emek, ambalaj, seffaflik, yerellik), genel skor üretir, alternatif önerir ve kullanıcıya rozet/XP/sıralama gibi mekanizmalarla motivasyon sağlar.

## Problem Tanımı
- Global sürdürülebilirlik platformları yerel Türk markalarını yeterince kapsamaz.
- Kullanıcı davranışını değiştirecek oyunlaştırma eksiktir.
- Kişisel profil, topluluk ve sosyal yayılım unsurları sınırlıdır.
- Kullanıcılar "bak-çık" akışında kalır; sürdürülebilirlik rutinine geçiş zorlaşır.

## Hedef Kitle
- Z ve Y kuşağında çevre bilinci artan Türk tüketiciler
- Sürdürülebilir alışverişe başlamak isteyen kullanıcılar
- Topluluk, rekabet ve paylaşım motivasyonu seven mobil kullanıcılar

## Ürün Değeri
- 30+ Türk markasından oluşan yerel veri tabanı
- Düşük puanlı markalar için aynı kategoride alternatif öneri
- Kullanıcı profili: ad, biyografi, emoji avatar
- Oyunlaştırma: XP, seviye, rozet, haftalık sıralama
- Sosyal paylaşım: Instagram, X, WhatsApp, LinkedIn, kopyala

## Çekirdek Özellikler
1. **Marka Sorgulama**
   - Arama veya listeden marka seçimi
   - 0-100 genel skor + derece etiketi
   - 6 boyutlu alt skorlar ve risk/issue göstergesi

2. **Alternatif Öneri**
   - Düşük puanlı markalarda daha yüksek puanlı rakipleri gösterme
   - Kategori bazlı sıralama

3. **Profil Sistemi**
   - Kullanıcı adı, biyografi, avatar özelleştirme
   - Profil güncellemelerinin uygulama genelinde anlık yansıması

4. **Rozet ve XP Sistemi**
   - Davranışa dayalı rozet kazanımı
   - Eylem bazlı XP kuralları (sorgu, paylaşım, sürdürülebilir seçim vb.)
   - Seviye hesaplama ve ilerleme mantığı

5. **Liderboard**
   - Haftalık puan, çeşitlilik ve giriş serisi (streak) ağırlıklı sıralama
   - Arkadaşlarla rekabet odaklı görünüm

6. **Sosyal Paylaşım**
   - Rozet bazlı paylaşım metni ve URL üretimi
   - Hashtag ve kullanıcı seviyesini içeren paylaşım içeriği

## Puanlama Modeli
Skorlama 6 boyutun ağırlıklı ortalamasına dayanır:
- karbon: 0.25
- su: 0.15
- emek: 0.20
- ambalaj: 0.15
- seffaflik: 0.15
- yerellik: 0.10

Genel skor `Math.round(weightedSum)` ile tam sayıya yuvarlanır. Skora göre derece sınıfları:
- 80+: Mukemmel
- 70-79: Iyi
- 55-69: Orta
- 40-54: Zayif
- 0-39: Cok Kotu

## Veri Yapısı (Mevcut İçerik)
- `brands.json`: 30 marka, kategori, alt skorlar, issue listesi, sertifikalar
- `scoring.js`: skor hesabı, dereceleme, alternatif bulma, XP/seviye yardımcıları
- `gamification.js`: rozetler, XP kuralları, profil fonksiyonları, liderboard, paylaşım üretimi

## Kullanıcı Akışı (Kısa)
1. Kullanıcı ana sayfada marka arar veya listeden seçer.
2. Sonuç ekranında skorlar ve gerekçeler görülür.
3. Düşük puanda alternatif markalar önerilir.
4. Her sorgu XP kazandırır, rozet koşulları kontrol edilir.
5. Kullanıcı rozetini sosyal medyada paylaşır ve liderboard'da yükselir.

## Teknik Mimari (Hedef)
- Frontend: Next.js + Tailwind CSS (mobil-first, PWA)
- Backend: Node.js + Hono (edge odaklı)
- Database/Auth: Supabase (PostgreSQL + Auth + Storage)
- AI katmanı: Claude API (puanlama, alternatif, metin üretimi)
- Deploy: Netlify/Vercel + Cloudflare

## Fazlandırma
- **Faz 1 (MVP):** Statik demo, marka sorgu, temel skor görüntüleme
- **Faz 2:** Profil, rozet, paylaşım, liderboard
- **Faz 3:** Supabase kalıcılık, gerçek kullanıcı hesapları
- **Faz 4:** AI destekli haftalık ozetler, RAG tabanlı gelismis oneriler

## Basari Metrikleri
- Ortalama haftalık aktif kullanıcı artışı
- Kullanıcı başına sorgu sayısı
- Alternatif marka seçme oranı
- Rozet paylaşım oranı
- 30 günlük geri dönüş oranı

## Sonuc
YeşilPuan, Türkiye pazarına özel veri + oyunlaştırma + sosyal motivasyon kombinasyonu ile sürdürülebilir tüketimi bilgi düzeyinden davranış düzeyine taşıyan bir platform olarak konumlanır. Proje; teknik olarak ölçeklenebilir, ürün olarak topluluk odaklı ve etki olarak ölçülebilir bir yapıya sahiptir.
