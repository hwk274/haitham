fetch("data.json")
.then(res => res.json())
.then(data => {

    document.title = data.siteName;

    document.getElementById("siteName").textContent = data.siteName;
    document.getElementById("heroTitle").textContent = data.heroTitle;
    document.getElementById("heroDescription").textContent = data.heroDescription;

    document.getElementById("phone").textContent = data.phone;
    document.getElementById("email").textContent = data.email;

    /* المميزات */

    let features = "";

    data.features.forEach(item => {
        features += `
        <div class="card">
            <img src="${item.image}">
            <div class="content">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        </div>
        `;
    });

    document.getElementById("features").innerHTML = features;

    /* القوالب */

    let templates = "";

    data.templates.forEach(item => {
        templates += `
        <div class="card">
            <img src="${item.image}">
            <div class="content">
                <h3>${item.title}</h3>
            </div>
        </div>
        `;
    });

    document.getElementById("templates").innerHTML = templates;

    /* الإحصائيات */

    let stats = "";

    data.stats.forEach((item,index)=>{

        stats += `
        <div class="stat-card">
            <div class="counter"
                 data-target="${item.value}"
                 data-suffix="${item.suffix}">
                 0
            </div>

            <div class="stat-title">
                ${item.title}
            </div>
        </div>
        `;
    });

    document.getElementById("stats").innerHTML = stats;

    startCounters();

});


function startCounters(){

    const counters =
    document.querySelectorAll(".counter");

    counters.forEach(counter=>{

        const target =
        +counter.dataset.target;

        const suffix =
        counter.dataset.suffix;

        let count = 0;

        const speed =
        Math.max(1,Math.ceil(target/100));

        const update = ()=>{

            count += speed;

            if(count < target){

                counter.textContent =
                count + suffix;

                requestAnimationFrame(update);

            }else{

                counter.textContent =
                target + suffix;
            }
        };

        update();

    });

}
