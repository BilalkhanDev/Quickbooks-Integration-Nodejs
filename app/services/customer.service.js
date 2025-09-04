const dotenv = require('dotenv');
dotenv.config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
});
const { User } = require('../models');
const ApiError = require('../shared/core/exceptions/ApiError');
const { default: HttpStatus } = require('http-status');
const GenericService = require('../services/generic.service');
const { TokenProvider, PaswordHasher} = require('../shared/security');
const { initializeQuickBooks, oauth2Client } = require('../config/quickbook.config');
const axios=require('axios')

class CustomerService extends GenericService {
    constructor() {
        super(User);
    }
    async create(data) {

     const response = await axios.post(
                `${process.env.QB_URL}/v3/company/${data.realmId}/customer`, 
                customerData,
                {
                    headers: {
                        'Authorization': `Bearer ${data?.accessToken}`,  
                        'Content-Type': 'application/json'  
                    }
                }
            );

            
            return response.data;

    }
    async getAll(data) {

        const query = "SELECT * FROM Customer";
        const url = `${process.env.QB_URL}company/${data.realmId}/query?query=${encodeURIComponent(query)}`;
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${data?.accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        console.log("Data----->", response.data);
        return response.data;


    }

    



}

module.exports = new CustomerService();
