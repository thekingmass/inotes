const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref : 'user'
  },
  // the user field is required to classify between the user and his notes
  // here user will act as foreign key and it will help to extract the notes of the logged in user only
  title:{
    type: String,
    required: true,   
  },
  description:{
    type: String,
    required: true,   
  },
  tag:{
    type: String,  
    default: "General", 
  },
  date:{
    type: Date,
    default: Date.now   
  }
});

module.exports = mongoose.model('notes', NotesSchema);