const express = require('express');
const reqValidator = require('../../shared/middleware/validate.middleware');
const { useAuth } = require('../../shared/middleware/useAuth.middleware');
const issueController = require('../controllers/issue.controller')
const s3AssetUploader = require('../../shared/middleware/multer.middleware');
const parseMultipartJsonFields = require("../../shared/middleware/parseJsonFields.middleware");
const router = express.Router();

router
  .route('/')
  .post(useAuth, s3AssetUploader("issues", "documents"),issueController.create)
  .get(useAuth, issueController.getAll);

router
  .route('/:issueId')
  .patch(useAuth,
    s3AssetUploader("issues", "documents"),
    parseMultipartJsonFields({
      existingDocuments: 'json',

    }),
    
 issueController.update)
  .get(useAuth,  issueController.getById)
  .delete(useAuth,  issueController.delete);


router.get('/service/:serviceId',
  useAuth,
 // Validate the serviceId in the URL
  issueController.getIssuesByServiceId
);


module.exports = router;
