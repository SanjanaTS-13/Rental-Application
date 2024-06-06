import React, { useState } from "react";
import "../../App.css";
import { Link } from "react-router-dom";
import BackgroundImage from "../../assets/images/car-service1.jpeg";

const CarServices = () => {
  const [selectedServices, setSelectedServices] = useState([]);
  const serviceRate = 20; // USD per service

  const serviceOptions = [
    "Oil Change",
    "Brake Inspection",
    "Tire Rotation",
    "Engine Tune-up",
    "Transmission Service",
    "Air Conditioning Service",
    "Spark Plug Replacement",
    "Ignition System Inspection",
    "Battery Replacement",
    "Wheel Alignment",
    "Coolant Flush",
  ];

  const handleServiceChange = (event) => {
    const selectedService = event.target.value;

    if (!selectedServices.includes(selectedService)) {
      if (selectedServices.length < 3) {
        setSelectedServices([...selectedServices, selectedService]);
      } else {
        alert('You can select up to 3 services.');
      }
    }
  };

  const calculateTotalAmount = () => {
    return selectedServices.length * serviceRate;
  };



  return (
    <div className="searchBody">
      <header style={HeaderStyle}>
        {/* <section className='header'>
        <p className="hello">Car Services Available </p>
      </section> */}
        <br></br>
        <br></br>
        <div className="car-services-container">
          <h2>Car Repair & Services</h2>
          <div className="service-dropdown">
            <label htmlFor="services">Select a Service:</label>
            <select
              id="services"
              name="services"
              value={""} // Reset the select value to an empty string after selection
              onChange={handleServiceChange}
            >
              <option value="">Select Service</option>
              {serviceOptions.map((service, index) => (
                <option key={index} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>
          {selectedServices.length > 0 && (
            <div className="selected-service-info">
              <p>Selected Services:</p>
              <ul>
                {selectedServices.map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
              <p>Total Amount: ${calculateTotalAmount()}</p>
              {calculateTotalAmount() !== null && (
                <div>
                  <Link to={`/check-out/${calculateTotalAmount()}`}>
                    <button className="checkout-button">
                      Proceed to Checkout
                    </button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default CarServices;

const HeaderStyle = {
  width: "100%",
  height: "100vh",
  background: `url(${BackgroundImage})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};
