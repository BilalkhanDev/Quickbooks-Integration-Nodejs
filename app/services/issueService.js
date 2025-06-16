const issueDAL = require('../dal/issuesDal');

const createIssue = async (data) => {
  try {
    const issue = await issueDAL.createIssue(data);
    return issue;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getIssueById = async (issueId) => {
  try {
    const issue = await issueDAL.getIssueById(issueId);
    return issue;
  } catch (error) {
    throw new Error(`Error in service while fetching issue: ${error.message}`);
  }
};

const getAllIssues = async (filter) => {
  try {
    const issues = await issueDAL.getAllIssues(filter);
    return issues;
  } catch (error) {
    throw new Error(`Error in service while fetching issues: ${error.message}`);
  }
};

const getIssuesByServiceId = async (serviceId) => {
  try {
    const issues = await issueDAL.getIssuesByServiceId(serviceId);
    return issues;
  } catch (error) {
    throw new Error(`Error in service while fetching issues by serviceId: ${error.message}`);
  }
};

const updateIssueById = async (issueId, data) => {
  try {
    const updatedIssue = await issueDAL.updateIssueById(issueId, data);
    return updatedIssue;
  } catch (error) {
    throw new Error(`Error in service while updating issue: ${error.message}`);
  }
};

const deleteIssueById = async (issueId) => {
  try {
    const deletedIssue = await issueDAL.deleteIssueById(issueId);
    return deletedIssue;
  } catch (error) {
    throw new Error(`Error in service while deleting issue: ${error.message}`);
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
