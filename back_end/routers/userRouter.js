const express =require('express');
const router = express.Router();
const auth = require('../utili/auth')
const usercontroller = require ('../controllers/userController');

router.post('/',usercontroller.creatUser);
router.get('/',auth.authMiddleware,usercontroller.getUsers);
router.delete('/:id',usercontroller.deleteUser);
router.put('/:id',usercontroller.updateUser);
router.post('/login',usercontroller.login);

module.exports = router;