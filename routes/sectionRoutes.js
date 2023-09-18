const { Router } = require('express');

const router = Router();

const sectionController = require('../controllers/sectionController');

router.get('/get_section', sectionController.get_section);

router.post('/create_section', sectionController.create_section);

router.put('/update_section/:id', sectionController.update_section);

router.delete('/delete_section/:id', sectionController.delete_section);

module.exports = router;