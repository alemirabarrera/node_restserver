const { Router} = require("express");
const { check } = require("express-validator"); 
const { validarCampos } = require("../middelwares/validar-campos"); 

const { validarJWT, adminRole } = require("../middelwares"); 
const { crearCategoria,
        obtenerCategorias,
        actualizarCategoria,
        eliminarCategoria } = require("../controllers/categorias");
const { existeCategoriaPorId } = require("../helpers/db-validators");

// middleware personalziado, validar que el id existe. 


const router = Router();

//obtener todas las categorias - publico
router.get('/', obtenerCategorias)

//obtener una categoria por id - publico 
router.get('/:id',[
    check("id","No es un ID valido").isMongoId()
    ,check('id').custom( existeCategoriaPorId) //lanza error si no existe la categoria. 
    ,validarCampos
], obtenerCategorias)

//crear categoria - cualquier con token valido - privado
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
], crearCategoria)

//actualizar registro por ID -cualquier con token valido- privado
router.put('/:id',[
    validarJWT,    
    check("id","No es un ID valido").isMongoId(),
    check('id').custom( existeCategoriaPorId),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos
], actualizarCategoria)

//borrar categoria -solo rol Admin -privado
router.delete('/:id',[
    validarJWT,
    adminRole,
    check("id","No es un ID valido").isMongoId(),
    check('id').custom( existeCategoriaPorId),
    validarCampos,
], eliminarCategoria)

module.exports = router;