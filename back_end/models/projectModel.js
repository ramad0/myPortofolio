const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema({
    project_name : String,
    project_url : String,
    project_img : String,
    project_skill_img_src : [String],
    project_disc : String
})
module.exports =  mongoose.model('project',projectSchema)
 