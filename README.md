# 🌿 Yesilpuan
## 📋 Problem
Günümüzde tüketiciler, satın aldıkları markaların çevresel etkileri ve etik üretim standartları hakkında şeffaf bilgiye ulaşmakta zorlanıyor. Mevcut platformlar statik bir ansiklopedi gibi çalıştığı için kullanıcıyı sürdürülebilir alışkanlıklar edinmeye teşvik etmiyor ve özellikle **Türkiye pazarındaki yerel markaların** verileri bu platformlarda eksik kalıyor.

## ✨ Çözüm
Yesilpuan, sürdürülebilirliği bir "oyun" haline getiren interaktif bir platformdur. Kullanıcılar markaları sorguladığında 0-100 arası bir puan alır. 
* **AI'nın Rolü:** **Gemini 1.5 Flash API**, kullanıcı bir marka arattığında markanın güncel sürdürülebilirlik verilerini analiz eder, puanlar ve eğer puan düşükse coğrafi olarak en yakın, yüksek puanlı **yerel alternatifi** akıllıca eşleştirerek kullanıcıya sunar.
* **Oyunlaştırma:** Kullanıcılar daha iyi seçimler yaptıkça XP kazanır, "Plastik Savaşçısı" gibi rozetler toplar ve arkadaşlarıyla yarışır.



## 🔗 Linkler
* **Canlı Demo Yayın Linki:** [https://yesilpuann.netlify.app/](https://yesilpuann.netlify.app/)
* **Demo Video:** [https://youtu.be/DpP0UxdyFww?si=T1Da-teEuJPDX7r-](https://youtu.be/DpP0UxdyFww?si=T1Da-teEuJPDX7r-)

## 🛠️ Kullanılan Teknolojiler
* **Frontend:** React.js / Next.js (Hızlı ve SEO dostu arayüz)
* **Styling:** Tailwind CSS (Modern ve duyarlı tasarım)
* **AI Engine:** Claude API (Akıllı marka analizi ve yerel öneri motoru)
* **Deployment:** Netlify (Kesintisiz canlı yayın)

## 🚀 Nasıl Çalıştırılır?

Bu projeyi yerel bilgisayarınızda çalıştırmak için şu adımları izleyin:

1. **Depoyu Klonlayın:**
   ```bash
   git clone https://github.com/kullaniciadin/sustainatrack.git
   cd sustainatrack
   ```

2. **Bağımlılıkları Yükleyin:**
   ```bash
   npm install
   ```

3. **API Anahtarını Ayarlayın:**
   Proje kök dizininde bir `.env.local` dosyası oluşturun ve Gemini API anahtarınızı ekleyin:
   ```text
   NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
   ```

4. **Uygulamayı Başlatın:**
   ```bash
   npm run dev
   ```
   Tarayıcınızda `http://localhost:3000` adresine giderek uygulamayı görebilirsiniz.

