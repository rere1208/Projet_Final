document.addEventListener('DOMContentLoaded', function() {
    // Récupérer le lecteur audio
    const audioPlayer = document.getElementById('audioPlayer');

    // Récupérer les boutons de contrôle
    const playButton = document.getElementById('play');
    const pauseButton = document.getElementById('pause');
    const stopButton = document.getElementById('stop');

    // Récupérer la section de la playlist
    const playlist = document.querySelector('.playlist ul');

    // Fonction pour ajouter une nouvelle musique à la playlist
    function addMusicToPlaylist(musicName, musicSrc, videoId) {
        // Créer un nouvel élément li
        const newMusic = document.createElement('li');
        newMusic.textContent = musicName;
        // Ajouter un gestionnaire d'événements pour lire la musique lorsque l'élément est cliqué
        newMusic.addEventListener('click', function() {
            audioPlayer.src = musicSrc;
            audioPlayer.play();
            updateCurrentMusicName(musicName);
            updateVideoSource(videoId);
        });
        // Ajouter le nouvel élément li à la liste de lecture
        playlist.appendChild(newMusic);
    }

    // Ajouter des musiques existantes à la playlist
    addMusicToPlaylist("KINGDOM HEARTS - Dearly Beloved - All Versions 2002-2017", "upload/music/KINGDOM HEARTS - Dearly Beloved - All Versions 2002-2017.mp4", "video1");
    addMusicToPlaylist("Dont Think Twice", "upload/music/Dont Think Twice.mp4", "video2");
    addMusicToPlaylist("Sanctuary (Ending)", "upload/music/Sanctuary (Ending).mp4.mp4", "video3");

    function updateCurrentMusicName(musicName) {
        const musicNameDisplay = document.getElementById('musicNameDisplay');
        musicNameDisplay.textContent = musicName;
    }

    // Fonction pour mettre à jour l'URL de la vidéo YouTube en fonction de l'identifiant de la vidéo
    function updateVideoSource(videoId) {
        const videoPlayer = document.getElementById('videoPlayer');
        const newSrc = `https://www.youtube.com/embed/${videoId}`;
        videoPlayer.src = newSrc;
    }

    // Ajouter un événement au bouton Play
    playButton.addEventListener('click', function() {
        audioPlayer.play();
    });

    // Ajouter un événement au bouton Pause
    pauseButton.addEventListener('click', function() {
        audioPlayer.pause();
    });

    // Ajouter un événement au bouton Stop
    stopButton.addEventListener('click', function() {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
    });
});
