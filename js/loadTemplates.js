document.addEventListener("DOMContentLoaded", function () {
    // Laden den Header
    fetch('header.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Header konnte nicht geladen werden');
            }
            return response.text();
        })
        .then(data => {
            document.body.insertAdjacentHTML('afterbegin', data);
        })
        .catch(error => {
            console.error('Fehler beim Laden des Headers:', error);
        });

    // Laden den Footer
    fetch('footer.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Footer konnte nicht geladen werden');
            }
            return response.text();
        })
        .then(data => {
            document.body.insertAdjacentHTML('beforeend', data);
        })
        .catch(error => {
            console.error('Fehler beim Laden des Footers:', error);
        });
});