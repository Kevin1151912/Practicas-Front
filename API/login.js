var urlBackend = "https://practicasapi-production.up.railway.app/";
async function loginUser(loginDTO) {
  const result = await fetch(urlBackend + "usuario/login-credenciales", {
    method: 'POST',
    body: JSON.stringify(loginDTO),
    headers: {
      "Content-type": "application/json"
    }
  })
  return result;
}

async function loginUser1(Usuario) {
  const result = await fetch(urlBackend + "usuario/login-correo", {
    method: 'POST',
    body: JSON.stringify(Usuario),
    headers: {
      "Content-type": "application/json"
    }
  })
  return result;
}

function iniciarSesionCredir() {

  event.preventDefault();
  // Obtener los valores de los campos de entrada
  var codigo = document.getElementById('codigoDirectorCredenciales').value;
  var cedula = document.getElementById('cedulaDirectorCredenciales').value;
  var contraseña = document.getElementById('passwordDirectorCredenciales').value;
  //Creo el objeto loginDTO 

  const loginDTO = {
    codigo,
    cedula,
    contraseña
  }
  console.log(loginDTO)
  //Llamar a la funcion loginUser
  loginUser(loginDTO)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if (data.rolId === 2) {
        localStorage.setItem("Data", JSON.stringify(data))
        window.location.href = "../Paginas/InicioDir.html"
      } else {
        alert("usuario no autorizado")
      }
    })
    .catch(e => {
      console.log(e)
      alert("Credenciales Incorrectas")
    })
}

function iniciarSesionCodir() {

  event.preventDefault();
  // Obtener los valores de los campos de entrada
  var correo = document.getElementById('correoDirectorCorreo').value;
  var contraseña = document.getElementById('passwordDirectorCorreo').value;
  //Creo el objeto Usuario 

  const Usuario = {
    correo,
    contraseña
  }
  console.log(Usuario)
  //Llamar a la funcion loginUser
  loginUser1(Usuario)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if (data.rolId === 2) {
        localStorage.setItem("Data", JSON.stringify(data))
        window.location.href = "../Paginas/InicioDir.html"
      } else {
        alert("usuario no autorizado")
      }
    })
    .catch(e => {
      console.log(e)
      alert("Contraseña o email incorrecto")
    })
}

function iniciarSesionCreEst() {

  event.preventDefault();
  // Obtener los valores de los campos de entrada
  var codigo = document.getElementById('codigoEstudianteCredenciales').value;
  var cedula = document.getElementById('cedulaEstudianteCredenciales').value;
  var contraseña = document.getElementById('passwordEstudianteCredenciales').value;
  //Creo el objeto loginDTO 

  const loginDTO = {
    codigo,
    cedula,
    contraseña
  }
  console.log(loginDTO)
  //Llamar a la funcion loginUser
  loginUser(loginDTO)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if (data.rolId === 1) {
        localStorage.setItem("Data", JSON.stringify(data))
        window.location.href = "../Paginas/inicioEst.html"
      } else {
        alert("usuario no autorizado")
      }
    })
    .catch(e => {
      console.log(e)
      alert("Credenciales Incorrectas")
    })
}

function iniciarSesionCoEst() {

  event.preventDefault();
  // Obtener los valores de los campos de entrada
  var correo = document.getElementById('correoEstudianteCorreo').value;
  var contraseña = document.getElementById('passwordEstudianteCorreo').value;
  //Creo el objeto Usuario 

  const Usuario = {
    correo,
    contraseña
  }
  console.log(Usuario)
  //Llamar a la funcion loginUser
  loginUser1(Usuario)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if (data.rolId === 1) {
        localStorage.setItem("Data", JSON.stringify(data))
        window.location.href = "../Paginas/inicioEst.html"
      } else {
        alert("usuario no autorizado")
      }
    })
    .catch(e => {
      console.log(e)
      alert("Contraseña o email incorrecto")
    })
}

function iniciarSesionCoEmp() {

  event.preventDefault();
  // Obtener los valores de los campos de entrada
  var correo = document.getElementById('correoEmpresaCorreo').value;
  var contraseña = document.getElementById('passwordEmpresaCorreo').value;
  //Creo el objeto Usuario 

  const Usuario = {
    correo,
    contraseña
  }
  console.log(Usuario)
  //Llamar a la funcion loginUser
  loginUser1(Usuario)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if (data.rolId === 4) {
        localStorage.setItem("Data", JSON.stringify(data))
        window.location.href = "../Paginas/inicioEmp.html"
      } else {
        alert("usuario no autorizado")
      }
    })
    .catch(e => {
      console.log(e)
      alert("Contraseña o email incorrecto")
    })
}

function iniciarSesionCoTut() {

  event.preventDefault();
  // Obtener los valores de los campos de entrada
  var correo = document.getElementById('correoTutorCorreo').value;
  var contraseña = document.getElementById('passwordTutorCorreo').value;
  //Creo el objeto Usuario 

  const Usuario = {
    correo,
    contraseña
  }
  console.log(Usuario)
  //Llamar a la funcion loginUser
  loginUser1(Usuario)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if (data.rolId === 3) {
        localStorage.setItem("Data", JSON.stringify(data))
        window.location.href = "../Paginas/inicioTut.html"
      } else {
        alert("usuario no autorizado")
      }
    })
    .catch(e => {
      console.log(e)
      alert("Contraseña o email incorrecto")
    })
}



function iniciarSesionCord() {

  event.preventDefault();
  // Obtener los valores de los campos de entrada
  var correo = document.getElementById('correoCoordinadorCorreo').value;
  var contraseña = document.getElementById('passwordCoordinadorCorreo').value;
  //Creo el objeto Usuario 

  const Usuario = {
    correo,
    contraseña
  }
  console.log(Usuario)
  //Llamar a la funcion loginUser
  loginUser1(Usuario)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if (data.rolId === 6) {
        localStorage.setItem("Data", JSON.stringify(data))
        window.location.href = "../Paginas/inicioCoordinador.html"
      } else {
        alert("usuario no autorizado")
      }
    })
    .catch(e => {
      console.log(e)
      alert("Contraseña o email incorrecto")
    })
}



