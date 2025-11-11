// script.js - Упрощенная версия
document.addEventListener('DOMContentLoaded', function() {
    console.log('GidraX-Network website loaded successfully');
	createSnowflakes(); // Добавьте эту строку
    initMobileMenu();
    initCopyIP();
    initSmoothScroll();
});

function initMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenu.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
        });
        
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileMenu.textContent = '☰';
            });
        });
    }
}

function initCopyIP() {
    const ipEu = document.getElementById('server-ip-eu');
    const ipRu = document.getElementById('server-ip-ru');
    
    if (ipEu) {
        ipEu.addEventListener('click', function(e) {
            e.preventDefault();
            copyIPAddress('gidraxnw.play.ski', 'EU IP-адрес скопирован');
        });
    }
    
    if (ipRu) {
        ipRu.addEventListener('click', function(e) {
            e.preventDefault();
            copyIPAddress('gidraxmsk.play.ski', 'RU IP-адрес скопирован');
        });
    }
}

function copyIPAddress(ip, message) {
    const textArea = document.createElement('textarea');
    textArea.value = ip;
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showNotification(message + ': ' + ip, 'success');
            const ipElement = document.querySelector(`.server-ip`);
            if (ipElement) {
                ipElement.style.transform = 'scale(1.05)';
                ipElement.style.background = 'rgba(74, 158, 255, 0.4)';
                setTimeout(() => {
                    ipElement.style.transform = 'scale(1)';
                    ipElement.style.background = 'rgba(74, 158, 255, 0.2)';
                }, 300);
            }
        }
    } catch (err) {
        showNotification('Не удалось скопировать IP-адрес', 'error');
    }
    
    document.body.removeChild(textArea);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icons = { success: '✓', error: '✕', info: 'ℹ' };
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${icons[type] || icons.info}</span>
            <span class="notification-text">${message}</span>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(45deg, #4CAF50, #66BB6A)' : 
                     type === 'error' ? 'linear-gradient(45deg, #f44336, #ef5350)' : 
                     'linear-gradient(45deg, #4a9eff, #8a2be2)'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-size: 14px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId.startsWith('http')) return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
// Добавьте эту функцию в ваш script.js
function createSnowflakes() {
    const snowflakesContainer = document.createElement('div');
    snowflakesContainer.className = 'snowflakes';
    document.body.appendChild(snowflakesContainer);

    const snowflakeCount = 50;

    for (let i = 0; i < snowflakeCount; i++) {
        setTimeout(() => {
            const snowflake = document.createElement('div');
            snowflake.className = 'snowflake';
            
            // Случайный размер от 2 до 4px
            const size = Math.random() * 2 + 2;
            snowflake.style.width = `${size}px`;
            snowflake.style.height = `${size}px`;
            
            // Случайная позиция
            snowflake.style.left = `${Math.random() * 100}vw`;
            
            // Случайная длительность анимации
            const duration = Math.random() * 10 + 5;
            snowflake.style.animationDuration = `${duration}s`;
            
            // Случайная задержка
            snowflake.style.animationDelay = `${Math.random() * 5}s`;
            
            snowflakesContainer.appendChild(snowflake);
        }, i * 100);
    }
}
