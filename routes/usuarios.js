const { Router} = require("express");
const { check } = require("express-validator");

const { usuariosGet,
        usuariosPost,
        usuariosDelete,
        usuariosPut,
        usuariosPatch } = require("../controllers/usuarios");
const { esRoleValido, emailExiste, existeIdUsuario } = require("../helpers/db-validators");

//const { validarCampos } = require("../middelwares/validar-campos");
//const { validarJWT } = require("../middelwares/validar-jwt");
//const { adminRole, tieneRole} = require("../middelwares/validar-roles");

const {validarCampos, validarJWT, adminRole, tieneRole} = require("../middelwares");


const router = Router();

    router.get('/', usuariosGet );

    router.put('/:id',[        
        check("id","No es un ID valido").isMongoId(),
        check("id").custom(existeIdUsuario),
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
        validarJWT,
        //adminRole,
        tieneRole('VENTAS_ROL','ADMIN_ROL','USER_ROL'),
        check("id","No es un ID valido").isMongoId(),
        check("id").custom(existeIdUsuario)
        ,validarCampos        
    ], usuariosDelete);


router.patch('/', usuariosPatch );

module.exports = router;