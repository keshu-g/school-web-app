const { Router } = require('express');

const router = Router();

const studentController = require('../controllers/studentController');

router.get('/get_student', studentController.get_student);

router.post('/create_student', studentController.create_student);

router.put('/update_student/:id', studentController.update_student);

router.delete('/delete_student/:id', studentController.delete_student);


module.exports = router;
