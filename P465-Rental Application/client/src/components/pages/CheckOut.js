import React, { useState } from "react";
import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { PayPalButton } from "react-paypal-button-v2";
import { useParams } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

import BackgroundImage from "../../assets/images/payment.png";

function CheckOut() {
  const { totalAmount } = useParams();
  const [showModal, setShowModal] = useState(false);
  const onSuccess = (details, data) => {
    console.log("Transaction completed by " + details.payer.name.given_name);
    setShowModal(true);
  };

  const onCancel = (data) => {
    console.log("Payment was canceled");
  };

  const onError = (err) => {
    console.error("Error occurred:", err);
  };

  const handleClose = () => setShowModal(false);

  return (
    <div>
      <header style={ HeaderStyle2 }>
      {/* ==============================================
	    Credit Card Payment Section
	    ===============================================*/}
      <div>
        <p className="cars-heading">Welcome to Checkout</p>
      </div>
      <section class="credit-card">
        <div class="container">
          <div class="card-holder">
            {/* <div class="card-box bg-news" style={HeaderStyle}> */}
                <div class="col-lg-6">
                  <div class="img-box">
                    {/* <img src="../../assets/images/payment.png" alt="Payment-logo"class="img-fluid" />  */}
                  </div>
                </div>
                {/* <div class="col-lg-6">
				
				<form>
				  <div class="card-details">
					<h3 class="title">Credit Card Details</h3>
					<div class="row">
					  <div class="form-group col-sm-7">
					   <div class="inner-addon right-addon">
						<label for="card-holder">Card Holder</label>
                        <i class="far fa-user"></i>
						<input id="card-holder" type="text" class="form-control" placeholder="Card Holder" aria-label="Card Holder" aria-describedby="basic-addon1"/>
					   </div>	
					  </div>
					  <div class="form-group col-sm-5">
						<label for="">Expiration Date</label>
						<div class="input-group expiration-date">
						  <input type="text" class="form-control" placeholder="MM" aria-label="MM" aria-describedby="basic-addon1"/>
						  <span class="date-separator">/</span>
						  <input type="text" class="form-control" placeholder="YY" aria-label="YY" aria-describedby="basic-addon1"/>
						</div>
					  </div>
					  <div class="form-group col-sm-8">
					   <div class="inner-addon right-addon">
						<label for="card-number">Card Number</label>
                        <i class="far fa-credit-card"></i>
						<input id="card-number" type="text" class="form-control" placeholder="Card Number" aria-label="Card Holder" aria-describedby="basic-addon1"/>
					   </div>	
					  </div>
					  <div class="form-group col-sm-4">
						<label for="cvc">CVC</label>
						<input id="cvc" type="text" class="form-control" placeholder="CVC" aria-label="Card Holder" aria-describedby="basic-addon1"/>
					  </div>
					  <div class="form-group col-sm-12">
						<button type="button" class="btn btn-primary btn-block">Proceed</button>
					  </div>
					</div>
				  </div>
				</form>				
				
				</div>  */}
                <PayPalButton
                  amount={totalAmount}
                  currency="USD"
                  onSuccess={onSuccess}
                  onCancel={onCancel}
                  onError={onError}
                  options={{
                    clientId:
                      "AbLPw0gb-TEOm3LlGBtbKYNBrdp0VGVAhgf3ctwah08Z99ZQOyGbvkzwFzwYH8SfjQIjZ3zMXjX9iQPI",
                  }}
                />
                <Modal show={showModal} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Payment Successful</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Thank you for your payment! Your transaction was successful.
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
            {/* </div> */}
          </div>
        </div>
      </section>
      </header>
    </div>
  );
}
export default CheckOut;

const HeaderStyle2 = {
  width: "100%",
  height: "100vh",
  background: `url(${BackgroundImage})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover"
}
