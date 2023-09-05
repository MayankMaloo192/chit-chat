const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    username :{
        type :String,
        min:3,
        max:20,
        require:true,
        unique:true,
    },

    email :{
        type :String,
        
        max:50,
        require:true,
        unique:true,
    },

    password :{
        type :String,
        min:8,
       
        require:true,
        
    },

    isAvatarImageSet: {
        type: Boolean,
        default: false,
      },
      avatarImage: {
        type: String,
        default: "",
      },

});


module.exports = mongoose.model("Users",userSchema);


