const { response }  = require("express");
const { Usuario, Categoria, Producto } = require("../models");
const { ObjectId } = require("mongoose").Types;
const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
];

const buscarUsuarios = async(termino ="", res = response) => {
    const esMongoId = ObjectId.isValid( termino );
    if(esMongoId){
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: (usuario)? [usuario] : []
        });
    }     

    const regex = new RegExp(termino, "i");
    const usuarios = await Usuario.find({         
        $or: [{nombre: regex }, {correo: regex}],
        $and: [{estado: true}]
    });    
    res.status(200).json({
        results: usuarios
    });
}

const buscarCategoria = async(termino = "", res = response) =>{
    const esMongoId = ObjectId.isValid( termino);
    if(esMongoId){
        const categoria = await Categoria.findById(termino);
        return  res.json({
            results: categoria ? [categoria] : []
        })
    }
    const regex = new RegExp(termino, "i");
    const categoria = await Categoria.find({nombre: regex},{estado: true})
    res.status(200).json({ results: categoria});
}
const buscarProductos = async(termino ="", res = response) => {
    const esMongoId = ObjectId.isValid( termino );
    if(esMongoId){
        const producto = await Producto.findById(termino);
        return res.json({
            results: (producto)? [producto] : []
        });
    }
        
    if(termino.match(/\d[^\D]/)){
        const productos = await Producto.find({         
            precio:termino           
        }).gte("precio", termino);  //trae valores mayores e iguales al valor enviado

        return res.json({
            results: (productos)? [productos] : []
        });
    }
    const regex = new RegExp(termino, "i");
    const productos = await Producto.find({         
        $or: [{nombre: regex },{descripcion: regex}],
        $and: [{estado: true}, {disponible:true}]
    }).populate("categoria","nombre");    
    res.status(200).json({
        results: productos
    });
}

const buscar = (req, res =response)=>{
    const  {coleccion, termino} = req.params;
    
    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {
        case 'usuarios': 
            buscarUsuarios(termino, res);
            break;
        case 'categorias':
            buscarCategoria(termino, res);
        break;
        case 'productos':
            buscarProductos(termino, res);
        break;
        default:
            res.status(500).json({
                msg: `Esta busqueda para el la coleccion ${coleccion} aun no esta disponible`
            })
            break;
    }
}


module.exports = {
    buscar
}
