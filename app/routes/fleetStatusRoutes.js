const express = require('express');

const { getStatusById, updateStatus, removeStatusById, createStatus, getAllStatuses, bulkRemoveStatus } = require('../controller/statusController');

const { useAuth } = require('../middleware/useAuth');
const reqValidator = require('../middleware/reqValidator');
const router = express.Router();

router.post('/',
    useAuth,
    reqValidator('createFleetStatusSchema', 'body'),
    createStatus);
router.get('/',
    useAuth,
    getAllStatuses);
router.get('/:id',
    useAuth,
    reqValidator('fleetStatusIdSchema', 'params'),
    getStatusById
);
router.put('/:id',
    useAuth,
    reqValidator('fleetStatusIdSchema', 'params'),
    reqValidator('updateFleetStatusSchema', 'body'),
    updateStatus);
router.delete('/delete',
    useAuth,
    reqValidator('bulkDeleteFleetStatusSchema', 'body'),
    bulkRemoveStatus
);

router.delete('/:id',
    useAuth,
    reqValidator('fleetStatusIdSchema', 'params'),
    removeStatusById);

module.exports = router;
