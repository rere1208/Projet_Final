document.addEventListener('DOMContentLoaded', function() {
    // Récupérer la section de la playlist
    const playlist = document.querySelector('.playlist ul');

    // Récupérer le lecteur audio
    const audioPlayer = document.getElementById('audioPlayer');

    // Récupérer tous les éléments de musique de la playlist
    const musicItems = document.querySelectorAll('.music-item');

    // Index de la musique en cours de lecture dans la playlist
    let currentTrackIndex = 0;

    // Parcourir chaque élément de musique de la playlist
    musicItems.forEach(function(item, index) {
        // Ajouter un gestionnaire d'événements de clic à chaque élément de musique
        item.addEventListener('click', function() {
            playMusic(index); // Lancer la musique correspondante à cet index dans la playlist
        });
    });

    // Fonction pour lancer la lecture de la musique à partir d'un index spécifié
    function playMusic(index) {
        const musicItem = musicItems[index];
        const musicSrc = musicItem.getAttribute('data-src');
        // Mettre à jour la source du lecteur audio avec la source de la musique
        audioPlayer.src = musicSrc;
        // Lancer la musique
        audioPlayer.play();
        // Récupérer le titre de la musique à partir de l'élément
        const musicName = musicItem.querySelector('.music-title').textContent;
        // Mettre à jour le nom de la musique affiché dans le lecteur
        updateCurrentMusicName(musicName);
        // Mettre à jour le fond d'écran en fonction de la musique (si nécessaire)
        updateBackground(musicName);
        // Ajouter la classe 'playing' à l'élément de musique en cours de lecture
        markAsPlaying(musicItem);
        // Mettre à jour l'index de la piste en cours de lecture
        currentTrackIndex = index;
    }

    // Mise à jour du nom de la musique affiché dans le lecteur
    function updateCurrentMusicName(musicName) {
        const musicNameDisplay = document.getElementById('musicNameDisplay');
        musicNameDisplay.textContent = musicName;
    }

    // Mise à jour du fond d'écran en fonction de la musique (à adapter selon vos besoins)
    function updateBackground(musicName) {
        // Cette fonction peut être personnalisée pour changer le fond d'écran en fonction de la musique
        // Ici, je laisse cette fonction vide, mais vous pouvez l'implémenter selon vos préférences
    }

    // Ajouter la classe 'playing' à l'élément de musique en cours de lecture
    function markAsPlaying(element) {
        // Supprimer la classe 'playing' de tous les éléments de musique
        musicItems.forEach(function(item) {
            item.classList.remove('playing');
        });
        // Ajouter la classe 'playing' à l'élément de musique en cours de lecture
        element.classList.add('playing');
    }

    // Gestionnaire d'événement pour détecter la fin de la lecture d'une piste audio
    audioPlayer.addEventListener('ended', function() {
        // Passer à la piste suivante dans la playlist
        playNextTrack();
    });

    // Fonction pour passer à la piste suivante dans la playlist
    function playNextTrack() {
        currentTrackIndex++; // Incrémenter l'index de la piste
        // Vérifier si nous avons atteint la fin de la playlist
        if (currentTrackIndex >= musicItems.length) {
            // Si la playlist est terminée, demander à l'utilisateur s'il veut redémarrer la lecture
            const restart = confirm("La playlist est terminée. Souhaitez-vous redémarrer ?");
            if (restart) {
                // Si l'utilisateur souhaite redémarrer, revenir à la première piste de manière aléatoire
                playMusic(Math.floor(Math.random() * musicItems.length));
            } else {
                // Sinon, arrêter la lecture
                audioPlayer.pause();
                currentTrackIndex = 0; // Réinitialiser l'index de la piste
            }
        } else {
            // Sinon, jouer la piste suivante
            playMusic(currentTrackIndex);
        }
    }

    // Récupérer le bouton de contrôle play/pause
    const playPauseButton = document.getElementById('playPauseButton');
    const playPauseIcon = document.getElementById('playPauseIcon');

    // Ajouter un événement au bouton Play/Pause
    playPauseButton.addEventListener('click', function() {
        // Vérifier l'état de lecture de la musique
        if (audioPlayer.paused) {
            // Si la musique est en pause, démarrer la lecture et mettre à jour l'icône
            audioPlayer.play();
            playPauseIcon.src = "upload/Bouton/pause.jpg";
        } else {
            // Si la musique est en cours de lecture, mettre en pause et mettre à jour l'icône
            audioPlayer.pause();
            playPauseIcon.src = "upload/Bouton/play.jpg";
        }
    });

    // Récupérer les boutons de contrôle du lecteur audio
    const stopButton = document.getElementById('stop');
    const repeatButton = document.getElementById('repeat');
    const randomButton = document.getElementById('random');

    // Ajouter un événement au bouton Stop
    stopButton.addEventListener('click', function() {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
        document.body.classList.add('no-animation'); // Ajouter la classe 'no-animation' au body
    });

    // Ajouter un événement au bouton Répéter
    repeatButton.addEventListener('click', function() {
        audioPlayer.currentTime = 0;
        audioPlayer.play();
    });

    // Ajouter un événement au bouton Aléatoire
    randomButton.addEventListener('click', function() {
        // Lancer la lecture d'une piste aléatoire
        playMusic(Math.floor(Math.random() * musicItems.length));
    });
});
