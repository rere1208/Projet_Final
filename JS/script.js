document.addEventListener('DOMContentLoaded', function() {
    // Récupérer le lecteur audio
    const audioPlayer = document.getElementById('audioPlayer');
    
    // Index de la musique en cours de lecture dans la playlist
    let currentTrackIndex = 0;
    
    // Déclarer la variable musicItems globalement
    let musicItems;

    // Charger la liste de lecture à partir du fichier JSON
   fetch('https://api-musique-backend.onrender.com/api/v1/musique')
    .then(response => response.json())
    .then(data => {
        const musics = data.musics; // Accéder à la propriété "musics" dans les données renvoyées
        musics.forEach(function(music, index) {
            const li = document.createElement('li');
            li.classList.add('music-item');
            // Remplacez 'https://votre-serveur.com/chemin-vers-votre-repertoire-audio/' par le chemin réel de votre répertoire audio sur votre serveur
            li.dataset.src = `https://api-musique-backend.onrender.com/api/v1/music/${music.src}`;

            li.innerHTML = `
                <img src="https://api-musique-backend.onrender.com/api/v1/images/${music.image}" alt="${music.title}"><!-- Utilisation du chemin correct pour l'image -->
                <p class="music-title">${music.title}</p>
            `;
            li.addEventListener('click', function() {
                playMusic(index);
                const vinylCover = document.querySelector('.vinyl-cover');
                vinylCover.src = `https://api-musique-backend.onrender.com/api/v1/images/${music.image}`; // Utilisation du chemin correct pour l'image
                const vinylCenterImage = document.querySelector('.vinyl img');
                vinylCenterImage.src = `https://api-musique-backend.onrender.com/api/v1/images/${music.image}`; // Utilisation du chemin correct pour l'image
            });
            document.querySelector('.playlist ul').appendChild(li);
        });
        musicItems = document.querySelectorAll('.music-item');
    })
    .catch(error => console.error('Erreur lors du chargement du fichier JSON :', error));




    // Fonction pour lancer la lecture de la musique à partir d'un index spécifié
    function playMusic(index) {
        // Récupérer tous les éléments de musique de la playlist après le chargement du fichier JSON
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
            playPauseIcon.src = "upload/Bouton/play-removebg-preview.png";
            // Déclencher la rotation du disque vinyle
            rotateVinyl(true);
        } else {
            // Si la musique est en cours de lecture, mettre en pause et mettre à jour l'icône
            audioPlayer.pause();
            playPauseIcon.src = "upload/Bouton/pause-removebg-preview.png";
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

        // Mettre à jour l'image de la jaquette avec celle de la piste aléatoire
        const randomMusicItem = musicItems[currentTrackIndex];
        const randomMusicImage = randomMusicItem.querySelector('img');
        const vinylCover = document.querySelector('.vinyl-cover');
        vinylCover.src = randomMusicImage.src;

        // Mettre à jour l'image au centre du vinyle avec l'image de la piste aléatoire
        const vinylCenterImage = document.querySelector('.vinyl img');
        vinylCenterImage.src = randomMusicImage.src;
    });

    // Fonction pour faire tourner le disque vinyle
    function rotateVinyl(rotate) {
        const vinyl = document.querySelector('.vinyl');
        const vinylCover = document.querySelector('.vinyl-cover');
        if (rotate) {
            vinyl.style.animationPlayState = 'running'; // Démarrer l'animation de rotation
            vinylCover.style.animationPlayState = 'running'; // Démarrer l'animation de la jaquette
        } else {
            vinyl.style.animationPlayState = 'paused'; // Mettre en pause l'animation de rotation
            vinylCover.style.animationPlayState = 'paused'; // Mettre en pause l'animation de la jaquette
        }
    }
});

