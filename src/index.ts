import dotenv from 'dotenv';
import Server from './modules/main/app/server'; 


//Configurar dotenv
dotenv.config();



const server = new Server();

server.listen();