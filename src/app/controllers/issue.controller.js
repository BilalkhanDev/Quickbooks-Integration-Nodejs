const issueService = require('../services/issue.service');
const catchAsync = require('../../shared/core/utils/catchAsync');
const { default: HttpStatus } = require('http-status');

exports.create = catchAsync(async (req, res) => {
  const issue = await issueService.create(req);
  res.status(HttpStatus.CREATED).json({ message: 'Issue created successfully', issue });
});

exports.getById = catchAsync(async (req, res) => {
  const issue = await issueService.getById(req.params.issueId);
  res.status(HttpStatus.OK).json(issue);
});

exports.getAll = catchAsync(async (req, res) => {
  const issues = await issueService.getAll(req.query);
  res.status(HttpStatus.OK).json(issues);
});

exports.getIssuesByServiceId = catchAsync(async (req, res) => {
  const issues = await issueService.getByServiceId(req.params.serviceId);
  res.status(HttpStatus.OK).json(issues);
});

exports.update= catchAsync(async (req, res) => {
  const updated = await issueService.update(req);
  res.status(HttpStatus.OK).json({ message: 'Issue updated successfully', updatedIssue: updated });
});

exports.delete = catchAsync(async (req, res) => {
  const deleted = await issueService.delete(req.params.issueId);
  res.status(HttpStatus.OK).json({ message: 'Issue deleted successfully', deletedIssue: deleted });
});
