document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

function copyContract(button) {
    const input = button.previousElementSibling;
    input.select();
    input.setSelectionRange(0, 99999); // For mobile devices
    
    navigator.clipboard.writeText(input.value).then(() => {
        // Change button text temporarily
        const originalText = button.textContent;
        button.textContent = '✓';
        button.style.background = '#00D4AA';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

function copyHeroContract(element) {
    const contractText = element.querySelector('.contract-text').textContent;
    const copyIcon = element.querySelector('.copy-icon');
    
    navigator.clipboard.writeText(contractText).then(() => {
        const originalIcon = copyIcon.textContent;
        copyIcon.textContent = '✓';
        element.style.borderColor = '#00D4AA';
        element.style.boxShadow = '0 0 30px rgba(0, 212, 170, 0.6)';
        
        setTimeout(() => {
            copyIcon.textContent = originalIcon;
            element.style.borderColor = '';
            element.style.boxShadow = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
        copyIcon.textContent = '❌';
        setTimeout(() => {
            copyIcon.textContent = '📋';
        }, 2000);
    });
}

let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = 'none';
    } else {
        navbar.style.boxShadow = '0 5px 30px rgba(153, 69, 255, 0.3)';
    }
    
    lastScroll = currentScroll;
});

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const isInfinity = target === '∞';
    
    if (isInfinity) return;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            if (entry.target.classList.contains('stat-value') || 
                entry.target.classList.contains('stat-number')) {
                const target = entry.target.textContent.trim();
                if (target !== '∞' && !isNaN(target.replace(/[^0-9]/g, ''))) {
                    const numericTarget = parseInt(target.replace(/[^0-9]/g, ''));
                    animateCounter(entry.target, numericTarget);
                }
            }
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.token-card, .character-card, .tokenomics-card, .roadmap-phase, .mini-meme'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
    
    const statElements = document.querySelectorAll('.stat-value, .stat-number');
    statElements.forEach(el => observer.observe(el));
});

let currentMemeIndex = 0;
const memes = [
    {
        top: "WHEN YOU CHECK YOUR PORTFOLIO",
        emoji: "😱➡️😎",
        bottom: "AND REMEMBER YOU'RE IN THE FELLOWSHIP",
        author: "@MemeLord420"
    },
    {
        top: "OTHER COINS: FIGHTING FOR DOMINANCE",
        emoji: "🤝",
        bottom: "FELLOWSHIP: JUST VIBING TOGETHER",
        author: "@SolanaDegenKing"
    },
    {
        top: "BEAR MARKET:",
        emoji: "🦆🔥🍒🌟",
        bottom: "FELLOWSHIP: FRIENDSHIP NEVER DIPS",
        author: "@CryptoMemeQueen"
    },
    {
        top: "ME: BUYS ONE FELLOWSHIP TOKEN",
        emoji: "🎉",
        bottom: "GETS THREE NEW FRIENDS FOR FREE",
        author: "@Web3Comedian"
    }
];

function updateMeme(index) {
    const meme = memes[index];
    const memeContent = document.querySelector('.meme-content');
    
    if (memeContent) {
        memeContent.style.opacity = '0';
        
        setTimeout(() => {
            document.querySelector('.meme-text-top').textContent = meme.top;
            document.querySelector('.meme-emoji').textContent = meme.emoji;
            document.querySelector('.meme-text-bottom').textContent = meme.bottom;
            document.querySelector('.meme-author').textContent = `by ${meme.author}`;
            memeContent.style.opacity = '1';
        }, 300);
    }
}

document.querySelector('.carousel-btn.prev')?.addEventListener('click', () => {
    currentMemeIndex = (currentMemeIndex - 1 + memes.length) % memes.length;
    updateMeme(currentMemeIndex);
});

document.querySelector('.carousel-btn.next')?.addEventListener('click', () => {
    currentMemeIndex = (currentMemeIndex + 1) % memes.length;
    updateMeme(currentMemeIndex);
});

setInterval(() => {
    currentMemeIndex = (currentMemeIndex + 1) % memes.length;
    updateMeme(currentMemeIndex);
}, 5000);

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const floatingMemes = document.querySelectorAll('.floating-meme');
    
    floatingMemes.forEach((meme, index) => {
        const speed = 0.5 + (index * 0.1);
        meme.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

document.querySelectorAll('.token-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

const glitchElements = document.querySelectorAll('.glitch');
glitchElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.animation = 'glitch 0.3s infinite';
    });
    
    element.addEventListener('mouseleave', function() {
        this.style.animation = 'glitch 3s infinite';
    });
});

document.querySelectorAll('.branch-node').forEach((node, index) => {
    const randomDelay = Math.random() * 2;
    const randomDuration = 3 + Math.random() * 2;
    node.style.animationDelay = `${randomDelay}s`;
    node.style.animationDuration = `${randomDuration}s`;
});

let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    const logos = ['buddy-logo.png', 'redo-logo.png', 'cherry-logo.png', 'utya-logo.png'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const logo = document.createElement('img');
            logo.src = logos[Math.floor(Math.random() * logos.length)];
            logo.style.position = 'fixed';
            logo.style.left = Math.random() * window.innerWidth + 'px';
            logo.style.top = '-100px';
            logo.style.width = '60px';
            logo.style.height = '60px';
            logo.style.zIndex = '9999';
            logo.style.pointerEvents = 'none';
            logo.style.transition = 'all 3s ease-in';
            logo.style.objectFit = 'contain';
            
            document.body.appendChild(logo);
            
            setTimeout(() => {
                logo.style.top = window.innerHeight + 'px';
                logo.style.transform = `rotate(${Math.random() * 720}deg)`;
                logo.style.opacity = '0';
            }, 100);
            
            setTimeout(() => {
                logo.remove();
            }, 3100);
        }, i * 50);
    }
    
    const message = document.createElement('div');
    message.textContent = '🎉 FELLOWSHIP ACTIVATED! 🎉';
    message.style.position = 'fixed';
    message.style.top = '50%';
    message.style.left = '50%';
    message.style.transform = 'translate(-50%, -50%)';
    message.style.fontSize = '3rem';
    message.style.fontFamily = 'Orbitron, sans-serif';
    message.style.fontWeight = '900';
    message.style.background = 'linear-gradient(135deg, #9945FF, #14F195)';
    message.style.webkitBackgroundClip = 'text';
    message.style.webkitTextFillColor = 'transparent';
    message.style.zIndex = '10000';
    message.style.textAlign = 'center';
    message.style.pointerEvents = 'none';
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.transition = 'opacity 1s';
        message.style.opacity = '0';
        setTimeout(() => message.remove(), 1000);
    }, 2000);
}

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});


const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

console.log('🎭 Welcome to TON FRIENDS! 🎭');
console.log('🌟 BUDDY | 🔥 REDO | 🍒 CHERRY | 🦆 UTYA');
console.log('Try the Konami code for a surprise! ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA');
