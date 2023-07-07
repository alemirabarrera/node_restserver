const mongoose = require('mongoose');

const dbConnection = async() =>{
    try {  
          
        await mongoose.connect(process.env.MONGODB_CNN_ATLAS);
        console.log("Base de datos Online")

    } catch (error) {
        console.log(error);
        throw new Error('error en la base de datos/ inicializando la DB');
    }   
}

module.exports = {
    dbConnection

}