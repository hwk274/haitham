let score = 0;
let level = 1;

const animals = [
    {emoji:"🐄", name:"البقرة"},
    {emoji:"🐴", name:"الحصان"},
    {emoji:"🐦", name:"العصفور"},
    {emoji:"🐪", name:"الجمل"}
];

let index = 0;

function speak(text){
    let msg = new SpeechSynthesisUtterance(text);
    msg.lang = "ar-SA";
    speechSynthesis.speak(msg);
}

function load(){
    document.getElementById("animal").innerText = animals[index].emoji;
    document.getElementById("name").innerText = animals[index].name;
    document.getElementById("msg").innerText = "";
}

function answer(correct){
    if(correct){
        score++;
        document.getElementById("msg").innerText = "🎉 ممتاز!";
        speak("ممتاز");

        if(score % 3 === 0){
            level++;
            document.getElementById("level").innerText = level;
        }

    } else {
        document.getElementById("msg").innerText = "❌ حاول مرة أخرى";
        speak("حاول مرة أخرى");
    }

    document.getElementById("score").innerText = score;
}

function next(){
    index = (index + 1) % animals.length;
    load();
}

load();
