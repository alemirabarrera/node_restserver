const { response } = require('express');
const { Categoria } = require('../models');

//obtenerCategorias - paginado - total - populate
//obtenerCategorias - populate - regresar {} categoria
//actualizarCategoria 
//borrar categoria - estado: false

const obtenerCategorias = async (req, res = response) =>{
    try {
    const {id} = req.params;
    const {desde = 0, limite = 5} = req.query;
    const query = {estado: true};
    let categoria, total=0;
        
    if(id) {
        categoria= await Categoria.findById(id).populate("usuario","correo")
        if(categoria)total = 1;
    } else{
        [total,  categoria] = await Promise.all([
            Categoria.countDocuments(query)
            ,Categoria.find(query).populate("usuario","correo")
            .skip(Number( desde))
            .limit(Number(limite))
        ])
    } 
    result = {"total_db": total, data: {"count_result": categoria.length, categoria}}
    res.status(200).json(result);    

    } catch (error) {
        res.status(500).json({
            "msg": "Sucedio un error obteniendo las categorias, cominicate con el Admin."
        })
    }    
       
}

const crearCategoria = async (req, res = response) =>{
   
    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB =await Categoria.findOne({ nombre });
    if(categoriaDB){
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre}, ya existe`
        })
    }
    //generar la data a guardar 
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = await new Categoria(data);
    //Guardar DB
    await categoria.save();
    
    res.status(201).json(categoria);

}


const actualizarCategoria = async (req, res = response) =>{
    const {id} = req.params;        
    const {_id,usuario, estado, ...rest_data} = req.body;
    rest_data.nombre =rest_data.nombre.toUpperCase();
    rest_data.usuario = req.usuario._id;        
    const categoria = await Categoria.findByIdAndUpdate(id, rest_data ,{new:true})
        
    res.status(200).json({        
        msg: "Categoria Actualizada correctamente"
        ,categoria
    })
}

const eliminarCategoria = async (req, res = response) =>{
    const {id} = req.params;        
    //borrado fisicos
    //const categoria =await Categoria.findByIdAndDelete(id); Se pierde la integridad referencial.
    const categoria = await Categoria.findByIdAndUpdate(id, {estado:false, usuario: req.usuario._id}, {new:true});

    res.status(200).json({        
        msg: "Categoria Eliminada",
        categoria
    })
}

module.exports = {
    crearCategoria, 
    obtenerCategorias, 
    actualizarCategoria,
    eliminarCategoria
}