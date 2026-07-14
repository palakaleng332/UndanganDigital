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