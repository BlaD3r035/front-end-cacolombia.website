async function obtenerMiembros() {
    const response = await fetch('https://cacolombia.website/miembros');
    const data = await response.json();
    document.getElementById('miembros').innerText = `${data.totalMembers} miembros`;
}


obtenerMiembros();