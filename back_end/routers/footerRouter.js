const express =require('express');
const router = express.Router();
const footerController = require ('../controllers/footerController');
router.post('/',footerController.createFooter);
router.get('/',footerController.getFooter);
router.delete('/:id',footerController.deleteFooter)
router.put('/:id',footerController.updateFooter)
module.exports = router;
 