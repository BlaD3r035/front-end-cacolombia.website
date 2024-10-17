
document.getElementById('forgot-password-link').addEventListener('click', function(event) {
    event.preventDefault();
    document.querySelector('.login-box').style.display = 'none';
    document.getElementById('forgot-password-panel').style.display = 'block';
});

document.getElementById('back-to-login').addEventListener('click', function(event) {
    event.preventDefault();
    document.querySelector('.login-box').style.display = 'block';
    document.getElementById('forgot-password-panel').style.display = 'none';
});

document.getElementById('register-link').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('login-box').style.display = 'none';
    document.getElementById('register-box').style.display = 'block';
});

document.getElementById('back-to-login-from-register').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('login-box').style.display = 'block';
    document.getElementById('register-box').style.display = 'none';
});

async function loginMinijusticia() {
    const username = document.getElementById('usernameLoginMinijusticia').value;
    const password = document.getElementById('passwordLoginMinijusticia').value;

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
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
            window.location.href = 'dbminijusticiaresult.html';
        } else {
            const errorMessage = await response.text();
            alert(`Error: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('error al intentar acceder ');
    }
}

async function registerMinijusticia() {
    const username = document.getElementById('usernameRegisterMinijusticia').value.trim();
    const funcion = document.getElementById('functionRegisterMiniJusticia').value.trim();
    const password = document.getElementById('passwordRegisterMinijusticia').value.trim();
    const confirmPassword = document.getElementById('confirmPasswordRegisterMinijusticia').value.trim();


    if (!username || !funcion || !password || !confirmPassword) {
        alert('Todos los campos son obligatorios');
        return;
    }

    
    if (password.length < 8) {
        alert('La contraseña debe tener al menos 8 caracteres');
        return;
    }

   
    const hasNumber = /\d/;
    const hasUpperCase = /[A-Z]/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

    if (!hasNumber.test(password)) {
        alert('La contraseña debe contener al menos un número');
        return;
    }

    if (!hasUpperCase.test(password)) {
        alert('La contraseña debe contener al menos una letra mayúscula');
        return;
    }

    if (!hasSpecialChar.test(password)) {
        alert('La contraseña debe contener al menos un carácter especial');
        return;
    }

 
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
    }

    const registerData = {
        username: username,
        funcion: funcion,
        password: password,
        
    };

    try {
        const response = await fetch('https://dbcacolombia.discloud.app/register-webpage-minijusticia', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ registerData }),
        });

        if (response.ok) {
            alert('Registro exitoso, recuerda que tienes que ser autorizado para poder iniciar sesión');
            window.location.href = 'loginminijusticia.html';
        } else {
            const errorMessage = await response.text();
            alert(`Error: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al intentar registrarse');
    }
}
