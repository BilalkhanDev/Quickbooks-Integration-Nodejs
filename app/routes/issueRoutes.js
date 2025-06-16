const express = require('express');
// const { createIssue, getIssueById, getAllIssues, getIssuesByServiceId, updateIssueById, deleteIssueById } = require(' ');
const reqValidator = require('../middleware/reqValidator');
const { useAuth } = require('../middleware/useAuth');
const {createIssue, getIssueById, getAllIssues, getIssuesByServiceId, updateIssueById, deleteIssueById } = require('../controller/issueController');

const router = express.Router();

router.post('/create', 
  useAuth, 
  reqValidator('issueCreateSchema', 'body'), 
  createIssue
);

router.get('/:issueId', 
  useAuth,  
  reqValidator('issueIdSchema', 'params'), 
  getIssueById
);

router.get('/', 
  useAuth,  
  getAllIssues
);

router.get('/service/:serviceId', 
  useAuth,  
  reqValidator('serviceIdSchema', 'params'),  // Validate the serviceId in the URL
  getIssuesByServiceId
);

router.patch('/:issueId', 
  useAuth,  
  reqValidator('issueIdSchema', 'params'),  
  reqValidator('issueUpdateSchema', 'body'),
  updateIssueById
);

router.delete('/:issueId', 
  useAuth,  
  reqValidator('issueIdSchema', 'params'),  // Validate the issue ID in the URL
  deleteIssueById
);

module.exports = router;
