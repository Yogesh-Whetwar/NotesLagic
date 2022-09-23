const mongoose=require('mongoose');
 const mongoUri="mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%Compass&directConnection=true&ssl=false"
const connectToMongo=()=>{
    mongoose.connect(mongoUri,()=>{
        console.log("connected to mongo successfully")
    })
}   
module.exports=connectToMongo;