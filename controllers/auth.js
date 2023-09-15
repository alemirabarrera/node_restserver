const { response } = require("express");
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");

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
        //verificar la contra 
        const validPoassword = bcryptjs.compareSync( password, usuario.password);                
        if(!validPoassword){
            return res.status(400).json({
                "msg": "Usuario/ password no son correctos - Password"
            })
        }        
        //si el usuario esta activo
        if(!usuario.estado){
            return res.status(400).json({
                "msg": "El usuario ya no se encuentra activo"
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

const googleSingIn = async(req, res= response)=>{
    const { id_token } = req.body
    try {
        const {nombre, img, correo}= await googleVerify(id_token);                
        let usuario = await Usuario.findOne({correo});
        if(!usuario){
            const data ={
                nombre,
                correo,
                password: 'pasw123',
                img,
                rol: 'USER_ROL',
                google: true
            }
            usuario = new Usuario(data)
            await usuario.save();            
        }

        //SI el usuario en DB esta en status false.
        if(!usuario.estado){
            return res.status(401).json({
                msg: "Hable con el administrador, usuario bloqueado"
            });
        }
        //generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: "El token no se pudo verificar"
        })
        
    }
    
}

module.exports = {
    login,
    googleSingIn
}