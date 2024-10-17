document.getElementById('toggleButton').addEventListener('click', function() {
    var trabajosSection = document.getElementById('trabajos');
    var empresasSection = document.getElementById('empresas');

    if (trabajosSection.classList.contains('hidden')) {
        trabajosSection.classList.remove('hidden');
        empresasSection.classList.add('hidden');
    } else {
        trabajosSection.classList.add('hidden');
        empresasSection.classList.remove('hidden');
    }
});