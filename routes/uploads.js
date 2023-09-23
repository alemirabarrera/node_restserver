const { Router} = require("express");
const { check } = require("express-validator"); 
const { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary } = require("../controllers/uploads");
const { coleccionesPrmitidas } = require("../helpers");
const { ValidarArchivo, validarCampos } = require("../middelwares");

const router = Router();

router.post("/",[ValidarArchivo,validarCampos],cargarArchivo);

router.put("/:coleccion/:id", [
    check('id','El id debe ser un ID de mongo').isMongoId(),    
    check('coleccion').custom(c => coleccionesPrmitidas(c, ['usuarios','productos'])),
    ValidarArchivo,
    validarCampos
], actualizarImagenCloudinary);

router.get("/:coleccion/:id", [
    check('id','El id debe ser un ID de mongo').isMongoId(),    
    check('coleccion').custom(c => coleccionesPrmitidas(c, ['usuarios','productos'])),    
    validarCampos
], mostrarImagen);

module.exports = router;