const urlBackend = "practicasapi-production.up.railway.app";

// Función para hacer solicitudes al backend
async function hacerSolicitud(endpoint, method = 'GET', data = null) {
    const url = `https://${urlBackend}/${endpoint}`;

    const requestOptions = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : null,
    };

    try {
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error haciendo la solicitud:", error);
        throw error;
    }
}

// Función para iniciar sesión por credenciales
async function iniciarSesionCredenciales(tipo, codigo, cedula, contraseña) {
    const endpoint = `login-credenciales`;
    const data = { codigo, cedula, contraseña };
    
    try {
        const response = await hacerSolicitud(endpoint, 'POST', data);
        // Manejar la respuesta del backend aquí
        console.log(response);
    } catch (error) {
        // Manejar errores
        console.error(error);
    }
}

// Función para iniciar sesión por correo
async function iniciarSesionCorreo(tipo, correo, contraseña) {
    const endpoint = `login-correo`;
    const data = { correo, contraseña };
    
    try {
        const response = await hacerSolicitud(endpoint, 'POST', data);
        // Manejar la respuesta del backend aquí
        console.log(response);
    } catch (error) {
        // Manejar errores
        console.error(error);
    }
}

function mostrarInformacionUsuario(usuario) {
    const nombreElemento = document.getElementById('nombreUsuario');
    const correoElemento = document.getElementById('correoUsuario');
    const rolElemento = document.getElementById('rolUsuario');
    const codigoElemento = document.getElementById('codigoUsuario');
    const cedulaElemento = document.getElementById('cedulaUsuario');

    // Actualizar los elementos con la información del usuario
    nombreElemento.textContent = usuario.nombre;
    correoElemento.textContent = usuario.correo;
    rolElemento.textContent = usuario.rol;
    codigoElemento.textContent = usuario.codigo;
    cedulaElemento.textContent = usuario.cedula;

    // Mostrar el div después de actualizar la información
    const divUsuario = document.getElementById('divUsuario');
    divUsuario.style.display = 'block';
}