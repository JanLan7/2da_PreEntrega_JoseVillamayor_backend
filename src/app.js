/** Websocket**/
//libreria
//socket.io

//la comunicacion se realizza entre 2 endpoints y cada endpoint se conoce como socket

//Levantamos un servidor simple

import express from "express";
import {engine} from "express-handlebars"
import viewsRouter from "./routes/views.router.js"
const app = express();
const PUERTO = 8080;

//middleware

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("./src/public"));

//configuramos express handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars")
app.set("views", "./src/views")

//rutas
app.use("/", viewsRouter)

//importaciones socket.io


import  { Server } from "socket.io";



//listen
const httpServer = app.listen(PUERTO, ()=>{
    console.log(`Escuchando en el puerto: ${PUERTO}`);
    

})

// generamos una instancia de socket.io desde el lado del backend
const io = new Server(httpServer);

//creamos un array de usuarios

const usuarios = [
    {id:1, nombre: "tinki winki", apellido: "Teletubbies"},
    {id:2, nombre: "dipsi", apellido: "Teletubbies"},
    {id:3, nombre: "lala", apellido: "Teletubbies"},
    {id:4, nombre: "Po", apellido: "Teletubbies"},
    {id:5, nombre: "Bebe Sol", apellido: "Teletubbies"}
]


io.on("connection", (socket)=>{
    console.log("un cliente se conecto conmigo");

    socket.on("mensaje", (data)=>{
        console.log(data);
        
    })

    //ahora el servidor va a enviar un mensaje al cliente

    socket.emit("saludito", "Hola front,como estas? ");

    // enviamos un array de usuarios al front
    socket.emit("usuarios",usuarios);
})


