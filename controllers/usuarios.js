
const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");


const usuariosGet = async(req=request, res = response)=> {     
    
    const {limite = 5, desde = 0, nombre =""} = req.query;
    let query; 
    if(nombre) query={nombre}; else query={estado: true}

    const [total,  usuarios] = await Promise.all([
        Usuario.countDocuments(query)
        , Usuario.find(query)
        .skip(Number( desde))
        .limit(Number(limite))
    ])
        
    res.json({
        total,
        result_query:{count: usuarios.length, usuarios}                
    })    
}



const usuariosPost =async (req, res)=> {    
    const {nombre, correo, password, rol} = req.body;
    //const {google ,...resto} = req.body;    
    const usuario = new Usuario({nombre, correo, password, rol});  

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //guardar en DB.
    await usuario.save();

    res.status(201).json({
        ok: true,
        msg: "post API controller",
        usuario
    })
}

const usuariosPut = async(req, res)=> {    
    

    const {id} = req.params;
    const {_id, password, google, correo,...resto_data} = req.body;
    //TODO validar contra bd
    if(password){
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto_data.password = bcryptjs.hashSync(password, salt);
    }    
    const usuario = await Usuario.findByIdAndUpdate(id, resto_data,{new:true})
    
    
    res.status(200).json({        
        msg: "Actualizado correctamente"
        ,usuario
    })

}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}


const usuariosDelete = async(req, res)=> {

    const {id} = req.params;
    //borrado fisico
    //const usuario =await Usuario.findByIdAndDelete(id); Se pierde la integridad referencial.

    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false}, {new:true});

    res.json(usuario)
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}