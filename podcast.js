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
    // podcastAudio.