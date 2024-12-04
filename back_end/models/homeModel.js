const mongoose = require('mongoose');
const homeSchema = new mongoose.Schema({
    perfil_fname : String,
    perfil_lname : String,
    perfil_img : String,

    info_name : String,
    info_img : String,
    info_disc : String,
    info_cv : String,

    about_name : String,
    about_job : String,
    about_disc : String,
    about_social_i : [String],
    about_social_link : [String],
    about_img : String,
    about_note : String,

    skills_items : [String],
    skills_disc : String
}) 
module.exports =  mongoose.model('home',homeSchema)
