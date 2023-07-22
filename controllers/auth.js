const { response } = require("express");
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req, res = response) =>{
const {correo, password } = req.body;

    try {
        //verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if(!usuario){
           return res.status(400).json({
                "msg": "Usuario/ password no son correctos - Correo"
            })
        }
        
        //si el usuario esta activo
        if(!usuario.estado){
            return res.status(400).json({
                "msg": "El usuario ya no se encuentra activo"
            })
        }

        //verificar la contra 
        
        const validPoassword = bcryptjs.compareSync( password, usuario.password);                
        if(!validPoassword){
            return res.status(400).json({
                "msg": "Usuario/ password no son correctos - Password"
            })
        }

        //generar el JWT
        const token = await generarJWT(usuario.id);


        res.json({
            msg: "Login ok",
            usuario,     
            token   
        })
    
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Algo salio mal, hable con el administrador"
        })
    }

 
}

module.exports = {
    login
}