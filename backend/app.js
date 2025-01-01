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

require("./GroupDetails")
const Group=mongoose.model("GroupInfo");

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



app.post("/addgroup",async(req,res)=> {
    const { groupName, firstName, lastName, email, montant, telephone } = req.body;
    try {
        // Vérifiez si le groupe ou l'email existe déjà
        const existingGroup = await Group.findOne({ groupName });
        const existingEmail = await Group.findOne({ email });
    
        if (existingGroup) {
          return res.status(400).send({ status: "error", data: "Group name already exists!" });
        }
    
        if (existingEmail) {
          return res.status(400).send({ status: "error", data: "Email already exists!" });
        }
    
        // Créer un nouveau document
        const newGroup = new Group({
          groupName,
          firstName,
          lastName,
          email,
          montant,
          telephone,
        });
    
        // Sauvegarder dans la base de données
        await newGroup.save();
    
        // Réponse en cas de succès
        res.send({ status: "ok", data: "Group created successfully!" });
      } catch (error) {
        console.error("Error saving group:", error);
        res.status(500).send({ status: "error", data: "An error occurred while saving the group." });
      }
   
});

app.listen(5001,()=>{
    console.log("Node js server started");
});