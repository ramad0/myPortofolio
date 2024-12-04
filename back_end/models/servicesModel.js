const mongoose = require('mongoose');
const servicesSchema = new mongoose.Schema({
    services_i : String,
    services_name : String,
    services_disc : String
})

module.exports =  mongoose.model('services',servicesSchema)
 