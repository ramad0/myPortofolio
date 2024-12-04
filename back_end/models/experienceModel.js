const mongoose = require('mongoose');
const experienceSchema = new mongoose.Schema({
    experience_company_name : String,
    experience_profession : String,
    experience_date : String,
    experience_disc : String,
})
module.exports =  mongoose.model('experience',experienceSchema)
 