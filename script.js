async function generate() {
    const prompt = document.getElementById("prompt").value;
    const style = document.getElementById("style").value;

    const finalPrompt = prompt + " " + style + " high quality";

    // مؤقت (بدون AI حقيقي)
    const imageUrl = `https://picsum.photos/seed/${Math.random()*1000}/500`;

    document.getElementById("output").src = imageUrl;
    document.getElementById("download").href = imageUrl;
}
