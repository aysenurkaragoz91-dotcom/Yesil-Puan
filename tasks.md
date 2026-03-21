# YesilPuan Uygulama Gelistirme Gorev Listesi

Bu liste `prd.md.htm` ve `proje.md` baz alinarak, urunu adim adim MVP'den AI destekli yapıya tasimak icin hazirlandi.

## Faz 0 - Kesif ve Teknik Hazirlik

### 0.1 Kapsam Netlestirme
- [ ] MVP icin "olmazsa olmaz" ozellikleri dondur: marka sorgu, skor, alternatif onerisi.
- [ ] Faz 2-3-4 icin teslim kriterlerini tek tek yaz (profil, gamification, kalicilik, AI).
- [ ] Basari metriklerini olculebilir hedeflere cevir (WAU, sorgu/adam, alternatif secim orani, paylasim orani, D30 geri donus).

### 0.2 Veri ve Alan Modeli
- [ ] `brands.json` icindeki 30+ marka verisini dogrula (kategori, boyut skorlar, issue, sertifika).
- [ ] Marka veri modeli dokumani olustur (`id`, `name`, `category`, `scores`, `issues`, `certificates`).
- [ ] Arama icin normalizasyon kurali tanimla (kucuk/buyuk harf, Turkce karakter toleransi).

### 0.3 Mimari Kurulum
- [ ] Next.js + Tailwind proje iskeletini kur.
- [ ] Klasorleme standardini olustur (`app`, `components`, `lib`, `data`, `types`).
- [ ] PWA temelini ekle (manifest, icon, metadata).
- [ ] CI icin temel kontrol adimi tanimla (build + lint).

## Faz 1 - MVP (Marka Sorgu ve Skor Deneyimi)

### 1.1 Ana Ekran ve Arama
- [ ] Mobil-first ana ekran tasarimini uygula.
- [ ] Arama inputu + "sorgula" aksiyonunu bagla.
- [ ] Marka listesi fallback akisini ekle (kullanici yazmadan da secim yapabilsin).
- [ ] "Marka bulunamadi" durumunu net ve yonlendirici mesajla ele al.

### 1.2 Skor Motoru Entegrasyonu
- [ ] `scoring.js` agirlikli skor hesaplamasini uygulamaya entegre et.
- [ ] 6 boyutlu skorlarin dogru agirliklarla hesaplandigini test et:
  - karbon 0.25, su 0.15, emek 0.20, ambalaj 0.15, seffaflik 0.15, yerellik 0.10
- [ ] Genel skoru `Math.round` ile tam sayi gosterecek sekilde bagla.
- [ ] Skor derecesi etiketini ekle: Mukemmel, Iyi, Orta, Zayif, Cok Kotu.

### 1.3 Sonuc Ekrani
- [ ] Sonuc kartinda marka adi, kategori, genel skor ve dereceyi goster.
- [ ] 6 boyut alt skorlarini kart/bar formatinda gorsellestir.
- [ ] Risk/issue listesini okunabilir sekilde goster.
- [ ] Sertifika bilgisini (varsa) sonuc kartina ekle.

### 1.4 Alternatif Oneri
- [ ] Dusuk skor esigini belirle (oneri: `<55`).
- [ ] Ayni kategoride daha yuksek puanli alternatifleri sirala.
- [ ] "Neden bu alternatif?" aciklama satiri ekle.
- [ ] Tek tikla "alternatife gec" aksiyonunu aktif et.

### 1.5 MVP Kalite ve Yayin
- [ ] En az 15 marka uzerinde skor dogrulama test senaryosu yaz.
- [ ] Arama -> sonuc -> alternatif akisini manuel test et.
- [ ] Core Web Vitals temel kontrolu yap (mobil oncelikli).
- [ ] MVP'yi Vercel/Netlify ortamina deploy et.

## Faz 2 - Gamification ve Sosyal Katman

### 2.1 Profil Sistemi
- [ ] Profil state modelini olustur (ad, biyografi, emoji avatar, toplam XP, seviye).
- [ ] Profil duzenleme ekranini tamamla.
- [ ] Profil degisikliklerini uygulama genelinde anlik yansit.

### 2.2 XP ve Seviye Mekanigi
- [ ] Eylem bazli XP kurallarini `gamification.js` ile bagla:
  - marka sorgusu, alternatif secimi, sosyal paylasim
- [ ] Seviye hesaplama + ilerleme cubugu bilesenini ekle.
- [ ] XP event kayitlarini tek bir yardimci katmandan yonet.

### 2.3 Rozet Sistemi
- [ ] Rozet kosullarini netlestir (ilk sorgu, belirli sayida alternatif secimi, seri gun).
- [ ] Rozet tetikleme mekanigini aksiyon sonrasina bagla.
- [ ] Rozet kazanma animasyonu ve bildirim kutusunu uygula.

### 2.4 Liderboard
- [ ] Haftalik puanlama formulu uygula (XP + cesitlilik + streak agirlikli).
- [ ] Liderboard ekraninda "benim siram" vurgusunu ekle.
- [ ] Liste sifirlandiginda haftalik snapshot mantigini hazirla.

### 2.5 Sosyal Paylasim
- [ ] Rozet + seviye bazli dinamik paylasim metni uret.
- [ ] Instagram, X, WhatsApp, LinkedIn ve kopyala butonlarini ekle.
- [ ] Paylasim tiklamalarini analytics eventi olarak kaydet.

## Faz 3 - Supabase ile Kalicilik ve Hesaplar

### 3.1 Veritabani ve Guvenlik
- [ ] Supabase projesini olustur, ortam degiskenlerini tanimla.
- [ ] Tablolari kur: `profiles`, `user_actions`, `badges`, `weekly_leaderboard`.
- [ ] RLS politikalarini her tablo icin etkinlestir.

### 3.2 Kimlik Dogrulama
- [ ] Kayit, giris, cikis akisini ekle.
- [ ] Session yenileme ve route koruma kuralini uygula.
- [ ] Yeni kullanicida otomatik profil olusturma tetigini bagla.

### 3.3 Oyunlastirma Verilerinin Kalicilastirilmasi
- [ ] XP ve rozet eventlerini veritabanina yaz.
- [ ] Kullanici aksiyon gecmisini sorgulanabilir hale getir.
- [ ] Haftalik liderboard hesaplamasi icin cron/scheduled job kur.

### 3.4 Uretim Hazirligi
- [ ] Hata izleme araci entegre et (Sentry vb.).
- [ ] Kritik akislara smoke test checklist hazirla.
- [ ] Guvenlik/perf kontrol listesini tamamla.

## Faz 4 - AI Destekli Ozet ve Gelismis Oneri

### 4.1 AI Altyapisi
- [ ] Node.js + Hono backend katmanina AI istemcisi ekle.
- [ ] Prompt kutuphanesi olustur (haftalik ozet, davranis icgorusu, alternatif gerekcesi).
- [ ] AI hata/fallback stratejisi yaz (kural tabanli alternatif metin).

### 4.2 Haftalik AI Ozeti
- [ ] Kullanici haftalik aksiyonlarindan ozet girdisi olustur.
- [ ] Kisilestirilmis "bu hafta etki raporu" kartini goster.
- [ ] AI ozetlerini profil gecmisinde sakla.

### 4.3 Gelismis Oneri Motoru
- [ ] RAG veri kaynaklarini tanimla (issue aciklamalari, sertifikalar, marka notlari).
- [ ] Kategori + gecmis davranisa gore oneriyi kisilestir.
- [ ] Oneri kalitesi icin "isabetli miydi?" geri bildirim alanini ekle.

## Surekli Kalite ve Olcum

- [ ] Her faz sonunda kullanici geri bildirimi topla ve iyilestirme backlog'u ac.
- [ ] Haftalik metrik gozden gecirme ritueli olustur.
- [ ] Unit + integration + e2e test kapsamini fazlarla buyut.
- [ ] Erisilebilirlik (klavye, kontrast, screen reader) kontrollerini periyodik yap.
- [ ] Performans butcesi belirle ve CI'da takip et.

## Oncelikli Ilk Sprint (1-2 Hafta)

- [ ] Next.js + Tailwind kurulumunu tamamla.
- [ ] `brands.json` ve `scoring.js` entegrasyonunu bitir.
- [ ] Arama + sonuc karti + derece etiketini calisir hale getir.
- [ ] 6 boyut alt skor gosterimini tamamla.
- [ ] Dusuk skor icin alternatif oneriyi aktif et.
- [ ] Basit XP artisini (sorgu basina) calistir.
- [ ] "Ilk sorgu" rozetini ekle.
- [ ] Temel profil state'ini ekle.
- [ ] 15 senaryolik manuel test checklistini tamamla.
- [ ] MVP preview deploy'unu al.
