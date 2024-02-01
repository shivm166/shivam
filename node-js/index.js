const express = require('express')
const cors = require('cors')
const path = require('path');
var jwt = require('jsonwebtoken');
const multer  = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })

const bodyParser = require('body-parser')
const app = express()
app.use('/uploads',express.static(path.join(__dirname,'uploads')));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = 4000
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://shivamgauswami86:eUf0RgVrizWIZWfj@cluster0.zbfpd97.mongodb.net/?retryWrites=true&w=majority')



const Users = mongoose.model('Users', 
{ username : String , 
password : String,
likedProducts : [{type: mongoose.Schema.Types.ObjectId, ref:'Products'}]
 });//user table



const Products = mongoose.model('Products', { pname : String , pdesc : String , price : String , category : String , pimage : String});//product table

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/like-product',(req,res)=>{
    let ProductId = req.body.ProductId;
    let userId=req.body.userId;

    Users.updateOne({_id: userId},{$addToSet:{ likedProducts:ProductId }})
    .then(() =>{
    res.send({message:'Likes saved'})
  })
  .catch(()=>{
    res.send({message:'server error'})
  })

})


app.post('/add-product',upload.single('pimage'),(req,res)=>{
  
  const pname=req.body.pname;
  const pdesc=req.body.pdesc;
  const price=req.body.price;
  const category=req.body.category;
  const pimage=req.file.path;

  const product = new Products({pname,pdesc,price,category,pimage});
  product.save()
  .then(() =>{
    res.send({message:'saved'})
  })
  .catch(()=>{
    res.send({message:'server error'})
  })
  
})

app.get('/get-products', (req, res) => {
  Products.find()
    .then((result) => {
      
      res.send({ message: 'Success', Products: result });
    })
    .catch((err) => {
      res.send({ message: 'server error' });
    });
});

app.post('/signup',(req,res)=>{
  
  const username=req.body.username;
  const password=req.body.password;
  const user = new Users({ username: username , password: password });
  user.save()
  .then(() =>{
    res.send({message: 'saved success.'})
  })
  .catch(()=>{
    res.send({message: 'server error'})
  })
})

app.post('/login',(req,res)=>{
  
  const username=req.body.username;
  const password=req.body.password;

  Users.findOne({ username:username})
  .then((result) =>{
    
    if(!result){
      res.send({message:'user not found'})
    }else{
      if(result.password == password){
        const token=jwt.sign({
          data: result
        }, 'MYKEY', { expiresIn: '1h' });
        res.send({message:'find successful',token : token,userId : result._id})
      }
      if(result.password != password){
        res.send({message:'password wrong'})
      }
    }
  })
  .catch(()=>{
    res.send({message:'server error'})
  })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})