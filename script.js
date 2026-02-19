const sassyScroll = ["Woy pelan-pelan, bacanya pake mata bukan pake jempol!", "Kejar-kejaran sama siapa bro? Scroll-nya santai aja.", "Waduh, ngebut banget scroll-nya!"];
const sassyIdle = ["Diliatin doang, sedekah kaga.", "Bengong mulu, mending donasi kopi biar melek.", "Lagi nunggu hidayah ya?"];

let lastScrollTime = 0;
let idleTimer;

function showToast(message, isSassy = false) {
    const toast = document.getElementById("toast");
    toast.innerText = message;
    toast.style.backgroundColor = isSassy ? "#ff0000" : "#000";
    toast.className = "show";
    setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 3000);
}

function copyToClipboard(text, successMsg) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => { showToast(successMsg); });
    } else {
        let textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            showToast(successMsg);
        } catch (err) {
            showToast("Gagal menyalin!", true);
        }
        document.body.removeChild(textArea);
    }
}

function sharePortfolio() {
    if (navigator.share) {
        navigator.share({
            title: 'RIICODE Portfolio',
            text: 'Cek jasa Web Dev dan Bot dari BinCoderr!',
            url: window.location.href
        }).then(() => showToast("Berhasil dibagikan!"))
          .catch(() => showToast("Gagal membagikan", true));
    } else {
        copyToClipboard(window.location.href, "Link portfolio disalin!");
    }
}

function toggleFaq(el) {
    el.classList.toggle('active');
}

function filterProject(category, btn) {
    const items = document.querySelectorAll('.project-item');
    const btns = document.querySelectorAll('.tab-btn');
    items.forEach(item => {
        item.classList.remove('active');
        if (item.classList.contains(category)) item.classList.add('active');
    });
    btns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    showToast("Menampilkan project " + category.toUpperCase());
}

function toggleHireModal() {
    const modal = document.getElementById('hireModal');
    modal.style.display = (modal.style.display === 'flex') ? 'none' : 'flex';
}

function sendHireRequest() {
    const name = document.getElementById('hireName').value;
    const project = document.getElementById('hireProject').value;
    const desc = document.getElementById('hireDesc').value;
    if(!name || !project) return showToast("Isi dulu yang bener!", true);
    const msg = `Halo BinCoderr, saya ${name}.%0A%0ASaya ingin order projek: *${project}*%0ADeskripsi: ${desc}`;
    window.open(`https://wa.me/6288269905296?text=${msg}`);
    toggleHireModal();
}

function checkScrollSpeed() {
    const now = Date.now();
    if (now - lastScrollTime < 20) showToast(sassyScroll[Math.floor(Math.random() * sassyScroll.length)], true);
    lastScrollTime = now;
    resetIdleTimer();
}

function resetIdleTimer() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
        const rect = document.getElementById('donasi-box').getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) showToast(sassyIdle[Math.floor(Math.random() * sassyIdle.length)], true);
    }, 8000);
}

document.addEventListener('copy', (e) => {
    if (window.getSelection().toString().length > 20) {
        showToast("Ciee mau nyolong kode ya? 💀", true);
    }
});

let originalTitle = document.title;
window.addEventListener("blur", () => { document.title = "Balik Lagi Yo Bro Kalo Butuh"; });
window.addEventListener("focus", () => { document.title = originalTitle; });

function getGreeting() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 11) return "Selamat Pagi";
    if (hour >= 11 && hour < 15) return "Selamat Siang";
    if (hour >= 15 && hour < 18) return "Selamat Sore";
    return "Selamat Malam";
}

const greeting = getGreeting();
const text = `> ${greeting}, Perkenal kan saya Rezky Bintang Pratama bisa di panggil aja BinCoderr.\n> Pelajar asal Kudus, usia 15 tahun.\n> Memiliki impian besar menjadi Web Developer profesional.`;
let i = 0;

function typeWriter() {
    if (i < text.length) {
        document.getElementById("typing-text").innerHTML += text.charAt(i) === "\n" ? "<br>" : text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
    }
}

window.onload = () => { typeWriter(); resetIdleTimer(); };

const music = document.getElementById("bgMusic");
const btn = document.getElementById("musicBtn");
function toggleMusic() {
    if (music.paused) { music.play(); btn.innerHTML = "⏸️"; btn.classList.add("animate-pulse"); showToast("Musik diputar 🎧"); }
    else { music.pause(); btn.innerHTML = "📻"; btn.classList.remove("animate-pulse"); showToast("Musik berhenti"); }
}

function toggleModal() {
    const modal = document.getElementById('donationModal');
    modal.style.display = (modal.style.display === 'flex') ? 'none' : 'flex';
}
