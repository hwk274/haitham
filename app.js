let score=0;
let level=1;
let i=0;

const data=[
{emoji:"🐄",name:"البقرة"},
{emoji:"🐴",name:"الحصان"},
{emoji:"🐪",name:"الجمل"},
{emoji:"🐦",name:"العصفور"}
];

function load(){
document.getElementById("animal").innerText=data[i].emoji;
document.getElementById("name").innerText=data[i].name;
document.getElementById("msg").innerText="";
}

function speak(text){
let s=new SpeechSynthesisUtterance(text);
s.lang="ar-SA";
speechSynthesis.speak(s);
}

function answer(ok){
if(ok){
score++;
document.getElementById("msg").innerText="🎉 ممتاز!";
speak("ممتاز");

if(score%3===0){
level++;
document.getElementById("level").innerText=level;
}
}else{
document.getElementById("msg").innerText="❌ حاول مرة أخرى";
speak("حاول مرة أخرى");
}

document.getElementById("score").innerText=score;
}

function next(){
i=(i+1)%data.length;
load();
}

load();

/* زر التثبيت PWA */
let deferredPrompt;
const btn=document.getElementById("installBtn");

window.addEventListener("beforeinstallprompt",(e)=>{
e.preventDefault();
deferredPrompt=e;
btn.style.display="block";

btn.addEventListener("click",()=>{
deferredPrompt.prompt();
deferredPrompt.userChoice.then(()=>{
deferredPrompt=null;
});
});
});
