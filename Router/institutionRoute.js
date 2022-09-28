const express = require('express');
const router = express.Router();
const controller = require('../Controller/institutionController')

router.get('/:id',controller.getInstitutionById);
router.get('/',controller.getAllInstitutions);
router.post('/',controller.createInstitution);
router.patch('/:id',controller.updateInstitution);
router.delete('/:id',controller.deleteInstitution)

module.exports = router;
