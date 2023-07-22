const  validarCampos  = require("../middelwares/validar-campos");
const  validarJWT  = require("../middelwares/validar-jwt");
const  validaRoles = require("../middelwares/validar-roles");


module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validaRoles
}