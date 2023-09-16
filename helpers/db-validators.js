
const { Categoria, Role, Usuario, Producto } = require("../models");

const esRoleValido = async (rol="") =>{
    const existRole = await Role.findOne({ rol });
    if(!existRole){
        throw new Error(`El rol: ${ rol } no esta registrado en la DB `);
    }
}

const emailExiste = async(correo ="") =>{
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        throw new Error(`El correo: ${ correo } ya esta registrado.`);   
    }
}
  
const existeIdUsuario = async(id ="") =>{
    const existeIdMongo = await Usuario.findById(id);
    if(!existeIdMongo){
        throw new Error(`El id: ${ id } no existe en la DB.`);   
    }
}
const existeCategoriaPorId = async(id ="") =>{
    const existeCategoria = await Categoria.findById(id);
    if(!existeCategoria){
        throw new Error(`El id de categoria: ${ id } no esta registrado.`);   
    }
}
 
const exiteProductoPorId = async (id ="") =>{
    const existeProducto = await Producto.findById(id);
    if(!existeProducto){
        throw new Error(`El id: ${ id } del producto no esta registrado.`);   
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeIdUsuario,
    existeCategoriaPorId,
    exiteProductoPorId
}