// Generate 100 Presets Data linking to LR PRESET folder
const presetsData = [];
for (let i = 1; i <= 100; i++) {
    presetsData.push({
        id: i,
        title: `Mix2vfx (${i})`,
        category: "Premium Preset",
        image: `https://picsum.photos/seed/preset${i}/600/400`,
        fileUrl: encodeURI(`LR PRESET/Mix2vfx (${i}).xmp`),
        downloadName: `Mix2vfx (${i}).xmp`
    });
}

// Function to render presets into the DOM
function renderPresets() {
    const grid = document.getElementById('preset-grid');
    
    if (!grid) return;

    presetsData.forEach(preset => {
        const card = document.createElement('div');
        card.className = 'preset-card';

        card.innerHTML = `
            <img src="${preset.image}" alt="${preset.title}" class="preset-image" loading="lazy">
            <div class="preset-info">
                <span class="preset-category">${preset.category}</span>
                <h3 class="preset-title">${preset.title}</h3>
                <!-- Add AdMob/AdSense click logic or just a link -->
                <a href="${preset.fileUrl}" download="${preset.downloadName}" class="download-btn" onclick="handleDownload(event, '${preset.title}', '${preset.fileUrl}', '${preset.downloadName}')">
                    Download Preset
                </a>
            </div>
        `;

        grid.appendChild(card);
    });
}

let countdownInterval;

function handleDownload(event, title, fileUrl, downloadName) {
    event.preventDefault(); // Stop the direct download

    const modal = document.getElementById('download-modal');
    const timerTextContainer = document.getElementById('timer-text');
    const finalBtn = document.getElementById('final-download-btn');
    
    // Reset modal elements
    let timeLeft = 10;
    timerTextContainer.innerHTML = `Please wait <span id="countdown-timer" style="color: var(--primary); font-weight: bold; font-size: 1.2rem;">${timeLeft}</span> seconds.`;
    
    finalBtn.style.opacity = '0.5';
    finalBtn.style.cursor = 'not-allowed';
    finalBtn.style.pointerEvents = 'none';
    finalBtn.textContent = 'Please Wait...';
    finalBtn.href = '#';
    finalBtn.removeAttribute('download');
    
    // Show the modal
    modal.classList.remove('hidden');

    // Clear any previous intervals
    clearInterval(countdownInterval);

    // Start the countdown
    countdownInterval = setInterval(() => {
        timeLeft--;
        const timerSpan = document.getElementById('countdown-timer');
        if(timerSpan) timerSpan.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            timerTextContainer.innerHTML = 'Your file is ready!';
            
            finalBtn.style.opacity = '1';
            finalBtn.style.cursor = 'pointer';
            finalBtn.style.pointerEvents = 'auto';
            finalBtn.textContent = 'Download Now';
            finalBtn.href = fileUrl;
            finalBtn.setAttribute('download', downloadName);
        }
    }, 1000);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderPresets();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Modal close logic
    const modal = document.getElementById('download-modal');
    const closeBtn = document.getElementById('close-modal');

    closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
        clearInterval(countdownInterval);
    });

    // Close modal if clicked outside the box
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
            clearInterval(countdownInterval);
        }
    });
});
