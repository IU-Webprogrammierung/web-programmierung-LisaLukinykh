$(document).ready(function () {
    // Galerie-Funktionalität
    const $cardsContainer = $('.cards-container');
    const $projects = $('.projekt');
    const cardWidth = $projects.outerWidth(true); 
    let currentIndex = 0; 
    let startX = 0; 
    let isSwiping = false; 

    // Funktion, um die Galerie zu verschieben
    function moveGallery(direction) {
        if (direction === 'next' && currentIndex < $projects.length - 1) {
            currentIndex++;
        } else if (direction === 'prev' && currentIndex > 0) {
            currentIndex--;
        }

        const offset = -currentIndex * cardWidth; 
        $cardsContainer.css('transform', `translateX(${offset}px)`); 
    }

    // Event-Listener für die Navigation
    $('.next-button').click(function () {
        moveGallery('next');
    });

    $('.prev-button').click(function () {
        moveGallery('prev');
    });

    // Event-Listener für die Card-Links
    $('.card-link').click(function (e) {
        e.preventDefault(); 
        const project = $(this).data('project'); 
        alert(`Projekt ${project} wird geladen...`); 
    });

    // Touch-Events für Swiping
    $cardsContainer.on('touchstart', function (e) {
        startX = e.originalEvent.touches[0].clientX; 
        isSwiping = true;
    });

    $cardsContainer.on('touchmove', function (e) {
        if (!isSwiping) return;
        const currentX = e.originalEvent.touches[0].clientX; 
        const diffX = startX - currentX; 

        // Verschiebe die Galerie basierend auf der Differenz
        $cardsContainer.css('transform', `translateX(${-currentIndex * cardWidth - diffX}px)`);
    });

    $cardsContainer.on('touchend', function (e) {
        if (!isSwiping) return;
        isSwiping = false;

        const endX = e.originalEvent.changedTouches[0].clientX; 
        const diffX = startX - endX; 

        // Bestimme die Richtung des Swipes
        if (diffX > 50) { 
            moveGallery('next');
        } else if (diffX < -50) { 
            moveGallery('prev');
        } else { 
            $cardsContainer.css('transform', `translateX(${-currentIndex * cardWidth}px)`);
        }
    });
});