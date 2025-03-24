document.addEventListener("DOMContentLoaded", function() {
    const sliderTrack = document.querySelector(".slider-track");
    const slides = document.querySelectorAll(".slide");
    const prevButton = document.querySelector(".prev-button");
    const nextButton = document.querySelector(".next-button");
    let currentIndex = 0;

    // Navigation
    nextButton.addEventListener("click", () => moveSlide(1));
    prevButton.addEventListener("click", () => moveSlide(-1));

    // Touch-Swipe (optional)
    let startX = 0;
    sliderTrack.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
    });

    sliderTrack.addEventListener("touchend", (e) => {
        const diffX = startX - e.changedTouches[0].clientX;
        if (diffX > 50) moveSlide(1);  // Swipe nach links = nächstes Bild
        else if (diffX < -50) moveSlide(-1);  // Swipe nach rechts = vorheriges Bild
    });

    // Slide bewegen
    function moveSlide(direction) {
        currentIndex = (currentIndex + direction + slides.length) % slides.length;
        sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
});