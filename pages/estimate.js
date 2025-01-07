import React, { useState } from 'react';
import Slider from 'react-slider';
import myImage from '../public/img (1).png';
import Image from "next/image";
import Link from "next/link";
import Header from "../hooks/header"
// import '../styles/SliderStyles.css'; // Ensure the custom CSS file is imported for styles

const Calculator = () => {
  const [size, setSize] = useState(1000);
  const [cleaningType, setCleaningType] = useState('regular');
  const [propertyType, setPropertyType] = useState('studio');
  const [numRooms, setNumRooms] = useState(1);
  const [numBathrooms, setNumBathrooms] = useState(1);
  const [providedItems, setProvidedItems] = useState(false);

  // Estimate cost based on inputs
  const calculateCost = () => {
    let baseCost = 200;

    // Base cost based on size
    if (size <= 2000) baseCost += 0;
    else if (size <= 6000) baseCost += 200;

    if(propertyType=='apartment') baseCost +=50;
    if(propertyType=='house') baseCost +=100;
    if(propertyType=='condo') baseCost +=150;

    // Additional cost based on cleaning type
    if (cleaningType === 'movingin/out') baseCost += 50;
    if (cleaningType === 'deep') baseCost += 100;

    // Additional cost per room and bathroom
    baseCost += numRooms * 20 + numBathrooms * 30;

    // Adjust based on whether cleaning items are provided
    if (providedItems) baseCost -= 20;

    return baseCost;
  };

  return (
    <div>
        <Header/>
        <div className="calculator-container">
            <h1>Cost Calculator</h1>

            {/* Size of Home */}
            <div className="slider-container">
                <label className="slider-label">Size of Home (sq ft): {size}</label>
                <Slider
                className="react-slider"
                thumbClassName="slider-thumb"
                trackClassName="react-slider-track"
                min={1000}
                max={6000}
                value={size}
                onChange={(value) => setSize(value)}
                marks={[1000, 2000, 3000, 4000, 5000, 6000]}  // Updated marks to an array
                step={100}
                />
            </div>

            {/* Type of Cleaning */}
            <div>
                <label className="slider-label">Type of Cleaning:</label>
                <select onChange={(e) => setCleaningType(e.target.value)} value={cleaningType}>
                <option value="regular">Regular</option>
                <option value="movingin/out">Moving In/Out</option>
                <option value="deep">Deep Cleaning</option>
                </select>
            </div>

            {/* Type of Property */}
            <div>
                <label className="slider-label">Type of Property:</label>
                <select onChange={(e) => setPropertyType(e.target.value)} value={propertyType}>
                <option value="apartment">Apartment</option>
                <option value="studio">Studio</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                </select>
            </div>

            {/* Number of Rooms */}
            <div className="slider-container">
                <label className="slider-label">Number of Rooms: {numRooms}</label>
                <Slider
                className="react-slider"
                thumbClassName="slider-thumb"
                trackClassName="react-slider-track"
                min={1}
                max={10}
                value={numRooms}
                onChange={(value) => setNumRooms(value)}
                marks={[1, 5, 10]}  // Updated marks to an array
                step={1}
                />
            </div>

            {/* Number of Bathrooms */}
            <div className="slider-container">
                <label className="slider-label">Number of Bathrooms: {numBathrooms}</label>
                <Slider
                className="react-slider"
                thumbClassName="slider-thumb"
                trackClassName="react-slider-track"
                min={1}
                max={5}
                value={numBathrooms}
                onChange={(value) => setNumBathrooms(value)}
                marks={[1, 3, 5]}  // Updated marks to an array
                step={1}
                />
            </div>

            {/* Checkbox for cleaning items */}
            <div className="checkbox-container">
                <input
                type="checkbox"
                checked={providedItems}
                onChange={() => setProvidedItems(!providedItems)}
                />
                <label>Cleaning items provided by customer</label>
            </div>

            {/* Display estimated cost */}
            <div className="estimated-cost">
                Estimated Cost: ${calculateCost()}
            </div>
            </div>
    </div>
  );
};

export default Calculator;
