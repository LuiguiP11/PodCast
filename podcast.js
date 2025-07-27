import * as pdfjsLib from '/pdfjs/pdf.js';

pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdfjs/pdf.worker.js';

document.addEventListener('DOMContentLoaded', (event) => {
    const pdfUrl = "/Voces%20del%20territorio_La%20EPJA%20desde%20la%20identidad%20y%20la%20comunidad.pdf"; 
    const openPdfBtn = document.getElementById('openPdfBtn');

    if (openPdfBtn) {
        openPdfBtn.addEventListener('click', () => {
            window.open(pdfUrl, '_blank');
        });
    }

    // Nuevos elementos de audio
    const podcastAudio = document.getElementById('podcastAudio');
    podcastAudio.src = "/Podcast.mp3";
    const playPauseBtn = document.getElementById('playPauseBtn');
    const progressBar = document.querySelector('.progress-bar');
    const progressContainer = document.querySelector('.progress-container');
    const volumeSlider = document.getElementById('volumeSlider');

    // Control de Reproducir/Pausar
    playPauseBtn.addEventListener('click', () => {
        if (podcastAudio.paused) {
            podcastAudio.play();
            playPauseBtn.textContent = '⏸'; // Icono de pausa
        } else {
            podcastAudio.pause();
            playPauseBtn.textContent = '▶'; // Icono de reproducir
        }
    });

    // Actualizar barra de progreso
    podcastAudio.addEventListener('timeupdate', () => {
        const progress = (podcastAudio.currentTime / podcastAudio.duration) * 100;
        progressBar.style.width = `${progress}%`;
    });

    // Permitir saltar en la canción al hacer clic en la barra de progreso
    progressContainer.addEventListener('click', (e) => {
        const width = progressContainer.clientWidth;
        const clickX = e.offsetX;
        const duration = podcastAudio.duration;
        podcastAudio.currentTime = (clickX / width) * duration;
    });

    // Control de volumen
    volumeSlider.addEventListener('input', () => {
        podcastAudio.volume = volumeSlider.value;
    });

    // Cuando el audio termina, resetear el botón y la barra
    podcastAudio.addEventListener('ended', () => {
        playPauseBtn.textContent = '▶';
        progressBar.style.width = '0%';
    });
});