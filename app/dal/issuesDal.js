const Issues = require('../models/issues'); 
const ServiceEntry = require('../models/serviceEntry');

// Create a new issue
const createIssue = async (data) => {
  try {
    const serviceEntry = await ServiceEntry.findById(data.serviceId);
    if (!serviceEntry) {
      throw new Error(`ServiceEntry with serviceId ${data.serviceId} does not exist.`);
    }
    
    const issue = new Issues(data);
    await issue.save();
    return issue;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get an issue by ID
const getIssueById = async (issueId) => {
  try {
    const issue = await Issues.findById(issueId);
    if (!issue) throw new Error(`Issue with ID ${issueId} not found`);
    return issue;
  } catch (error) {
    throw new Error(`Error fetching issue: ${error.message}`);
  }
};

// Get all issues (or filtered)
const getAllIssues = async (filter = {}) => {
  try {
    return await Issues.find(filter);
  } catch (error) {
    throw new Error(`Error fetching issues: ${error.message}`);
  }
};

// Get all issues by serviceId
const getIssuesByServiceId = async (serviceId) => {
  try {
    const issues = await Issues.find({ serviceId });
    return issues;
  } catch (error) {
    throw new Error(`Error fetching issues by serviceId: ${error.message}`);
  }
};

// Update an issue by ID
const updateIssueById = async (issueId, data) => {
  try {
    const updatedIssue = await Issues.findByIdAndUpdate(issueId, data, { new: true });
    if (!updatedIssue) throw new Error(`Issue with ID ${issueId} not found`);
    return updatedIssue;
  } catch (error) {
    throw new Error(`Error updating issue: ${error.message}`);
  }
};

// Delete an issue by ID
const deleteIssueById = async (issueId) => {
  try {
    const deletedIssue = await Issues.findByIdAndDelete(issueId);
    if (!deletedIssue) throw new Error(`Issue with ID ${issueId} not found`);
    return deletedIssue;
  } catch (error) {
    throw new Error(`Error deleting issue: ${error.message}`);
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
