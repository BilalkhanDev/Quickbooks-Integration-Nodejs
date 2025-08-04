
const express = require('express');
const { create, getAll, update, remove, bulkDelete } = require('../controllers/vendor.controller');
const { useAuth } = require('../../shared/middleware/useAuth.middleware');
const reqValidator = require('../../shared/middleware/reqValidator.middleware');
const router = express.Router();

router.post('/',
    useAuth,
    reqValidator("vendorSchema", "body"),
    create);
router.get('/',
    useAuth,
    getAll);
router.put('/:id',
    useAuth,
    reqValidator("generiIdSchema", 'params'),
    reqValidator("vendorUpdateSchema", "body"),
    update);
router.delete('/:id',
    useAuth,
    reqValidator("generiIdSchema", 'params'),
    remove);
router.post('/delete',
    useAuth,
    reqValidator('bulkDeleteFleetStatusSchema', 'body'),
    bulkDelete);

module.exports = router;
