import React, { useState } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../App.css";
import 'react-clock/dist/Clock.css';
import { Link } from 'react-router-dom';
import BackgroundImage from '../../assets/images/car4.jpg'
import "react-clock/dist/Clock.css";
// import CheckOut from "./CheckOut"


const Cardescription = ({ cars }) => {
  const { id } = useParams();
  const selectedCar = cars.find((car) => car.id === parseInt(id));
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [totalAmount, setTotalAmount] = useState(null);
  
  // const buttonRef = useRef(null);

  // console.log(selectedCar);
  if (!selectedCar) {
    return <div>Car not found</div>;
  }
  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/selectedCars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: "John Doe",
          carDetails: selectedCar.carName,
          startDate,
          endDate,
          startTime,
          endTime,
          brand: selectedCar.brand,
          rating: selectedCar.rating,
          model: selectedCar.model,
          price: selectedCar.price,
          speed: selectedCar.speed,
          gps: selectedCar.gps,
          seatType: selectedCar.seatType,
          automatic: selectedCar.automatic,
          description:selectedCar.description ,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        console.log("Car details saved successfully:", responseData.data);
        setTotalAmount(responseData.data.totalAmount);
      } else {
        console.error("Error saving car details:", response.statusText);
        setTotalAmount(null);
      }
    } catch (error) {
      console.error("Error saving car details:", error);
      setTotalAmount(null);
    }
  };
  

  return (
    <div className="searchBody">
      <header style={ HeaderStyle }>
        {/* <section className="header"> */}
          <p className="cars-heading">Car Details </p>
        {/* </section> */}
        <br></br>
        <br></br>
        <div className="card-description-container">
          <h2>{selectedCar.carName}</h2>
          <img src={selectedCar.imgUrl} alt={selectedCar.carName} className="car-image" />
          <div className="car-details">
            <p>Brand: {selectedCar.brand}</p>
            <p>Rating: {selectedCar.rating}</p>
            <p>Cost: ${selectedCar.price} /day</p>
            <p>Seat Type: {selectedCar.seatType}</p>
            <p>Gear: {selectedCar.automatic}</p>
            <p>Description: {selectedCar.description}</p>
            <div>
              <p>
                Start Date:{" "}
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </p>
              <p>
                Start Time:{" "}
                <DatePicker
                  selected={startTime}
                  onChange={(date) => setStartTime(date)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  dateFormat="h:mm aa"
                />
              </p>
              <p>
                End Time:{" "}
                <DatePicker
                  selected={endTime}
                  onChange={(date) => setEndTime(date)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  dateFormat="h:mm aa"
                />
              </p>
              <p>
                End Date:{" "}
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                />
              </p>
              <button className="save-button" onClick={handleSave}>Save Car Details</button>
              {totalAmount !== null && (
            <div>
              <p>Total Amount: ${totalAmount}</p>
              <Link to={`/check-out/${totalAmount}`}>
                  <button className="checkout-button">Proceed to Checkout</button>
              </Link>
            </div>
          )}
            </div>
          </div>
        </div>
        </header>
    </div>
  );
};

export default Cardescription;

const HeaderStyle = {
  width: "100%",
  height: "100%",
  background: `url(${BackgroundImage})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover"
}