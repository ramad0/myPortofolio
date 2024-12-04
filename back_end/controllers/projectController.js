const Project = require('../models/projectModel');
exports.createProject = async (req, res) => {
    try {
        const { project_name, project_url, project_disc } = req.body;

        const projectImg = req.files['project_img'] ? `${req.protocol}://${req.get('host')}/${req.files['project_img'][0].path}` : null;
        const projectSkillImgSrc = req.files['project_skill_img_src']
        ? req.files['project_skill_img_src'].map(file => `${req.protocol}://${req.get('host')}/${file.path}`)
        : [];

        const newProject = await Project.create({
            project_name,
            project_url,
            project_img: projectImg,
            project_skill_img_src: projectSkillImgSrc,
            project_disc
        });

        res.status(201).json({
            message: 'Project created successfully',
            project: newProject
        });
    } catch (err) {
        res.status(500).json({ message: 'Error creating project', error: err.message });
    }
};

exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching projects', error: err.message });
    }
};

exports.updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { project_name, project_url, project_disc } = req.body;

        const projectImg = req.files['project_img'] ? `${req.protocol}://${req.get('host')}/${req.files['project_img'][0].path}` : null;
        const projectSkillImgSrc = req.files['project_skill_img_src']
        ? req.files['project_skill_img_src'].map(file => `${req.protocol}://${req.get('host')}/${file.path}`)
        : [];

        const updatedData = {
            ...(project_name && { project_name }),
            ...(project_url && { project_url }),
            ...(project_disc && { project_disc }),
            ...(projectImg && { project_img: projectImg }),
            ...(projectSkillImgSrc && { project_skill_img_src: projectSkillImgSrc }),
        };

        const updatedProject = await Project.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.status(200).json({ message: 'Project updated successfully', project: updatedProject });
    } catch (err) {
        res.status(500).json({ message: 'Error updating project', error: err.message });
    }
};

exports.deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProject = await Project.findByIdAndDelete(id);

        if (!deletedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.status(200).json({ message: 'Project deleted successfully', project: deletedProject });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting project', error: err.message });
    }
};
