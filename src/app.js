/** Websocket**/
//libreria
//socket.io

//la comunicacion se realizza entre 2 endpoints y cada endpoint se conoce como socket

//Levantamos un servidor simple

import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import viewsRouter from './routes/views.router.js';
import productManager from './managers/ProductManager.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const httpServer = app.listen(8080, () => console.log('Server running on port 8080'));
const socketServer = new Server(httpServer);

// Configuración de Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/', viewsRouter);

// WebSocket
socketServer.on('connection', socket => {
    console.log('Cliente conectado');
    
    // Enviar productos actuales al cliente que se conecta
    socket.emit('updateProducts', productManager.getProducts());

    socket.on('addProduct', data => {
        try {
            const newProduct = productManager.addProduct(data);
            socketServer.emit('updateProducts', productManager.getProducts());
        } catch (error) {
            console.error('Error al agregar producto:', error);
        }
    });

    socket.on('deleteProduct', id => {
        try {
            const deleted = productManager.deleteProduct(Number(id));
            if (deleted) {
                socketServer.emit('updateProducts', productManager.getProducts());
            }
        } catch (error) {
            console.error('Error al eliminar producto:', error);
        }
    });
});

export { socketServer };


