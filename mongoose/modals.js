const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
        trim: true
    }
},
    {
        timestamps: true
    });

const Note = mongoose.models.Note || mongoose.model('Note', noteSchema);

module.exports = Note;