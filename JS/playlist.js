document.addEventListener('DOMContentLoaded', function() {
    // Récupérer les jaquettes d'albums
    const albumCovers = document.querySelectorAll('.album-covers img');

    // Créer une structure de données pour associer chaque jaquette à son fichier audio
    const musicSrcs = {
        "path_to_audio_1.mp3": "KINGDOM HEARTS - Dearly Beloved - All Versions 2002-2017",
        "path_to_audio_2.mp3": "Dont Think Twice"
        // Ajoutez d'autres associations pour chaque jaquette
    };

    // Ajouter un événement de clic à chaque jaquette
    albumCovers.forEach(function(cover) {
        cover.addEventListener('click', function() {
            const musicSrc = this.getAttribute('data-src');
            const musicName = musicSrcs[musicSrc];
            if (musicSrc && musicName) {
                audioPlayer.src = musicSrc;
                audioPlayer.play();
                updateCurrentMusicName(musicName);
                updateBackground(musicName);
            }
        });
    });

    function updateCurrentMusicName(musicName) {
        const musicNameDisplay = document.getElementById('musicNameDisplay');
        musicNameDisplay.textContent = musicName;
    }

    // Fonction pour mettre à jour le fond d'écran en fonction de la musique
    function updateBackground(musicName) {
        const body = document.querySelector('body');
        const background = musicBackgrounds[musicName];
        if (background) {
            body.style.backgroundImage = background;
            // Ajoute la classe 'rotate' pour démarrer l'animation de rotation de l'image
            body.classList.add('rotate');
            // Ajoute la classe 'fadeInOut' pour démarrer l'effet de fondu enchaîné de l'image
            body.classList.add('fadeInOut');
        }
    }
});
