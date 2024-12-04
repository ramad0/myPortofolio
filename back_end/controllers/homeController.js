const Home = require('../models/homeModel');
exports.creatHome = async (req, res) => {
    try {
        const {
            perfil_fname,
            perfil_lname,
            info_name,
            info_disc,
            about_name,
            about_job,
            about_disc,
            about_social_i,
            about_social_link,
            about_note,
            skills_disc
        } = req.body;

        const perfil_img = req.files['perfil_img'] ? `${req.protocol}://${req.get('host')}/${req.files['perfil_img'][0].path}` : null;
        const info_img = req.files['info_img'] ? `${req.protocol}://${req.get('host')}/${req.files['info_img'][0].path}` : null;
        const info_cv = req.files['info_cv'] ? `${req.protocol}://${req.get('host')}/${req.files['info_cv'][0].path}` : null;
        const about_img = req.files['about_img'] ? `${req.protocol}://${req.get('host')}/${req.files['about_img'][0].path}` : null;

        const skills_items = req.files['skills_items'] ? req.files['skills_items'].map(file => `${req.protocol}://${req.get('host')}/${file.path}`) : [];

        const myHome = await Home.create({
            perfil_fname,
            perfil_lname,
            perfil_img,
            info_name,
            info_img,
            info_disc,
            info_cv,
            about_name,
            about_job,
            about_disc,
            about_social_i: Array.isArray(about_social_i) ? about_social_i : [about_social_i],
            about_social_link: Array.isArray(about_social_link) ? about_social_link : [about_social_link],
            about_img,
            about_note,
            skills_items,
            skills_disc
        });

        res.status(201).json(myHome);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateHome = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            perfil_fname,
            perfil_lname,
            info_name,
            info_disc,
            about_name,
            about_job,
            about_disc,
            about_social_i,
            about_social_link,
            about_note,
            skills_disc
        } = req.body;

        const perfil_img = req.files['perfil_img'] ? `${req.protocol}://${req.get('host')}/${req.files['perfil_img'][0].path}` : null;
        const info_img = req.files['info_img'] ? `${req.protocol}://${req.get('host')}/${req.files['info_img'][0].path}` : null;
        const info_cv = req.files['info_cv'] ? `${req.protocol}://${req.get('host')}/${req.files['info_cv'][0].path}` : null;
        const about_img = req.files['about_img'] ? `${req.protocol}://${req.get('host')}/${req.files['about_img'][0].path}` : null;
        const skills_items = req.files['skills_items'] ? req.files['skills_items'].map(file => `${req.protocol}://${req.get('host')}/${file.path}`) : [];

        const updatedData = {
            ...(perfil_fname && { perfil_fname }),
            ...(perfil_lname && { perfil_lname }),
            ...(perfil_img && { perfil_img }),

            ...(info_name && { info_name }),
            ...(info_img && { info_img }),
            ...(info_disc && { info_disc }),
            ...(info_cv && { info_cv }),

            ...(about_name && { about_name }),
            ...(about_job && { about_job }),
            ...(about_disc && { about_disc }),
            ...(about_social_i && { about_social_i }),
            ...(about_social_link && { about_social_link }),
            ...(about_img && { about_img }),
            ...(about_note && { about_note }),

            ...(skills_items && { skills_items }),
            ...(skills_disc && { skills_disc }),
        };

        const updatedHome = await Home.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedHome) {
            return res.status(404).json({ message: 'Home not found' });
        }

        res.status(200).json({ message: 'Home updated successfully', Home: updatedHome });
    } catch (err) {
        res.status(500).json({ message: 'Error updating Home', error: err.message });
    }
};

exports.deleteHome = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedHome = await Home.findByIdAndDelete(id);

        if (!deletedHome) {
            return res.status(404).json({ message: 'Home not found' });
        }

        res.status(200).json({ message: 'Home deleted successfully', Home: deletedHome });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting Home', error: err.message });
    }
};


exports.getHome = async (req, res) => {
    try {
        const myHome = await Home.find();
        res.status(200).json(myHome);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
