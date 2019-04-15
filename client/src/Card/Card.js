import React, {Component} from 'react';
import './Card.scss';

export const  Map =(props) => {
  console.log(props.show)
    const showHideClassName = props.show ? "card display-block" : "card display-none";
    return (
      <div>
        <div className = {showHideClassName}>
          <p>Population: {props.data.totalpop} </p>
          <p>Median income: {props.data.medianIncomeDollars}</p>
          <p>Adult population with bachelors degrees: {props.data.bachelorHigher}</p>
          <button onClick={props.handleClose}>close</button>
        </div>
      </div>
    );
}

export default Map