const express =require('express');
const router = express.Router();
const upload = require('../utili/config/multer.Config')
const experienceController = require ('../controllers/experienceController');
router.post('/', upload.none(),experienceController.creatExperience);
router.get('/',experienceController.getExperiences);
router.put('/:id', upload.none(),experienceController.updateExperience);
router.delete('/:id',experienceController.deleteExperience);

module.exports = router; 