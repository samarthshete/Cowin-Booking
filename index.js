var express=require("express");
var bodyParser=require("body-parser");
  
const mongoose = require('mongoose');
const url = `mongodb+srv://BISHal2055:bishal@cluster0.gketl.mongodb.net/MYPRO?retryWrites=true&w=majority`;

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

var db=mongoose.connection;
var app=express()
  
  
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
  
app.post('/sign_up', function(req,res){
    var name = req.body.username;
    var fathername =req.body.fathername;
    var phone = req.body.phone;
    var email =req.body.mail;
    var id_proof =req.body.proof;
    var id_number = req.body.idnumber;
    var hospital = req.body.hospital;
    var vaccine = req.body.vaccine;
    var dose = req.body.dose;
    var date = req.body.Date;
    var slot = req.body.slot;
  
    var data = {
        "name": name,
        "fathername":fathername,
        "phone":phone,
        "email":email,
        "id_proof":id_proof,
        "id_number":id_number,
        "hospital":hospital,
        "vaccine":vaccine,
        "dose":dose,
        "date":date,
        "slot":slot,
    }
db.collection('details').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Record inserted Successfully");
              
    });
          
    return res.redirect('success.html');
})
  
  
app.get('/',function(req,res){
res.set({
    'Access-control-Allow-Origin': '*'
    });
return res.redirect('index.html');
}).listen(3000)
  
  
console.log("server listening at port 3000");