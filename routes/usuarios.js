const { Router} = require("express");
const { check } = require("express-validator");

const { usuariosGET,
        usuariosPost,
        usuariosDelete,
        usuariosPut,
        usuariosPatch } = require("../controllers/usuarios");
const { esRoleValido, emailExiste, existeIdMongo } = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");


const router = Router();


    router.put('/:id',[        
        check("id","No es un ID valido").isMongoId(),
        check("id").custom(existeIdMongo),
        check("rol").custom(esRoleValido),
        validarCampos
    ], usuariosPut);

    router.post('/',[
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password debe tener mas de 6 letras').isLength({min: 6}),        
        check('correo', 'El valor ingresado no es un correo valido').isEmail(),
        check("correo").custom(emailExiste), 
        //check('rol', 'No es un rol permitido').isIn(["ADMIN_ROLE","USER_ROLE"]),
        check("rol").custom(esRoleValido),   
        validarCampos
    ], usuariosPost);

    router.delete('/:id',[
        check("id","No es un ID valido").isMongoId(),
        check("id").custom(existeIdMongo)
        ,validarCampos
    ], usuariosDelete);


router.patch('/', usuariosPatch );

module.exports = router;