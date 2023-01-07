import cors from "cors";
import express, { Application } from 'express';
import testRoutes from "../../routes/apiTest.routes";
class Server {
    private app: Application;
    private port:String;
    private apiPaths = {
        
        test:'/api/test'
}

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';  
        this.middlewares();
        this.routes();

    }
      //TODO conectar bd

      async dbConnection(){
        // try {
        //     await db.authenticate();
        //     console.log('Database online');
        // } catch (error) {
        //     throw new Error( 'error');
        // }
    }

    middlewares(){
        //CORS
        this.app.use(cors())

        //Lectura del body
        this.app.use(express.json());

        //Carpeta publica
        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use(this.apiPaths.test,testRoutes)
        this.app.get("/", (_req, res) => res.status(200).json({ ok: true }));

    }


    listen(){
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo en puerto!!' + this.port);
        })
    }
}export default Server;