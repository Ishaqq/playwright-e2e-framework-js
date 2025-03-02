Feature: Login Validation
@foo
  Scenario Outline: Login with invalid email and password and failed it and take screenshot
    #    Given a login to Ecommmerce application with "ishaq8283@gmail.com" and "Test@123"
    Given I am on the home page of Ecommerce
    When I login to the given Ecommerce application with "<Email>" and "<Password>"
    Then I got an error

    Examples: Regular Users
      | Email               | Password |
      | ishaq8283@gmail.com | Test@124 |
      | ishaq8283@gmail.com | Test@125 |