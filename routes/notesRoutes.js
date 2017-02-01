const express = require('express');
const controller = require('../controllers/notesController');

const router = express.Router();

router.get('/notes/new', controller.new);
router.get('/notes/:id', controller.edit);
router.post('/notes', controller.add);
router.put('/notes/:id', controller.update);
router.delete('/notes/:id', controller.remove);

module.exports = router;
