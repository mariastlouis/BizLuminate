import React, { Component } from 'react';
import {HorizontalBar} from 'react-chartjs-2';
import './Details.scss';
import BarChart from '../BarChart/BarChart';


const Details =(props) => {
    return (
      <div className = "details-section">
        <div className  = "details-head">
          <h2>{props.data.income.placeName}</h2>
        </div>
        <div className = "top-bar">
          <BarChart data={props.data.income}></BarChart>
          <BarChart data={props.data.age}></BarChart>
        </div>
      </div>
    );
}

export default Details;




