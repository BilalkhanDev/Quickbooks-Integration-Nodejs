const issueService = require('../services/issueService');

// Create a new issue
const createIssue = async (req, res) => {
  try {
    const issueData = req.body;
    const issue = await issueService.createIssue(issueData);
    return res.status(201).json({
      message: 'Issue created successfully',
      issue,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: `Error creating issue: ${error.message}`,
    });
  }
};

// Get an issue by ID
const getIssueById = async (req, res) => {
  try {
    const issueId = req.params.issueId;
    const issue = await issueService.getIssueById(issueId);
    return res.status(200).json(issue);
  } catch (error) {
    console.error(error);
    return res.status(404).json({
      message: `Issue not found: ${error.message}`,
    });
  }
};

// Get all issues (optional filter)
const getAllIssues = async (req, res) => {
  try {
    const filter = req.query || {};
    const issues = await issueService.getAllIssues(filter);
    return res.status(200).json(issues);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: `Error fetching issues: ${error.message}`,
    });
  }
};

// Get issues by serviceId
const getIssuesByServiceId = async (req, res) => {
  try {
    const { serviceId } = req.params; // Service ID from request parameters
    const issues = await issueService.getIssuesByServiceId(serviceId);
    return res.status(200).json(issues);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: `Error fetching issues by serviceId: ${error.message}`,
    });
  }
};

// Update an issue by ID
const updateIssueById = async (req, res) => {
  try {
    const issueId = req.params.issueId;
    const updateData = req.body;
    const updatedIssue = await issueService.updateIssueById(issueId, updateData);
    return res.status(200).json({
      message: 'Issue updated successfully',
      updatedIssue,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: `Error updating issue: ${error.message}`,
    });
  }
};

// Delete an issue by ID
const deleteIssueById = async (req, res) => {
  try {
    const issueId = req.params.issueId;
    const deletedIssue = await issueService.deleteIssueById(issueId);
    return res.status(200).json({
      message: 'Issue deleted successfully',
      deletedIssue,
    });
  } catch (error) {
    console.error(error);
    return res.status(404).json({
      message: `Error deleting issue: ${error.message}`,
    });
  }
};

module.exports = {
  createIssue,
  getIssueById,
  getAllIssues,
  getIssuesByServiceId, 
  updateIssueById,
  deleteIssueById,
};
