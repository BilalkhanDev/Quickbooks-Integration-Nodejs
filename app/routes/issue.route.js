const express = require('express');
const { useAuth } = require('../middleware/useAuth.middleware');
const issueController = require('../controllers/issue.controller');
const s3AssetUploader = require('../middleware/multer.middleware');
const parseMultipartJsonFields = require('../middleware/parseJsonFields.middleware');
const getIssueSchema = require('../validation/issue.schema');
const validate = require('../middleware/validate.middleware');
const issueSchema = require('../validation/issue.schema');

const router = express.Router();

router
  .route('/')
  .post(
    useAuth,
    validate(issueSchema.create()),
    issueController.create
  )
  .get(useAuth, issueController.getAll);

router
  .route('/:issueId')
  .patch(
    useAuth,
    parseMultipartJsonFields({ existingDocuments: 'json' }),
   
    issueController.update
  )
  .get(
    useAuth,
    validate(issueSchema.getById()),
    issueController.getById
  )
  .delete(
    useAuth,
    validate(issueSchema.delete()),
    issueController.delete
  );

router.get(
  '/service/:serviceId',
  useAuth,
  validate(issueSchema.getByServiceId()),
  issueController.getIssuesByServiceId
);

module.exports = router;
