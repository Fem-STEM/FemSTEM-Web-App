var mongoose=require("mongoose");

var groupSchema=new mongoose.Schema({
    title: {
        type:String,
    },
	description:{
        type:String,
    },
    created_by:{
        type:String
    },
    skills:
        [{
            type: String
        }],
    link: {
        type:String,
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId, //embedding the reference to ids of comments
        ref: "Comment" //the model name
    }]
});
module.exports=mongoose.model("Group",groupSchema);