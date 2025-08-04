const express = require('express');
const router = express.Router();
const reqValidator = require('../../shared/middleware/reqValidator.middleware');
const { useAuth } = require('../../shared/middleware/useAuth.middleware');
const { create, getAll, getById, update, remove } = require("../controllers/company.controller")

router.post('/',
    useAuth,
    reqValidator('createCompanySchema', 'body'),
    create
);

router.get('/',
    useAuth,
    getAll
);

router.get('/:id',
    useAuth,
    reqValidator('generiIdSchema', 'params'),
    getById
);

router.put('/:id',
    useAuth,
    reqValidator('generiIdSchema', 'params'),
    reqValidator('createCompanySchema', 'body'),
    update
);

router.delete('/:id',
    useAuth,
    reqValidator('generiIdSchema', 'params'),
    remove
);

module.exports = router;
