import {BasePage, IdentificationType} from '../BasePage';

const Locators = {
  employeePage: {
    type: IdentificationType[IdentificationType.Xpath],
    value: '//*//app-root/app-employee-form'
  },
  saveButton: {
    type: IdentificationType[IdentificationType.Xpath],
    value: '//*[@id="saveButton"]'
  }
};

export class EmployeeDashboardPage extends BasePage {

  saveMemberButton = this.ElementLocator(Locators.saveButton);

  async init() {
    // Not applicable to the common "page"
  }

  async saveMember() {
    const loginPage = this.ElementLocator(Locators.employeePage);
    if (!(await loginPage.isPresent())) {
      await this.saveMemberButton.click();
    }
  }

  async deleteMember() {

  }

  getAppElementLocator() {
    // Not applicable to the common "page"
    return '';
  }

  async doFastForward() {
    // Not applicable to the common "page"
  }

}
