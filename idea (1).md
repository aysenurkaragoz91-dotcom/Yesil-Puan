# 💡 idea.md — Fikir & Problem Tanımı

---

## Problem: Ne Çözüyorum?

Türkiye'de sürdürülebilir tüketim bilinci hızla yükseliyor; ancak bu bilinç, davranış değişikliğine dönüşemiyor. Bunun iki temel nedeni var:

**1. Bilgiye erişim sorunu**
Tüketiciler satın aldıkları bir markanın çevresel ve sosyal sorumluluğunu kolayca öğrenemiyor. Good On You, EcoChain veya DoneGood gibi global platformlar Türk yerel markalarını kapsamıyor. Bir kullanıcı Sütaş'ın su kullanımını, Koton'un emek koşullarını ya da Arçelik'in karbon taahhütlerini tek bir yerden öğrenemiyor.

**2. Motivasyon sorunu**
Mevcut platformlar "ansiklopedi" gibi çalışır: kullanıcı girer, bakar, çıkar. Sürdürülebilir tüketimi bir alışkanlığa dönüştüren, tekrar eden bir davranış döngüsü kurulamamıştır. Bilmek ile yapmak arasındaki uçurumu kapatan bir mekanizma yoktur.

**YeşilPuan bu iki sorunu birden çözer:** Türkiye'ye özel 30+ marka veritabanıyla bilgiye erişimi sağlar; rozet sistemi, arkadaş sıralaması ve sosyal paylaşımla bu bilgiyi eyleme dönüştürür.

---

## Kullanıcı: Bu Uygulamayı Kim Kullanacak?

**Birincil Kullanıcı — Bilinçli Genç Tüketici (18–35 yaş)**
- Çevre ve sosyal sorunlara duyarlı Z ve Y kuşağı Türk tüketiciler
- Sürdürülebilir alışveriş yapmak isteyen ama nereden başlayacağını bilmeyenler
- Rozetlerini ve başarılarını Instagram, X veya WhatsApp'ta paylaşmaktan keyif alanlar
- Duolingo, Nike Run Club gibi gamification uygulamalarına aşina, motivasyonu oyunlaştırmayla yüksek tutanlar

**İkincil Kullanıcı — Kurumsal & Akademik**
- Şirket sürdürülebilirlik ekipleri: rakip veya tedarikçi markalarla kıyaslama yapmak isteyenler
- Üniversite öğrencileri ve araştırmacılar: Türkiye özelinde ESG veri boşluğunu doldurmak için
- STK'lar ve çevre örgütleri: farkındalık kampanyalarında referans veri kaynağı olarak

**Kullanıcı Motivasyonları**

| Motivasyon | Kullanıcının İç Sesi |
|---|---|
| Merak | "Bu markanın gerçek sicili nedir?" |
| Kimlik | "Çevreci biri olduğumu göstermek istiyorum" |
| Sosyal onay | "Arkadaşlarım bu rozeti görsün" |
| Rekabet | "Sıralamada üste çıkmak istiyorum" |
| Pratik fayda | "Daha iyi bir alternatif var mı?" |

---

## AI'ın Rolü: Yapay Zeka Bu Çözümde Ne Yapıyor?

YeşilPuan'da yapay zeka pasif bir veritabanı değil; aktif bir analiz ve öneri motorudur. Claude API (`claude-sonnet-4-20250514`) şu rolleri üstlenir:

**1. Marka Puanlama Analisti**
Kamuya açık kaynaklardan (CDP raporları, BIST sürdürülebilirlik açıklamaları, Çevre ve Şehircilik Bakanlığı ÇED belgeleri, ÇSGB iş uyuşmazlığı verileri) toplanan ham bilgiyi 6 boyutta analiz ederek 0–100 arası bir sürdürülebilirlik skoru üretir.

```
Boyutlar ve Ağırlıklar:
  Karbon Ayak İzi   → %25
  Su Kullanımı      → %15
  Emek Koşulları    → %20
  Ambalaj           → %15
  Şeffaflık         → %15
  Yerellik          → %10
```

**2. Akıllı Alternatif Danışmanı**
Kullanıcı düşük puanlı bir marka sorguladığında AI, aynı kategoride daha yüksek puanlı Türk markalarını sıralar ve kısa gerekçe sunar. Örneğin: "Koton yerine Bursalı'yı tercih etmek bu ayda yaklaşık 12 litre su tasarrufu anlamına gelir."

**3. Rozet İçerik Üreticisi**
Kullanıcı bir rozet kazandığında AI, o kişinin adını, puanını ve rozet tipini birleştirerek Instagram, X ve WhatsApp için kişiselleştirilmiş paylaşım metni oluşturur.

**4. Haftalık Kişisel Koç**
Kullanıcının sorgu geçmişini ve rozet durumunu analiz ederek her hafta kişiselleştirilmiş, motive edici bir özet mesajı yazar. Örneğin: "Geçen hafta Trendyol yerine Hepsiburada'yı tercih ettin — bu küçük adım ayda ~8kg CO₂ fark yaratıyor!"

**5. Topluluk Verisi Doğrulayıcı**
Kullanıcılar yeni marka önerdiğinde AI, önerilen kaynakları çapraz kontrol ederek puanlama tutarlılığını denetler; şüpheli veya eksik verileri moderatöre işaretler.

---

## Rakip Durum: Benzer Çözümler Var Mı? Benimki Nasıl Farklı?

### Mevcut Rakipler

| Platform | Güçlü Yanı | Zayıf Yanı |
|---|---|---|
| **Good On You** | Geniş global moda veritabanı | Türk markası yok; sadece moda sektörü |
| **EcoChain** | Kurumsal tedarik zinciri analizi | Bireysel tüketiciye kapalı; çok pahalı |
| **DoneGood** | ABD pazarında geniş kategori | Türkiye'de hiç veri yok |
| **Buycott** | Barkod tarama özelliği | Türk ürün veritabanı yok; pasif kullanım |
| **Ethical Consumer** | Kapsamlı araştırma metodolojisi | İngilizce; ücretli abonelik gerekli |

### YeşilPuan'ın Farkı

**Coğrafi odak:** Rakiplerin hiçbiri Türk yerel markalarını kapsamıyor. Bu, YeşilPuan'ın doldurduğu en kritik boşluktur.

**Gamification katmanı:** Hiçbir rakip rozet, XP sistemi veya arkadaş sıralaması sunmuyor. Mevcut araçlar bilgi verir; YeşilPuan davranış değiştirir.

**Sosyal yayılım:** Rozet paylaşımı (Instagram, X, WhatsApp, LinkedIn) ile her kullanıcı aynı zamanda bir büyüme kanalına dönüşür. Rakiplerde bu mekanizma yoktur.

**Yerel veri kaynakları:** Türkiye'ye özgü kaynaklar (ÇED raporları, SGK verileri, BIST açıklamaları) kullanılır. Global rakipler bu verilere ulaşamaz.

**Türkçe ve ücretsiz:** Hedef kitleye erişim engelini tamamen kaldırır.

---

## Başarı Kriteri: Bu Proje Başarılı Olursa Ne Değişecek?

### Nicel Hedefler (12 Ay)

| Metrik | 3. Ay | 6. Ay | 12. Ay |
|---|---|---|---|
| Aktif kullanıcı | 5.000 | 25.000 | 100.000 |
| Veritabanındaki marka | 50 | 200 | 1.000+ |
| Aylık marka sorgusu | 20.000 | 150.000 | 800.000 |
| Paylaşılan rozet | 500 | 8.000 | 60.000 |
| Topluluk veri katkısı | 20 | 150 | 500+ öneri |

### Nitel Başarı Göstergeleri

**Kullanıcı davranışında değişim:** Kullanıcıların en az %30'u, sorgulama sonrası daha yüksek puanlı alternatifi tercih etti raporluyor.

**Marka farkındalığı:** Düşük puanlı bir markanın YeşilPuan skoru sosyal medyada viral oldu ve marka kamuoyuna açıklama yaptı.

**Ekosistem etkisi:** En az 3 Türk markası, YeşilPuan skorunu iyileştirmek amacıyla sürdürülebilirlik raporlama süreçlerini başlattı.

**Medya görünürlüğü:** Platform, Türkiye'de sürdürülebilir tüketim haberlerinde başvurulan kaynak olarak anılıyor.

**Organik büyüme:** Kullanıcıların %20'si en az bir arkadaşını platforma davet etti; rozet paylaşımları yeni kullanıcı ediniminin ana kanalı haline geldi.

### Uzun Vadeli Vizyon

> Bir Türk tüketici alışveriş sepetine ürün koymadan önce "Bunu YeşilPuan'da kontrol ettim mi?" diye sorduğunda — bu proje başarılı olmuş demektir.
