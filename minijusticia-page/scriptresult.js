
async function buscar() {
    const username = localStorage.getItem('username')
    const password = localStorage.getItem('password')
    const esValido = await loginMinijusticia(username, password);
    if (!esValido) {
        alert('Su sesión ha expirado, por favor recargue la página.');
        window.location.href = 'loginminijusticia.html';
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
            
            const responseAntecedentes = await fetch('https://dbcacolombia.discloud.app/antecedentesminijusticia', {
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
            
            const responseMultas = await fetch('https://dbcacolombia.discloud.app/multasminijusticia', {
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
        alert('Por favor, ingrese un documento');
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
                <td>${item._id || 'N/A'}</td>
                <td>${item.articulos || 'N/A'}</td>
                <td>${item.tiempo || 'N/A'}</td>
                <td>${item.endTime || 'N/A'}</td>
                <td>${item.agente || 'N/A'}</td>
                <td><button class="btn-borrar" onclick="borrarantecedente('${item._id}')">Borrar</button> </td> 

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
                <td>${item._id || 'N/A'}</td>
                <td>${item.tipo || 'N/A'}</td>
                <td>${item.articulos || 'N/A'}</td>
                <td>${item.placa || 'N/A'}</td>
                <td>${item.valor || 'N/A'}</td>
                <td>${item.agente || 'N/A'}</td>
                <td><button class="btn-borrar" onclick="borrarmulta('${item._id}')">Borrar</button> </td> 
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


    
    
    window.addEventListener('beforeunload', function () {
        localStorage.removeItem('username');
        localStorage.removeItem('password');
      

    });
    

    async function borrarantecedente(id) {
        const confirmacion = confirm("¿Está seguro de que desea eliminar este antecedente?");
        if (!confirmacion) {
            return; 
        }
        console.log("ID del antecedente a borrar:", id);
    
        const username = localStorage.getItem('username');
        const password = localStorage.getItem('password');
        
        const esValido = await loginMinijusticia(username, password);
        if (!esValido) {
            alert('Su sesión ha expirado, por favor recargue la página.');
            window.location.href = 'loginminijusticia.html';
            return
          
        } 
    
        try {
            const responcedeletedoc = await fetch('https://dbcacolombia.discloud.app/eliminar-antecedente', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ documentId: id }),
            });
    
            if (!responcedeletedoc.ok) { 
                const errorMessage = await responcedeletedoc.text();
                alert(`Error al eliminar el antecedente: ${errorMessage}`);
                return;
            }
    
            const resultado = await responcedeletedoc.text();
            alert(`Resultado: ${resultado}`);
    
           
            const button = document.querySelector(`button[onclick="borrarantecedente('${id}')"]`);
            if (button) {
                const row = button.closest('tr');
                if (row) {
                    row.remove();
                }
            }
        } catch (error) {
            console.error("Error al intentar eliminar el antecedente:", error);
            alert('Ocurrió un error inesperado al eliminar el antecedente.');
        }
    }



   async function borrarmulta(id) {
    const confirmacion = confirm("¿Está seguro de que desea eliminar esta multa?");
    if (!confirmacion) {
        return; 
    }

        console.log("ID del antecedente a borrar:", id);
    
        const username = localStorage.getItem('username');
        const password = localStorage.getItem('password');
        
        const esValido = await loginMinijusticia(username, password);
        if (!esValido) {
            alert('Su sesión ha expirado, por favor recargue la página.');
            window.location.href = 'loginminijusticia.html';
            return
          
        } 
    
        try {
            const responcedeletedoc = await fetch('https://dbcacolombia.discloud.app/eliminar-multas', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ documentId: id }),
            });
    
            if (!responcedeletedoc.ok) { 
                const errorMessage = await responcedeletedoc.text();
                alert(`Error al eliminar el antecedente: ${errorMessage}`);
                return;
            }
    
            const resultado = await responcedeletedoc.text();
            alert(`Resultado: ${resultado}`);
    
           
            const button = document.querySelector(`button[onclick="borrarmulta('${id}')"]`);
            if (button) {
                const row = button.closest('tr');
                if (row) {
                    row.remove();
                }
            }
        } catch (error) {
            console.error("Error al intentar eliminar la multa:", error);
            alert('Ocurrió un error inesperado al eliminar el antecedente.');
        }
      
    }


    async function loginMinijusticia(username, password) {
        const logindata = {
            username: username,
            password: password,
        };
    
        try {
            const response = await fetch('https://dbcacolombia.discloud.app/login-webpage-minijusticia', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ logindata }),
            });
    
            if (response.ok) {
              
                return true;
            } else {
              
                return false;
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al intentar acceder');
            return false;
        }
    }
    