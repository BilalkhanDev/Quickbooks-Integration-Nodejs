
const express = require('express');
const { create, getAll, update, remove, bulkDelete } = require('../controller/vendorController');
const { useAuth } = require('../middleware/useAuth');
const reqValidator = require('../middleware/reqValidator');
const router = express.Router();

router.post('/', 
    useAuth,
    reqValidator("vendorSchema","body"),
    create);
router.get('/', 
    useAuth,
    getAll);
router.put('/:id',
    useAuth,
    reqValidator("fleetIdSchema", 'params'),
    reqValidator("vendorUpdateSchema","body"),
    update);
router.delete('/:id',
        useAuth,
    reqValidator("fleetIdSchema", 'params'),
    remove );
router.post('/delete',
    useAuth,
    reqValidator('bulkDeleteFleetStatusSchema', 'body'),
    bulkDelete);

module.exports = router;
