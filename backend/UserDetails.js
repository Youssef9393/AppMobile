
const mongoose=require("mongoose");

const UserDetailsSchema= new mongoose.Schema({
       username: String,
       email: { type:String, unique: true},
       password:String,
       telephone:String
},{
    collection:"UserInfo"
});
mongoose.model("UserInfo",UserDetailsSchema);