function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
    }
});


async function buscar() {
    const agente = localStorage.getItem('documento')
    const clave = localStorage.getItem('clave')
    if(!agente || !clave){
        alert('su sesión ha expirado,porfavor recargue la pagina ')
        return
    }
    const nombre = document.getElementById('nombreInput').value.trim().toLowerCase();
    
    if (nombre) {
        const responseCedula = await fetch('https://dbcacolombia.discloud.app/buscar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre: nombre }),
        });
        
        if (responseCedula.ok) {
            const dataCedula = await responseCedula.json();
            console.log(dataCedula)
            actualizarInformacion(dataCedula);

            const responseLicencia = await fetch('https://dbcacolombia.discloud.app/licencia', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: dataCedula.userId }),
            });
            
            if (responseLicencia.ok) {
                const dataLicencia = await responseLicencia.json();
                actualizarLicencia(dataLicencia);
            } else {
                console.error('No se encontró la licencia');
                nolicencia();
            }
            const responceobservaciones = await fetch('https://dbcacolombia.discloud.app/observaciones', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: dataCedula.userId }),
            });
            
            if (responceobservaciones.ok) {
                const dataobservaciones = await responceobservaciones.json();
                actualizarobservaciones(dataobservaciones);
            } else {
                noobservaciones()
                console.error('No se encontró las observaciones');

            }

            const responcebyc = await fetch('https://dbcacolombia.discloud.app/byc', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: dataCedula.userId }),
            });
            
            if (responcebyc.ok) {
                const databyc = await responcebyc.json();
                actualizarbyc(databyc);
            } else {
                nobyc()
                console.error('No se encontró busqueda y captura');

            }
            
            const responseAntecedentes = await fetch('https://dbcacolombia.discloud.app/antecedentes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: dataCedula.userId }),
            });
            
            if (responseAntecedentes.ok) {
                const dataAntecedentes = await responseAntecedentes.json();
                actualizarAntecedentes(dataAntecedentes);
            } else {
                noantecedentes();
                console.error('No se encontraron antecedentes');
            }
            
            const responseMultas = await fetch('https://dbcacolombia.discloud.app/multas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: dataCedula.userId }),
            });
            
            if (responseMultas.ok) {
                const multas = await responseMultas.json();
                actualizarMultas(multas);
            } else {
                nomultas();
                console.error('No se encontraron multas');
            }
            
            const responseVehiculos = await fetch('https://dbcacolombia.discloud.app/vehiculos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: dataCedula.userId }),
            });
            
            if (responseVehiculos.ok) {
                const vehiculos = await responseVehiculos.json();
                actualizarVehiculos(vehiculos);
            } else {
                novehiculos();
                console.error('No se encontraron vehículos');
            }
            
        } else {
            alert('No se encontró al usuario');
        }
        
    } else {
        alert('Por favor, ingrese un nombre');
    }
}



async function buscarplaca() {
    const agente = localStorage.getItem('documento')
    const clave = localStorage.getItem('clave')
    if(!agente || !clave){
        alert('su sesión ha expirado,porfavor recargue la pagina ')
        return
    }
    const placa = document.getElementById('placaInput').value.trim().toUpperCase();
    
    if (placa) {
        const responseCedula = await fetch('https://dbcacolombia.discloud.app/buscarplaca', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ placa: placa }),
        });
        
        if (responseCedula.ok) {
            const dataCedula = await responseCedula.json();
                console.log(dataCedula);
                actualizarInformacion(dataCedula);
            
            const responseLicencia = await fetch('https://dbcacolombia.discloud.app/licencia', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: dataCedula.userId }),
            });

            if (responseLicencia.ok) {
                const dataLicencia = await responseLicencia.json();
                actualizarLicencia(dataLicencia);
            } else {
                console.error('No se encontró la licencia');
                nolicencia();
            }
            const responceobservaciones = await fetch('https://dbcacolombia.discloud.app/observaciones', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: dataCedula.userId }),
            });
            
            if (responceobservaciones.ok) {
                const dataobservaciones = await responceobservaciones.json();
                actualizarobservaciones(dataobservaciones);
            } else {
                noobservaciones()
                console.error('No se encontró las observaciones');

            }
            const responcebyc = await fetch('https://dbcacolombia.discloud.app/byc', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: dataCedula.userId }),
            });
            
            if (responcebyc.ok) {
                const databyc = await responcebyc.json();
                actualizarbyc(databyc);
            } else {
                nobyc()
                console.error('No se encontró busqueda y captura');

            }

            const responseAntecedentes = await fetch('https://dbcacolombia.discloud.app/antecedentes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: dataCedula.userId }),
            });

            if (responseAntecedentes.ok) {
                const dataAntecedentes = await responseAntecedentes.json();
                actualizarAntecedentes(dataAntecedentes);
            } else {
                noantecedentes();
                console.error('No se encontraron antecedentes');
            }

            const responseMultas = await fetch('https://dbcacolombia.discloud.app/multas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: dataCedula.userId }),
            });

            if (responseMultas.ok) {
                const multas = await responseMultas.json();
                actualizarMultas(multas);
            } else {
                nomultas();
                console.error('No se encontraron multas');
            }

            const responseVehiculos = await fetch('https://dbcacolombia.discloud.app/vehiculos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: dataCedula.userId }),
            });

            if (responseVehiculos.ok) {
                const vehiculos = await responseVehiculos.json();
                actualizarVehiculos(vehiculos);
            } else {
                novehiculos();
                console.error('No se encontraron vehículos');
            }

        } else {
            alert('No se encontró la placa');
        }

    } else {
        alert('Por favor, ingrese una placa');
    }
}



function actualizarInformacion(data) {
    const colombianacionalidad = ['colombia', 'colombiana', 'colombiano', 'col'];
    if (colombianacionalidad.includes(data.nacionalidadic.toLowerCase())) {
        document.getElementById('tipodoc').textContent = 'Cédula';
    } else {
        document.getElementById('tipodoc').textContent = 'Pasaporte';
    }
    document.getElementById('nombre').textContent = data.nombreic || 'N/A';
    document.getElementById('apellido').textContent = data.apellidoic || 'N/A';
    document.getElementById('nacionalidad').textContent = data.nacionalidadic || 'N/A';
    document.getElementById('estatura').textContent = data.estaturaic || 'N/A';
    document.getElementById('sexo').textContent = data.sexoic || 'N/A';
    document.getElementById('fechanacimiento').textContent = data.fechadenacimiento || 'N/A';
    document.getElementById('edad').textContent = data.edadic || 'N/A';
    document.getElementById('gs').textContent = data.tipodesangre || 'N/A';
    document.getElementById('avatar').src = data.avatarUrl || 'https://images-ext-1.discordapp.net/external/FBgerrz_1GgwxZxGOPHc9LxYbd8a_DkXmeYFiVREepw/https/tr.rbxcdn.com/30DAY-AvatarHeadshot-BEC06510925D375C1D74F12945FE2CDA-Png/420/420/AvatarHeadshot/Png/noFilter?format=webp&width=377&height=377'; 
    document.getElementById('username').textContent = data.username || 'N/A'; 
    document.getElementById('ndoc').textContent = data.documentId.toString() || 'N/A'; 
}


function actualizarLicencia(data) {
    const licenciaTable = document.querySelector('.main-content .section:nth-of-type(1) table');
    
    
    licenciaTable.innerHTML = `
    <tr>
    <th>LICENCIA DE CONDUCIR</th>
    <th>Categoria</th>
    <th>Fecha de expedición</th>
    <th>Restricciones</th>
    </tr>
    <tr>
    <td>SI</td>
    <td>B1</td>
    <td>${data.exp || 'N/A'}</td>
    <td>${data.restriccion || 'N/A'}</td>
        </tr>
        `;
    }


    function actualizarobservaciones(data) {
        const observacionestable = document.querySelector('.main-content .section:nth-of-type(5) table');
        
        
        observacionestable.innerHTML = `
        <tr>
        <th>OBSERVACIONES</th>
       
        </tr>
        <tr>
       
        <td>${data.observaciones || 'N/A'}</td>
            </tr>
            `;
            
        }
        function noobservaciones(data) {
            const observacionestable = document.querySelector('.main-content .section:nth-of-type(5) table');
            
            
            observacionestable.innerHTML = `
            <tr>
            <th>OBSERVACIONES</th>
           
            </tr>
            <tr>
           
            <td>N/A</td>
                </tr>
                `;
                
            }

    function actualizarbyc(data){
        if(data.byc === true){
            document.getElementById('byc').textContent ="EL SUJETO SE ENCUENTRA EN BUSQUEDA Y CAPTURA";
        }else{
            document.getElementById('byc').textContent ="";
            
        }
    }

    function nobyc(){
    }

    function nolicencia() {
        const licenciaTable = document.querySelector('.main-content .section:nth-of-type(1) table');
        
        
        licenciaTable.innerHTML = `
        <tr>
        <th>LICENCIA DE CONDUCIR</th>
        <th>Categoria</th>
        <th>Fecha de expedición</th>
        <th>Restricciones</th>
        </tr>
        <tr>
        <td>NO</td>
        <td>N/A</td>
        <td>'N/A'</td>
        <td>'N/A'</td>
        </tr>
        `;
    }
    function actualizarAntecedentes(data) {
        const antecedentesTable = document.querySelector('.main-content .section:nth-of-type(2) table');
    
       
        const rows = antecedentesTable.querySelectorAll('tr:not(:first-child)');
        rows.forEach(row => row.remove());
    
     
        data.forEach(item => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${item.articulos || 'N/A'}</td>
                <td>${item.tiempo || 'N/A'}</td>
                <td>${item.agente || 'N/A'}</td>

            `;
            antecedentesTable.appendChild(newRow);
        });
    }

    function noantecedentes(data) {
        const antecedentesTable = document.querySelector('.main-content .section:nth-of-type(2) table');
    
        
        const rows = antecedentesTable.querySelectorAll('tr:not(:first-child)');
        rows.forEach(row => row.remove());
    
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>'N/A'</td>
                <td>'N/A'</td>
                <td>'N/A'</td>
            `;
            antecedentesTable.appendChild(newRow);
       
    }


    function actualizarMultas(data) {
        const multastable = document.querySelector('.main-content .section:nth-of-type(3) table');
    
       
        const rows = multastable.querySelectorAll('tr:not(:first-child)');
        rows.forEach(row => row.remove());
    
        
        data.forEach(item => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${item.articulos || 'N/A'}</td>
                <td>${item.placa || 'N/A'}</td>
                <td>${item.valor || 'N/A'}</td>
                <td>${item.agente || 'N/A'}</td>
            `;
            multastable.appendChild(newRow);
        });
    }

    function nomultas() {
        const multatable = document.querySelector('.main-content .section:nth-of-type(3) table');
    
        
        const rows = multatable.querySelectorAll('tr:not(:first-child)');
        rows.forEach(row => row.remove());
    
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>'N/A'</td>
                <td>'N/A'</td>
                <td>'N/A'</td>
                <td>'N/A'</td>
            `;
            multatable.appendChild(newRow);
       
    }



    function actualizarVehiculos(data) {
        const vehiculosTable = document.querySelector('.main-content .section:nth-of-type(4) table');
    
        const rows = vehiculosTable.querySelectorAll('tr:not(:first-child)');
        rows.forEach(row => row.remove());
    
        data.forEach(item => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${item.placa || 'N/A'}</td>
                <td>${item.nombredelvehiculo || 'N/A'}</td>
                <td>${item.color || 'N/A'}</td>
            `;
            vehiculosTable.appendChild(newRow);
        });
    }
    
    function novehiculos() {
        const vehiculosTable = document.querySelector('.main-content .section:nth-of-type(4) table');
    
        const rows = vehiculosTable.querySelectorAll('tr:not(:first-child)');
        rows.forEach(row => row.remove());
    
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>'N/A'</td>
            <td>'N/A'</td>
            <td>'N/A'</td>
        `;
        vehiculosTable.appendChild(newRow);
    }


     function openmultamenu() {
       const agente = localStorage.getItem('documento')
        if(!agente){
            alert('su sesión ha expirado, porfavor recargar la pagina')
            return
        }
        document.getElementById('multarModal').style.display = 'block';
        document.getElementById('textmultarep').innerText = `verifique que los siguientes datos sean correctos: 
        documento agente encargado: ${agente}
         al enviar la multa queda como responsable del procedimiento y sus datos serán guardados en el registro`;
        
    };
    
    function cerrarMulta() {
        document.getElementById('multarModal').style.display = 'none';
    }
    async function log() {
        const numeroDocumento = document.getElementById('campo1log').value;
        const clave = document.getElementById('campo2log').value;
    
        if (clave !== '3001' && clave !== '4001') {
            alert('Clave incorrecta');
            return;
        }
    
        try {
            const response = await axios.post('https://dbcacolombia.discloud.app/buscar', { nombre: numeroDocumento });
            if (response.status === 200) {
                alert('Inicio de sesión exitoso');
                localStorage.setItem('documento', numeroDocumento);
                localStorage.setItem('clave', clave);
                document.getElementById('logModal').style.display = 'none';
            }
        } catch (error) {
            alert('Error al iniciar sesión. Verifica los datos');
        }
    }
    
    window.addEventListener('beforeunload', function () {
        localStorage.removeItem('documento');
        localStorage.removeItem('clave');
    });
    

    
 
    
    async function enviarMulta() {
        const tipo = document.getElementById('tipomulta').value.trim();
        const ndoc = document.getElementById('campo2').value.trim();
        const articulos = document.getElementById('campo3').value.trim();
        const placa = document.getElementById('campo4').value.trim().toUpperCase();
        const valormulta = document.getElementById('campo5').value.trim();
        const agente = localStorage.getItem('documento')
        const clave = localStorage.getItem('clave')

        if(!agente || !clave){
            alert('su sesión a expirado, porfavor recargue la pagina')
        }
        if (!tipo || !ndoc || !articulos || !placa || !valormulta || !agente || !clave) {
            alert('Por favor, complete todos los campos.');
            return;
        }
    
        const ndocRegex = /^\d{10}$/;
        const agenteRegex = /^\d{10}$/;

        const placaRegex = /^[A-Z]{3}-\d{3}$/;
        if (!placaRegex.test(placa) && placa !== 'N/A') {
            alert('La placa debe tener el formato XXX-000 (3 letras seguidas de 3 números).');
            return;
        }
    
        if (!Number.isInteger(Number(valormulta))) {
            alert('El valor de la multa debe ser un número entero.');
            return;
        }
    
        if (clave === '3001' || clave === '4001') {
            try {
                const responsemulta = await fetch('https://dbcacolombia.discloud.app/buscar-por-multa', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ tipo, ndoc, articulos, placa, valormulta, agente }),
                });
    
                if (responsemulta.ok) {
                    cerrarMulta();
                    alert('Multa enviada');
                } else {
                    const errorMessage = await responsemulta.text();
                    alert(`Error: ${errorMessage}`);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error al enviar la multa.');
            }
        } else {
            alert('Clave incorrecta');
        }
    }
    
    window.onclick = function (event) {
        if (event.target == document.getElementById('multarModal')) {
            cerrarMulta();
        }
    }
    
