const express =require('express');
const router = express.Router();
const upload = require('../utili/config/multer.Config')
const servicesController = require ('../controllers/servicesController');
router.post('/', upload.none(),servicesController.creatServices);
router.get('/',servicesController.getServices);
router.put('/:id', upload.none(),servicesController.updateServices);
router.delete('/:id',servicesController.deleteServices);
module.exports = router;
