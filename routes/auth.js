const { Router} = require("express");
const { check } = require("express-validator"); 
const { login, googleSingIn } = require("../controllers/auth");
const { validarCampos } = require("../middelwares/validar-campos");

const router = Router();

    router.post('/login', [
        check('correo', 'El correo es obligatorio / debe ser un correo valido').isEmail(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        validarCampos
    ], login);

    router.post('/google', [
        check('id_token', 'Id_token es necesario').not().isEmpty(),        
        validarCampos
    ], googleSingIn);

module.exports = router;