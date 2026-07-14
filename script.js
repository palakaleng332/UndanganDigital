/* =====================================================
   SOEHENDRA & RICA RISMAWATI
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initGuestName();
    initCountdown();
    initRSVP();
    initMusic();
    initGallery();
    initBackToTop();
    initScrollProgress();
    initNavbar();
    initAOS();

});

/* =====================================================
   OPEN INVITATION
===================================================== */

function openInvitation(){

    const hero=document.querySelector(".hero");

    const content=document.getElementById("content");

    if(hero) hero.style.display="none";

    if(content){

        content.style.display="block";

        content.style.animation="fadeIn .8s";

    }

}

/* =====================================================
   GUEST NAME
===================================================== */

function initGuestName(){

    const guest=document.getElementById("guestName");

    if(!guest) return;

    const params=new URLSearchParams(window.location.search);

    const name=params.get("to");

    if(name){

        guest.innerHTML=`Kepada Yth.<br><strong>${decodeURIComponent(name)}</strong>`;

    }

}

/* =====================================================
   COUNTDOWN
===================================================== */

function initCountdown(){

    const target=new Date("2027-07-07T09:00:00").getTime();

    update();

    setInterval(update,1000);

    function update(){

        const now=new Date().getTime();

        const distance=target-now;

        if(distance<=0){

            setNumber("days",0);
            setNumber("hours",0);
            setNumber("minutes",0);
            setNumber("seconds",0);

            return;

        }

        setNumber("days",Math.floor(distance/86400000));
        setNumber("hours",Math.floor(distance%86400000/3600000));
        setNumber("minutes",Math.floor(distance%3600000/60000));
        setNumber("seconds",Math.floor(distance%60000/1000));

    }

}

function setNumber(id,value){

    const el=document.getElementById(id);

    if(!el) return;

    if(el.dataset.value==value) return;

    el.dataset.value=value;

    el.style.transform="scale(1.15)";

    setTimeout(()=>{

        el.textContent=value;

        el.style.transform="scale(1)";

    },120);

}

/* =====================================================
   COPY REKENING
===================================================== */

function copyRekening(number){

    navigator.clipboard.writeText(number)

    .then(()=>{

        showToast("Nomor rekening berhasil disalin");

    })

    .catch(()=>{

        showToast("Gagal menyalin nomor");

    });

}

/* =====================================================
   TOAST
===================================================== */

function showToast(message){

    let toast=document.getElementById("toast");

    if(!toast){

        toast=document.createElement("div");

        toast.id="toast";

        document.body.appendChild(toast);

    }

    toast.textContent=message;

    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer=setTimeout(()=>{

        toast.classList.remove("show");

    },2500);

}

/* =====================================================
   SLIDER REKENING
===================================================== */

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

        const data={

            nama:document.getElementById("nama").value.trim(),

            status:document.getElementById("status").value,

            jumlah:document.getElementById("jumlahTamu").value||1,

            ucapan:document.getElementById("ucapan").value.trim(),

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

    return JSON.parse(localStorage.getItem("weddingWish")||"[]");

}

function saveWish(data){

    const list=getWishData();

    list.unshift(data);

    localStorage.setItem("weddingWish",JSON.stringify(list));

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

        <small>${item.status} • ${item.jumlah} Orang</small>

        <p>${item.ucapan||"-"}</p>

        <small>${item.waktu}</small>

    `;

    document.getElementById("wishList").prepend(box);

}

/* ==========================================================
   STATISTIK
========================================================== */

function updateStatistic(){

    const data=getWishData();

    document.getElementById("totalComments").textContent=data.length;

    document.getElementById("totalPresent").textContent=
        data.filter(x=>x.status==="Hadir").length;

    document.getElementById("totalAbsent").textContent=
        data.filter(x=>x.status==="Tidak Hadir").length;

    document.getElementById("totalGuests").textContent=
        data.reduce((a,b)=>a+Number(b.jumlah),0);

}

/* ==========================================================
   WHATSAPP
========================================================== */

function sendWhatsapp(data){

    const nomor="6285810273385";

    const text=

`Assalamu'alaikum Wr. Wb.

Konfirmasi Kehadiran

Nama : ${data.nama}

Status : ${data.status}

Jumlah Tamu : ${data.jumlah}

Ucapan :

${data.ucapan}`;

    window.open(

`https://wa.me/${nomor}?text=${encodeURIComponent(text)}`,

"_blank"

    );

}

/* ==========================================================
   MUSIC
========================================================== */

function initMusic(){

    const music=document.getElementById("music");
    const button=document.getElementById("musicToggle");

    if(!music||!button) return;

    let playing=false;

    button.addEventListener("click",()=>{

        if(playing){

            music.pause();

            playing=false;

            button.innerHTML="♫";

        }else{

            music.play().catch(()=>{});

            playing=true;

            button.innerHTML="❚❚";

        }

    });

}

/* ==========================================================
   GALLERY LIGHTBOX
========================================================== */

function initGallery(){

    const images=document.querySelectorAll(".gallery-grid img");

    if(!images.length) return;

    let lightbox=document.getElementById("lightbox");

    if(!lightbox){

        lightbox=document.createElement("div");

        lightbox.id="lightbox";

        lightbox.innerHTML=`

        <span class="close-lightbox">&times;</span>

        <img id="lightboxImg">

        `;

        document.body.appendChild(lightbox);

    }

    const preview=document.getElementById("lightboxImg");

    const close=document.querySelector(".close-lightbox");

    images.forEach(img=>{

        img.addEventListener("click",()=>{

            preview.src=img.src;

            lightbox.style.display="flex";

            document.body.style.overflow="hidden";

        });

    });

    close.onclick=()=>{

        lightbox.style.display="none";

        document.body.style.overflow="";

    };

    lightbox.onclick=e=>{

        if(e.target===lightbox){

            lightbox.style.display="none";

            document.body.style.overflow="";

        }

    };

}

/* ==========================================================
   BACK TO TOP
========================================================== */

function initBackToTop(){

    const btn=document.getElementById("backToTop");

    if(!btn) return;

    window.addEventListener("scroll",()=>{

        btn.style.display=window.scrollY>500?"flex":"none";

    });

}

function scrollTopPage(){

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}

/* ==========================================================
   SCROLL PROGRESS
========================================================== */

function initScrollProgress(){

    const progress=document.getElementById("scrollProgress");

    if(!progress) return;

    window.addEventListener("scroll",()=>{

        const total=document.documentElement.scrollHeight-document.documentElement.clientHeight;

        const percent=(window.scrollY/total)*100;

        progress.style.width=percent+"%";

    });

}

/* ==========================================================
   SIDEBAR ACTIVE
========================================================== */

function initNavbar(){

    const links=document.querySelectorAll(".sidebar nav a");

    const sections=document.querySelectorAll("section[id]");

    if(!links.length) return;

    window.addEventListener("scroll",()=>{

        let current="";

        sections.forEach(sec=>{

            if(window.scrollY>=sec.offsetTop-150){

                current=sec.id;

            }

        });

        links.forEach(link=>{

            link.classList.toggle(

                "active",

                link.getAttribute("href")==="#"+current

            );

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

    if(hero){

        hero.style.transform=`translateY(${window.scrollY*0.3}px)`;

    }

});

/* ==========================================================
   HIDE LOADER
========================================================== */

window.addEventListener("load",()=>{

    const loader=document.getElementById("loader");

    if(loader){

        loader.style.opacity="0";

        setTimeout(()=>{

            loader.style.display="none";

        },500);

    }

});