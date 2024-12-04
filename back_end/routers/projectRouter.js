
const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const upload = require('../utili/config/multer.Config'); 

router.post(
    '/',
    upload.fields([
        { name: 'project_img', maxCount: 1 },
        { name: 'project_skill_img_src', maxCount: 20 }
    ]),
    projectController.createProject
);

router.get('/', projectController.getProjects);

router.put(
    '/:id',
    upload.fields([
        { name: 'project_img', maxCount: 1 },
        { name: 'project_skill_img_src', maxCount: 20 }
    ]),
    projectController.updateProject
);

router.delete('/:id', projectController.deleteProject);

module.exports = router;
