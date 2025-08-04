const companyService = require('../services/company.service');
const { default: HttpStatus } = require('http-status');

const create = async (req, res) => {
    try {
        const company = await companyService.create(req.body);
        return res.status(HttpStatus.CREATED).json(company);
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

const getAll = async (req, res) => {
    try {
        const companies = await companyService.getAll();
        return res.status(HttpStatus.OK).json(companies);
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

const getById = async (req, res) => {
    try {
        const company = await companyService.getById(req.params.id);
        if (!company) res.status(HttpStatus.NOT_FOUND).json({ error: "Company Not Found" });
        return res.status(HttpStatus.OK).json(company);
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

const update = async (req, res) => {
    try {
        const company = await companyService.update(req.params.id, req.body);
        if (!company) res.status(HttpStatus.NOT_FOUND).json({ error: "Company Not Found" });
        return res.status(HttpStatus.OK).json(company);
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

const remove = async (req, res) => {
    try {
        const company = await companyService.deleteById(req.params.id);
        if (!company) res.status(HttpStatus.NOT_FOUND).json({ error: "Company Not Found" });
        return res.status(HttpStatus.OK).json(company);
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

module.exports = {
    create,
    getAll,
    getById,
    update,
    remove
};
