Feature: Ecommerce validation
#Tags
@Regression
@Validation

# pour utiliser plusieurs data 
  Scenario Outline: Placing the order
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify Error message is displayed

# Parameretization
    Examples:
        | username             | password     |
        | adilooq1@hotmail.fr  | A123456789*a |
        | anshika@gmail.com    | Iamking@000  |
        | Hello@gmail.com      | IamHello@02  |
    
# Parameretization, parallel, html, rerun, failed