import { browser, element, by, By, $, $$, ExpectedConditions } from 'protractor';
import { DriverProvider } from 'protractor/built/driverProviders';

describe("This functionality test the online shopping cart", function () {

  it("succesful online purchase", function () {
    browser.waitForAngularEnabled(false);
    browser.get('http://demowebshop.tricentis.com/login');
    browser.navigate().refresh();
    browser.manage().window().maximize();
    var welcome_msg = element(by.xpath("//h1[contains(text(),'Welcome, Please Sign In!')]"));
    expect<any>(welcome_msg.getText()).toEqual('Welcome, Please Sign In!');
    welcome_msg.getText().then(function (text) {
      console.log(text);
      element(by.xpath("//a[contains(text(),'Log in')]")).click();
      element(by.xpath("//input[@ id='Email']")).sendKeys('testdemowebshop@gmail.com');
      element(by.xpath("//input[@ id='Password']")).sendKeys('Test123');
      element(by.xpath("//input[@ class='button-1 login-button']")).click();
      element(by.xpath("//span[contains(text(),'Shopping cart')]")).click().then(function () {
        var cartsize = element(by.xpath("//body/div[4]/div[1]/div[1]/div[2]/div[1]/ul[1]/li[3]/a[1]/span[2]")); //xpath to find the cart size.
        cartsize.getText().then(function (size) {
          if (size == "(0)") {
            console.log("your cart is empty");
          }
          else {
            console.log("lets clear the existing items before proceeding");
            element.all(by.xpath("//input[@name='removefromcart']")).then(function (items) {
              var i;
              for (i = 0; i < items.length; i++) {
                items[i].click();
              }
              //browser.sleep(3000); // for debugging purpose only

              element(by.xpath("//body/div[4]/div[1]/div[4]/div[1]/div[1]/div[2]/div[1]/form[1]/div[1]/div[1]/input[1]")).click(); // update cart to remove items.
            });
          }
          element(by.xpath("//body/div[4]/div[1]/div[2]/ul[1]/li[1]/a[1]")).click();
          //browser.sleep(3000);
          element.all(by.className("button-2 product-box-add-to-cart-button")).then(function (add_buttons){
            add_buttons[0].click().then(function() {
              //browser.sleep(3000);
              var addMsg = element(by.xpath("//body/div[@id='bar-notification']/p[1]"));
              expect<any>(addMsg.getText()).toEqual('The product has been added to your shopping cart'); // validating popup msg.
              element(by.xpath("//span[contains(text(),'Shopping cart')]")).click();
              //browser.sleep(3000);
              var subTotal = element(by.xpath("//tbody/tr[1]/td[2]/span[1]/span[1]"));
              expect<any>(subTotal.getText()).toEqual('10.00');
              subTotal.getText().then(function (text){
                console.log("subtotal -> "+text);
              });
              element(by.xpath("//input[@id='termsofservice']")).click(); // this xpath validates the terms and conditions check box.
              //browser.sleep(3000);
              element(by.xpath("//button[@id='checkout']")).click();
              //browser.sleep(3000);
              element.all(by.id("billing-address-select")).click();
              //browser.sleep(3000); 
              element.all(by.id("billing-address-select")).click();
              element(by.xpath("//option[contains(text(),'Test863 Test863, Test863, Test863 Test863, India')]")).click(); // this is for selecting billing address
              //browser.sleep(5000);
              element(by.buttonText('Continue')).click();
              //browser.sleep(5000);
              element.all(by.xpath("//select[@id='shipping-address-select']")).click();
              //browser.sleep(5000);
              element(by.xpath("//body/div[4]/div[1]/div[4]/div[1]/div[1]/div[2]/ol[1]/li[2]/div[2]/form[1]/div[1]/div[1]/div[1]/div[1]/div[1]/select[1]/option[9]")).click(); // this is for selecting shipping address
              //browser.sleep(5000);
              element(by.xpath("//body/div[4]/div[1]/div[4]/div[1]/div[1]/div[2]/ol[1]/li[2]/div[2]/div[1]/input[1]")).click(); // this xpath is used to click on continue button
              //browser.sleep(5000);
              element(by.id("shippingoption_0")).isSelected(); // this xpath is for selecting shipping type
              //browser.sleep(5000);
              element(by.className("button-1 shipping-method-next-step-button")).click(); // this xpath is for clicking on continue button
              //browser.sleep(5000);
              element(by.id("paymentmethod_0")).click();  // this xpath is used for selecting payment method
              //browser.sleep(5000);
              element(by.className("button-1 payment-method-next-step-button")).click();
              //browser.sleep(5000);
              var paymentModeMsg = element(by.xpath("//tbody//tr//td//p"));
              expect<any>(paymentModeMsg.getText()).toEqual('You will pay by COD');
              element(by.className("button-1 payment-info-next-step-button")).click();
              //browser.sleep(5000);

              element(by.className("button-1 confirm-order-next-step-button")).click();
              //browser.sleep(5000);

              var orderNo = element(by.xpath("//ul[@class = 'details']/li[1]"));
              orderNo.getText().then( function(text){
                console.log(text)
              });
              //browser.sleep(5000);
              element(by.className("button-2 order-completed-continue-button")).click();
              //browser.sleep(5000);
              




            });
          });
        });
      });
    });
  });
});
