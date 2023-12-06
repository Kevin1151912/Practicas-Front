var  urlBackend = "https://practicasapi-production.up.railway.app/";
async function loginUser(loginDTO) {
    const result = await fetch(urlBackend + "usuario/login-credenciales", {
      method: 'POST',
      body:JSON.stringify(loginDTO),
      headers: {
        "Content-type": "application/json"
      }
    })
    return result;
  }
  
  function iniciarSesion() {
  
  event.preventDefault();
  // Obtener los valores de los campos de entrada
  var codigo = document.getElementById('codigoDirectorCredenciales').value;
  var cedula = document.getElementById('cedulaDirectorCredenciales').value;
  var password = document.getElementById('passwordDirectorCredenciales').value;
  //Creo el objeto loginDTO 
  const loginDTO={
    codigo,
    cedula,
    password
  }
    //Llamar a la funcion loginUser
    loginUser(loginDTO)
    .then(res => res.json())
    .then(data=>{
      console.log(data)
      
    })
    .catch(e => {console.log(e)})
  }