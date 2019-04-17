import React from 'react';
import './Card.scss';
import mapMarker from '../assets/images/mapMarker.png';

const formatNum = (number = 0, type ='comma') => {
  if(type === 'currency') {
    return number.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits:0 })
  } else if (type === 'percentage') {
    return number + "%"
  }
  else {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}

export const  Map =(props) => {
  const showHideClassName = props.show ? "card display-block" : "card display-none";
  const {placeId, totalpop, medianIncomeDollars, bachelorHigher, placeDisplayName} = props.data

  return (
    <div>
      <div className = {showHideClassName} id="map-card">
        <div className = "close-card" onClick={props.handleClose}>

        </div>
        <div className = "card-title">
          <img className ="marker" src={mapMarker} alt ="map marker"/>
          <h2>{placeDisplayName}</h2>
        </div>
        <ul className ="card-list">
          <li><strong>Population:</strong> {formatNum(totalpop, 'comma')}</li>
          <li><strong>Median income:</strong> {formatNum(medianIncomeDollars, 'currency')}</li>
          <li><strong>Bachelors degrees:</strong> {formatNum(bachelorHigher, 'percentage')}</li>
        </ul>
        <div className = "btn-holder">
          <button className ="place-btn" onClick={() => props.getPlace(placeId)}>Learn More</button>
        </div>
      </div>
    </div>
  );
}

export default Map