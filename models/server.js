const express = require('express');
const cors = require('cors');


class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath ='/usuarios';

        //Middlewares
        this.middlewares();
        //rutas de mi applicacion
        this.routes();
    }

    middlewares(){
        //CORS
        this.app.use(cors());
        // Lectura y parseo del body
        this.app.use(express.json());

        //directorio publico
        this.app.use(express.static("public"));

    }

    routes(){
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen(){        
        this.app.listen( this.port, ()=>{
            console.log("Running server on port:", this.port);
        })
    }
}


module.exports = Server;