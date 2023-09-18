const { Router } = require('express');

const router = Router();

const adminController = require('../controllers/adminController');

router.post('/login',adminController.login);

router.post('/logout',adminController.logout);

module.exports = router;