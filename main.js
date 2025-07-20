document.addEventListener("DOMContentLoaded", function () {
  // --- DEKLARASI VARIABEL GLOBAL UNTUK THREE.JS ---
  let scene, camera, renderer, gridHelper;

  // --- DAFTAR SKILL DENGAN LOGO ---
  const skillsList = [
    { name: "HTML5", icon: "devicon-html5-plain" },
    { name: "CSS3", icon: "devicon-css3-plain" },
    { name: "JavaScript", icon: "devicon-javascript-plain" },
    { name: "React.js", icon: "devicon-react-original" },
    { name: "Vue.js", icon: "devicon-vuejs-plain" },
    { name: "TypeScript", icon: "devicon-typescript-plain" },
    { name: "Node.js", icon: "devicon-nodejs-plain" },
    { name: "Sass/SCSS", icon: "devicon-sass-original" },
    { name: "Tailwind CSS", icon: "devicon-tailwindcss-plain" },
    { name: "Bootstrap", icon: "devicon-bootstrap-plain" },
    { name: "Webpack", icon: "devicon-webpack-plain" },
    { name: "Git", icon: "devicon-git-plain" },
    { name: "Responsive Design", icon: "fas fa-mobile-alt" },
    { name: "REST API", icon: "fas fa-cogs" },
  ];

  // --- SISTEM BAHASA ---
  let currentLang = "id"; // Bahasa default
  const languageData = {
    heroTitle: { id: "MOH. OFIKURRAHMAN_", en: "MOH. OFIKURRAHMAN_" },
    logoTextDesktop: { id: "PORTFOLIO.exe", en: "PORTFOLIO.exe" },
    logoTextMobile: { id: "PORTFOLIO", en: "PORTFOLIO" },
    navHome: { id: "Home", en: "Home" },
    navSkills: { id: "Skills", en: "Skills" },
    navProjects: { id: "Proyek", en: "Projects" },
    navContact: { id: "Kontak", en: "Contact" },
    navHomeMobile: { id: "Home", en: "Home" },
    navSkillsMobile: { id: "Skills", en: "Skills" },
    navProjectsMobile: { id: "Proyek", en: "Projects" },
    navContactMobile: { id: "Kontak", en: "Contact" },
    heroSubtitle: {
      id: "Front-End Web Developer",
      en: "Front-End Web Developer",
    },
    heroDesc1: {
      id: "Mengembangkan pengalaman website yang elegan dan fungsional dengan teknologi modern dan desain yang responsif.",
      en: "Developing elegant and functional website experiences with modern technology and responsive design.",
    },
    btnViewPortfolio: { id: "Lihat Portfolio", en: "View Portfolio" },
    btnDownloadCV: { id: "Download CV", en: "Download CV" },
    btnContactMe: { id: "Hubungi Saya", en: "Contact Me" },
    skillsTitle: {
      id: "&gt; Keahlian Teknis",
      en: "&gt; Technical Skills",
    },
    projectsTitle: {
      id: "&gt; Proyek Unggulan",
      en: "&gt; Featured Projects",
    },
    project1Title: {
      id: '<i class="fas fa-shopping-cart"></i> Platform E-Commerce',
      en: '<i class="fas fa-shopping-cart"></i> E-Commerce Platform',
    },
    project1Desc: {
      id: "Platform e-commerce modern dengan React.js dan Node.js. Fitur lengkap termasuk keranjang belanja, sistem pembayaran, dan dashboard admin yang responsif.",
      en: "Modern e-commerce platform with React.js and Node.js. Full features including shopping cart, payment system, and a responsive admin dashboard.",
    },
    project2Title: {
      id: '<i class="fas fa-globe"></i> Website Portfolio',
      en: '<i class="fas fa-globe"></i> Portfolio Website',
    },
    project2Desc: {
      id: "Website portfolio responsif dengan animasi smooth dan desain modern. Dioptimalkan untuk SEO dan performa tinggi dengan skor Lighthouse 95+.",
      en: "Responsive portfolio website with smooth animations and modern design. Optimized for SEO and high performance with a Lighthouse score of 95+.",
    },
    project3Title: {
      id: '<i class="fas fa-tasks"></i> Aplikasi Manajemen Tugas',
      en: '<i class="fas fa-tasks"></i> Task Management App',
    },
    project3Desc: {
      id: "Aplikasi manajemen tugas dengan drag & drop, pembaruan real-time, dan kolaborasi tim. Antarmuka yang intuitif dan ramah pengguna.",
      en: "Task management application with drag & drop, real-time updates, and team collaboration. Intuitive and user-friendly interface.",
    },
    contactTitle: { id: "&gt; Hubungi Saya", en: "&gt; Get In Touch" },
    contactSubtitle: {
      id: "Mari berkolaborasi untuk menciptakan pengalaman web yang luar biasa.",
      en: "Let's collaborate to create amazing web experiences.",
    },
    contactEmail: {
      id: '<i class="fas fa-envelope"></i> Email',
      en: '<i class="fas fa-envelope"></i> Email',
    },
    formTitle: {
      id: '<i class="fas fa-paper-plane"></i> Kirim Pesan',
      en: '<i class="fas fa-paper-plane"></i> Send Message',
    },
    formLabelName: {
      id: '<i class="fas fa-user"></i> Nama Lengkap *',
      en: '<i class="fas fa-user"></i> Full Name *',
    },
    formPlaceholderName: {
      id: "Masukkan nama lengkap Anda",
      en: "Enter your full name",
    },
    formLabelEmail: {
      id: '<i class="fas fa-envelope"></i> Email *',
      en: '<i class="fas fa-envelope"></i> Email *',
    },
    formPlaceholderEmail: { id: "nama@email.com", en: "name@email.com" },
    formLabelSubject: {
      id: '<i class="fas fa-tag"></i> Subjek',
      en: '<i class="fas fa-tag"></i> Subject',
    },
    formPlaceholderSubject: {
      id: "Subjek pesan (opsional)",
      en: "Message subject (optional)",
    },
    formLabelMessage: {
      id: '<i class="fas fa-comment"></i> Pesan *',
      en: '<i class="fas fa-comment"></i> Message *',
    },
    formPlaceholderMessage: {
      id: "Tulis pesan Anda di sini...",
      en: "Write your message here...",
    },
    formSubmitBtn: { id: "Kirim Pesan", en: "Send Message" },
    formSendingBtn: {
      id: '<i class="fas fa-spinner fa-spin"></i> Mengirim...',
      en: '<i class="fas fa-spinner fa-spin"></i> Sending...',
    },
    successMsg: {
      id: "Pesan berhasil dikirim!",
      en: "Message sent successfully!",
    },
    footerCopyright: {
      id: '&copy; 2025 MOH. OFIKURRAHMAN. Dibuat dengan &lt;code&gt; dan <i class="fas fa-coffee"></i>',
      en: '&copy; 2025 MOH. OFIKURRAHMAN. Created with &lt;code&gt; and <i class="fas fa-coffee"></i>',
    },
    footerRole: {
      id: "Front-End Web Developer",
      en: "Front-End Web Developer",
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

    const langSwitcherBtn = document.getElementById("langSwitcherBtn");
    langSwitcherBtn.querySelector("span").textContent =
      lang === "id" ? "EN" : "ID";
  };

  window.switchLanguage = function () {
    currentLang = currentLang === "id" ? "en" : "id";
    setLanguage(currentLang);
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

  function populateSkills() {
    skillsTrack.innerHTML = "";
    const fragment = document.createDocumentFragment();
    // Tambahkan dua kali untuk efek loop
    for (let i = 0; i < 2; i++) {
      skillsList.forEach((skill) => {
        const skillDiv = document.createElement("div");
        skillDiv.className = "skill-item";
        skillDiv.innerHTML = `<i class="${skill.icon}"></i><span>${skill.name}</span>`;
        fragment.appendChild(skillDiv);
      });
    }
    skillsTrack.appendChild(fragment);
  }

  let skillsPosition = 0;
  let lastScrollY = window.pageYOffset;
  let autoScrollInterval;
  let scrollTimeout;
  let skillsTrackWidth = 0;

  function updateSkillsTrackWidth() {
    skillsTrackWidth = skillsTrack.scrollWidth / 2;
  }

  let isDragging = false;
  let startX;
  let startScrollLeft;

  function applyTransform() {
    if (skillsTrackWidth > 0) {
      while (skillsPosition > 0) {
        skillsPosition -= skillsTrackWidth;
      }
      while (skillsPosition <= -skillsTrackWidth) {
        skillsPosition += skillsTrackWidth;
      }
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
  populateSkills(); // Buat item skill
  updateSkillsTrackWidth(); // Hitung lebar track setelah item dibuat
  updateActiveNav();
  setLanguage(currentLang); // Set bahasa awal
  startAutoScroll();
});
