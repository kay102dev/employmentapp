Feature: Employee Dashboard

  @smoke_employee
  Scenario: User wants to save single member Details
    Given That I am on the landing (Employee) page
    When I click the save button
    Then I want to save member details and see the updated member List.

  @smoke_employee
  Scenario: User wants to delete single member Details
    Given That I am on the landing (Employee) page
    When I click the delete button
    Then I want member details to be deleted on employee database.
