document.addEventListener('DOMContentLoaded', function() {
    // Récupérer le lecteur audio
    const audioPlayer = document.getElementById('audioPlayer');

    // Index de la musique en cours de lecture dans la playlist
    let currentTrackIndex = 0;

    // Charger la liste de lecture à partir du fichier JSON
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const playlist = data.playlist;
            // Parcourir chaque élément de musique de la playlist
            playlist.forEach(function(item, index) {
                // Créer un élément li pour chaque musique dans la playlist
                const li = document.createElement('li');
                li.classList.add('music-item');
                li.dataset.src = item.src;
                li.innerHTML = `
                    <img src="${item.image}" alt="${item.title}">
                    <p class="music-title">${item.title}</p>
                `;
                // Ajouter un gestionnaire d'événements de clic à chaque élément de musique
                li.addEventListener('click', function() {
                    playMusic(index); // Lancer la musique correspondante à cet index dans la playlist
                });
                // Ajouter l'élément li à la liste de lecture
                document.querySelector('.playlist ul').appendChild(li);
            });
        })
        .catch(error => console.error('Erreur lors du chargement du fichier JSON :', error));

    // Fonction pour lancer la lecture de la musique à partir d'un index spécifié
    function playMusic(index) {
        // Récupérer tous les éléments de musique de la playlist après le chargement du fichier JSON
        const musicItems = document.querySelectorAll('.music-item');
        const musicItem = musicItems[index];
        if (musicItem) {
            const musicSrc = musicItem.dataset.src;
            // Mettre à jour la source du lecteur audio avec la source de la musique
            audioPlayer.src = musicSrc;
            // Lancer la musique
            audioPlayer.play();
            // Récupérer le titre de la musique à partir de l'élément
            const musicName = musicItem.querySelector('.music-title').textContent;
            // Mettre à jour le nom de la musique affiché dans le lecteur
            updateCurrentMusicName(musicName);
            // Ajouter la classe 'playing' à l'élément de musique en cours de lecture
            markAsPlaying(musicItem);
            // Mettre à jour l'index de la piste en cours de lecture
            currentTrackIndex = index;
            // Supprimer la classe 'no-animation' du body pour relancer les animations
            document.body.classList.remove('no-animation');
            // Déclencher la rotation du disque vinyle
            rotateVinyl(true);
        } else {
            console.error("L'élément de la playlist pour l'index spécifié n'est pas défini.");
        }
    }

    // Mise à jour du nom de la musique affiché dans le lecteur
    function updateCurrentMusicName(musicName) {
        const musicNameDisplay = document.getElementById('musicNameDisplay');
        musicNameDisplay.textContent = musicName;
        musicNameDisplay.style.display = 'block'; // Afficher le texte
    }

    // Ajouter la classe 'playing' à l'élément de musique en cours de lecture
    function markAsPlaying(element) {
        // Supprimer la classe 'playing' de tous les éléments de musique
        document.querySelectorAll('.music-item').forEach(function(item) {
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
        const musicItems = document.querySelectorAll('.music-item');
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
            playPauseIcon.src = "upload/Bouton/play.jpg";
            // Déclencher la rotation du disque vinyle
            rotateVinyl(true);
        } else {
            // Si la musique est en cours de lecture, mettre en pause et mettre à jour l'icône
            audioPlayer.pause();
            playPauseIcon.src = "upload/Bouton/pause.jpg";
            // Arrêter la rotation du disque vinyle
            rotateVinyl(false);
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
        updateCurrentMusicName("Aucune"); // Réinitialiser le nom de la musique à "Aucune"
        
        // Supprimer la classe 'playing' de tous les éléments de musique
        document.querySelectorAll('.music-item').forEach(function(item) {
            item.classList.remove('playing');
        });

        // Arrêter la rotation du disque vinyle
        rotateVinyl(false);
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

    // Fonction pour faire tourner le disque vinyle
    function rotateVinyl(rotate) {
        const vinyl = document.querySelector('.vinyl');
        if (rotate) {
            vinyl.style.animationPlayState = 'running'; // Démarrer l'animation de rotation
        } else {
            vinyl.style.animationPlayState = 'paused'; // Mettre en pause l'animation de rotation
        }
    }
});
