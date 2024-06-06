import React from 'react'
import { Link } from 'react-router-dom'
import '../../App.css';
import BackgroundImage from '../../assets/images/car_rental.jpg'

export default function UserDetails() {
    return (
    <div class="main-content">
      <header style={ HeaderStyle }>
      <div className='offset-lg-3 col-lg-6'>
        <form className='container'>
          <div className='card'>
            <div className='card-header'>
              <h1 className='user-title'>My Account</h1>
            </div>

            <div className='card-body'>
              <div className='row'>

                <div className='col-lg-6'>
                  <div className='form-group'>
                    <label className='label-name'>Full Name <span className='errmsg'></span></label>
                    <input className='form-control'></input>
                  </div>
                </div>
                <div className='col-lg-6'>
                  <div className='form-group'>
                    <label className='label-name'>Phone <span className='errmsg'></span></label>
                    <input className='form-control'></input>
                  </div>
                </div>

                <div className='col-lg-6'>
                  <div className='form-group'>
                    <label className='label-name'>Birthday <span className='errmsg'></span></label>
                    <input type='date' className='form-control' placeholder='mm/dd/yyyy'></input>
                  </div>
                </div>

                <div className='col-lg-6'>
                  <div className='form-group'>
                    <label className='label-name'>Gender <span className='errmsg'></span></label>
                    <select className='form-control'>
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                    </select>
                  </div>
                </div>

                <div className='col-lg-6'>
                  <div className='form-group'>
                    <label className='label-name'>Address <span className='errmsg'></span></label>
                    <textarea className='form-control' placeholder='Enter your home address'></textarea>
                  </div>
                </div>

                <div className='col-lg-6'>
                  <div className='form-group'>
                    <label className='label-name'>City <span className='errmsg'></span></label>
                    <input className='form-control'></input>
                  </div>
                </div>

                <div className='col-lg-6'>
                  <div className='form-group'>
                    <label className='label-name'>State <span className='errmsg'></span></label>
                    <select className='form-control'>
                      <option value="AL">Alabama</option>
                      <option value="AK">Alaska</option>
                      <option value="AZ">Arizona</option>
                      <option value="AR">Arkansas</option>
                      <option value="CA">California</option>
                      <option value="CO">Colorado</option>
                      <option value="CT">Connecticut</option>
                      <option value="DE">Delaware</option>
                      <option value="FL">Florida</option>
                      <option value="GA">Georgia</option>
                      <option value="HI">Hawaii</option>
                      <option value="ID">Idaho</option>
                      <option value="IN">Indiana</option>
                      <option value="IA">Iowa</option>   
                      <option value="KS">Kansan</option>
                      <option value="KY">Kentucky</option>
                      <option value="LA">Louisiana</option>
                      <option value="ME">Maine</option>
                      <option value="MD">Maryland</option>
                      <option value="MA">Massachusetts</option>
                      <option value="MI">Michigan</option>
                      <option value="MN">Minnesota</option>
                      <option value="MS">Mississippi</option>
                      <option value="MO">Missouri</option>
                      <option value="MT">Montana</option>
                      <option value="NE">Nebraska</option>
                      <option value="NV">Nevada</option>
                      <option value="NH">New Hampshire</option>
                      <option value="NJ">New Jersey</option>
                      <option value="NM">New Mexico</option>
                      <option value="NY">New York</option>
                      <option value="NC">North Carolina</option>
                      <option value="ND">North Dakota</option>
                      <option value="OH">Ohio</option>
                      <option value="OK">Oklahoma</option>
                      <option value="OR">Oregon</option>
                      <option value="PA">Pennsylvania</option>
                      <option value="RI">Rhode Island</option>
                      <option value="SC">South Carolina</option>
                      <option value="SD">South Dakota</option>
                      <option value="TN">Tennessee</option>
                      <option value="TX">Texas</option>
                      <option value="UT">Utah</option>
                      <option value="VT">Vermont</option>
                      <option value="VA">Virginia</option>
                      <option value="WA">Washington</option>
                      <option value="WV">West Virginia</option>
                      <option value="WI">Wisconsin</option>
                      <option value="WY">Wyoming</option>
                    </select>
                  </div>
                </div>

                <div className='col-lg-6'>
                  <div className='form-group'>
                    <label className='label-name'>Zip <span className='errmsg'></span></label>
                    <input className='form-control'></input>
                  </div>
                </div>
              </div>
            </div>
            <Link to="/home">
            <div className='card-footer'>
              <button type='submit' className='btn btn-primary btn-submit'>Update</button> 
            </div>
            </Link>
          </div>
        </form>
      </div>
      </header>
    </div>

    );
}


const HeaderStyle = {
  width: "100%",
  height: "100vh",
  background: `url(${BackgroundImage})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover"
}