module.exports.User = require('./user.model');
module.exports.Role = require('./roles.model');
//fleets models
module.exports.Fleet = require('./fleet.model');
module.exports.Specification= require('./specification/index');
module.exports.Inspection=require('./inspection/inspection.model')
module.exports.InspectionSubmission = require('./inspection/inspectionSubmission.model');

//drivers

module.exports.Driver = require('./driver.model');

//Service and Issue
module.exports.ServiceEntry = require('./serviceEntry.model');
module.exports.Issue= require('./issues.model');

//company || group

module.exports.Company = require('./company.model');

// common 

module.exports.LOS = require('./common/los.model');
module.exports.ServiceArea = require('./common/serviceArea.model');
module.exports.SpaceType = require('./common/spaceType.model');
module.exports.Equipment = require('./common/equipment.model');
module.exports.Expense = require('./common/expense.model');
module.exports.FuelType= require('./common/fuelType.model');
module.exports.FleetType = require('./common/fleetType.model');
module.exports.FundingSource = require('./common/fundingSource.model');
module.exports.Vendor = require('./common/vendor.model');

//shared 

module.exports.ActivityLogs = require('./shared/activityLogs.model');


//file-upload

module.exports.Documents = require('./document.model');
  

// maianteinae codes

module.exports.CategoryCode = require('./maintenanceCode/categoryCode.model');
module.exports.SystemCode = require('./maintenanceCode/systemCode.model');
module.exports.AssemblyCode = require('./maintenanceCode/assemblyCode.model');
module.exports.ReasonCode = require('./maintenanceCode/reasonCode.model');


/// service Task 

module.exports.ServiceTask = require('./serviceTask.model');