//generamos una instancia de socket,io

const socket = io();

//cuando yo quiero comenzar con la conexion y voy a emitir un mensaje al servidor, puedo ahcer lo siguiente: 
//metodo emit = emitir mensaje
// metodo on = escuchar mensaje

socket.emit("mensaje", "hola, te estoy escribiendo desde el front");

//ahora escuchamos un mensaje del backend

socket.on("saludito", (data)=>{
    console.log(data);
    
})

//recibimos el array de usuarios

socket.on("usuarios",(data)=>{
    const listaUsuarios = document.getElementById("lista-usuarios")
    listaUsuarios.innerHTML = "";

    data.forEach(usuario => {
        listaUsuarios.innerHTML += `<li> ${usuario.nombre} - ${usuario.apellido} </li>`
    })
    
})
