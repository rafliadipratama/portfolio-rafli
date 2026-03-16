// ========= 0. Preloader ===========
window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add("hidden");
      setTimeout(() => preloader.remove(), 500);
    }, 800);
  }
});

// ========= 1. Hero Typing Effect ===========
document.addEventListener("DOMContentLoaded", function () {
  const texts = [
    "Fullstack Developer",
    "Laravel & Alpine.js Expert",
    "React Enthusiast",
    "Problem Solver & Fast Learner",
  ];
  let count = 0;
  let index = 0;
  let currentText = "";
  let letter = "";
  let isDeleting = false;

  function type() {
    if (count === texts.length) count = 0;
    currentText = texts[count];

    if (isDeleting) {
      letter = currentText.slice(0, --index);
    } else {
      letter = currentText.slice(0, ++index);
    }

    document.getElementById("typed-text").textContent = letter;

    if (!isDeleting && index === currentText.length) {
      isDeleting = true;
      setTimeout(type, 1500);
      return;
    }

    if (isDeleting && index === 0) {
      isDeleting = false;
      count++;
      setTimeout(type, 300);
      return;
    }

    setTimeout(type, isDeleting ? 40 : 80);
  }

  type();
});

// ========= 2. Mobile Navbar Toggle ===========
const navToggle = document.getElementById("nav-toggle");
const mobileMenu = document.getElementById("mobile-menu");

if (navToggle && mobileMenu) {
  navToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });
}

// ========= 3. Navbar Scroll Effect ===========
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ========== 4. ScrollSpy Highlight ==========
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
});

// ========== 5. Back to Top Button ==========
const backToTop = document.getElementById("back-to-top");

if (backToTop) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ========== 6. Image Modal ==========
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  const closeModal = document.getElementById("closeModal");

  document.querySelectorAll(".open-modal").forEach((el) => {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      const imgSrc = el.getAttribute("data-src");
      modalImage.src = imgSrc;
      modal.classList.remove("hidden");
      requestAnimationFrame(() => {
        modal.classList.add("show");
      });
    });
  });

  function closeModalFn() {
    modal.classList.remove("show");
    setTimeout(() => {
      modal.classList.add("hidden");
      modalImage.src = "";
    }, 300);
  }

  closeModal.addEventListener("click", closeModalFn);

  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModalFn();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModalFn();
    }
  });
});

// ========== 7. Counter Animation ==========
function animateCounters() {
  const counters = document.querySelectorAll(".counter");

  counters.forEach((counter) => {
    const target = parseFloat(counter.getAttribute("data-target"));
    const suffix = counter.getAttribute("data-suffix") || "";
    const isDecimal = counter.getAttribute("data-decimal") === "true";
    const duration = 2000;
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = target * easeOut;

      if (isDecimal) {
        counter.textContent = current.toFixed(2);
      } else {
        counter.textContent = Math.floor(current) + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = isDecimal ? target.toFixed(2) : target + suffix;
      }
    }

    requestAnimationFrame(updateCounter);
  });
}

// Trigger counter when About section is visible
const aboutSection = document.getElementById("about");
let counterStarted = false;

if (aboutSection) {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !counterStarted) {
          counterStarted = true;
          animateCounters();
        }
      });
    },
    { threshold: 0.3 }
  );
  counterObserver.observe(aboutSection);
}

// ========== 8. 3D Tilt Effect on Cards ==========
document.addEventListener("DOMContentLoaded", function () {
  const tiltCards = document.querySelectorAll(".project-card, .stat-card, .cert-card");

  tiltCards.forEach((card) => {
    card.classList.add("tilt-card");
    card.style.position = "relative";
    card.style.overflow = "hidden";

    const shine = document.createElement("div");
    shine.classList.add("tilt-shine");
    card.appendChild(shine);

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      shine.style.setProperty("--mouse-x", `${(x / rect.width) * 100}%`);
      shine.style.setProperty("--mouse-y", `${(y / rect.height) * 100}%`);
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
    });
  });
});

// ========== 9. Smooth Reveal on Scroll ==========
document.addEventListener("DOMContentLoaded", function () {
  const revealElements = document.querySelectorAll(
    ".edu-card, .stat-card, .skill-item, .cert-card, .timeline-item, .contact-card"
  );

  revealElements.forEach((el) => el.classList.add("reveal"));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
  );

  revealElements.forEach((el) => revealObserver.observe(el));
});

// ========== 10. Project Filter ==========
document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");

      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      projectCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        if (filter === "all" || category === filter) {
          card.classList.remove("hide");
        } else {
          card.classList.add("hide");
        }
      });
    });
  });
});
