import React, {Component} from 'react';
import './Card.scss';

export const  Map =(props) => {
  const showHideClassName = props.show ? "card display-block" : "card display-none";
  const {totalpop, medianIncomeDollars, bachelorHigher} = props.data

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

  return (
    <div>
      <div className = {showHideClassName} id="map-card">
        <p>Population: {formatNum(totalpop, 'comma')} </p>
        <p>Median income: {formatNum(medianIncomeDollars, 'currency')}</p>
        <p>Adult population with bachelors degrees: {formatNum(bachelorHigher, 'percentage')}</p>
        <button onClick={props.handleClose}>close</button>
      </div>
    </div>
  );
}

export default Map