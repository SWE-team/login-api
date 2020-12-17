const express = require('express');
const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
    email : {
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
    facultyId : {
        type: String,
        required: true,

    },




});

module.exports = new mongoose.model("Faculty",facultySchema);