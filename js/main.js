// main.js

// ========= 1. Hero Typing Effect ===========
document.addEventListener("DOMContentLoaded", function () {
  const texts = [
    "Laravel Developer",
    "React Enthusiast",
    "Fullstack Web Developer",
  ];
  let count = 0;
  let index = 0;
  let currentText = "";
  let letter = "";

  function type() {
    if (count === texts.length) count = 0;
    currentText = texts[count];
    letter = currentText.slice(0, ++index);

    document.getElementById("typed-text").textContent = letter;

    if (letter.length === currentText.length) {
      count++;
      index = 0;
      setTimeout(type, 1500);
    } else {
      setTimeout(type, 100);
    }
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
}

// ========== 3. ScrollSpy Highlight ==========
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 80;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("text-orange-500", "font-semibold");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("text-orange-500", "font-semibold");
        }
      });
    }
  });
});

// Efek Ketik di Hero Section
const typewriter = document.querySelector(".typewriter");
const texts = [
  "Web Developer",
  "Laravel & React Enthusiast",
  "Problem Solver & Fast Learner",
];
let index = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  if (!typewriter) return;
  const current = texts[index];
  let text = current.substring(0, charIndex);
  typewriter.textContent = text;

  if (!isDeleting) {
    charIndex++;
    if (charIndex > current.length) {
      isDeleting = true;
      setTimeout(type, 1500);
      return;
    }
  } else {
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      index = (index + 1) % texts.length;
    }
  }
  setTimeout(type, isDeleting ? 50 : 100);
}
type();

// Filter Proyek
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    // Remove active class
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    projectCards.forEach((card) => {
      if (filter === "all" || card.classList.contains(filter)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});
