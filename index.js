import Server from './src/server.js';
import dotenv from 'dotenv';
dotenv.config();

try{
    const server = new Server();
    server.listen();
}catch(error){
    console.error(error);
}