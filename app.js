/* =========================
   HAITHAM Professional App (FIXED)
========================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       Loader
    ========================= */

    const loader = document.getElementById("loader");

    window.addEventListener("load", () => {
        setTimeout(() => {
            if (loader) {
                loader.style.opacity = "0";
                loader.style.visibility = "hidden";
            }
        }, 800);
    });

    /* =========================
       Header Scroll
    ========================= */

    const header = document.getElementById("header");

    window.addEventListener("scroll", () => {
        if (header) {
            if (window.scrollY > 80) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        }
    });

    /* =========================
       Mobile Menu
    ========================= */

    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.getElementById("navMenu");

    if (menuBtn && navMenu) {
        menuBtn.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });

        document.querySelectorAll("#navMenu a").forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
            });
        });
    }

    /* =========================
       Hero Slider
    ========================= */

    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove("active"));
        if (slides[index]) {
            slides[index].classList.add("active");
        }
    }

    if (slides.length > 0) {
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000);
    }

    /* =========================
       Top Button
    ========================= */

    const topBtn = document.getElementById("topBtn");

    window.addEventListener("scroll", () => {
        if (topBtn) {
            topBtn.style.display = window.scrollY > 500 ? "block" : "none";
        }
    });

    if (topBtn) {
        topBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    /* =========================
       Animation On Scroll
    ========================= */

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll(
        ".card,.price-card,.testimonial,.faq-item,.stat-card"
    ).forEach(el => {
        el.classList.add("fade-up");
        observer.observe(el);
    });

    /* =========================
       LOAD JSON (FIXED CACHE ISSUE)
    ========================= */

    fetch("data.json?v=" + Date.now())
        .then(response => response.json())
        .then(data => {

            /* Site Info */
            if (data.siteName) {
                const siteName = document.getElementById("siteName");
                if (siteName) siteName.textContent = data.siteName;
            }

            if (data.heroTitle) {
                const heroTitle = document.getElementById("heroTitle");
                if (heroTitle) heroTitle.textContent = data.heroTitle;
            }

            if (data.heroDescription) {
                const heroDescription = document.getElementById("heroDescription");
                if (heroDescription) heroDescription.textContent = data.heroDescription;
            }

            /* =========================
               Stats
            ========================= */

            const statsContainer = document.getElementById("statsContainer");

            if (data.stats && statsContainer) {

                statsContainer.innerHTML = "";

                data.stats.forEach(stat => {
                    statsContainer.innerHTML += `
                        <div class="stat-card">
                            <div class="counter" data-target="${stat.number}">0</div>
                            <div class="stat-title">${stat.title}</div>
                        </div>
                    `;
                });

                startCounters();
            }

            /* =========================
               Features
            ========================= */

            const featuresContainer = document.getElementById("featuresContainer");

            if (data.features && featuresContainer) {

                featuresContainer.innerHTML = "";

                data.features.forEach(feature => {
                    featuresContainer.innerHTML += `
                        <div class="card">
                            <div class="content">
                                <h3>${feature.title}</h3>
                                <p>${feature.description}</p>
                            </div>
                        </div>
                    `;
                });

            }

        })
        .catch(error => {
            console.error("JSON Error:", error);
        });

    /* =========================
       Counter Animation
    ========================= */

    function startCounters() {

        const counters = document.querySelectorAll(".counter");

        counters.forEach(counter => {

            const target = +counter.getAttribute("data-target") || 0;
            let count = 0;
            const speed = target / 100;

            const updateCount = () => {
                if (count < target) {
                    count += speed;
                    counter.innerText = Math.floor(count).toLocaleString();
                    requestAnimationFrame(updateCount);
                } else {
                    counter.innerText = target.toLocaleString();
                }
            };

            updateCount();
        });
    }

    /* =========================
       Contact Form
    ========================= */

    const contactForm = document.querySelector(".contact-form");

    if (contactForm) {

        contactForm.addEventListener("submit", e => {
            e.preventDefault();

            const button = contactForm.querySelector("button");

            if (button) {
                button.innerHTML = "✓ تم إرسال الرسالة";
                button.disabled = true;

                setTimeout(() => {
                    button.innerHTML = "إرسال الرسالة";
                    button.disabled = false;
                    contactForm.reset();
                }, 3000);
            }
        });

    }

    /* =========================
       Lazy Loading Images
    ========================= */

    document.querySelectorAll("img").forEach(img => {
        img.setAttribute("loading", "lazy");
    });

    /* =========================
       Footer Year
    ========================= */

    const footerText = document.querySelector("footer p");

    if (footerText) {
        footerText.innerHTML =
            `© ${new Date().getFullYear()} HAITHAM جميع الحقوق محفوظة`;
    }

});
