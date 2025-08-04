const express = require('express');
// const { createIssue, getIssueById, getAllIssues, getIssuesByServiceId, updateIssueById, deleteIssueById } = require(' ');
const reqValidator = require('../middleware/reqValidator');
const { useAuth } = require('../middleware/useAuth');
const {createIssue, getIssueById, getAllIssues, getIssuesByServiceId, updateIssueById, deleteIssueById } = require('../controller/issueController');
const s3AssetUploader = require('../middleware/multer');
const parseMultipartJsonFields=require("../middleware/parseJsonFields");
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
