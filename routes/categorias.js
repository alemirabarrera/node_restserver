const { Router} = require("express");
const { check } = require("express-validator"); 
const { validarCampos } = require("../middelwares/validar-campos"); 

const { validarJWT } = require("../middelwares"); 
const { postCategoria } = require("../controllers/categorias");


const router = Router();


//obtener todas las categorias - publico
router.get('/', (req, res)=>{
    res.json("GET");
})

//obtener una categoria por id - publico 
router.get('/:id', (req, res)=>{
    res.json("GET POR ID");
})

//crear categoria - cualquier con token valido - privado
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarJWT
], postCategoria)

//actualizar registro por ID -cualquier con token valido- privado
router.put('/:id', (req, res)=>{
    res.json("PUT");
})

//borrar categoria -solo rol Admin -privado
router.delete('/:id', (req, res)=>{
    res.json("DELETE");
})

module.exports = router;