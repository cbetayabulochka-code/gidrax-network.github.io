// Падающие кристаллы на фоне
const canvas = document.getElementById('crystals');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const crystals = [];

class Crystal {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = -50;
        this.size = Math.random() * 10 + 5;
        this.speed = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.color = Math.random() > 0.5 ? '#912929' : '#FF7DD7';
    }
    update() {
        this.y += this.speed;
        if (this.y > canvas.height) this.reset();
    }
    draw() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.size/2, this.y + this.size);
        ctx.lineTo(this.x, this.y + this.size * 1.5);
        ctx.lineTo(this.x - this.size/2, this.y + this.size);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
    }
}

for (let i = 0; i < 40; i++) {
    crystals.push(new Crystal());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    crystals.forEach(c => {
        c.update();
        c.draw();
    });
    requestAnimationFrame(animate);
}
animate();

// Аккордеон
document.querySelectorAll('.acc-header').forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        item.classList.toggle('active');
    });
});

// Копирование IP
function copyIP() {
    const ip = "mc.gidrax-net.ru";
    navigator.clipboard.writeText(ip);
    const btn = document.getElementById('copy-status');
    btn.innerText = "Скопировано!";
    setTimeout(() => { btn.innerText = "Копировать"; }, 2000);
}

// Анимация появления секций при скролле
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => observer.observe(section));
