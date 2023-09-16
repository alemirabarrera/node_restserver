const { response } = require('express');
const { Producto } = require('../models'); 

const crearProducto = async (req, res = response) =>{
    const {usuario, estado, ...resto_data} = req.body;
    let nombreUpper = resto_data.nombre.toUpperCase();
    const productoDB =await Producto.findOne({ nombre: nombreUpper });
    if(productoDB){
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre}, ya existe`
        })
    }
    resto_data.nombre = nombreUpper;        
    resto_data.usuario= req.usuario._id;    

    const producto = await new Producto(resto_data);
    //Guardar DB
    await producto.save();         
    res.status(201).json({
        "msg": "Producto Creado",
        producto
    });
}

const obtenerProductos = async(req, res = response) =>{   
    try {
        const {desde = 0, limite = 5} = req.query;
        const query = {estado: true};                            
        const [total,  productos] = await Promise.all([
                Producto.countDocuments(query)
                ,Producto.find(query)
                .populate("usuario","correo")
                .populate("categoria", "nombre")
                .skip(Number( desde))
                .limit(Number(limite))
        ])
        
        result = {"total_db": total, data: {"count_result": productos.length, productos}}
        res.status(200).json(result);    
    
    } catch (error) {
        res.status(500).json({
            "msg": "Sucedio un error obteniendo los productos - comunicate con el ADMIN"
        })
    }        
 }
 
const obtenerProductoId = async(req, res = response) =>{   
    try {
        const {id} = req.params;
        producto= await Producto.findById(id).populate("usuario","correo").populate("categoria", "nombre")
        result = {data: {"count_result": producto.length, producto}};
        res.status(200).json(result);
    
    } catch (error) {
        res.status(500).json({
            "msg": "Sucedio un error obteniendo producto por ID - comunicate con el ADMIN."
        })
    }   
}

const actualizarProducto = async(req, res = response) =>{ 
    const {id} = req.params;
    const {_id, usuario,estado, ...resto_data} = req.body;                
    if(resto_data.nombre) resto_data.nombre =resto_data.nombre.toUpperCase();        
    resto_data.usuario = req.usuario._id;
    const producto = await Producto.findByIdAndUpdate(id, resto_data ,{new:true})
        
    res.status(200).json({        
        msg: "Producto Actualizado correctamente"
        ,producto
    })
}
const  eliminarProducto = async(req, res = response) =>{   
    const {id} = req.params;    
    const producto = await Producto.findByIdAndUpdate(id,{estado:false}, {new:true});
    res.json({
        "msg": "Producto Eliminado",
        producto
    })
}

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProductoId,
    actualizarProducto,
    eliminarProducto
}