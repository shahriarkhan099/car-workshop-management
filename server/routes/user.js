
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.get('/admin', userController.view);
router.post('/admin', userController.find);
router.get('/', userController.form);
router.post('/', userController.create);
router.get('/edit/:id', userController.edit);
router.post('/edit/:id', userController.update);
router.delete('/:id', userController.delete);

module.exports = router;
