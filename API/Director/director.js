var  urlBackend = "https://practicasapi-production.up.railway.app/";
cargarInformacion()

async function getDirectorId(id){
    const result=await fetch(urlBackend+"datos-director/"+id,{
        method:'GET'
    })
    return result;
}

function cargarInformacion(){

    

   const usuario=JSON.parse(localStorage.getItem("Data"))
   document.getElementById("nombreUsuarioDir").innerHTML=usuario.nombre 
   document.getElementById("correoUsuarioDir").innerHTML=usuario.correo
   if(usuario.rolId===2){
    
   document.getElementById("rolUsuarioDir").innerHTML="Director"

   getDirectorId(usuario.id)
   .then(res=>res.json())
   .then(data=>{
    console.log(data)
    document.getElementById("codigoUsuarioDir").innerHTML=data.codigo 
    document.getElementById("cedulaUsuarioDir").innerHTML=data.cedula

    
   })
   .catch(err=>{
    console.log(err)
   })

   
   }


}

async function findListEmpresas(){
    const result=await fetch(urlBackend+"datos-empresa/list-empresa",{
        method:'GET'
    })
    return result
}
mostrarListadoEmpresas()
function mostrarListadoEmpresas() {
    findListEmpresas()
        .then(res => res.json())
        .then(data => {
            console.log(data)
            let body = ""
            for (const empresa of data) {
                let color = "success"
                let mensaje = "Aceptado"
                if (empresa.estado === false) {
                    color = "danger"
                    mensaje = "Pendiente"
                }
                body += `<tr>
            <td>
            <h6 class="mb-0 text-sm">${empresa.usuario.id}
            </h6>
            </td>
            <td>
                <h6 class="mb-0 text-sm">${empresa.usuario.nombre}</h6>
            </td>    
            <td>
                <p class="text-xs text-secondary mb-0">${empresa.usuario.correo}</p>
            </td>
            <td class="align-middle text-center text-sm">
                <span class="mb-0 text-secondary text-xs">Empresa</span>
            </td>
            <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">${empresa.usuario.fechaRegistro.split("T")[0]}</span>
            </td>
            <td class="align-middle">
                <h6 class="mb-0 text-secondary text-xs">${empresa.nit}</h6>
            </td>
            <td class="align-middle text-align">
                <span class="mb-0 text-secondary text-xs">${empresa.representante}</span>
            </td>
            <td class="align-middle">
                <h6 class="mb-0 text-center text-xs text-secondary">${empresa.convenio}</h6>
            </td>
            <td class="align-middle text-center text-sm">
                <span class="badge badge-sm bg-gradient-${color}">${mensaje}</span>
            </td>
            <td class="align-middle text-center text-sm" onclick="documentosEmpresa(${empresa.id})">
           
<svg data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="text-primary" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
<path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
</svg>
            </td>
        </tr>`
            }
            document.getElementById("tablaEmpresas").innerHTML = body;

        })
        .catch(e => {
            console.log(e)
        })
}

function documentosEmpresa(id){
    findDocuementoByIdEmpresa(id)
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        let body = ""
            for (const documento of data) {
               
                body += `<tr>
            <td>
                <h6 class="mb-0 text-sm">${documento.titulo}</h6>
            </td>
            <td>
                <p class="text-xs text-secondary mb-0">${documento.ruta}</p>
            </td>
            
            <td class="align-middle text-center text-sm"  >
           <button onclick="downloadDocumento('${documento.ruta}')">
           <svg xmlns="http://www.w3.org/2000/svg" class="text-primary" width="16" height="16" fill="currentColor" class="bi bi-cloud-arrow-down-fill" viewBox="0 0 16 16">
           <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2m2.354 6.854-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 9.293V5.5a.5.5 0 0 1 1 0v3.793l1.146-1.147a.5.5 0 0 1 .708.708z"/>
         </svg>
           </button>
            </td>
        </tr>`
            }

        
        document.getElementById("tablaDocumento").innerHTML = body;
    })
    .catch(err=>{
        console.log(err)
    })
}

async function findDocuementoByIdEmpresa(id){
    const result=await fetch(urlBackend+"docProyectoEmp/"+id,{
        method:'GET'
    })
    return result;
}

async function findListEstudiantes(){
    const result=await fetch(urlBackend+"datos-estudiante/list-estudiante",{
        method:'GET'
    })
    return result
}

mostrarListadoEstudiantes()

function mostrarListadoEstudiantes() {
    findListEstudiantes()
        .then(res => res.json())
        .then(data => {
            console.log(data)
            let body = ""
            let bodyPracticantes = ""
            for (const estudiante of data) {
                let color = "success"
                let mensaje = "Aceptado"
                if (estudiante.estado === false) {
                    color = "danger"
                    mensaje = "Rechazado"
                } else {
                    bodyPracticantes += ` <tr>
                <td>
                    <h6 class="mb-0 text-sm">${estudiante.usuario.id}</h6>
                </td>
                <td>
                    <h6 class="mb-0 text-sm">${estudiante.usuario.nombre}</h6>
                </td>
                <td>
                    <p class="text-xs text-secondary mb-0">${estudiante.usuario.correo}</p>
                </td>
                <td class="align-middle text-center text-sm">
                    <span class="mb-0 text-secondary text-xs">Estudiante</span>
                </td>
                <td class="align-middle text-center">
                    <span class="text-secondary text-xs font-weight-bold">${estudiante.usuario.fechaRegistro.split("T")[0]}</span>
                </td>
                <td class="align-middle">
                    <h6 class="mb-0 text-secondary text-xs">${estudiante.codigo}</h6>
                </td>
                <td class="align-middle text-capitalize">
                    <span class="mb-0 text-secondary text-xs">${estudiante.cedula}</span>
                </td>
                <td class="align-middle">
                    <h6 class="mb-0 text-center text-xs text-secondary">${estudiante.semestre}</h6>
                </td>
                <td class="align-middle">
                    <h6 class="mb-0 text-center text-xs text-secondary">${estudiante.creditoAprobado}</h6>
                </td>
                <td class="align-middle text-center text-sm">
                    <span class="badge badge-sm bg-gradient-${color}">${mensaje}</span>
                </td>
            </tr>`
                }
                body += ` <tr>
            <td>
                <h6 class="mb-0 text-sm">${estudiante.usuario.id}</h6>
            </td>
            <td>
                <h6 class="mb-0 text-sm">${estudiante.usuario.nombre}</h6>
            </td>
            <td>
                <p class="text-xs text-secondary mb-0">${estudiante.usuario.correo}</p>
            </td>
            <td class="align-middle text-center text-sm">
                <span class="mb-0 text-secondary text-xs">Estudiante</span>
            </td>
            <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">${estudiante.usuario.fechaRegistro.split("T")[0]}</span>
            </td>
            <td class="align-middle">
                <h6 class="mb-0 text-secondary text-xs">${estudiante.codigo}</h6>
            </td>
            <td class="align-middle text-capitalize">
                <span class="mb-0 text-secondary text-xs">${estudiante.cedula}</span>
            </td>
            <td class="align-middle">
                <h6 class="mb-0 text-center text-xs text-secondary">${estudiante.semestre}</h6>
            </td>
            <td class="align-middle">
                <h6 class="mb-0 text-center text-xs text-secondary">${estudiante.creditoAprobado}</h6>
            </td>
            <td class="align-middle text-center text-sm">
                <span class="badge badge-sm bg-gradient-${color}">${mensaje}</span>
            </td>
        </tr>`
            }
            document.getElementById("tablaEstudiantes").innerHTML = body;
            document.getElementById("listaPracticantes").innerHTML = bodyPracticantes;
        })
        .catch(e => {
            console.log(e)
        })
}

async function findListTutores(){
    const result=await fetch(urlBackend+"obtutor/list",{
        method:'GET'
    })
    return result
}
mostrarListadoTutores()
function mostrarListadoTutores(){
    findListTutores()
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        let body=""
        for (const tutor of data) {
            body+=`<tr>
            <td>
                <h6 class="mb-0 text-sm">${tutor.usuario.id}</h6>
            </td>
            <td>
                <h6 class="mb-0 text-sm">${tutor.usuario.nombre}</h6>
            </td>
            <td>
                <p class="text-xs text-secondary mb-0">${tutor.usuario.correo}</p>
            </td>
            <td class="align-middle text-center text-sm">
                <span class="mb-0 text-secondary text-xs">Tutor</span>
            </td>
            <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">${tutor.usuario.fechaRegistro.split("T")[0]}</span>
            </td>
            <td class="align-middle">
                <h6 class="mb-0 text-secondary text-xs">${tutor.cedula}</h6>
            </td>
        </tr>`
        }
        document.getElementById("tablaTutores").innerHTML=body;

    })
    .catch(e=>{
        console.log(e)
    })
}

async function findListUsuarios(){
    const result=await fetch(urlBackend+"usuario/list-usuario",{
        method:'GET'
    })
    return result
}
mostrarListadoUsuarios()
function mostrarListadoUsuarios(){
    findListUsuarios()
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        let body=""
        for (const usuario of data) {
            body+=`<tr>
            <td>
                <h6 class="mb-0 text-sm">${usuario.id}</h6>
            </td>
            <td>
                <h6 class="mb-0 text-sm">${usuario.nombre}</h6>
            </td>
            <td>
                <p class="text-xs text-secondary mb-0">${usuario.correo}</p>
            </td>
            <td class="align-middle text-center text-sm">
                <span class="mb-0 text-secondary text-xs">${usuario.rolId}</span>
            </td>
            <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">${usuario.fechaRegistro.split("T")[0]}</span>
            </td>
        </tr>`
        }
        document.getElementById("tablaUsuarios").innerHTML=body;

    })
    .catch(e=>{
        console.log(e)
    })
}

async function findListProyectos(){
    const result=await fetch(urlBackend+"docProyectoEmp/list-docs",{
        method:'GET'
    })
    return result
}
mostrarListadoProyectos()
function mostrarListadoProyectos(){
    findListProyectos()
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        let body=""
        for (const proyecto of data) {
            let color="success"
            let mensaje="Aceptado"
            if(proyecto.proyecto.estadoPostulacion===false){
                color="danger"
                mensaje="Pendiente"
           }
            body+=`<tr>
            <td>
                <h6 class="mb-0 text-sm">${proyecto.proyecto.empresaId}</h6>
            </td>
            <td>
                <p class="text-xs text-secondary mb-0">${proyecto.proyecto.tutorId}</p>
            </td>
            <td class="align-middle text-center text-sm">
                <span class="mb-0 text-secondary text-xs">${proyecto.titulo}</span>
            </td>
            <td class="align-middle text-center text-sm">
                <span class="mb-0 text-secondary text-xs">${proyecto.ruta}</span>
            </td>
            <td class="align-middle text-center text-sm">
                <span class="badge badge-sm bg-gradient-${color}">${mensaje}</span>
            </td>
        </tr>`
        }
        document.getElementById("tablaProyectos").innerHTML=body;

    })
    .catch(e=>{
        console.log(e)
    })
}

function guardarUsuario() {
    console.log('Guardando usuario...');

    var formData = new FormData(document.getElementById('formUsuarios'));

    fetch('https://practicasapi-production.up.railway.app/usuario/guardar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(formData.entries()))
    })
    .then(response => {
        console.log('Respuesta del backend:', response);
        if (!response.ok) {
            throw new Error('Error al guardar el usuario');
        }
        return response.json();
    })
    .then(data => {
        console.log('Usuario guardado con éxito', data);
    })
    .catch(error => {
        console.error('Error al guardar el usuario:', error);
    });

    $('#modalUsuario').modal('hide')
}

function guardarEstudiante() {
    console.log('Guardando estudiante...');

    var formData = new FormData(document.getElementById('formDatosEstudiante'));

    var estadoSelect = document.getElementById('estadoPostulacion');
    var estadoValue = estadoSelect.options[estadoSelect.selectedIndex].value;

    formData.append('estadoPostulacion', estadoValue);

    fetch('https://practicasapi-production.up.railway.app/estudiante/guardar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(formData.entries()))
    })
    .then(response => {
        console.log('Respuesta del backend:', response);
        if (!response.ok) {
            throw new Error('Error al guardar el estudiante');
        }
        return response.json();
    })
    .then(data => {
        console.log('Estudiante guardado con éxito', data);
    })
    .catch(error => {
        console.error('Error al guardar el estudiante:', error);
    });

    $('#modalEstudiante').modal('hide');
}

function guardarDirector() {
    console.log('Guardando director...');

    var formData = new FormData(document.getElementById('formDatosDirector'));

    fetch('https://practicasapi-production.up.railway.app/director/guardar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(formData.entries()))
    })
    .then(response => {
        console.log('Respuesta del backend:', response);
        if (!response.ok) {
            throw new Error('Error al guardar el estudiante');
        }
        return response.json();
    })
    .then(data => {
        console.log('Director guardado con éxito', data);
    })
    .catch(error => {
        console.error('Error al guardar el director:', error);
    });

    $('#modalDirector').modal('hide');
}

function guardarTutor() {
    console.log('Guardando tutor...');

    var formData = new FormData(document.getElementById('formDatosTutor'));

    fetch('https://practicasapi-production.up.railway.app/tutor/guardar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(formData.entries()))
    })
    .then(response => {
        console.log('Respuesta del backend:', response);
        if (!response.ok) {
            throw new Error('Error al guardar el tutor');
        }
        return response.json();
    })
    .then(data => {
        console.log('Tutor guardado con éxito', data);
    })
    .catch(error => {   
        console.error('Error al guardar el tutor:', error);
    });

    $('#modalTutor').modal('hide');
}

function guardarEmpresa() {
    console.log('Guardando empresa...');

    var formData = new FormData(document.getElementById('formDatosEmpresa'));

    fetch('https://practicasapi-production.up.railway.app/empresa/guardar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(formData.entries()))
    })
    .then(response => {
        console.log('Respuesta del backend:', response);
        if (!response.ok) {
            throw new Error('Error al guardar el empresa');
        }
        return response.json();
    })
    .then(data => {
        console.log('Empresa guardado con éxito', data);
    })
    .catch(error => {   
        console.error('Error al guardar el empresa:', error);
    });

    $('#modalEmpresa').modal('hide');
}

function downloadDocumento(key){
   
    downloadPdfDocumentoEmpresa(key)
       .then((res) => res.blob())
       .then((blob) => {
         if (blob.size === 0) {
           alert("No hay documento");
         } else {
           const url = URL.createObjectURL(blob);
           const a = document.createElement("a");
           a.href = url;
           a.download = "documento_"+key;
           document.body.appendChild(a);
           a.click();
         }
       })
       .catch((e) => {
         console.log(e);
       });
 }
 
 async function downloadPdfDocumentoEmpresa(key){
     const result=await fetch(urlBackend+"docEmpresa/download?key="+key,{
         method:'GET'
     })
     return result;
 }

 async function uploaDocumentoEmpresa(id) {
    const { value: { file, title } } = await Swal.fire({
        title: "Upload Image",
        html:
            '<input type="file" id="file" accept="*" aria-label="Upload your profile picture" class="input">' +
            '<input type="text" id="title" class="swal2-input" placeholder="Titulo">',
        focusConfirm: false,
        preConfirm: () => {
            return {
                file: document.getElementById('file').files[0],
                title: document.getElementById('title').value
            };
        },
        showCancelButton: true,
        confirmButtonText: 'Cargar',
        inputValidator: (value) => {
            if (!value.file) {
                return 'You need to select a file';
            }
        }
    });

    if (file) {
        const formDataFile = new FormData();
        formDataFile.append("file", file);
        uploadDocumentoProyecto(title, id, formDataFile)
            .then(res => res.json())
            .then(data => {
                Swal.fire({
                    title: "El documento :" + title + "se cargo con exito"
                });
            })
            .catch(e => {
                console.log(e)
            })
    }

}


async function uploadDocumentoProyecto(titulo, id, file) {
    const result = await fetch(urlBackend + "docEmpresa/upload/" + titulo + "/" + id, {
        method: 'POST',
        body: file
    })
    return result;
}

async function listaProyectos() {
    const result = await fetch(urlBackend + "obProyectos/list-proyectos", {
        method: 'GET'
    })
    return result;
}
async function listaDocumentoProyectos(id) {
    const result = await fetch(urlBackend + "docProyectoEmp/" + id, {
        method: 'GET'
    })
    return result;
}

cargarListaProytectos()
function cargarListaProytectos() {
    let body = ""

    listaProyectos()
        .then(res => res.json())
        .then(data => {

            console.log("PROYECTOS")
            console.log(data)
            for (const proyecto of data) {
                console.log(proyecto)
                let color = "success"
                let mensaje = "Aceptado"
                if (proyecto.estadoPostulacion === false) {
                    color = "danger"
                    mensaje = "Pendiente"
                }
                body += `<tr>
        <td>
            <h6 class="mb-0 text-sm">${proyecto.empresa.usuario.nombre}</h6>
        </td>
        <td>
            <p class="text-xs text-secondary mb-0">${proyecto.tutor.usuario.nombre} CC ${proyecto.tutor.cedula}</p>
        </td>
        <td>
        <p class="text-xs text-secondary mb-0"> ${proyecto.tutor.cedula}</p>
    </td>
        <td class="align-middle text-center text-sm">
                <span class="badge badge-sm bg-gradient-${color}">${mensaje}</span>
            </td>
            <td class="align-middle text-center text-sm" >
            <a type="button" onclick="documentosEmpresa(${proyecto.id})">
            <svg data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="text-primary" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
<path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
</svg>
            </a>
            </td>
            <td class="align-middle text-center text-sm" >
            
            <a type="button" class="text-info mb-1" onclick="uploaDocumentoEmpresa(${proyecto.id})">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-upload-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 0a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 4.095 0 5.555 0 7.318 0 9.366 1.708 11 3.781 11H7.5V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11h4.188C14.502 11 16 9.57 16 7.773c0-1.636-1.242-2.969-2.834-3.194C12.923 1.999 10.69 0 8 0m-.5 14.5V11h1v3.5a.5.5 0 0 1-1 0"/>
</svg>
            </a>
            </td>
       
    </tr>`
            }

            document.getElementById("listaProyectos").innerHTML = body
        })
        .catch(err => {
            console.log(err)
        })

}


$(document).ready(function() {
    // Función para revertir los cambios
    function revertirCambios() {
        // Reemplazar los inputs con los valores originales
        nombreSpan.html(nombreOriginal);
        correoSpan.html(correoOriginal);
        rolSpan.html(rolOriginal);
        codigoSpan.html(codigoOriginal);
        cedulaSpan.html(cedulaOriginal);

        // Eliminar el botón Guardar y el botón Revertir
        guardarBtn.remove();
    }

    // Obtener los elementos span que contienen los datos
    var nombreSpan = $('#nombreUsuarioDir');
    var correoSpan = $('#correoUsuarioDir');
    var rolSpan = $('#rolUsuarioDir');
    var codigoSpan = $('#codigoUsuarioDir');
    var cedulaSpan = $('#cedulaUsuarioDir');

    // Guardar los valores originales
    var nombreOriginal = nombreSpan.text();
    var correoOriginal = correoSpan.text();
    var rolOriginal = rolSpan.text();
    var codigoOriginal = codigoSpan.text();
    var cedulaOriginal = cedulaSpan.text();

    // Manejar el clic en el ícono de editar
    $('.fas.fa-user-edit').click(function() {
        // Revertir los cambios si el botón Revertir existe
        if ($('#revertirBtn').length) {
            revertirCambios();
            return;
        }

        // Reemplazar los elementos span con inputs
        nombreSpan.html('<input type="text" id="inputNombre" value="' + nombreOriginal + '">');
        correoSpan.html('<input type="text" id="inputCorreo" value="' + correoOriginal + '">');
        rolSpan.html('<input type="text" id="inputRol" value="' + rolOriginal + '">');
        codigoSpan.html('<input type="text" id="inputCodigo" value="' + codigoOriginal + '">');
        cedulaSpan.html('<input type="text" id="inputCedula" value="' + cedulaOriginal + '">');

        // Crear un nuevo botón Guardar
        var guardarBtn = $('<button class="btn btn-primary" id="guardarBtn">Guardar</button>');

        // Crear un nuevo botón Revertir
        var revertirBtn = $('<button class="btn btn-secondary" id="revertirBtn">Revertir</button>');

        // Insertar los botones después de la lista
        $('.list-group').after(guardarBtn).after(revertirBtn);

        // Manejar el clic en el botón Guardar
        guardarBtn.click(function() {
            // Obtener los nuevos valores de los inputs
            var nuevoNombre = $('#inputNombre').val();
            var nuevoCorreo = $('#inputCorreo').val();
            var nuevoRol = $('#inputRol').val();
            var nuevoCodigo = $('#inputCodigo').val();
            var nuevaCedula = $('#inputCedula').val();

            // Mostrar los nuevos valores en la consola
            console.log('Nuevo Nombre:', nuevoNombre);
            console.log('Nuevo Correo:', nuevoCorreo);
            console.log('Nuevo Rol:', nuevoRol);
            console.log('Nuevo Código:', nuevoCodigo);
            console.log('Nueva Cédula:', nuevaCedula);

            // Reemplazar los inputs con los nuevos valores
            nombreSpan.html(nuevoNombre);
            correoSpan.html(nuevoCorreo);
            rolSpan.html(nuevoRol);
            codigoSpan.html(nuevoCodigo);
            cedulaSpan.html(nuevaCedula);

            // Eliminar el botón Guardar y el botón Revertir
            guardarBtn.remove();
            revertirBtn.remove();
        });

        // Manejar el clic en el botón Revertir
        revertirBtn.click(revertirCambios);
    });
});