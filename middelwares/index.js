const  validarCampos  = require("../middelwares/validar-campos");
const  validarJWT  = require("../middelwares/validar-jwt");
const  validaRoles = require("../middelwares/validar-roles");
const  ValidarArchivo = require("../middelwares/validar-archivo");

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validaRoles,
    ...ValidarArchivo
} 