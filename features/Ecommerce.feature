Feature: Ecommmerce balidations

  Scenario: Placing the Orders by regular User
#    Given a login to Ecommmerce application with "ishaq8283@gmail.com" and "Test@123" 
 Given I login to Ecommerce application with "<Email>" and "<Password>"
    When Add the following products to Cart
        | ZARA COAT 3          |
        | ADIDAS ORIGINAL      |
    Then Verify "Zara coat 3" is displayed in the Cart
    When Enter valid details and place the Order
    Then Verify order in present OrderHistory


    Examples: Regular Users
      | Email                  | Password       |
      | ishaq8283@gmail.com    | Test@123       |