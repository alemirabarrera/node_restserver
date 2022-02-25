const { response, request } = require("express");

const usuariosGET = (req=request, res = response)=> {     
    const { q, nombre='no name', apikey, page=1,limit} = req.query;
    const query = req.query;
        

    res.json({
        ok: true,
        msg: "get API controllador",
        q, 
        nombre, 
        apikey,
        page,
        limit
        
    })
}

const usuariosPost =(req, res)=> {
    const {nombre, edad} = req.body;
    

    res.status(201).json({
        ok: true,
        msg: "post API controller",
        nombre,
        edad
    })
}

const usuariosPut = (req, res)=> {    
    const {id} = req.params;

    res.status(500).json({
        ok: true,
        msg: "put API controller",
        id
    })
}

const usuariosPatch =(req, res)=> {
    res.json({
        ok: true,
        msg: "patch API controller"
    })
}

const usuariosDelete =(req, res)=> {
    res.json({
        ok: true,
        msg: "delete API controller"
    })
}


module.exports = {
    usuariosGET,
    usuariosPost,
    usuariosPatch,
    usuariosPut,
    usuariosDelete
}