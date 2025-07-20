document.addEventListener("DOMContentLoaded", function () {
  // --- DEKLARASI VARIABEL GLOBAL ---
  let scene, camera, renderer, gridHelper;
  // Bahasa Madura (MDR) ditambahkan
  const languages = ["id", "en", "jp", "cn", "sa", "de", "mdr"];
  let currentLangIndex = 0;

  // --- SISTEM BAHASA ---
  const languageData = {
    heroTitle: {
      id: "MOH. OFIKURRAHMAN_",
      en: "MOH. OFIKURRAHMAN_",
      jp: "MOH. OFIKURRAHMAN_",
      cn: "MOH. OFIKURRAHMAN_",
      sa: "MOH. OFIKURRAHMAN_",
      de: "MOH. OFIKURRAHMAN_",
      mdr: "MOH. OFIKURRAHMAN_",
    },
    logoTextDesktop: {
      id: "PORTFOLIO.exe",
      en: "PORTFOLIO.exe",
      jp: "PORTFOLIO.exe",
      cn: "PORTFOLIO.exe",
      sa: "PORTFOLIO.exe",
      de: "PORTFOLIO.exe",
      mdr: "PORTFOLIO.exe",
    },
    logoTextMobile: {
      id: "PORTFOLIO",
      en: "PORTFOLIO",
      jp: "ポートフォリオ",
      cn: "作品集",
      sa: "ملف أعمالي",
      de: "PORTFOLIO",
      mdr: "PORTFOLIO",
    },
    navHome: {
      id: "Home",
      en: "Home",
      jp: "ホーム",
      cn: "首页",
      sa: "الرئيسية",
      de: "Start",
      mdr: "Bheranda",
    },
    navSkills: {
      id: "Skills",
      en: "Skills",
      jp: "スキル",
      cn: "技能",
      sa: "المهارات",
      de: "Fähigkeiten",
      mdr: "Kaahlian",
    },
    navProjects: {
      id: "Proyek",
      en: "Projects",
      jp: "プロジェクト",
      cn: "项目",
      sa: "المشاريع",
      de: "Projekte",
      mdr: "Proyèk",
    },
    navContact: {
      id: "Kontak",
      en: "Contact",
      jp: "コンタクト",
      cn: "联系",
      sa: "اتصل بي",
      de: "Kontakt",
      mdr: "Kontak",
    },
    navHomeMobile: {
      id: "Home",
      en: "Home",
      jp: "ホーム",
      cn: "首页",
      sa: "الرئيسية",
      de: "Start",
      mdr: "Bheranda",
    },
    navSkillsMobile: {
      id: "Skills",
      en: "Skills",
      jp: "スキル",
      cn: "技能",
      sa: "المهارات",
      de: "Fähigkeiten",
      mdr: "Kaahlian",
    },
    navProjectsMobile: {
      id: "Proyek",
      en: "Projects",
      jp: "プロジェクト",
      cn: "项目",
      sa: "المشاريع",
      de: "Projekte",
      mdr: "Proyèk",
    },
    navContactMobile: {
      id: "Kontak",
      en: "Contact",
      jp: "コンタクト",
      cn: "联系",
      sa: "اتصل بي",
      de: "Kontakt",
      mdr: "Kontak",
    },
    heroSubtitle: {
      id: "Frontend Web Developer",
      en: "Frontend Web Developer",
      jp: "フロントエンドウェブ開発者",
      cn: "前端Web开发人员",
      sa: "مطور واجهات الويب الأمامية",
      de: "Frontend-Webentwickler",
      mdr: "Pangembang Web Front-end",
    },
    heroDesc1: {
      id: "Mengembangkan pengalaman web yang elegan dan fungsional dengan teknologi modern dan desain yang responsif.",
      en: "Developing elegant and functional web experiences with modern technology and responsive design.",
      jp: "モダンな技術とレスポンシブデザインで、エレガントで機能的なウェブ体験を開発します。",
      cn: "利用现代技术和响应式设计，开发优雅且功能强大的Web体验。",
      sa: "تطوير تجارب ويب أنيقة وعملية باستخدام التكنولوجيا الحديثة والتصميم المتجاوب.",
      de: "Entwicklung eleganter und funktionaler Weberlebnisse mit moderner Technologie und responsivem Design.",
      mdr: "Aghâbây pangalaman web sè èndâ tor fungsional kalabân tèknologi modèrn tor dèsain sè responsif.",
    },
    btnViewPortfolio: {
      id: "Lihat Portfolio",
      en: "View Portfolio",
      jp: "ポートフォリオを見る",
      cn: "查看作品集",
      sa: "عرض أعمالي",
      de: "Portfolio ansehen",
      mdr: "Tèngghu Portfolio",
    },
    btnDownloadCV: {
      id: "Download CV",
      en: "Download CV",
      jp: "履歴書をダウンロード",
      cn: "下载简历",
      sa: "تحميل السيرة الذاتية",
      de: "Lebenslauf herunterladen",
      mdr: "Unduh CV",
    },
    btnContactMe: {
      id: "Hubungi Saya",
      en: "Contact Me",
      jp: "お問い合わせ",
      cn: "联系我",
      sa: "اتصل بي",
      de: "Kontaktieren Sie mich",
      mdr: "Hubungi Kaulâ",
    },
    skillsTitle: {
      id: "&gt; Keahlian Teknis",
      en: "&gt; Technical Skills",
      jp: "&gt; テクニカルスキル",
      cn: "&gt; 技术技能",
      sa: "&gt; المهارات التقنية",
      de: "&gt; Technische Fähigkeiten",
      mdr: "&gt; Kaahlian Tèknis",
    },
    projectsTitle: {
      id: "&gt; Proyek Unggulan",
      en: "&gt; Featured Projects",
      jp: "&gt; 注目のプロジェクト",
      cn: "&gt; 精选项目",
      sa: "&gt; المشاريع المميزة",
      de: "&gt; Ausgewählte Projekte",
      mdr: "&gt; Proyèk Unggulan",
    },
    project1Title: {
      id: '<i class="fas fa-shopping-cart"></i> Platform E-Commerce',
      en: '<i class="fas fa-shopping-cart"></i> E-Commerce Platform',
      jp: '<i class="fas fa-shopping-cart"></i> Eコマースプラットフォーム',
      cn: '<i class="fas fa-shopping-cart"></i> 电子商务平台',
      sa: '<i class="fas fa-shopping-cart"></i> منصة تجارة إلكترونية',
      de: '<i class="fas fa-shopping-cart"></i> E-Commerce-Plattform',
      mdr: '<i class="fas fa-shopping-cart"></i> Platform E-Commerce',
    },
    project1Desc: {
      id: "Platform e-commerce modern dengan React.js dan Node.js. Fitur lengkap termasuk keranjang belanja, sistem pembayaran, dan dashboard admin yang responsif.",
      en: "Modern e-commerce platform with React.js and Node.js. Full features including shopping cart, payment system, and a responsive admin dashboard.",
      jp: "React.jsとNode.jsを使用した最新のEコマースプラットフォーム。ショッピングカート、決済システム、レスポンシブな管理者ダッシュボードなどの全機能を搭載。",
      cn: "使用React.js和Node.js的现代电子商务平台。功能齐全，包括购物车、支付系统和响应式管理仪表板。",
      sa: "منصة تجارة إلكترونية حديثة باستخدام React.js و Node.js. ميزات كاملة تشمل عربة التسوق ونظام الدفع ولوحة تحكم إدارية متجاوبة.",
      de: "Moderne E-Commerce-Plattform mit React.js und Node.js. Vollständige Funktionen einschließlich Warenkorb, Zahlungssystem und responsivem Admin-Dashboard.",
      mdr: "Platform e-commerce modèrn kalabân React.js tor Node.js. Fitur lèngkep tamaso' karanjang bhelânjâ, sistem pambâyâran, tor dashboard admin sè responsif.",
    },
    project2Title: {
      id: '<i class="fas fa-globe"></i> Website Portfolio',
      en: '<i class="fas fa-globe"></i> Portfolio Website',
      jp: '<i class="fas fa-globe"></i> ポートフォリオサイト',
      cn: '<i class="fas fa-globe"></i> 个人作品网站',
      sa: '<i class="fas fa-globe"></i> موقع أعمالي',
      de: '<i class="fas fa-globe"></i> Portfolio-Webseite',
      mdr: '<i class="fas fa-globe"></i> Website Portfolio',
    },
    project2Desc: {
      id: "Website portfolio responsif dengan animasi smooth dan desain modern. Dioptimalkan untuk SEO dan performa tinggi dengan skor Lighthouse 95+.",
      en: "Responsive portfolio website with smooth animations and modern design. Optimized for SEO and high performance with a Lighthouse score of 95+.",
      jp: "スムーズなアニメーションとモダンなデザインのレスポンシブなポートフォリオサイト。SEOと高パフォーマンスに最適化され、Lighthouseスコアは95+。",
      cn: "具有流畅动画和现代设计的响应式个人作品网站。针对SEO和高性能进行了优化，Lighthouse得分超过95分。",
      sa: "موقع أعمال شخصي متجاوب مع رسوم متحركة سلسة وتصميم حديث. محسن لمحركات البحث وأداء عالٍ بدرجة Lighthouse 95+.",
      de: "Responsive Portfolio-Webseite mit flüssigen Animationen und modernem Design. Optimiert für SEO und hohe Leistung mit einem Lighthouse-Score von 95+.",
      mdr: "Website portfolio sè responsif kalabân animasi halos tor dèsain modèrn. Èoptimalken kaangguy SEO tor performa tèngghi kalabân skor Lighthouse 95+.",
    },
    project3Title: {
      id: '<i class="fas fa-tasks"></i> Aplikasi Manajemen Tugas',
      en: '<i class="fas fa-tasks"></i> Task Management App',
      jp: '<i class="fas fa-tasks"></i> タスク管理アプリ',
      cn: '<i class="fas fa-tasks"></i> 任务管理应用',
      sa: '<i class="fas fa-tasks"></i> تطبيق إدارة المهام',
      de: '<i class="fas fa-tasks"></i> Aufgabenverwaltungs-App',
      mdr: '<i class="fas fa-tasks"></i> Aplikasi Manajemèn Tugas',
    },
    project3Desc: {
      id: "Aplikasi manajemen tugas dengan drag & drop, pembaruan real-time, dan kolaborasi tim. Antarmuka yang intuitif dan ramah pengguna.",
      en: "Task management application with drag & drop, real-time updates, and team collaboration. Intuitive and user-friendly interface.",
      jp: "ドラッグ＆ドロップ、リアルタイム更新、チームコラボレーション機能を備えたタスク管理アプリケーション。直感的で使いやすいインターフェース。",
      cn: "具有拖放功能、实时更新和团队协作的任务管理应用程序。界面直观，用户友好。",
      sa: "تطبيق لإدارة المهام مع ميزة السحب والإفلات والتحديثات في الوقت الفعلي وتعاون الفريق. واجهة سهلة الاستخدام وبديهية.",
      de: "Aufgabenverwaltungsanwendung mit Drag & Drop, Echtzeit-Updates und Team-Kollaboration. Intuitive und benutzerfreundliche Oberfläche.",
      mdr: "Aplikasi manajemèn tugas kalabân drag & drop, pembaruan real-time, tor kolaborasi tim. Antarmuka sè intuitif tor nyaman èghuna'aghi.",
    },
    contactTitle: {
      id: "&gt; Hubungi Saya",
      en: "&gt; Get In Touch",
      jp: "&gt; お問い合わせ",
      cn: "&gt; 联系我",
      sa: "&gt; تواصل معي",
      de: "&gt; Kontakt aufnehmen",
      mdr: "&gt; Hubungi Kaulâ",
    },
    contactSubtitle: {
      id: "Mari berkolaborasi untuk menciptakan pengalaman web yang luar biasa.",
      en: "Let's collaborate to create amazing web experiences.",
      jp: "素晴らしいウェブ体験を創造するために協力しましょう。",
      cn: "让我们合作，创造卓越的Web体验。",
      sa: "دعنا نتعاون لإنشاء تجارب ويب مذهلة.",
      de: "Lassen Sie uns zusammenarbeiten, um fantastische Weberlebnisse zu schaffen.",
      mdr: "Ngèrèng kolaborasi kaangguy aghâbây pangalaman web sè luar biasa.",
    },
    contactEmail: {
      id: '<i class="fas fa-envelope"></i> Email',
      en: '<i class="fas fa-envelope"></i> Email',
      jp: '<i class="fas fa-envelope"></i> Eメール',
      cn: '<i class="fas fa-envelope"></i> 电子邮件',
      sa: '<i class="fas fa-envelope"></i> بريد إلكتروني',
      de: '<i class="fas fa-envelope"></i> E-Mail',
      mdr: '<i class="fas fa-envelope"></i> Email',
    },
    formTitle: {
      id: '<i class="fas fa-paper-plane"></i> Kirim Pesan',
      en: '<i class="fas fa-paper-plane"></i> Send Message',
      jp: '<i class="fas fa-paper-plane"></i> メッセージを送信',
      cn: '<i class="fas fa-paper-plane"></i> 发送消息',
      sa: '<i class="fas fa-paper-plane"></i> إرسال رسالة',
      de: '<i class="fas fa-paper-plane"></i> Nachricht senden',
      mdr: '<i class="fas fa-paper-plane"></i> Kèrèm Pessen',
    },
    formLabelName: {
      id: '<i class="fas fa-user"></i> Nama Lengkap *',
      en: '<i class="fas fa-user"></i> Full Name *',
      jp: '<i class="fas fa-user"></i> フルネーム *',
      cn: '<i class="fas fa-user"></i> 全名 *',
      sa: '<i class="fas fa-user"></i> الاسم الكامل *',
      de: '<i class="fas fa-user"></i> Vollständiger Name *',
      mdr: '<i class="fas fa-user"></i> Asma Lèngkep *',
    },
    formPlaceholderName: {
      id: "Masukkan nama lengkap Anda",
      en: "Enter your full name",
      jp: "フルネームを入力してください",
      cn: "输入您的全名",
      sa: "أدخل اسمك الكامل",
      de: "Geben Sie Ihren vollständigen Namen ein",
      mdr: "Essè'è asma lèngkep panjennengngan",
    },
    formLabelEmail: {
      id: '<i class="fas fa-envelope"></i> Email *',
      en: '<i class="fas fa-envelope"></i> Email *',
      jp: '<i class="fas fa-envelope"></i> Eメール *',
      cn: '<i class="fas fa-envelope"></i> 电子邮件 *',
      sa: '<i class="fas fa-envelope"></i> البريد الإلكتروني *',
      de: '<i class="fas fa-envelope"></i> E-Mail *',
      mdr: '<i class="fas fa-envelope"></i> Email *',
    },
    formPlaceholderEmail: {
      id: "nama@email.com",
      en: "name@email.com",
      jp: "nama@email.com",
      cn: "name@email.com",
      sa: "name@email.com",
      de: "name@email.com",
      mdr: "asma@email.com",
    },
    formLabelSubject: {
      id: '<i class="fas fa-tag"></i> Subjek',
      en: '<i class="fas fa-tag"></i> Subject',
      jp: '<i class="fas fa-tag"></i> 件名',
      cn: '<i class="fas fa-tag"></i> 主题',
      sa: '<i class="fas fa-tag"></i> الموضوع',
      de: '<i class="fas fa-tag"></i> Betreff',
      mdr: '<i class="fas fa-tag"></i> Subjek',
    },
    formPlaceholderSubject: {
      id: "Subjek pesan (opsional)",
      en: "Message subject (optional)",
      jp: "メッセージの件名（任意）",
      cn: "消息主题（可选）",
      sa: "موضوع الرسالة (اختياري)",
      de: "Betreff der Nachricht (optional)",
      mdr: "Subjek pessen (opsional)",
    },
    formLabelMessage: {
      id: '<i class="fas fa-comment"></i> Pesan *',
      en: '<i class="fas fa-comment"></i> Message *',
      jp: '<i class="fas fa-comment"></i> メッセージ *',
      cn: '<i class="fas fa-comment"></i> 消息 *',
      sa: '<i class="fas fa-comment"></i> الرسالة *',
      de: '<i class="fas fa-comment"></i> Nachricht *',
      mdr: '<i class="fas fa-comment"></i> Pessen *',
    },
    formPlaceholderMessage: {
      id: "Tulis pesan Anda di sini...",
      en: "Write your message here...",
      jp: "ここにメッセージを書いてください...",
      cn: "在此处输入您的消息...",
      sa: "اكتب رسالتك هنا...",
      de: "Schreiben Sie hier Ihre Nachricht...",
      mdr: "Torèssaghi pessen panjennengngan neng kènè...",
    },
    formSubmitBtn: {
      id: "Kirim Pesan",
      en: "Send Message",
      jp: "メッセージを送信",
      cn: "发送消息",
      sa: "إرسال رسالة",
      de: "Nachricht senden",
      mdr: "Kèrèm Pessen",
    },
    formSendingBtn: {
      id: '<i class="fas fa-spinner fa-spin"></i> Mengirim...',
      en: '<i class="fas fa-spinner fa-spin"></i> Sending...',
      jp: '<i class="fas fa-spinner fa-spin"></i> 送信中...',
      cn: '<i class="fas fa-spinner fa-spin"></i> 发送中...',
      sa: '<i class="fas fa-spinner fa-spin"></i> جار الإرسال...',
      de: '<i class="fas fa-spinner fa-spin"></i> Senden...',
      mdr: '<i class="fas fa-spinner fa-spin"></i> Ngèrèm...',
    },
    successMsg: {
      id: "Pesan berhasil dikirim!",
      en: "Message sent successfully!",
      jp: "メッセージは正常に送信されました！",
      cn: "消息已成功发送！",
      sa: "تم إرسال الرسالة بنجاح!",
      de: "Nachricht erfolgreich gesendet!",
      mdr: "Pessen berhasil èkèrèm!",
    },
    footerCopyright: {
      id: '&copy; 2025 MOH. OFIKURRAHMAN. Dibuat dengan &lt;code&gt; dan <i class="fas fa-coffee"></i>',
      en: '&copy; 2025 MOH. OFIKURRAHMAN. Created with &lt;code&gt; and <i class="fas fa-coffee"></i>',
      jp: '&copy; 2025 MOH. OFIKURRAHMAN. &lt;code&gt; と <i class="fas fa-coffee"></i> で作成されました',
      cn: '&copy; 2025 MOH. OFIKURRAHMAN. 用 &lt;code&gt; 和 <i class="fas fa-coffee"></i> 创建',
      sa: '&copy; 2025 MOH. OFIKURRAHMAN. تم إنشاؤه باستخدام &lt;code&gt; و <i class="fas fa-coffee"></i>',
      de: '&copy; 2025 MOH. OFIKURRAHMAN. Erstellt mit &lt;code&gt; und <i class="fas fa-coffee"></i>',
      mdr: '&copy; 2025 MOH. OFIKURRAHMAN. Aghâbây kalabân &lt;code&gt; tor <i class="fas fa-coffee"></i>',
    },
    footerRole: {
      id: "Frontend Web Developer",
      en: "Frontend Web Developer",
      jp: "フロントエンドウェブ開発者",
      cn: "前端Web开发人员",
      sa: "مطور واجهات الويب الأمامية",
      de: "Frontend-Webentwickler",
      mdr: "Pangembang Web Front-end",
    },
  };

  window.setLanguage = function (lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-key]").forEach((el) => {
      const key = el.getAttribute("data-key");
      if (languageData[key] && languageData[key][lang]) {
        el.innerHTML = languageData[key][lang];
      }
    });
    document.querySelectorAll("[data-key-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-key-placeholder");
      if (languageData[key] && languageData[key][lang]) {
        el.placeholder = languageData[key][lang];
      }
    });

    const titleText = languageData.heroTitle[lang];
    typeWriterEffect(titleText);

    // Update tombol bahasa untuk menunjukkan bahasa berikutnya
    const currentLangIndex = languages.indexOf(lang);
    const nextLangIndex = (currentLangIndex + 1) % languages.length;
    const nextLang = languages[nextLangIndex];
    const langSwitcherBtn = document.getElementById("langSwitcherBtn");
    langSwitcherBtn.querySelector("span").textContent = nextLang.toUpperCase();
  };

  window.switchLanguage = function () {
    currentLangIndex = (currentLangIndex + 1) % languages.length;
    const newLang = languages[currentLangIndex];
    setLanguage(newLang);
  };

  // --- Logika Background 3D Grid dengan Three.js ---
  function initThreeJSBackground() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    const canvas = document.getElementById("bgCanvas");
    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    const size = 100;
    const divisions = 40;
    gridHelper = new THREE.GridHelper(size, divisions);
    updateGridColor();
    gridHelper.material.opacity = 0.2;
    gridHelper.material.transparent = true;
    gridHelper.rotation.x = Math.PI / 2.5;
    scene.add(gridHelper);
    camera.position.set(0, 1, 15);
    camera.lookAt(scene.position);
    window.addEventListener("scroll", updateGridOnScroll);
    animate();
    window.addEventListener("resize", onWindowResize);
  }

  function updateGridColor() {
    if (!gridHelper) return;
    const isLightTheme = document.body.getAttribute("data-theme") === "light";
    const newColor = isLightTheme
      ? new THREE.Color(0xcccccc)
      : new THREE.Color(0x004d00);
    gridHelper.material.color.set(newColor);
  }

  function updateGridOnScroll() {
    const scrollY = window.pageYOffset;
    gridHelper.position.z = scrollY * 0.02;
    gridHelper.rotation.y = scrollY * 0.00005;
  }

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  // --- FUNGSI-FUNGSI LAINNYA ---
  window.toggleTheme = function () {
    const body = document.body;
    const newTheme =
      body.getAttribute("data-theme") === "light" ? "dark" : "light";
    body.setAttribute("data-theme", newTheme);
    const icon = document.querySelector(".theme-toggle i");
    icon.className = newTheme === "light" ? "fas fa-moon" : "fas fa-sun";
    updateGridColor();
  };

  const mobileNav = document.getElementById("mobileNav");
  window.toggleMobileNav = function () {
    mobileNav.classList.toggle("active");
  };
  window.closeMobileNav = function () {
    mobileNav.classList.remove("active");
  };

  function updateActiveNav() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");
    let current = "home";
    const scrollY = window.pageYOffset;
    sections.forEach((section) => {
      if (scrollY >= section.offsetTop - 100) {
        current = section.getAttribute("id");
      }
    });
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      closeMobileNav();
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );
  document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

  window.handleSubmit = function (event) {
    event.preventDefault();
    const submitBtn = event.target.querySelector(".submit-btn");
    const currentLang = languages[currentLangIndex];
    submitBtn.innerHTML = languageData.formSendingBtn[currentLang];
    submitBtn.disabled = true;
    setTimeout(() => {
      const successMessage = document.getElementById("successMessage");
      successMessage.classList.add("show");
      event.target.reset();
      submitBtn.innerHTML = `<i class="fas fa-paper-plane"></i> <span data-key="formSubmitBtn">${languageData.formSubmitBtn[currentLang]}</span>`;
      submitBtn.disabled = false;
      setTimeout(() => successMessage.classList.remove("show"), 3000);
    }, 2000);
  };

  function typeWriterEffect(text) {
    const titleElement = document.getElementById("hero-title");
    let i = 0;
    titleElement.innerHTML = `<span class="cursor"></span>`;
    function type() {
      if (i < text.length) {
        titleElement.innerHTML =
          text.substring(0, i + 1) + `<span class="cursor"></span>`;
        i++;
        setTimeout(type, 100);
      } else {
        if (titleElement.querySelector(".cursor")) {
          titleElement.querySelector(".cursor").style.animation =
            "blink 1s infinite";
        }
      }
    }
    type();
  }

  // --- SKILLS CAROUSEL LOGIC ---
  const skillsCarousel = document.querySelector(".skills-carousel");
  const skillsTrack = document.getElementById("skillsTrack");
  let skillsPosition = 0;
  let lastScrollY = window.pageYOffset;
  let autoScrollInterval;
  let scrollTimeout;
  const skillsTrackWidth = skillsTrack.scrollWidth / 2;

  let isDragging = false;
  let startX;
  let startScrollLeft;

  function applyTransform() {
    while (skillsPosition > 0) {
      skillsPosition -= skillsTrackWidth;
    }
    while (skillsPosition <= -skillsTrackWidth) {
      skillsPosition += skillsTrackWidth;
    }
    skillsTrack.style.transform = `translateX(${skillsPosition}px)`;
  }

  function startAutoScroll() {
    stopAutoScroll();
    if (isDragging) return;
    autoScrollInterval = setInterval(() => {
      skillsPosition -= 0.5;
      applyTransform();
    }, 30);
  }

  function stopAutoScroll() {
    clearInterval(autoScrollInterval);
  }

  function updateSkillsCarouselOnScroll() {
    const currentScrollY = window.pageYOffset;
    if (currentScrollY === lastScrollY) return;
    const scrollDifference = currentScrollY - lastScrollY;
    const scrollSpeed = 0.5;
    if (scrollDifference > 0) {
      skillsPosition -= Math.abs(scrollDifference) * scrollSpeed;
    } else {
      skillsPosition += Math.abs(scrollDifference) * scrollSpeed;
    }
    applyTransform();
    lastScrollY = currentScrollY;
  }

  skillsCarousel.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.pageX - skillsCarousel.offsetLeft;
    startScrollLeft = skillsPosition;
    stopAutoScroll();
    skillsCarousel.style.cursor = "grabbing";
  });

  skillsCarousel.addEventListener("mouseleave", () => {
    if (!isDragging) return;
    isDragging = false;
    skillsCarousel.style.cursor = "grab";
    scrollTimeout = setTimeout(startAutoScroll, 1000);
  });

  skillsCarousel.addEventListener("mouseup", () => {
    if (!isDragging) return;
    isDragging = false;
    skillsCarousel.style.cursor = "grab";
    scrollTimeout = setTimeout(startAutoScroll, 1000);
  });

  skillsCarousel.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - skillsCarousel.offsetLeft;
    const walk = (x - startX) * 1.5;
    skillsPosition = startScrollLeft + walk;
    applyTransform();
  });

  skillsCarousel.addEventListener("touchstart", (e) => {
    isDragging = true;
    startX = e.touches[0].pageX - skillsCarousel.offsetLeft;
    startScrollLeft = skillsPosition;
    stopAutoScroll();
  });

  skillsCarousel.addEventListener("touchend", () => {
    if (!isDragging) return;
    isDragging = false;
    scrollTimeout = setTimeout(startAutoScroll, 1000);
  });

  skillsCarousel.addEventListener("touchcancel", () => {
    if (!isDragging) return;
    isDragging = false;
    scrollTimeout = setTimeout(startAutoScroll, 1000);
  });

  skillsCarousel.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.touches[0].pageX - skillsCarousel.offsetLeft;
    const walk = (x - startX) * 1.5;
    skillsPosition = startScrollLeft + walk;
    applyTransform();
  });

  skillsCarousel.style.cursor = "grab";

  // --- EVENT LISTENERS & INISIALISASI ---
  window.addEventListener("scroll", () => {
    updateActiveNav();
    if (!isDragging) {
      stopAutoScroll();
      updateSkillsCarouselOnScroll();
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(startAutoScroll, 1000);
    }
  });

  // Inisialisasi semua fungsi saat halaman dimuat
  initThreeJSBackground();
  updateActiveNav();
  setLanguage(languages[currentLangIndex]); // Set bahasa awal
  startAutoScroll();
});
