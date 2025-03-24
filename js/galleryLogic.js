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
    $('.next-button').click(function (e) {
        e.stopPropagation();
        moveGallery('next');
    });

    $('.prev-button').click(function (e) {
        e.stopPropagation();
        moveGallery('prev');
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
        $cardsContainer.css('transform', `translateX(${-currentIndex * cardWidth - diffX}px)`);
    });

    $cardsContainer.on('touchend', function (e) {
        if (!isSwiping) return;
        isSwiping = false;

        const endX = e.originalEvent.changedTouches[0].clientX;
        const diffX = startX - endX;

        // Richtung des Swipes
        if (diffX > 50) {
            moveGallery('next');
        } else if (diffX < -50) {
            moveGallery('prev');
        } else {
            $cardsContainer.css('transform', `translateX(${-currentIndex * cardWidth}px)`);
        }
    });

    // Link-Handling 
    $('.projekt').click(function (e) {
        // Nur ausführen wenn nicht auf Nav-Buttons geklickt wurde
        if (!$(e.target).closest('.nav-button').length && 
        !$(e.target).hasClass('arrow-icon') &&
        !$(e.target).closest('.card-link').length) {
            const projectLink = $(this).find('.card-link').attr('href');
            if (projectLink) window.location.href = projectLink;
        }
    });

});