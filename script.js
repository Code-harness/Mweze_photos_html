// Mobile menu toggle (very small menu)
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
let menuOpen = false;
menuBtn.addEventListener("click", () => {
  menuOpen = !menuOpen;
  navLinks.style.display = menuOpen ? "flex" : "";
  navLinks.style.flexDirection = menuOpen ? "column" : "";
  navLinks.style.gap = menuOpen ? "12px" : "";
});

// Lightbox (open image in large view)
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lbClose = document.getElementById("lightboxClose");

document.getElementById("masonry").addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (!card) return;
  const img = card.querySelector("img");
  lightboxImg.src = img.src || img.dataset.src || "";
  lightboxImg.alt = img.alt || "";
  lightbox.classList.add("open");
  document.body.style.overflow = "hidden";
  lbClose.focus();
});

function closeLightbox() {
  lightbox.classList.remove("open");
  document.body.style.overflow = "";
  lightboxImg.src = "";
}
lbClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

// Basic filtering (client-side)
const chips = document.querySelectorAll(".filters .chip");
chips.forEach((chip) =>
  chip.addEventListener("click", () => {
    chips.forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    const f = chip.dataset.filter;
    document.querySelectorAll("#masonry .card").forEach((card) => {
      if (f === "*" || card.dataset.category === f) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  })
);

// Lazy loading via intersection observer (uses data-src -> src)
const lazyImgs = document.querySelectorAll("img[data-src]");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
          obs.unobserve(img);
        }
      });
    },
    { rootMargin: "200px" }
  );
  lazyImgs.forEach((i) => io.observe(i));
} else {
  // fallback: load all
  lazyImgs.forEach((img) => (img.src = img.dataset.src));
}

// Booking form simple submit (demo)
const bookingForm = document.getElementById("bookingForm");
document.getElementById("bookBtn").addEventListener("click", () => {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const date = document.getElementById("date").value;
  if (!name || !email || !date) {
    alert("Please complete name, email and date.");
    return;
  }
  // In a real site: send to backend / API here.
  alert(
    "Thanks " +
      name +
      "! We received your request. We will reach out to " +
      email +
      "."
  );
  bookingForm.reset();
});

// Accessibility: focus trap for lightbox (simple)
lightbox.addEventListener("keydown", function (e) {
  if (e.key === "Tab") {
    e.preventDefault();
    lbClose.focus();
  }
});
