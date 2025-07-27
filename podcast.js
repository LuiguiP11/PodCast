// Importa las librerías de PDF.js. Asegúrate de que las rutas sean correctas
// si las estás sirviendo localmente desde tu proyecto Vercel.
// Si PDF.js no está en la raíz de tu proyecto, estas rutas también necesitarán ser ajustadas.
import * as pdfjsLib from '/pdfjs/pdf.js';

pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdfjs/pdf.worker.js';

document.addEventListener('DOMContentLoaded', (event) => {
    // URL del PDF: Asegúrate de que esta sea la URL accesible del PDF.
    // Si está en GitHub, debe ser la URL "raw" como el audio.
    // He asumido que está en la misma ubicación raw de GitHub que el audio.
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
    // IMPORTANTE: Elimina o comenta la siguiente línea.
    // La fuente del audio ya está definida correctamente en el HTML
    // a través de la etiqueta <source>. Si la sobrescribes con una ruta relativa
    // que no existe en el servidor de Vercel, el audio no se cargará.
    // podcastAudio.src = "/Podcast.mp3";

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
        // Calcula el porcentaje de progreso
        const progress = (podcastAudio.currentTime / podcastAudio.duration) * 100;
        // Establece el ancho de la barra de progreso
        progressBar.style.width = `${progress}%`;
    });

    // Manejador para permitir al usuario saltar a una parte del audio haciendo clic en la barra de progreso
    progressContainer.addEventListener('click', (e) => {
        // Calcula el ancho total del contenedor de la barra de progreso
        const width = progressContainer.clientWidth;
        // Obtiene la posición X del clic dentro del contenedor
        const clickX = e.offsetX;
        // Obtiene la duración total del audio
        const duration = podcastAudio.duration;
        // Calcula el nuevo tiempo de reproducción y lo establece
        podcastAudio.currentTime = (clickX / width) * duration;
    });

    // Manejador para el control de volumen
    volumeSlider.addEventListener('input', () => {
        // Establece el volumen del audio según el valor del slider
        podcastAudio.volume = volumeSlider.value;
    });

    // Manejador cuando el audio termina de reproducirse
    podcastAudio.addEventListener('ended', () => {
        playPauseBtn.textContent = '▶'; // Restablece el icono a reproducir
        progressBar.style.width = '0%'; // Restablece la barra de progreso a 0%
    });
});
