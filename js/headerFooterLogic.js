$(document).ready(function () {
    // Funktion, um den aktiven Link zu unterstreichen (nur auf index.html)
    function highlightActiveLink() {
  
        if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
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
    }

    // Klick-Handler für Navigation Links
    $('.nav-link').click(function(e) {
        e.preventDefault();
        const target = $(this).attr('href');
        
        // Wenn der Link mit # beginnt (Section auf aktueller Seite)
        if (target.startsWith('#')) {
            // Wenn wir auf der Index-Seite sind, scrollen wir zur Section
            if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
                $('html, body').animate({
                    scrollTop: $(target).offset().top
                }, 800);
            } 
            // Wenn wir auf einer anderen Seite sind, gehen wir zur Index-Seite mit der Section
            else {
                window.location.href = 'index.html' + target;
            }
        } 
        // Normale Links zu anderen Seiten
        else {
            window.location.href = target;
        }
    });

    // Beim Laden der Seite prüfen, ob eine Section in der URL angegeben ist (nur auf index.html)
    if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
        if (window.location.hash) {
            const target = window.location.hash;
            $('html, body').animate({
                scrollTop: $(target).offset().top
            }, 800);
        }
    }

    // Beim Scrollen die aktive Markierung aktualisieren (nur auf index.html)
    if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
        $(window).scroll(function () {
            highlightActiveLink();
        });
    }

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
