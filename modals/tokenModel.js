const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    email: { 
        type: String,
         required: true,
        },
    password: {
        type: String,
        minlength: [8,'min length of password must be 8'],
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    yearOfStudying: {
        type: Number,
        min:[1,"invlid yearOfStudying"],
        max:[6,"invlid yearOfStudying"],
    },
    rollNumber: {
        type: String,
    },
    facultyId : {
        type: String,

    },
    token: { 
        type: String,
         required: true 
        },
    createdAt: { 
        type: Date,
         required: true, 
         default: Date.now,
          expires: 43200 
        }
});

module.exports = new mongoose.model("Token",tokenSchema);