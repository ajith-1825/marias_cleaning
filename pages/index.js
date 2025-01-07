import { useAuth } from '../hooks/Auth';
import { useForm } from '../hooks/Form';
import { useState, useEffect } from 'react';
import Slider from 'react-slider';
import myImage from '../public/img (1).png';
import Image from "next/image";
import Link from "next/link";
import Header from "../hooks/header"

export default function Home() {
  const { user, loading, error, handleLogin, handleLogout } = useAuth();
  const { formData, handleChange, handleSubmit, handleSliderChange, handleCheckboxChange, err, setFormData } = useForm(user);
  const [size, setSize] = useState(1000);
  const [cleaningType, setCleaningType] = useState('regular');
  const [numRooms, setNumRooms] = useState(1);
  const [numBathrooms, setNumBathrooms] = useState(1);
  const [providedItems, setProvidedItems] = useState(false);
  const [estimatedCost, setEstimatedCost] = useState(0);

  useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, [user]); // Log only when 'user' changes

  
  if(user) console.log(user);

  const calculateCost = (updatedFormData) => {
    let baseprice = 300;

    if (updatedFormData.squareFootage <= 2000) baseprice += 0;
    else if (updatedFormData.squareFootage <= 6000) baseprice += 200;

    if (updatedFormData.property === 'apartment') baseprice += 50;
    if (updatedFormData.property === 'house') baseprice += 100;
    if (updatedFormData.property === 'condo') baseprice += 150;

    if (updatedFormData.cleanType === 'movingin/out') baseprice += 50;
    if (updatedFormData.cleanType === 'deep') baseprice += 100;

    baseprice += updatedFormData.numRooms * 20 + updatedFormData.bathRooms * 30;

    if (updatedFormData.providedItems) baseprice -= 20;

    setEstimatedCost(baseprice); // Update estimated cost
    setFormData(prevFormData => ({
      ...prevFormData,
      baseprice: baseprice // Update formData with baseprice
    }));
  };


  const handleSliderChangeWithCost = (name, value) => {
    handleSliderChange(name, value); // Update formData
    calculateCost({ ...formData, [name]: value }); // Recalculate cost
  };

  const handleChangeWithCost = (e) => {
    handleChange(e); // Update formData
    const { name, value } = e.target;
    calculateCost({ ...formData, [name]: value }); // Recalculate cost
  };

  const handleCheckboxChangeWithCost = (e) => {
    handleCheckboxChange(e); // Update formData
    calculateCost({ ...formData, providedItems: e.target.checked }); // Recalculate cost
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Header/>
            <section className="booking-section">
              <h1 className="booking-header">Cleaning Service Booking</h1>
              {!user ? (
                <button className="login-button" onClick={handleLogin}>Login with Google</button>
              ) : (
                <>
                  <p className="welcome-message">Welcome, {user.displayName}</p>
                  <button className="logout-button" onClick={handleLogout}>Logout</button>
                  <form className="booking-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label>
                        Frequency:
                        <select name="frequency" value={formData.frequency} onChange={handleChange}>
                          <option value='one-time'>One-time</option>
                          <option value="weekly">Weekly</option>
                          <option value="bi-weekly">Bi-Weekly</option>
                        </select>
                      </label>
                    </div>
                    <div className="form-group">
                      <label>
                        Day of the Week:
                        <input
                          type="date"
                          name="dayOfWeek"
                          value={formData.dayOfWeek}
                          onChange={handleChange}
                          required
                        />
                      </label>
                    </div>
                    <div className="form-group">
                      <label>
                        Start Time:
                        <input
                          type="time"
                          name="startTime"
                          value={formData.startTime}
                          onChange={handleChangeWithCost}
                          required
                        />
                      </label>
                    </div>
                    <div className="slider-container">
                      <label className="slider-label">Size of home (sq.ft): {formData.squareFootage}</label>
                      <Slider
                        className="react-slider"
                        thumbClassName="slider-thumb"
                        trackClassName="react-slider-track"
                        min={1000}
                        max={6000}
                        value={Number(formData.squareFootage)}
                        onChange={(value) => handleSliderChangeWithCost('squareFootage', value)} 
                        marks={[1000, 2000, 3000, 4000, 5000, 6000]}  
                        step={100}
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        First Name:
                        <input
                          type="text"
                          name="fname"
                          value={formData.fname}
                          onChange={handleChangeWithCost}
                          required
                        />
                      </label>
                    </div>
                    <div className="form-group">
                      <label>
                        Last Name:
                        <input
                          type="text"
                          name="lname"
                          value={formData.lname}
                          onChange={handleChangeWithCost}
                          required
                        />
                      </label>
                    </div>
                    <div className="form-group">
                      <label>
                        Phone Number:
                        <input
                          type="number"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChangeWithCost}
                          required
                        />
                      </label>
                    </div>
                    <div className="form-group">
                      <label>
                        Street Address:
                        <input
                          type="text"
                          name="streetAddress"
                          value={formData.streetAddress}
                          onChange={handleChangeWithCost}
                          required
                        />
                      </label>
                    </div>
                    <div className="form-group">
                      <label>
                        City:
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChangeWithCost}
                          required
                        />
                      </label>
                    </div>
                    <div className="form-group">
                      <label className="slider-label">Type of Property:</label>
                      <select name='property' onChange={handleChangeWithCost} value={formData.property}>
                        <option value="studio">Studio</option>
                        <option value="apartment">Apartment</option>
                        <option value="condo">Condo</option>
                        <option value="house">House</option>
                      </select>
                    </div>
                    {formData.frequency==='one-time' && (
                    <div className="form-group">
                      <label className="slider-label">Type of Cleaning:</label>
                      <select name='cleanType' onChange={handleChangeWithCost} value={formData.cleanType}>
                        <option value="regular">Regular</option>
                        <option value="movingin/out">Moving In/Out</option>
                        <option value="deep">Deep Cleaning</option>
                      </select>
                    </div>
                      )}
                      <div className="slider-container">
                        <label className="slider-label">Number of Rooms: {formData.numRooms}</label>
                        <Slider
                          className="react-slider"
                          thumbClassName="slider-thumb"
                          trackClassName="react-slider-track"
                          min={1}
                          max={10}
                          value={Number(formData.numRooms)}
                          onChange={(value) => handleSliderChangeWithCost('numRooms', value)} 
                          marks={[1, 5, 10]}  
                          step={1}
                        />
                      </div>
                      <div className="slider-container">
                        <label className="slider-label">Number of Bathrooms: {formData.bathRooms}</label>
                        <Slider
                          className="react-slider"
                          thumbClassName="slider-thumb"
                          trackClassName="react-slider-track"
                          min={1}
                          max={5}
                          value={Number(formData.bathRooms)}
                          onChange={(value) => handleSliderChangeWithCost('bathRooms', value)} 
                          marks={[1, 5]}  
                          step={1}
                        />
                      </div>
                      <div className="checkbox-container">
                        <input
                          type="checkbox"
                          name="providedItems"
                          checked={formData.providedItems} 
                          onChange={handleCheckboxChangeWithCost} 
                        />
                        <label>Cleaning items provided by customer</label>
                      </div>
                    <button className="submit-button" type="submit">Book Cleaning</button>
                  </form>
                  <div className="estimated-cost">
                    Estimated Cost: ${formData.baseprice}
                  </div>
                  {err && <p className="error-message">{err}</p>}
                </>
              )}
            </section>

    </div>
  );
}
