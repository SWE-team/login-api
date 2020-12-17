const express = require('express');
const mongoose = require('mongoose');

const attendenceSchema = new mongoose.Schema({

    courseName: {
        type: String,
        required: true,
    },
    courseCode: {
        type: String,
        required: true,
    },
    attendencePercent: {
        type: Number,
        min: 0,
        max: 100,
    },
    studentId: {
        type: String,
        required: true,
    }
});

module.exports = new mongoose.model("Attendence",attendenceSchema);