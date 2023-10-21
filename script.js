// Sélectionnez toutes les images de la galerie
const images = document.querySelectorAll('.image-gallery img');

// Ajoutez un gestionnaire d'événement pour chaque image
images.forEach(image => {
    image.addEventListener('click', () => {
        // Réduisez la taille de toutes les images (sauf celle cliquée)
        images.forEach(img => {
            if (img !== image) {
                img.style.transform = 'scale(1)';
            }
        });

        // Agrandissez l'image cliquée
        image.style.transform = 'scale(2)';
    });
});
