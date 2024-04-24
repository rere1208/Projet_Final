document.addEventListener('DOMContentLoaded', function() {
    // Récupérer la section de la playlist
    const playlist = document.querySelector('.playlist ul');

    // Créer une structure de données pour associer chaque musique à son fond d'écran
    const musicBackgrounds = {
        "KINGDOM HEARTS - Dearly Beloved - All Versions 2002-2017": "url('upload/Images/Kingdom_Hearts_Logo.png')",
        "Dont Think Twice": "url('upload/Images/imagekh3.jpg')",
        "Sanctuary (Ending)" : "url('upload/Images/Sactuary.jpg')"
    };

    // Fonction pour ajouter une nouvelle musique à la playlist
    function addMusicToPlaylist(musicName, musicSrc) {
        // Créer un nouvel élément li
        const newMusic = document.createElement('li');
        newMusic.textContent = musicName;
        // Ajouter un gestionnaire d'événements pour lire la musique lorsque l'élément est cliqué
        newMusic.addEventListener('click', function() {
            audioPlayer.src = musicSrc;
            audioPlayer.play();
            updateCurrentMusicName(musicName);
            updateBackground(musicName);
        });
        // Ajouter le nouvel élément li à la liste de lecture
        playlist.appendChild(newMusic);
    }

    // Fonction pour supprimer une musique de la playlist
    function removeMusicFromPlaylist(musicElement) {
        playlist.removeChild(musicElement);
    }

    // Ajouter des musiques existantes à la playlist
    addMusicToPlaylist("KINGDOM HEARTS - Dearly Beloved - All Versions 2002-2017", "upload/music/KINGDOM HEARTS - Dearly Beloved - All Versions 2002-2017.mp4");
    addMusicToPlaylist("Dont Think Twice", "upload/music/Dont Think Twice.mp4");
    addMusicToPlaylist("Sanctuary (Ending)", "upload/music/Sanctuary (Ending).mp4");

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
