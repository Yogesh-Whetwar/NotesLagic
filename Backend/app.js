const connectToMongo=require('./db');  
const express=require('express');  
const cors=require("cors")
connectToMongo();   
const app=express();
app.use(express.json()) //this line is middleware 
app.use(cors())
app.get('/', function (req, res) {
  res.send('hello world')
})  

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/auth'))
app.listen(7000)