/* =====================================================
   SOEHENDRA & RICA RISMAWATI - WEDDING INVITATION
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initGuestName();
    initCountdown();
    initRSVP();
    initMusicButton();
    initBackToTop();
    initAOS();
});

/* =====================================================
   OPEN INVITATION
===================================================== */
function openInvitation() {
    document.querySelector(".hero").style.display = "none";
    document.getElementById("content").style.display = "block";
}

/* =====================================================
   CONFETTI
===================================================== */
function launchConfetti() {
    if (typeof confetti === "undefined") return;

    confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 }
    });

    setTimeout(() => {
        confetti({
            particleCount: 100,
            spread: 120,
            origin: { y: 0.5 }
        });
    }, 300);
}

/* =====================================================
   GUEST NAME (?to=Nama)
===================================================== */
function initGuestName() {
    const guestElement = document.getElementById("guestName");
    if (!guestElement) return;

    const params = new URLSearchParams(window.location.search);
    const guest = params.get("to");

    if (guest) {
        guestElement.innerHTML =
            `Kepada Yth.<br>${decodeURIComponent(guest)}`;
    }
}

/* =====================================================
   COUNTDOWN
===================================================== */
function initCountdown() {
    const weddingDate = new Date("2027-07-07T09:00:00").getTime();

    function updateCountdown() {
        const now = Date.now();
        const diff = weddingDate - now;

        if (diff <= 0) {
            setCountdownValue("days", 0);
            setCountdownValue("hours", 0);
            setCountdownValue("minutes", 0);
            setCountdownValue("seconds", 0);
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        setCountdownValue("days", days);
        setCountdownValue("hours", hours);
        setCountdownValue("minutes", minutes);
        setCountdownValue("seconds", seconds);
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

function setCountdownValue(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
}

/* =========================
   COPY REKENING (FIX + NOTIF)
========================= */

function copyRekening(number) {
    navigator.clipboard.writeText(number).then(() => {

        // notifikasi kecil (lebih bagus dari alert)
        const toast = document.createElement("div");
        toast.textContent = "Nomor berhasil disalin";
        toast.style.position = "fixed";
        toast.style.bottom = "30px";
        toast.style.left = "50%";
        toast.style.transform = "translateX(-50%)";
        toast.style.background = "#1f1f1f";
        toast.style.color = "white";
        toast.style.padding = "12px 20px";
        toast.style.borderRadius = "50px";
        toast.style.boxShadow = "0 10px 25px rgba(0,0,0,.2)";
        toast.style.zIndex = "9999";

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 2000);

    });
}

/* =========================
   REKENING SLIDER FIX
========================= */

function scrollRekening(direction) {
    const slider = document.getElementById("rekeningSlider");
    if (!slider) return;

    const amount = 340;

    slider.scrollBy({
        left: direction * amount,
        behavior: "smooth"
    });
}

/* =====================================================
   RSVP WHATSAPP
===================================================== */

function initRSVP() {

    const form = document.getElementById("rsvpForm");

    if (!form) return;

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const nama =
            document.getElementById("nama").value.trim();

        const status =
            document.getElementById("status").value;

        const jumlahTamu =
            document.getElementById("jumlahTamu").value || 1;

        const ucapan =
            document.getElementById("ucapan").value.trim();

        const nomorWA = "6285810273385";

        const pesan =
`Assalamu'alaikum Wr. Wb.

Konfirmasi Kehadiran Pernikahan

Nama : ${nama}
Kehadiran : ${status}
Jumlah Tamu : ${jumlahTamu}

Ucapan & Doa :
${ucapan}

Terima kasih.`;

        const waUrl =
            `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`;

        window.open(waUrl, "_blank");

        form.reset();

    });

}

/* =====================================================
   MUSIC BUTTON
===================================================== */
function initMusicButton() {
    const musicButton = document.getElementById("musicToggle");
    const music = document.getElementById("music");

    if (!musicButton || !music) return;

    let isPlaying = false;

    musicButton.addEventListener("click", () => {
        if (isPlaying) {
            music.pause();
            musicButton.innerHTML = "♫";
            isPlaying = false;
        } else {
            music.play();
            musicButton.innerHTML = "❚❚";
            isPlaying = true;
        }
    });
}

/* =====================================================
   BACK TO TOP
===================================================== */
function initBackToTop() {
    const button = document.getElementById("backToTop");
    if (!button) return;

    window.addEventListener("scroll", () => {
        button.style.display = window.scrollY > 400 ? "block" : "none";
    });
}

function scrollTopPage() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

/* =====================================================
   AOS ANIMATION
===================================================== */
function initAOS() {
    if (typeof AOS === "undefined") return;

    AOS.init({
        duration: 1000,
        once: true,
        offset: 80
    });
}

/* ==========================================================
   GUEST NAME
========================================================== */

function initGuestName(){

    const guest=document.getElementById("guestName");

    if(!guest) return;

    const params=new URLSearchParams(window.location.search);

    const name=params.get("to");

    if(name){

        guest.innerHTML=

        `Kepada Yth.<br><strong>${decodeURIComponent(name)}</strong>`;

    }

}

/* ==========================================================
   COUNTDOWN
========================================================== */

function initCountdown(){

    const target=new Date("2027-07-07T09:00:00").getTime();

    update();

    setInterval(update,1000);

    function update(){

        const now=new Date().getTime();

        const distance=target-now;

        if(distance<=0){

            setValue("days",0);

            setValue("hours",0);

            setValue("minutes",0);

            setValue("seconds",0);

            return;

        }

        const days=Math.floor(distance/86400000);

        const hours=Math.floor((distance%86400000)/3600000);

        const minutes=Math.floor((distance%3600000)/60000);

        const seconds=Math.floor((distance%60000)/1000);

        animateNumber("days",days);

        animateNumber("hours",hours);

        animateNumber("minutes",minutes);

        animateNumber("seconds",seconds);

    }

}

function setValue(id,val){

    const el=document.getElementById(id);

    if(el){

        el.textContent=val;

    }

}

function animateNumber(id,newValue){

    const el=document.getElementById(id);

    if(!el) return;

    if(el.dataset.value==newValue) return;

    el.dataset.value=newValue;

    el.style.transform="scale(1.15)";

    el.style.opacity=".6";

    setTimeout(()=>{

        el.textContent=newValue;

        el.style.transform="scale(1)";

        el.style.opacity="1";

    },120);

}

/* ==========================================================
   COPY REKENING
========================================================== */

function copyRekening(number){

    navigator.clipboard.writeText(number)

    .then(()=>{

        showToast("Nomor rekening berhasil disalin");

    })

    .catch(()=>{

        showToast("Gagal menyalin nomor");

    });

}

/* ==========================================================
   TOAST
========================================================== */

function showToast(message){

    const toast=document.getElementById("toast");

    if(!toast) return;

    toast.textContent=message;

    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer=setTimeout(()=>{

        toast.classList.remove("show");

    },2500);

}

/* ==========================================================
   SLIDER REKENING
========================================================== */

function scrollRekening(direction){

    const slider=document.getElementById("rekeningSlider");

    if(!slider) return;

    slider.scrollBy({

        left:direction*360,

        behavior:"smooth"

    });

}

/* ==========================================================
   RSVP
========================================================== */

function initRSVP(){

    const form=document.getElementById("rsvpForm");

    const wishList=document.getElementById("wishList");

    if(!form||!wishList) return;

    loadWish();

    form.addEventListener("submit",function(e){

        e.preventDefault();

        const nama=document.getElementById("nama").value.trim();

        const status=document.getElementById("status").value;

        const jumlah=document.getElementById("jumlahTamu").value||1;

        const ucapan=document.getElementById("ucapan").value.trim();

        const data={

            nama,

            status,

            jumlah,

            ucapan,

            waktu:new Date().toLocaleString("id-ID")

        };

        saveWish(data);

        renderWish(data);

        updateStatistic();

        sendWhatsapp(data);

        showToast("Terima kasih atas konfirmasinya ❤️");

        form.reset();

    });

}

/* ==========================================================
   LOCAL STORAGE
========================================================== */

function getWishData(){

    return JSON.parse(

        localStorage.getItem("weddingWish")||"[]"

    );

}

function saveWish(data){

    const list=getWishData();

    list.unshift(data);

    localStorage.setItem(

        "weddingWish",

        JSON.stringify(list)

    );

}

function loadWish(){

    const list=getWishData();

    document.getElementById("wishList").innerHTML="";

    list.forEach(renderWish);

    updateStatistic();

}

/* ==========================================================
   RENDER UCAPAN
========================================================== */

function renderWish(item){

    const box=document.createElement("div");

    box.className="wish-item";

    box.innerHTML=`

        <strong>${item.nama}</strong>

        <small>

        ${item.status}
        •
        ${item.jumlah} Orang

        </small>

        <p>${item.ucapan||"-"}</p>

        <small>${item.waktu}</small>

    `;

    document

    .getElementById("wishList")

    .prepend(box);

}

/* ==========================================================
   STATISTIK
========================================================== */

function updateStatistic(){

    const data=getWishData();

    const hadir=data.filter(

        x=>x.status==="Hadir"

    );

    const tidak=data.filter(

        x=>x.status==="Tidak Hadir"

    );

    const tamu=data.reduce(

        (a,b)=>a+Number(b.jumlah),

        0

    );

    document.getElementById(

        "totalComments"

    ).textContent=data.length;

    document.getElementById(

        "totalPresent"

    ).textContent=hadir.length;

    document.getElementById(

        "totalAbsent"

    ).textContent=tidak.length;

    document.getElementById(

        "totalGuests"

    ).textContent=tamu;

}

/* ==========================================================
   WHATSAPP
========================================================== */

function sendWhatsapp(data){

    const nomor="6285810273385";

    const text=

`Assalamu'alaikum Wr. Wb.

Konfirmasi Kehadiran

Nama :
${data.nama}

Status :
${data.status}

Jumlah Tamu :
${data.jumlah}

Ucapan :

${data.ucapan}`;

    window.open(

`https://wa.me/${nomor}?text=${encodeURIComponent(text)}`,

"_blank"

    );

}

/* ==========================================================
   MUSIC PLAYER
========================================================== */

function initMusic(){

    const music=document.getElementById("music");

    const button=document.getElementById("musicToggle");

    if(!music||!button) return;

    let playing=false;

    const lastState=localStorage.getItem("music");

    if(lastState==="play"){

        music.play().catch(()=>{});

        playing=true;

        button.innerHTML="❚❚";

    }

    button.addEventListener("click",()=>{

        if(playing){

            music.pause();

            playing=false;

            button.innerHTML="♪";

            localStorage.setItem("music","pause");

        }else{

            music.play();

            playing=true;

            button.innerHTML="❚❚";

            localStorage.setItem("music","play");

        }

    });

}

/* ==========================================================
   LIGHTBOX GALLERY
========================================================== */

function initGallery(){

    const images=document.querySelectorAll(".gallery-grid img");

    const lightbox=document.getElementById("lightbox");

    const preview=document.getElementById("lightboxImg");

    const close=document.querySelector(".close-lightbox");

    if(!images.length) return;

    images.forEach(img=>{

        img.addEventListener("click",()=>{

            preview.src=img.src;

            lightbox.style.display="flex";

            document.body.style.overflow="hidden";

        });

    });

    close.addEventListener("click",closeLightbox);

    lightbox.addEventListener("click",(e)=>{

        if(e.target===lightbox){

            closeLightbox();

        }

    });

    function closeLightbox(){

        lightbox.style.display="none";

        document.body.style.overflow="";

    }

}

/* ==========================================================
   BACK TO TOP
========================================================== */

function initBackToTop(){

    const btn=document.getElementById("backToTop");

    if(!btn) return;

    window.addEventListener("scroll",()=>{

        if(window.scrollY>500){

            btn.style.display="flex";

        }else{

            btn.style.display="none";

        }

    });

}

function scrollTopPage(){

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}

/* ==========================================================
   SCROLL PROGRESS BAR
========================================================== */

function initScrollProgress(){

    const progress=document.getElementById("scrollProgress");

    if(!progress) return;

    window.addEventListener("scroll",()=>{

        const total=

        document.documentElement.scrollHeight-

        document.documentElement.clientHeight;

        const current=

        window.scrollY;

        const percent=(current/total)*100;

        progress.style.width=percent+"%";

    });

}

/* ==========================================================
   NAVBAR ACTIVE
========================================================== */

function initNavbar(){

    const links=document.querySelectorAll(".sidebar nav a");

    const sections=document.querySelectorAll("section");

    if(!links.length) return;

    window.addEventListener("scroll",()=>{

        let current="";

        sections.forEach(section=>{

            const top=section.offsetTop-180;

            if(window.scrollY>=top){

                current=section.getAttribute("id");

            }

        });

        links.forEach(link=>{

            link.classList.remove("active");

            if(

                link.getAttribute("href")==="#"+current

            ){

                link.classList.add("active");

            }

        });

    });

}

/* ==========================================================
   AOS
========================================================== */

function initAOS(){

    if(typeof AOS==="undefined") return;

    AOS.init({

        duration:1000,

        once:true,

        offset:100,

        easing:"ease-out-cubic"

    });

}

/* ==========================================================
   PARALLAX HERO
========================================================== */

window.addEventListener("scroll",()=>{

    const hero=document.querySelector(".hero-bg");

    if(!hero) return;

    hero.style.transform=

    `translateY(${window.scrollY*0.35}px) scale(1.1)`;

});