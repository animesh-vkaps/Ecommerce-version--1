const mongoose = require('mongoose');
const categorySchema = mongoose.Schema({
    name : {
        type : String
    },
    // images : [
    //         {
    //             public_id:{
    //                 type : String,
    //                 required : true
    //             },
    //             url:{
    //                 type : String,
    //                 required : true
    //             }
    //         }
    //     ]
});
module.exports = mongoose.model("Category",categorySchema);