$(document).ready(function () {
    // Funktion, um den aktiven Link zu unterstreichen
    function highlightActiveLink() {
        $('.nav-link').removeClass('active');

        // Durchlaufe alle Sections
        $('section').each(function () {
            const sectionTop = $(this).offset().top;
            const sectionBottom = sectionTop + $(this).outerHeight();
            const scrollPosition = $(window).scrollTop() + $(window).height() / 2;

            // Wenn die Scroll-Position innerhalb des Abschnitts liegt
            if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
                $('.nav-link[href="#' + $(this).attr('id') + '"]').addClass('active');
            }
        });
    }

    // Beim Scrollen die aktive Markierung aktualisieren
    $(window).scroll(function () {
        highlightActiveLink();
    });

    // Beim Laden der Seite die aktive Markierung setzen
    highlightActiveLink();

    // Hover-Effekt für die Links
    $('.nav-link').hover(
        function () {
            // Text vergrößern und fett machen
            $(this).css({
                'font-size': '1.75rem',
                'font-weight': '700'
            });
        },
        function () {
            // Zurück zum ursprünglichen Stil
            $(this).css({
                'font-size': '1.5rem',
                'font-weight': '400'
            });
        }
    );

    // Burger-Menü: Automatisch öffnen/schließen bei Hover
    if ($(window).width() <= 767) {
        $('.burger-menu').hover(
            function () {
                $('#burger-toggle').prop('checked', true);
            },
            function () {
                $('#burger-toggle').prop('checked', false);
            }
        );

        // Menü schließen, wenn der Nutzer die Maus aus dem Menü bewegt
        $('.nav-menu').mouseleave(function () {
            $('#burger-toggle').prop('checked', false);
        });
    }
});