// Music Player Controls
const audioPlayer = document.getElementById('audioPlayer');
const playBtn = document.getElementById('playBtn');
const playIcon = document.getElementById('playIcon');
const progress = document.getElementById('progress');
let isPlaying = false;

// Play/Pause functionality
playBtn.addEventListener('click', () => {
    if (isPlaying) {
        audioPlayer.pause();
        playIcon.textContent = '▶';
        isPlaying = false;
    } else {
        audioPlayer.play();
        playIcon.textContent = '⏸';
        isPlaying = true;
    }
});

// Update progress bar
audioPlayer.addEventListener('timeupdate', () => {
    const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progress.style.width = percent + '%';
});

// Reset progress when audio ends
audioPlayer.addEventListener('ended', () => {
    progress.style.width = '0%';
    playIcon.textContent = '▶';
    isPlaying = false;
});

// Click on progress bar to seek
const progressBar = document.querySelector('.progress-bar');
progressBar.addEventListener('click', (e) => {
    const rect = progressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audioPlayer.currentTime = percent * audioPlayer.duration;
});

// Photo Gallery Modal
const galleryBtn = document.getElementById('galleryBtn');
const galleryModal = document.getElementById('galleryModal');
const closeBtn = document.querySelector('.close');
const galleryGrid = document.getElementById('galleryGrid');

// Photos - ft1 sampai ft5
const photos = [
    'ft1.jpeg',
    'ft2.jpeg',
    'ft3.jpeg',
    'ft4.jpeg',
    'ft5.jpeg'
];

let currentPhotoIndex = 0;

// Function to create gallery carousel
function createGalleryItems() {
    galleryGrid.innerHTML = '';
    
    if (photos.length === 0) {
        galleryGrid.innerHTML = `
            <div class="photo-placeholder">
                <p>📷</p>
                <p>Tambahkan foto-foto kalian di sini</p>
            </div>
        `;
    } else {
        photos.forEach((photoUrl, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = `carousel-slide ${index === 0 ? 'active' : ''}`;
            galleryItem.dataset.index = index;
            galleryItem.innerHTML = `
                <img src="${photoUrl}" alt="Foto ${index + 1}" loading="lazy">
            `;
            galleryGrid.appendChild(galleryItem);
        });
        
        // Create indicators
        createIndicators();
        updatePhotoCounter();
    }
}

// Create carousel indicators
function createIndicators() {
    const indicatorsContainer = document.getElementById('carouselIndicators');
    indicatorsContainer.innerHTML = '';
    
    photos.forEach((_, index) => {
        const indicator = document.createElement('button');
        indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
        indicator.dataset.index = index;
        indicator.setAttribute('aria-label', `Lihat foto ${index + 1}`);
        indicator.addEventListener('click', () => goToPhoto(index));
        indicatorsContainer.appendChild(indicator);
    });
}

// Update photo counter
function updatePhotoCounter() {
    const currentPhoto = document.getElementById('currentPhoto');
    const totalPhotos = document.getElementById('totalPhotos');
    if (currentPhoto) currentPhoto.textContent = currentPhotoIndex + 1;
    if (totalPhotos) totalPhotos.textContent = photos.length;
}

// Go to specific photo
function goToPhoto(index) {
    if (index < 0 || index >= photos.length) return;
    
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    // Remove active class from all slides and indicators
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Add active class to current slide and indicator
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
    
    currentPhotoIndex = index;
    updatePhotoCounter();
}

// Next photo
function nextPhoto() {
    const nextIndex = (currentPhotoIndex + 1) % photos.length;
    goToPhoto(nextIndex);
}

// Previous photo
function prevPhoto() {
    const prevIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
    goToPhoto(prevIndex);
}

// Open modal with beautiful animation
galleryBtn.addEventListener('click', () => {
    galleryModal.style.display = 'block';
    currentPhotoIndex = 0;
    createGalleryItems();
    document.body.style.overflow = 'hidden';
    
    // Create sparkle effect when opening
    createModalSparkles();
});

// Create sparkle effect for modal opening
function createModalSparkles() {
    const modal = document.getElementById('galleryModal');
    if (!modal) return;
    
    const sparkles = ['✨', '💫', '⭐', '🌟'];
    const sparkleCount = 20;
    
    for (let i = 0; i < sparkleCount; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
            sparkle.style.position = 'fixed';
            sparkle.style.fontSize = (Math.random() * 15 + 15) + 'px';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '10000';
            sparkle.style.animation = `sparkleFall ${Math.random() * 2 + 1.5}s ease-out forwards`;
            sparkle.style.opacity = '0';
            document.body.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 2000);
        }, i * 50);
    }
}

// Add sparkle fall animation
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkleFall {
        0% {
            opacity: 0;
            transform: translateY(-20px) rotate(0deg) scale(0);
        }
        20% {
            opacity: 1;
            transform: translateY(0) rotate(180deg) scale(1);
        }
        80% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            transform: translateY(100px) rotate(360deg) scale(0);
        }
    }
`;
document.head.appendChild(sparkleStyle);

// Carousel navigation
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

if (prevBtn) {
    prevBtn.addEventListener('click', prevPhoto);
}

if (nextBtn) {
    nextBtn.addEventListener('click', nextPhoto);
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (galleryModal.style.display === 'block') {
        if (e.key === 'ArrowLeft') {
            prevPhoto();
        } else if (e.key === 'ArrowRight') {
            nextPhoto();
        }
    }
});

// Swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

if (galleryGrid) {
    galleryGrid.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    galleryGrid.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next photo
            nextPhoto();
        } else {
            // Swipe right - previous photo
            prevPhoto();
        }
    }
}

// Close modal
closeBtn.addEventListener('click', () => {
    galleryModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === galleryModal) {
        galleryModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && galleryModal.style.display === 'block') {
        galleryModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Create floating hearts animation
function createFloatingHeart() {
    const hearts = ['❤️', '💕', '💖', '💗', '💝', '💓', '💞'];
    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
    document.querySelector('.floating-hearts').appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 6000);
}

// Create floating hearts periodically
setInterval(createFloatingHeart, 2000);

// Initialize gallery on page load
createGalleryItems();

// Add smooth scroll behavior
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

// Add confetti effect on page load (optional enhancement)
function createConfetti() {
    const colors = ['#4a90e2', '#ffffff', '#357abd'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 5000);
        }, i * 100);
    }
}

// Add fall animation for confetti
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Trigger confetti on page load
window.addEventListener('load', () => {
    setTimeout(createConfetti, 500);
});

// Letter Gate (open letter first, then show the website)
const letterGate = document.getElementById('letterGate');
const openLetterBtn = document.getElementById('openLetterBtn');
const enterWebsiteBtn = document.getElementById('enterWebsiteBtn');
const mainContent = document.getElementById('mainContent');
const letterPaper = document.querySelector('.letter-paper');

function openLetter() {
    if (!letterGate) return;

    // Open envelope flap
    letterGate.classList.add('opening');

    // Show letter paper after envelope opens
    setTimeout(() => {
        if (letterPaper) {
            letterPaper.classList.add('show');
        }
    }, 900);
}

function enterWebsite() {
    if (!letterGate) return;

    // Fade out the letter gate
    letterGate.classList.add('opened');

    // After fade out, remove gate and unlock page
    setTimeout(() => {
        letterGate.style.display = 'none';
        document.body.classList.remove('gated');
        if (mainContent) mainContent.setAttribute('aria-hidden', 'false');

        // Optional: auto play music after user gesture (works better on mobile)
        // If you want auto-play after opening, uncomment below:
        // audioPlayer.play();
        // playIcon.textContent = '⏸';
        // isPlaying = true;
    }, 700);
}

// Enable gate by default
if (letterGate) {
    document.body.classList.add('gated');
    if (mainContent) mainContent.setAttribute('aria-hidden', 'true');
}

if (openLetterBtn) {
    openLetterBtn.addEventListener('click', openLetter);
}

if (enterWebsiteBtn) {
    enterWebsiteBtn.addEventListener('click', enterWebsite);
}

// Surprise Button Functionality
const surpriseBtn = document.getElementById('surpriseBtn');
const surpriseModal = document.getElementById('surpriseModal');
const closeSurpriseBtn = document.getElementById('closeSurpriseBtn');

// Enhanced confetti function for surprise
function createSurpriseConfetti() {
    const colors = ['#4a90e2', '#ffffff', '#357abd', '#ff6b9d', '#c44569'];
    const confettiCount = 200;
    const emojis = ['💖', '💕', '💗', '💝', '💓', '✨', '🌟', '🎉', '🎊'];
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            const isEmoji = Math.random() > 0.7;
            
            if (isEmoji) {
                confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
                confetti.style.fontSize = (Math.random() * 20 + 15) + 'px';
                confetti.style.color = 'transparent';
            } else {
                confetti.style.width = (Math.random() * 10 + 5) + 'px';
                confetti.style.height = (Math.random() * 10 + 5) + 'px';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0%';
            }
            
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-20px';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            confetti.style.animation = `surpriseFall ${Math.random() * 3 + 2}s linear forwards`;
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 5000);
        }, i * 10);
    }
}

// Add surprise fall animation
const surpriseStyle = document.createElement('style');
surpriseStyle.textContent = `
    @keyframes surpriseFall {
        to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(surpriseStyle);

// Create floating hearts burst
function createHeartBurst() {
    const hearts = ['❤️', '💕', '💖', '💗', '💝', '💓', '💞'];
    const burstCount = 50;
    
    for (let i = 0; i < burstCount; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'fixed';
            heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
            heart.style.left = '50%';
            heart.style.top = '50%';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '9998';
            heart.style.transform = 'translate(-50%, -50%)';
            
            const angle = (Math.PI * 2 * i) / burstCount;
            const velocity = Math.random() * 200 + 100;
            const x = Math.cos(angle) * velocity;
            const y = Math.sin(angle) * velocity;
            
            heart.style.animation = `heartBurst 2s ease-out forwards`;
            heart.style.setProperty('--x', x + 'px');
            heart.style.setProperty('--y', y + 'px');
            
            document.body.appendChild(heart);
            
            setTimeout(() => heart.remove(), 2000);
        }, i * 20);
    }
}

// Add heart burst animation
const heartBurstStyle = document.createElement('style');
heartBurstStyle.textContent = `
    @keyframes heartBurst {
        to {
            transform: translate(calc(-50% + var(--x)), calc(-50% + var(--y))) rotate(360deg);
            opacity: 0;
            scale: 0.5;
        }
    }
`;
document.head.appendChild(heartBurstStyle);

// Open surprise modal
surpriseBtn.addEventListener('click', () => {
    // Create confetti explosion
    createSurpriseConfetti();
    
    // Create heart burst
    createHeartBurst();
    
    // Show modal
    surpriseModal.style.display = 'flex';
    surpriseModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Play sound effect if available (optional)
    // You can add a sound file here if you want
});

// Close surprise modal
closeSurpriseBtn.addEventListener('click', () => {
    surpriseModal.style.display = 'none';
    surpriseModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
surpriseModal.addEventListener('click', (e) => {
    if (e.target === surpriseModal) {
        surpriseModal.style.display = 'none';
        surpriseModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && surpriseModal.style.display === 'flex') {
        surpriseModal.style.display = 'none';
        surpriseModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});
