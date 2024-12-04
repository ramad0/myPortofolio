const mongoose = require('mongoose');
const footerSchema = new mongoose.Schema({
    footer_name : String,
})

module.exports =  mongoose.model('footer',footerSchema)
 