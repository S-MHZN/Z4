// Smooth scrolling and active nav link
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section");

  // Update active nav link on scroll
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").slice(1) === current) {
        link.classList.add("active");
      }
    });
  });

  // Contact form handling
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Get form data
      const formData = new FormData(contactForm);
      const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        company: formData.get("company"),
        service: formData.get("service"),
        message: formData.get("message"),
      };

      try {
        // Send data to server
        const response = await fetch("/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (result.success) {
          alert("Thank you for your message! I will get back to you soon.");
          contactForm.reset();
        } else {
          alert("Error sending message. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error sending message. Please try again.");
      }
    });
  }

  // Advanced 3D mouse tracking for cards
  const cards = document.querySelectorAll(
    ".skill-card, .project-card, .service-box, .stat-item, .profile-card, .profile-placeholder",
  );

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05) translateZ(30px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(1200px) rotateX(0) rotateY(0) scale(1) translateZ(0)";
    });
  });

  // Add animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform =
          "translateY(0) rotateX(0) rotateY(0) scale(1)";
      }
    });
  }, observerOptions);

  document
    .querySelectorAll(".skill-card, .project-card, .service-box")
    .forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px) rotateX(15deg)";
      el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      observer.observe(el);
    });

  // Mobile menu toggle (if needed in future)
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", () => {
      const navMenu = document.querySelector(".nav-menu");
      navMenu.classList.toggle("active");
    });
  }
});

// Parallax effect for hero section with 3D depth
window.addEventListener("scroll", () => {
  const hero = document.querySelector(".hero");
  if (hero) {
    const scrollPosition = window.pageYOffset;
    hero.style.transform = `translateY(${scrollPosition * 0.5}px) rotateX(${scrollPosition * 0.01}deg)`;
  }
});

// Mouse cursor 3D effect
document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth) * 100;
  const y = (e.clientY / window.innerHeight) * 100;

  // Subtle background shift based on mouse position
  const body = document.body;
  const lightX = (e.clientX / window.innerWidth) * 20 - 10;
  const lightY = (e.clientY / window.innerHeight) * 20 - 10;

  // Create dynamic lighting effect on elements
  const cards = document.querySelectorAll(
    ".skill-card, .project-card, .service-box",
  );
  cards.forEach((card) => {
    const rect = card.getBoundingClientRect();
    const cardX = rect.left + rect.width / 2;
    const cardY = rect.top + rect.height / 2;

    const angle = Math.atan2(e.clientY - cardY, e.clientX - cardX);
    const distance = Math.sqrt(
      Math.pow(e.clientX - cardX, 2) + Math.pow(e.clientY - cardY, 2),
    );

    if (distance < 400) {
      const intensity = (1 - distance / 400) * 20;
      card.style.boxShadow = `0 0 ${intensity * 2}px ${intensity}px rgba(102, 126, 234, ${(1 - distance / 400) * 0.5})`;
    }
  });
});

// Add tilt effect to hero content
const heroContent = document.querySelector(".hero-content");
if (heroContent) {
  document.addEventListener("mousemove", (e) => {
    if (window.innerWidth > 768) {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;

      heroContent.style.transform = `perspective(1000px) rotateX(${y * 5}deg) rotateY(${x * 5}deg)`;
    }
  });

  document.addEventListener("mouseleave", () => {
    heroContent.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
  });
}
