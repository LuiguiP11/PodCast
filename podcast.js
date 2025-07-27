// Importa las librerías de PDF.js desde un CDN.
// Esto evita la necesidad de alojar los archivos pdf.js y pdf.worker.js en tu propio servidor.
import * as pdfjsLib from 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.js';

// Configura el worker de PDF.js para que también use la versión del CDN.
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.js';

document.addEventListener('DOMContentLoaded', (event) => {
    // URL del PDF: Asegúrate de que esta sea la URL accesible del PDF.
    // Si está en GitHub, debe ser la URL "raw" como el audio.
    const pdfUrl = "https://github.com/LuiguiP11/PodCast/raw/main/Voces%20del%20territorio_La%20EPJA%20desde%20la%20identidad%20y%20la%20comunidad.pdf";
    const openPdfBtn = document.getElementById('openPdfBtn');

    if (openPdfBtn) {
        openPdfBtn.addEventListener('click', () => {
            // Abre el PDF en una nueva pestaña
            window.open(pdfUrl, '_blank');
        });
    }

    // Obtener la referencia al elemento de audio del podcast
    const podcastAudio = document.getElementById('podcastAudio');
    // La fuente del audio ya está definida correctamente en el HTML
    // a través de la etiqueta <source>. No es necesario sobrescribirla aquí.
    // podcastAudio.src = "/Podcast.mp3"; // Esta línea debe permanecer comentada o eliminada

    // Obtener referencias a los controles personalizados
    const playPauseBtn = document.getElementById('playPauseBtn');
    const progressBar = document.querySelector('.progress-bar');
    const progressContainer = document.querySelector('.progress-container');
    const volumeSlider = document.getElementById('volumeSlider');

    // Manejador para el botón de Reproducir/Pausar
    playPauseBtn.addEventListener('click', () => {
        if (podcastAudio.paused) {
            podcastAudio.play(); // Reproduce el audio
            playPauseBtn.textContent = '⏸'; // Cambia el icono a pausa
        } else {
            podcastAudio.pause(); // Pausa el audio
            playPauseBtn.textContent = '▶'; // Cambia el icono a reproducir
        }
    });

    // Manejador para actualizar la barra de progreso mientras el audio se reproduce
    podcastAudio.addEventListener('timeupdate', () => {
        // Asegúrate de que la duración sea un número válido para evitar errores de división por cero
        if (!isNaN(podcastAudio.duration) && podcastAudio.duration > 0) {
            const progress = (podcastAudio.currentTime / podcastAudio.duration) * 100;
            progressBar.style.width = `${progress}%`;
        }
    });

    // Manejador para permitir al usuario saltar a una parte del audio haciendo clic en la barra de progreso
    progressContainer.addEventListener('click', (e) => {
        // Asegúrate de que la duración sea un número válido
        if (!isNaN(podcastAudio.duration) && podcastAudio.duration > 0) {
            const width = progressContainer.clientWidth;
            const clickX = e.offsetX;
            const duration = podcastAudio.duration;
            podcastAudio.currentTime = (clickX / width) * duration;
        }
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
