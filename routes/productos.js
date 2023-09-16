const { Router} = require("express");
const { check } = require("express-validator"); 
const { validarCampos } = require("../middelwares/validar-campos"); 
const { validarJWT, adminRole } = require("../middelwares");  
const { crearProducto, obtenerProductos, obtenerProductoId, actualizarProducto, eliminarProducto } = require("../controllers/productos");
const { existeCategoriaPorId, exiteProductoPorId } = require("../helpers/db-validators");


const router = Router();

//obtener todas las categorias - publico
router.get('/', obtenerProductos)

//obtener una categoria por id - publico 
router.get('/:id',[
    check("id","No es un ID valido").isMongoId(),
    check('id').custom( exiteProductoPorId),
    validarCampos
], obtenerProductoId)

//crear categoria - cualquier con token valido - privado
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    //check('estado', 'El estado es obligatorio').not().isEmpty(), //no es obligatorio
    check("categoria","la categoria no es un ID valido").isMongoId(),
    check('categoria').custom( existeCategoriaPorId),        
    validarCampos,
], crearProducto)

//actualizar registro por ID -cualquier con token valido- privado
router.put('/:id',[
    validarJWT,    
    check("id","No es un ID valido").isMongoId(),
    check('id').custom( exiteProductoPorId),    
    //check("categoria","la categoria no es un ID valido").isMongoId(),
    //check('categoria').custom( existeCategoriaPorId), //obliga al usuario siempre a enviarlo
    validarCampos
], actualizarProducto)

//borrar categoria -solo rol Admin -privado
router.delete('/:id',[
    validarJWT,
    adminRole,
    check("id","No es un ID valido").isMongoId(),
    check('id').custom( exiteProductoPorId),
    validarCampos,
], eliminarProducto) 

module.exports = router;
