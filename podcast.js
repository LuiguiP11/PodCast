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