import {by, element, browser, protractor, ExpectedConditions} from 'protractor';

export enum IdentificationType {
  Xpath,
  Css,
  Id,
  Js,
  ClassName
}

export abstract class BasePage {


  ElementLocator(obj, multiple = false) {
    switch (obj.type) {
      case IdentificationType[IdentificationType.Xpath]:
        if (multiple) {
          return element.all(by.xpath(obj.value));
        } else {
          return element(by.xpath(obj.value));
        }
      case IdentificationType[IdentificationType.ClassName]:
        if (multiple) {
          return element.all(by.className(obj.value));
        } else {
          return element(by.className(obj.value));
        }
      case IdentificationType[IdentificationType.Id]:
        if (multiple) {
          return element.all(by.id(obj.value));
        } else {
          return element(by.id(obj.value));
        }
      case IdentificationType[IdentificationType.Js]:
        if (multiple) {
          return element.all(by.js(obj.value));
        } else {
          return element(by.js(obj.value));
        }
      case IdentificationType[IdentificationType.Css]:
        if (multiple) {
          return element.all(by.css(obj.value));
        } else {
          return element(by.css(obj.value));
        }
      default:
        break;
    }
  }

  async hasPageLoaded() {
    await this.init();
    return await (await this.getLastAppElement()).isDisplayed();
  }

  // TODO - This should be deprecated
  getAppElement() {
    return this.ElementLocator(this.getAppElementLocator());
  }

  async getLastAppElement() {
    const appElements = this.ElementLocator(this.getAppElementLocator(), true);
    return appElements.get((await appElements.count()) - 1);
  }

  async scrollToElement(htmlElement) {
  }

  async selectRadioOption() {
  }

  async getSelectedRadioOptionLabel() {
  }

  async isInputValidationErrorPresent(inputElement: any) {
    if (await inputElement.isEnabled()) {
      const parentFormField = await inputElement.element(by.xpath('ancestor::mat-form-field'));
      const validationError = await parentFormField.element(by.css('mat-error'));

      return await validationError.isPresent();
    } else {
      // Disabled elements won't have validation errors
      return true;
    }
  }

  async isRadioValidationErrorPresent(inputElement: any) {
    const parentContainer = await inputElement.element(by.xpath('ancestor::div[contains(@class,"card-form-control-radio-group")]'));
    const validationError = await parentContainer.element(by.css('mat-error'));

    return await validationError.isPresent();
  }

  async selectTodayInDatePicker(datePickElement) {
    await datePickElement.click();

    const datePicker = element(by.css('mat-datepicker-content'));
    await this.waitForElementToBePresent(datePicker);

    const todaysDateElement = datePicker.element(by.css('div[class*="mat-calendar-body-today"]'));
    await this.waitForElementToBePresent(todaysDateElement);
    await todaysDateElement.click();
    await this.waitForElementToNotBePresent(datePicker);
  }

  async waitForElementToNotBePresent(elementRef) {
    await browser.wait(async () => {
      return !(await elementRef.isPresent());
    });
  }

  async waitForElementToBePresent(elementRef) {
    await browser.wait(async () => {
      return (await elementRef.isPresent());
    });
  }

  abstract async init();

  abstract getAppElementLocator();


}
