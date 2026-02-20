// --- VARIABLES & STATE ---
const video = document.getElementById('bgVideo');
let isMuted = false;
let lastToggleTime = 0;
let currentProgress = 0;

// --- ELEMENTOS UI ---
const loadbar = document.getElementById('loadbar');
const percentText = document.getElementById('percent');
const labelText = document.getElementById('label');
const cursor = document.getElementById('cursor');
const muteBtn = document.getElementById('toggleMute');
const muteStatusText = document.getElementById('muteStatus');
const pauseOverlay = document.getElementById('pause-overlay');

// --- CURSOR LOGIC ---
document.addEventListener('mousemove', (e) => {
    if (cursor) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    }
});

// --- SOCIAL REDIRECTION ---
window.addEventListener('load', () => {
    // Usar window.Config que es el objeto global definido en config.js
    const ConfigData = window.Config || {};

    const socialMap = {
        'link-discord': ConfigData.Discord,
        'link-youtube': ConfigData.YouTube,
        'link-tiktok': ConfigData.TikTok,
        'link-twitch': ConfigData.Twitch
    };

    Object.entries(socialMap).forEach(([id, url]) => {
        const el = document.getElementById(id);
        if (el && url && url !== "") {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                if (url.startsWith('http')) {
                    if (window.invokeNative) {
                        window.invokeNative('openUrl', url);
                    } else {
                        window.open(url, '_blank');
                    }
                }
            });
        }
    });
});

// --- VIDEO INITIALIZATION ---
function initVideo() {
    if (!video) return;

    // Estado inicial: No muteado y volumen medio
    video.muted = false;
    video.volume = 0.5;
    isMuted = false;

    let playPromise = video.play();

    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log("Autoplay con sonido bloqueado. Iniciando en silencio...");
            video.muted = true;
            video.play();

            // En cuanto el usuario interactúe (click o tecla), forzamos el desmuteo
            const forceUnmute = () => {
                video.muted = false;
                updateMuteUI(false);
                document.removeEventListener('click', forceUnmute);
                document.removeEventListener('keydown', forceUnmute);
            };
            document.addEventListener('click', forceUnmute);
            document.addEventListener('keydown', forceUnmute);
        });
    }
}

window.addEventListener('load', initVideo);

// --- MUTE TOGGLE LOGIC ---
function toggleMute() {
    if (!video) return;
    isMuted = !isMuted;
    video.muted = isMuted;
    updateMuteUI(isMuted);
}

function updateMuteUI(muted) {
    if (muteBtn) {
        if (muted) {
            muteBtn.classList.add('muted');
            if (muteBtn.parentElement && muteBtn.parentElement.parentElement) {
                muteBtn.parentElement.parentElement.classList.remove('playing');
            }
            if (muteStatusText) muteStatusText.innerText = "SONIDO: DESACTIVADO";
            if (pauseOverlay) pauseOverlay.classList.add('visible');
        } else {
            muteBtn.classList.remove('muted');
            if (muteBtn.parentElement && muteBtn.parentElement.parentElement) {
                muteBtn.parentElement.parentElement.classList.add('playing');
            }
            if (muteStatusText) muteStatusText.innerText = "SONIDO: ACTIVADO";
            if (pauseOverlay) pauseOverlay.classList.remove('visible');
        }
    }
    isMuted = muted;
}

// Control por teclado (Debounce de 300ms)
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        const now = Date.now();
        if (now - lastToggleTime > 300) {
            toggleMute();
            lastToggleTime = now;
        }
        e.preventDefault();
    }
});

if (muteBtn) {
    muteBtn.addEventListener('click', toggleMute);
}

// --- FIVE M LOADING LOGIC ---
window.addEventListener('message', (e) => {
    const data = e.data;
    if (!data) return;

    const eventName = data.eventName || data.type;
    if (!eventName) return;

    if (eventName === 'loadProgress') {
        let progress = 0;
        if (data.loadFraction !== undefined) {
            progress = Math.round(data.loadFraction * 100);
        } else if (data.percent !== undefined) {
            progress = Math.round(data.percent);
        }
        if (progress > currentProgress) {
            updateProgress(progress);
        }
    }

    if (eventName === 'startInitFunctionOrder' && data.type) {
        if (labelText) labelText.innerText = `INICIALIZANDO: ${data.type.toUpperCase()}`;
    } else if (eventName === 'startDataFileEntries') {
        if (labelText) labelText.innerText = "PREPARANDO ARCHIVOS DE DATOS...";
    } else if (eventName === 'performMapLoadFunction') {
        if (labelText) labelText.innerText = "CARGANDO MAPA...";
    } else if (eventName === 'onLogLine' && data.message) {
        let msg = data.message.toUpperCase();
        if (msg.length > 50) msg = msg.substring(0, 47) + "...";
        if (labelText) labelText.innerText = msg;
    }
});

function updateProgress(progress) {
    if (isNaN(progress)) return;
    if (progress > 100) progress = 100;
    currentProgress = progress;

    if (loadbar) {
        loadbar.style.width = `${progress}%`;
        document.documentElement.style.setProperty('--progress-width', `${progress}%`);
    }

    if (percentText) {
        percentText.innerText = `${progress}%`;
    }

    if (progress >= 100) {
        if (labelText) labelText.innerText = "ENTRANDO AL SERVIDOR...";
    }
}
