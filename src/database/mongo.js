const mongoose = require('mongoose')

mongoose.connect(process.env.mongolink, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch( err => {
    console.log("Mongoose Exception");
    console.log(process.env.mongolink)
})

mongoose.connection.on('connected', function(){  
    console.log("Mongoose is connected");
 });

 mongoose.connection.on('error', function( err ){  
    console.log("Mongoose connection error: ", err.message);
 });

 mongoose.connection.on('disconnected', function(){
    console.log("Mongoose is disconnected");
});