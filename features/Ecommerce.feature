Feature: Ecommerce validation
  @Regression
  Scenario: Placing the order
    Given a login to Ecommerce application with 'adilooq1@hotmail.fr' and "A123456789*a"
    When add product "ADIDAS ORIGINAL" to Cart
    Then Verify that the product "ADIDAS ORIGINAL" is displaying in the cart
    When Enter valid details and Place the order
    Then Verify order in present in the OrderHistory
    
# Parallilation
@Regression
@Validation

# pour utiliser plusieurs data 
  Scenario Outline: Placing the order
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify Error message is displayed

    Examples:
        | username             | password     |
        #| adilooq1@hotmail.fr  | A123456789*a |
        | anshika@gmail.com    | Iamking@000  |
        | Hello@gmail.com      | IamHello@02  |

# generate cucumber reporter : npx cucumber-js features/Ecommerce.feature --format html:features/reporter/cucumber-report.html --exit
# Parallel :  npx cucumber-js features/Ecommerce.feature --parallel 2 --exit
# Tags : npx cucumber-js --tags "@Validation" --exit
# Specific test execution : npx cucumber-js features/ErrorValidation.feature --exit
# Retry : 