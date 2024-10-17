document.addEventListener('DOMContentLoaded', function() {
    const users = [
        { id: '312978547', imgId: 'avatar1' }, 
        { id: '1413431128', imgId: 'avatar2' }, 
        { id: '835636047', imgId: 'avatar3' }
    ];

    users.forEach(user => {
        const avatarUrl = `https://dbcacolombia.discloud.app/avatar/${user.id}`; 
        const imgElement = document.getElementById(user.imgId);

        if (imgElement) {
            imgElement.src = avatarUrl;

            imgElement.onerror = function() {
                console.error(`Error al cargar el avatar para el usuario con ID: ${user.id}`);
            };
        } else {
            console.error(`No se encontró el elemento img con id: ${user.imgId}`);
        }
    });
});
