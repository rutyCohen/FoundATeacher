const express = require('express');
const router = express.Router();
const controller = require('../Controller/areasController')

router.get('/:id',controller.getAreaById);
router.get('/',controller.getAllAreas);
router.post('/',controller.createArea);
router.patch('/:id',controller.updateArea);
router.delete('/:id',controller.deleteArea)

module.exports = router;
