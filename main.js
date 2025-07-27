document.addEventListener('DOMContentLoaded', (event) => {
    const splashScreen = document.getElementById('splash-screen');
    const video = document.getElementById('splash-video');
    const enterButton = document.getElementById('enter-button');

    // Evento para desmutear el video y reproducirlo al hacer clic en el botón
    enterButton.addEventListener('click', () => {
        console.log('Botón Ingresar clickeado.');
        video.muted = false;
        const playPromise = video.play(); // Asegurarse de que el video se reproduzca si no lo hizo

        if (playPromise !== undefined) {
            playPromise.then(_ => {
                console.log('Video reproduciéndose.');
                enterButton.style.display = 'none'; // Ocultar el botón después de hacer clic
                // La redirección a podcast.html se manejará en video.onended
            })
            .catch(error => {
                window.location.href = '/PodCast/podcast.html'; // Redirigir a podcast.html
            })
            .catch(error => {
                console.error('Error al intentar reproducir el video:', error);
                // Si el video no se puede reproducir automáticamente, forzar la transición
                console.log('Forzando transición a podcast.html debido a error de reproducción automática.');
                window.location.href = '/PodCast/podcast.html'; // Redirigir a podcast.html incluso si hay error
            });
        }
    });

    // Ocultar la pantalla de inicio cuando el video termine con efecto de desvanecimiento
    video.onended = () => {
        console.log('Video ha terminado. Transicionando a podcast.html.');
        splashScreen.classList.add('fade-out');
        setTimeout(() => {
            splashScreen.style.display = 'none';
            window.location.href = '/PodCast/podcast.html'; // Redirigir a podcast.html
        }, 500); // Espera a que termine la animación de fadeOut (0.5s)
    };
});