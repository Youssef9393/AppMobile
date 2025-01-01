const mongoose=require("mongoose");

const GroupDetailsSchema= new mongoose.Schema({
       groupName:{ type:String, unique: true},
       firstName:String,
       lastName:String,
       email:String,
       montant:String,
       telephone:String
},{
    collection:"GroupInfo"
});

module.exports =mongoose.model("GroupInfo",GroupDetailsSchema);