fetch("data.json")
.then(response => response.json())
.then(data => {

    document.getElementById("siteName").textContent = data.siteName;
    document.getElementById("siteDesc").textContent = data.description;

    document.getElementById("phone").textContent = data.phone;
    document.getElementById("email").textContent = data.email;

    let featuresHTML = "";

    data.features.forEach(feature => {
        featuresHTML += `
        <div class="card">
            <img src="${feature.image}">
            <h3>${feature.title}</h3>
            <p>${feature.description}</p>
        </div>
        `;
    });

    document.getElementById("features").innerHTML = featuresHTML;
});
