const { Router} = require("express");
const { check } = require("express-validator"); 
const { login } = require("../controllers/auth");
const { validarCampos } = require("../middelwares/validar-campos");

const router = Router();

    router.post('/login', [
        check('correo', 'El correo es obligatorio / debe ser un correo valido').isEmail(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        validarCampos
    ], login);

module.exports = router;