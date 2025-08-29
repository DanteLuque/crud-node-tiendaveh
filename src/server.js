import express from 'express';
import db from './config/mysql/mysql.js';
import VehiculoRouter from './modules/vehiculos/routes/vehiculo.route.js';
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.api_v1 = 'v1';

        this.vehiculo_path_v1 = `/api/${this.api_v1}/vehiculos`;

        this.connectDB();
        this.middlewares();
        this.routes();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`👾 I'M ALIVE => PORT: ${this.port}`);
        });
    }

    async connectDB() {
        await db.testConnection();
    }

    middlewares() {
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.vehiculo_path_v1, VehiculoRouter);
    }
}

export default Server;