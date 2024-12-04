const Experience = require ('../models/experienceModel');
exports.creatExperience = async(req,res)=>{
    const myExperience = await Experience.create(req.body);
    res.status(201).json(myExperience)
}
exports.getExperiences = async(req,res)=>{
    console.log(req.body); 
    const myExperiences = await Experience.find();
    res.status(200).json(myExperiences)
}
exports.updateExperience = async (req, res) => {
    try {
        const { id } = req.params;
        const { experience_company_name, experience_profession, experience_date,experience_disc } = req.body;


        const updatedData = {
            ...(experience_company_name && { experience_company_name }),
            ...(experience_profession && { experience_profession }),
            ...(experience_date && { experience_date }),
            ...(experience_disc && { experience_disc }),
            };

        const updatedExperience = await Experience.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedExperience) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.status(200).json({ message: 'Project updated successfully', Experience: updatedExperience });
    } catch (err) {
        res.status(500).json({ message: 'Error updating Experience', error: err.message });
    }
};

exports.deleteExperience = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedExperience = await Experience.findByIdAndDelete(id);

        if (!deletedExperience) {
            return res.status(404).json({ message: 'Experience not found' });
        }

        res.status(200).json({ message: 'Experience deleted successfully', Experience: deletedExperience });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting Experience', error: err.message });
    }
};