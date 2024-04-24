document.addEventListener('DOMContentLoaded', function() {
    // Récupérer le lecteur audio
    const audioPlayer = document.getElementById('audioPlayer');

    // Récupérer les boutons de contrôle
    const playButton = document.getElementById('play');
    const pauseButton = document.getElementById('pause');
    const stopButton = document.getElementById('stop');
    const repeatButton = document.getElementById('repeat');

    // Récupérer la barre de progression
    const progressBar = document.getElementById('progressBar');
    const currentTimeDisplay = document.getElementById('currentTime');
    const durationDisplay = document.getElementById('duration');

    // Mise à jour de la barre de progression et des informations temporelles
    function updateProgressBar() {
        if (!isNaN(audioPlayer.duration) && isFinite(audioPlayer.duration)) {
            const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            progressBar.value = progress;
            currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
            durationDisplay.textContent = formatTime(audioPlayer.duration);
        }
    }

    // Formatage du temps au format hh:mm:ss
    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    // Mise à jour de la barre de progression pendant la lecture
    audioPlayer.addEventListener('timeupdate', updateProgressBar);

    // Gestion de l'événement de clic sur la barre de progression
    progressBar.addEventListener('click', function(event) {
        const newPosition = (event.offsetX / this.offsetWidth) * audioPlayer.duration;
        audioPlayer.currentTime = newPosition;
    });

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
