const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const upload = require('../utili/config/multer.Config'); 
router.post(
    '/',
    upload.fields([
        { name: 'perfil_img', maxCount: 1 },
        { name: 'info_cv', maxCount: 1 },
        { name: 'info_img', maxCount: 1 },
        { name: 'about_img', maxCount: 1 },
        { name: 'skills_items', maxCount: 20 }
    ]),
    homeController.creatHome
);
router.put(
    '/:id',
    upload.fields([
    { name: 'perfil_img', maxCount: 1 },
    { name: 'info_cv', maxCount: 1 },
    { name: 'info_img', maxCount: 1 },
    { name: 'about_img', maxCount: 1 },
    { name: 'skills_items', maxCount: 20 }
]),
homeController.updateHome);
router.delete('/:id',homeController.deleteHome)
router.get('/', homeController.getHome);

module.exports = router;
