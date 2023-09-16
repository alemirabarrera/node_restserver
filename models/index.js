const Categoria = require('../models/categoria');
const Server = require('../models/server');
const Role = require('./role');
const Usuario = require('./usuario');
const Producto = require('./producto');


//const  validarCampos  = require("../middelwares/validar-campos");

module.exports = {
    Producto,
    Categoria,
    Role,
    Usuario,
    Server
}