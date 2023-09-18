const { Router } = require('express');

const router = Router();

const classController = require('../controllers/classController');

router.get('/get_class', classController.get_class);

router.post('/create_class', classController.create_class);

router.put('/update_class/:id', classController.update_class);

router.delete('/delete_class/:id', classController.delete_class);

module.exports = router;