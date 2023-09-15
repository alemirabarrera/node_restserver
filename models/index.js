const Categoria = require('../models/categoria');
const Server = require('../models/server');
const Role = require('./role');
const Usuario = require('./usuario');


//const  validarCampos  = require("../middelwares/validar-campos");

module.exports = {
    Categoria,
    Role,
    Usuario,
    Server
}