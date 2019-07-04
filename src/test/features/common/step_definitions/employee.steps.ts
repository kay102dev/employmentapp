import {Given, When, Then, setDefaultTimeout} from 'cucumber';

import {EmployeeDashboardPage} from '../../../pages/common/employeeDashboardPage';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

const dashboardPage = new EmployeeDashboardPage();

// Global promise timeout of 75 seconds
setDefaultTimeout(75000);

Given(/^That I am on the landing \(Employee\) page$/, async () => {
  await expect(dashboardPage.hasPageLoaded()).to.eventually.equal(true);
  console.log('###############################################');
  console.log('User is on the landing (Employee) page');
});

When(/^I click the save button$/, async () => {
  // await dashboardPage.saveMember();
  console.log('I click the saveMember button');
});

Then(/^I want to save member details and see the updated member List.$/, async () => {
  console.log('User has saved member details and now wants to see the updated member List');
  console.log('###############################################');
});


// Given User is on the landing (Employee) page (Defined already)

When(/^I click the delete button$/, async () => {
  console.log('User has I clicked the delete button');
});


Then(/^I want member details to be deleted on employee database.$/, async () => {
  console.log('User has deleted member on employee database.');
  console.log('###############################################');
});
