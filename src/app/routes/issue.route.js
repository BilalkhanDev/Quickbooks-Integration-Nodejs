const express = require('express');
const reqValidator = require('../middleware/validate.middleware');
const { useAuth } = require('../middleware/useAuth.middleware');
const issueController = require('../controllers/issue.controller');
const s3AssetUploader = require('../middleware/multer.middleware');
const parseMultipartJsonFields = require('../middleware/parseJsonFields.middleware');
const getIssueSchema = require('../validation/issue.schema');

const router = express.Router();

router
  .route('/')
  .post(
    useAuth,
    s3AssetUploader('issues', 'documents'),
    reqValidator(getIssueSchema,'create'),
    issueController.create
  )
  .get(useAuth, issueController.getAll);

router
  .route('/:issueId')
  .patch(
    useAuth,
    s3AssetUploader('issues', 'documents'),
    parseMultipartJsonFields({ existingDocuments: 'json' }),
    reqValidator(getIssueSchema,'update'),
    issueController.update
  )
  .get(
    useAuth,
    reqValidator(getIssueSchema,'getById'),
    issueController.getById
  )
  .delete(
    useAuth,
    reqValidator(getIssueSchema,'delete'),
    issueController.delete
  );

router.get(
  '/service/:serviceId',
  useAuth,
  reqValidator(getIssueSchema,'getByServiceId'),
  issueController.getIssuesByServiceId
);

module.exports = router;
