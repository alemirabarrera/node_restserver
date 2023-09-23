const path = require('path');
const fs = require("fs");

const { response } = require("express");
const { subirArchivo } = require("../helpers");
const {Usuario, Producto } =require("../models");
const cloudinary = require('cloudinary').v2

cloudinary.config(process.env.CLOUDINARY_URL);


const cargarArchivo = async(req, res=response) =>{                   
        try {
            //Imagenes        
            //const nombre = await subirArchivo(req.files, ['txt','md'], "textos");
            const nombre = await subirArchivo(req.files, undefined, "img");
            res.json({
                nombre
            })            
        } catch (error) {
            res.status(400).json({error })
        }
}; 


const actualizarImagenCloudinary = async(req, res= response) =>{
    const {id,  coleccion} = req.params;
    let modelo;  

    switch (coleccion) {
        case 'usuarios':
            modelo =await Usuario.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg:`No existe un usuaro con el id ${id}`
                });
            }
            break;
        case 'productos':
            modelo =await Producto.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg:`No existe un producto con el id ${id}`
                });
            }
        break;
    
        default:
            return res.status(500).json({msg: 'No se ha desarrollado este moduelo'})
        break;
    }

    //limpiar imagenes previas.
        if(modelo.img){
           //borrar ruta imagen anterior
           const nombreImg = modelo.img.split("/").pop();
           const [public_id, extension]  = nombreImg.split(".");
            cloudinary.uploader.destroy(public_id);
        }
        const { tempFilePath } = req.files.archivo;
        const { secure_url } =await cloudinary.uploader.upload(tempFilePath);
        modelo.img = secure_url;
        await modelo.save();

        res.json({modelo})
}


const actualizarImagen = async(req, res= response) =>{
    const {id,  coleccion} = req.params;
    let modelo;  

    switch (coleccion) {
        case 'usuarios':
            modelo =await Usuario.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg:`No existe un usuaro con el id ${id}`
                });
            }
            break;
        case 'productos':
            modelo =await Producto.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg:`No existe un producto con el id ${id}`
                });
            }
        break;
    
        default:
            return res.status(500).json({msg: 'No se ha desarrollado este moduelo'})
        break;
    }

    //limpiar imagenes previas.
    try {
        if(modelo.img){
            //borrar img anterior del server
            const pathImagen = path.join(__dirname,'../uploads', coleccion, modelo.img);
            if(fs.existsSync(pathImagen)){
                fs.unlinkSync(pathImagen);
            }
        }
    } catch (error) {
        res.status(400).json({msg: "No se pudo eleminar la img"})
    }

    const nombre = await subirArchivo(req.files, undefined, coleccion);        
    modelo.img = await nombre;
    await modelo.save();

    res.json(modelo);
}


const mostrarImagen = async (req, res = response)=>{
    const {id, coleccion} = req.params;
    let modelo;  
    try {
        switch (coleccion) {
            case 'usuarios':
                modelo =await Usuario.findById(id);
                if(!modelo){
                    return res.status(400).json({
                        msg:`No existe un usuaro con el id ${id}`
                    });
                }
                break;
            case 'productos':
                modelo =await Producto.findById(id);
                if(!modelo){
                    return res.status(400).json({
                        msg:`No existe un producto con el id ${id}`
                    });
                }
            break;    
            default:
                return res.status(500).json({msg: `No se ha desarrollado este moduelo: ${coleccion}`})
            break;
        }    

        if(modelo.img){
            const pathImagen = path.join(__dirname,'../uploads', coleccion, modelo.img);
            if(fs.existsSync(pathImagen)){
                return res.sendFile(pathImagen);
            }
        }
        //res.json({msg: "falta placeholder - el modelo no tiene IMG"});
        const pathImagenNotFound = path.join(__dirname,'../assets/image-not-found.png');
        res.sendFile(pathImagenNotFound);

        
    } catch (error) {
        res.status(400).json({msg: "No se pudo enviar la Imagen"})
    } 

}

module.exports = {
    cargarArchivo,
    actualizarImagen, 
    mostrarImagen, 
    actualizarImagenCloudinary
}
