var mongoose = require('mongoose');

var mongoDB = 'mongodb+srv://Jonay:pendejo@tienda.icbqz.mongodb.net/tienda?retryWrites=true&w=majority';

database = () =>{
    mongoose.connect(mongoDB,{
        useUnifiedTopology:true,
        useCreateIndex: true,
        useNewUrlParser:true
    });
    
    mongoose.Promise=global.Promise;
    
    var db = mongoose.connection;
    
    db.on('error',console.error.bind(console,'MongoDB error de conexion'));

    console.log('mongoDB is connected')
}

module.exports = database
