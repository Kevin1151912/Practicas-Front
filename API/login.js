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
  
  function iniciarSesionCredenciales() {
  
    event.preventDefault();
    // Obtener los valores de los campos de entrada
    var codigo = document.getElementById('codigoDirectorCredenciales').value;
    var cedula = document.getElementById('cedulaDirectorCredenciales').value;
    var contraseña = document.getElementById('passwordDirectorCredenciales').value;
    //Creo el objeto loginDTO 
    
    const loginDTO={
      codigo,
      cedula,
      contraseña
    }
    console.log(loginDTO)
      //Llamar a la funcion loginUser
      loginUser(loginDTO)
      .then(res => res.json())
      .then(data=>{
        console.log(data)
        if(data.rolId===2){
            localStorage.setItem("Data", JSON.stringify(data))
          window.location.href="../Paginas/inicioDir.html"
        }else{
          alert("usuario no autorizado")
        }
      })
      .catch(e => {console.log(e)
      alert("Credenciales Incorrectas")})
    }   

    async function loginUser1(Usuario) {
        const result = await fetch(urlBackend + "usuario/login-correo", {
          method: 'POST',
          body:JSON.stringify(Usuario),
          headers: {
            "Content-type": "application/json"
          }
        })
        return result;
      }

    function iniciarSesionCorreo() {
  
        event.preventDefault();
        // Obtener los valores de los campos de entrada
        var correo = document.getElementById('correoDirectorCorreo').value;
        var contraseña = document.getElementById('passwordDirectorCorreo').value;
        //Creo el objeto Usuario 
        
        const Usuario={
          correo,
          contraseña
        }
        console.log(Usuario)
          //Llamar a la funcion loginUser
          loginUser1(Usuario)
          .then(res => res.json())
          .then(data=>{
            console.log(data)
            if(data.rolId===2){
                localStorage.setItem("Data", JSON.stringify(data))
              window.location.href="../Paginas/inicioDir.html"
            }else{
              alert("usuario no autorizado")
            }
          })
          .catch(e => {console.log(e)
          alert("Contraseña o email incorrecto")})
        } 