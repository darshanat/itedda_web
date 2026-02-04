// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Fade in animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Header background change on scroll
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (window.scrollY > 100) {
    header.style.background = "rgba(0, 0, 0, 0.95)";
  } else {
    header.style.background = "rgba(0, 0, 0, 0.9)";
  }
});

// Form submission
document
  .querySelector(".contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const button = this.querySelector(".submit-btn");
    const originalText = button.textContent;

    button.textContent = "Sending...";
    button.style.background = "#666";

    // Simulate form submission
    setTimeout(() => {
      button.textContent = "Message Sent!";
      button.style.background = "linear-gradient(45deg, #00ff88, #00d4ff)";

      setTimeout(() => {
        button.textContent = originalText;
        this.reset();
      }, 2000);
    }, 1000);
  });

// Portfolio item click effect
document.querySelectorAll(".portfolio-item").forEach((item) => {
  item.addEventListener("click", function () {
    this.style.transform = "scale(1.05) rotateY(5deg)";
    setTimeout(() => {
      this.style.transform = "scale(1)";
    }, 200);
  });
});
