const { response, request } = require('express');
const  Usuario  = require("../models/usuario");
const bcryptjs = require('bcryptjs');

const usuariosGet = async(req = request, res = response) => {

    // const { q='select * from users', nombre = 'No name', apikey, page = 1, limit } = req.query;
    const {limite = 5, desde=0 } = req.query;
    const query = {estado: true};

    const [total, usuarios] = await Promise.all(
        [Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
        ])

    res.json({ 
        total,   
        usuarios    
    });
}

const usuariosPost = async (req, res = response) => {    
    const  {nombre, correo, password, rol}  = req.body;
    const  usuario = new Usuario({nombre, correo, password, rol});   
    
    //Emcriptar la contra
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);


    //Guardar en DB
    await usuario.save();
    
    res.json({        
        usuario
    });
}

const usuariosPut = async (req, res = response) => {
    const { id } = req.params;
    const { _id, password, google,correo, ...rest}=req.body;
    //TO DO VALIDAR CONTRA DB
    if(password){
        //Emcriptar la contra
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);

    }
    const usuario = await Usuario.findByIdAndUpdate(id, rest);

    res.json(usuario);
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = async (req, res = response) => {
    const {id} = req.params;
    //fisicamente lo borramos de la DB.
    //const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});


    res.json(usuario);
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}