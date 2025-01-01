const express=require("express");
const app=express();
const mongoose=require("mongoose");
app.use(express.json());
const jwt=require('jsonwebtoken')

const mongoUrl="mongodb+srv://youssef:1650@cluster0.x6bfu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const JWT_SECRET="7WK5T79u5mIzjIXXi2oI9Fglmgivv7RAJ7izyj9tUyQWWUU888882";

mongoose.connect(mongoUrl).then(()=>{
    console.log("Database connected");
}).catch((e)=>{
    console.log(e);
});

require("./UserDetails")
const User=mongoose.model("UserInfo");

app.get("/",(req,res)=>{
  res.send({status:"started"})
});

app.post('/register',async(req,res)=> {
    const {username,email,password,telephone}=req.body;

   //this part for email should be unique
   const oldUser= await User.findOne({email:email});
   
   if(oldUser){
    return res.send({ data: "Account Already exists!"});
   }

    try{
        await User.create({
           username:username, 
           email:email,
           password:password,
           telephone:telephone
        });
        res.send({status: "ok",data: "User Created"});
    }catch(error){
        res.send({status: "error",data: error});
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Rechercher l'utilisateur par email
        const oldUser = await User.findOne({ email: email });

        if (!oldUser) {
            return res.status(404).send({ data: "User doesn't exist!" });
        }

        // Vérification du mot de passe
        if (password === oldUser.password) {
            // Générer le token
            const token = jwt.sign({ email: oldUser.email }, JWT_SECRET);

            // Envoyer la réponse avec le token
            return res.status(200).send({ status: "ok", data: token });
        } else {
            return res.status(401).send({ error: "Invalid password" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "Server error" });
    }
});

require("./GroupDetails")
const Group=mongoose.model("UserInfo");

app.post('/addgroup',async(req,res)=> {
    const {groupName,firstName,lastName,email,telephone,montant}=req.body;

   //this part for email should be unique
   const oldGroup= await Group.findOne({groupName:groupName});
   
   if(oldUser){
    return res.send({ data: "Group Already exists!"});
   }

    try{
        await Group.create({
           groupName:groupName,
           firstName:firstName,
           lastName:lastName,
           email:email,
           montant:montant,
           telephone:telephone
        });
        res.send({status: "ok",data: "Group Created"});
    }catch(error){
        res.send({status: "error",data: error});
    }
});

app.listen(5001,()=>{
    console.log("Node js server started");
});