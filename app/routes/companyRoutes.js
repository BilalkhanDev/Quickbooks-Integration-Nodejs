const express = require('express');
const router = express.Router();
const reqValidator = require('../middleware/reqValidator');
const { useAuth } = require('../middleware/useAuth');
const { create, getAll, getById, update, remove } = require("../controller/companyController")

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
