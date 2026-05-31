// ===============================
// SiteBuilder App
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    // تحميل البيانات
    fetch("data.json")
    .then(response => response.json())
    .then(data => {

        loadSiteInfo(data);
        loadFeatures(data.features);
        loadTemplates(data.templates);
        loadStats(data.stats);

        setTimeout(() => {
            startCounters();
        }, 300);

    })
    .catch(error => {
        console.error("خطأ في تحميل data.json:", error);
    });

    startSlider();
    scrollAnimations();

});


// ===============================
// معلومات الموقع
// ===============================

function loadSiteInfo(data){

    const siteName =
    document.getElementById("siteName");

    const heroTitle =
    document.getElementById("heroTitle");

    const heroDescription =
    document.getElementById("heroDescription");

    if(siteName)
        siteName.textContent = data.siteName;

    if(heroTitle)
        heroTitle.textContent = data.heroTitle;

    if(heroDescription)
        heroDescription.textContent =
        data.heroDescription;

}


// ===============================
// المميزات
// ===============================

function loadFeatures(features){

    const container =
    document.getElementById("featuresContainer");

    if(!container) return;

    let html = "";

    features.forEach(feature => {

        html += `
        <div class="card hidden">

            <img
            src="${feature.image}"
            alt="${feature.title}"
            loading="lazy">

            <div class="content">

                <h3>${feature.title}</h3>

                <p>${feature.description}</p>

            </div>

        </div>
        `;

    });

    container.innerHTML = html;

    observeElements();
}


// ===============================
// القوالب
// ===============================

function loadTemplates(templates){

    const container =
    document.getElementById("templatesContainer");

    if(!container) return;

    let html = "";

    templates.forEach(template => {

        html += `
        <div class="card hidden">

            <img
            src="${template.image}"
            alt="${template.title}"
            loading="lazy">

            <div class="content">

                <h3>${template.title}</h3>

            </div>

        </div>
        `;

    });

    container.innerHTML = html;

    observeElements();
}


// ===============================
// الإحصائيات
// ===============================

function loadStats(stats){

    const container =
    document.getElementById("stats");

    if(!container) return;

    let html = "";

    stats.forEach(stat => {

        html += `
        <div class="stat-card hidden">

            <div
                class="counter"
                data-target="${stat.value}"
                data-suffix="${stat.suffix}">
                0
            </div>

            <div class="stat-title">
                ${stat.title}
            </div>

        </div>
        `;

    });

    container.innerHTML = html;

    observeElements();
}


// ===============================
// العدادات المتحركة
// ===============================

function startCounters(){

    const counters =
    document.querySelectorAll(".counter");

    counters.forEach(counter => {

        const target =
        parseInt(counter.dataset.target);

        const suffix =
        counter.dataset.suffix || "";

        let current = 0;

        const increment =
        Math.max(1, Math.ceil(target / 120));

        const updateCounter = () => {

            current += increment;

            if(current < target){

                counter.textContent =
                current.toLocaleString() + suffix;

                requestAnimationFrame(updateCounter);

            }else{

                counter.textContent =
                target.toLocaleString() + suffix;
            }

        };

        updateCounter();

    });

}


// ===============================
// السلايدر
// ===============================

function startSlider(){

    const slides =
    document.querySelectorAll(".slide");

    if(slides.length === 0) return;

    let current = 0;

    setInterval(() => {

        slides[current]
        .classList.remove("active");

        current++;

        if(current >= slides.length){
            current = 0;
        }

        slides[current]
        .classList.add("active");

    }, 5000);

}


// ===============================
// ظهور العناصر أثناء التمرير
// ===============================

function observeElements(){

    const hiddenElements =
    document.querySelectorAll(".hidden");

    const observer =
    new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if(entry.isIntersecting){

                entry.target.classList.add("show");

            }

        });

    },{
        threshold:0.15
    });

    hiddenElements.forEach(el => {
        observer.observe(el);
    });

}


// ===============================
// تفعيل التأثيرات
// ===============================

function scrollAnimations(){

    observeElements();

}


// ===============================
// تنعيم الانتقال بين الأقسام
// ===============================

document.querySelectorAll('a[href^="#"]')
.forEach(anchor => {

    anchor.addEventListener("click", function(e){

        e.preventDefault();

        const target =
        document.querySelector(
            this.getAttribute("href")
        );

        if(target){

            window.scrollTo({
                top:
                target.offsetTop - 70,
                behavior:"smooth"
            });

        }

    });

});
