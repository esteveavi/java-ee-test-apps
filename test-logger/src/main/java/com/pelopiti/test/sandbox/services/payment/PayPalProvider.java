package com.pelopiti.test.sandbox.services.payment;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import com.paypal.api.payments.Address;
import com.paypal.api.payments.Amount;
import com.paypal.api.payments.AmountDetails;
import com.paypal.api.payments.CreditCard;
import com.paypal.api.payments.FundingInstrument;
import com.paypal.api.payments.Payer;
import com.paypal.api.payments.Payment;
import com.paypal.api.payments.Transaction;
import com.paypal.core.ConfigManager;
import com.paypal.core.rest.APIContext;
import com.paypal.core.rest.OAuthTokenCredential;
import com.paypal.core.rest.PayPalRESTException;

@PayPalPaymentProcessor
public class PayPalProvider implements PaymentProcessor{
	
	
	InputStream is = null;
	
	
	
	public PayPalProvider() throws PayPalRESTException{
		
		System.out.println("STARTING PayPalProvider");
		
		InputStream is = PayPalProvider.class.getResourceAsStream("/sdk_config.properties");
		Payment.initConfig(is);
		System.out.println("STARTED PayPalProvider");
		
	}
	
	public String getAccessToken() throws PayPalRESTException {

		// ###AccessToken
		// Retrieve the access token from
		// OAuthTokenCredential by passing in
		// ClientID and ClientSecret
		String clientID = ConfigManager.getInstance().getValue("clientID");
		String clientSecret = ConfigManager.getInstance().getValue(
				"clientSecret");

		return new OAuthTokenCredential(clientID, clientSecret)
				.getAccessToken();
	}

	
	
	public void checkoutPayment(){
		System.out.println("START Checking out PayPalProvider");
		// ###Address
		// Base Address object used as shipping or billing
		// address in a payment. [Optional]
		Address billingAddress = new Address();
		billingAddress.setCity("Johnstown");
		billingAddress.setCountryCode("US");
		billingAddress.setLine1("52 N Main ST");
		billingAddress.setPostalCode("43210");
		billingAddress.setState("OH");

		// ###CreditCard
		// A resource representing a credit card that can be
		// used to fund a payment.
		CreditCard creditCard = new CreditCard();
		creditCard.setBillingAddress(billingAddress);
		creditCard.setCvv2("874");
		creditCard.setExpireMonth("11");
		creditCard.setExpireYear("2018");
		creditCard.setFirstName("Joe");
		creditCard.setLastName("Shopper");
		creditCard.setNumber("4417119669820331");
		creditCard.setType("visa");

		// ###AmountDetails
		// Let's you specify details of a payment amount.
		AmountDetails amountDetails = new AmountDetails();
		amountDetails.setShipping("1");
		amountDetails.setSubtotal("5");
		amountDetails.setTax("1");

		// ###Amount
		// Let's you specify a payment amount.
		Amount amount = new Amount();
		amount.setCurrency("USD");
		// Total must be equal to sum of shipping, tax and subtotal.
		amount.setTotal("7");
		amount.setDetails(amountDetails);

		// ###Transaction
		// A transaction defines the contract of a
		// payment - what is the payment for and who
		// is fulfilling it. Transaction is created with
		// a `Payee` and `Amount` types
		Transaction transaction = new Transaction();
		transaction.setAmount(amount);
		transaction
				.setDescription("This is the payment transaction description.");

		// The Payment creation API requires a list of
		// Transaction; add the created `Transaction`
		// to a List
		List<Transaction> transactions = new ArrayList<Transaction>();
		transactions.add(transaction);

		// ###FundingInstrument
		// A resource representing a Payeer's funding instrument.
		// Use a Payer ID (A unique identifier of the payer generated
		// and provided by the facilitator. This is required when
		// creating or using a tokenized funding instrument)
		// and the `CreditCardDetails`
		FundingInstrument fundingInstrument = new FundingInstrument();
		fundingInstrument.setCreditCard(creditCard);

		// The Payment creation API requires a list of
		// FundingInstrument; add the created `FundingInstrument`
		// to a List
		List<FundingInstrument> fundingInstrumentList = new ArrayList<FundingInstrument>();
		fundingInstrumentList.add(fundingInstrument);

		// ###Payer
		// A resource representing a Payer that funds a payment
		// Use the List of `FundingInstrument` and the Payment Method
		// as 'credit_card'
		Payer payer = new Payer();
		payer.setFundingInstruments(fundingInstrumentList);
		payer.setPaymentMethod("credit_card");

		// ###Payment
		// A Payment Resource; create one using
		// the above types and intent as 'sale'
		Payment payment = new Payment();
		payment.setIntent("sale");
		payment.setPayer(payer);
		payment.setTransactions(transactions);

		try {
			// ###AccessToken
			// Retrieve the access token from
			// OAuthTokenCredential by passing in
			// ClientID and ClientSecret
			// It is not mandatory to generate Access Token on a per call basis.
			// Typically the access token can be generated once and
			// reused within the expiry window
			String accessToken = getAccessToken();

			// ### Api Context
			// Pass in a `ApiContext` object to authenticate 
			// the call and to send a unique request id 
			// (that ensures idempotency). The SDK generates
			// a request id if you do not pass one explicitly. 
			APIContext apiContext = new APIContext(accessToken);
			// Use this variant if you want to pass in a request id  
			// that is meaningful in your application, ideally 
			// a order id.
			/* 
			 * String requestId = Long.toString(System.nanoTime();
			 * APIContext apiContext = new APIContext(accessToken, requestId ));
			 */

			// Create a payment by posting to the APIService
			// using a valid AccessToken
			// The return object contains the status;
			Payment createdPayment = payment.create(apiContext);
		
			System.out.println("Created payment with id = " + createdPayment.getId()
					+ " and status = " + createdPayment.getState());
		} catch (PayPalRESTException e) {
			//req.setAttribute("error", e.getMessage());
			e.printStackTrace();
			System.out.println("EXCEPTION Checking out PayPalProvider: "+e.getMessage());
		}
		System.out.println("END Checking out PayPalProvider");
		//req.setAttribute("request", Payment.getLastRequest());

		
	}
	
	
}
