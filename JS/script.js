document.addEventListener('DOMContentLoaded', function() {
    // Récupérer la section de la playlist
    const playlist = document.querySelector('.playlist ul');

    // Récupérer le lecteur audio
    const audioPlayer = document.getElementById('audioPlayer');

    // Récupérer tous les éléments de musique de la playlist
    const musicItems = document.querySelectorAll('.music-item');

    // Parcourir chaque élément de musique de la playlist
    musicItems.forEach(function(item) {
        // Ajouter un gestionnaire d'événements de clic à chaque élément de musique
        item.addEventListener('click', function() {
            // Récupérer la source de la musique à partir de l'attribut data-src de l'élément
            const musicSrc = this.getAttribute('data-src');
            // Mettre à jour la source du lecteur audio avec la source de la musique
            audioPlayer.src = musicSrc;
            // Lancer la musique
            audioPlayer.play();
            // Récupérer le titre de la musique à partir de l'élément
            const musicName = this.querySelector('.music-title').textContent;
            // Mettre à jour le nom de la musique affiché dans le lecteur
            updateCurrentMusicName(musicName);
            // Mettre à jour le fond d'écran en fonction de la musique (si nécessaire)
            updateBackground(musicName);
        });
    });

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

    // Récupérer les boutons de contrôle du lecteur audio
    const playButton = document.getElementById('play');
    const pauseButton = document.getElementById('pause');
    const stopButton = document.getElementById('stop');
    const repeatButton = document.getElementById('repeat');

    // Ajouter un événement au bouton Play
    playButton.addEventListener('click', function() {
        audioPlayer.play();
        enableAnimations(); // Réactiver les animations lorsque la musique démarre
    });

    // Ajouter un événement au bouton Pause
    pauseButton.addEventListener('click', function() {
        audioPlayer.pause();
        disableAnimations(); // Désactiver les animations lorsque la musique est en pause
    });

    // Ajouter un événement au bouton Stop
    stopButton.addEventListener('click', function() {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
        disableAnimations(); // Désactiver les animations lorsque la musique est arrêtée
    });

    // Ajouter un événement au bouton Répéter
    repeatButton.addEventListener('click', function() {
        audioPlayer.currentTime = 0;
        audioPlayer.play();
        enableAnimations(); // Réactiver les animations lorsque la musique démarre à nouveau
    });

    // Fonction pour désactiver les animations
    function disableAnimations() {
        document.body.classList.add('no-animation');
    }

    // Fonction pour réactiver les animations
    function enableAnimations() {
        document.body.classList.remove('no-animation');
    }

    // Vérifier l'état de lecture de la musique et désactiver les animations si la musique est en pause
    audioPlayer.addEventListener('pause', function() {
        disableAnimations();
    });

    // Vérifier l'état de lecture de la musique et réactiver les animations si la musique est en cours de lecture
    audioPlayer.addEventListener('play', function() {
        enableAnimations();
    });
});
