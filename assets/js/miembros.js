async function obtenerMiembros() {
    const response = await fetch('https://dbcacolombia.discloud.app/miembros');
    const data = await response.json();
    document.getElementById('miembros').innerText = `${data.totalMembers} miembros`;
}


obtenerMiembros();