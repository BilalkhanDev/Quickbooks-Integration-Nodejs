const express = require('express');
// const { createIssue, getIssueById, getAllIssues, getIssuesByServiceId, updateIssueById, deleteIssueById } = require(' ');
const reqValidator = require('../../shared/middleware/reqValidator.middleware');
const { useAuth } = require('../../shared/middleware/useAuth.middleware');
const {createIssue, getIssueById, getAllIssues, getIssuesByServiceId, updateIssueById, deleteIssueById } = require('../controllers/issue.controller');
const s3AssetUploader = require('../../shared/middleware/multer.middleware');
const parseMultipartJsonFields=require("../../shared/middleware/parseJsonFields.middleware");
const router = express.Router();

router.post('/create', 
  useAuth, 
  s3AssetUploader("issues", "documents"),
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
  s3AssetUploader("issues", "documents"),
  parseMultipartJsonFields({
    existingDocuments: 'json',   

  }),
  reqValidator('issueIdSchema', 'params'),  
  reqValidator('issueCreateSchema', 'body'),
  updateIssueById
);

router.delete('/:issueId', 
  useAuth,  
  reqValidator('issueIdSchema', 'params'),  // Validate the issue ID in the URL
  deleteIssueById
);

module.exports = router;
