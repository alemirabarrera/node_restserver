const mongoose = require('mongoose');

const dbConnection = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,                       
            useUnifiedTopology: true,
            //useFindAndModify: false,                 
            //useCreateIndex: true              // to handle collection.ensureIndex is deprecated
            });
        console.log('base de datos online');

    } catch (error) {
        console.log(error); 
        throw new Error('Error inicializando la DB');
    }
};

module.exports = {
    dbConnection
}