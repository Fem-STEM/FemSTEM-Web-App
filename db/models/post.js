var mongoose=require("mongoose");

var postSchema=new mongoose.Schema({
    title: {
        type:String,
    },
	description:{
        type:String,
    },
    eligibility:{
        type:String,
    },
    deadline:{
        type:String,    
    },
    link:{
        type:String, 
    },
   
});
module.exports=mongoose.model("Post",postSchema);