import React, { Component } from 'react';
import './Details.scss';
import BarChart from '../BarChart/BarChart';
import mapMarker from '../assets/images/mapMarker.png';
import DoughnutChart from '../DoughnutChart/DoughnutChart';

const Details =(props) => {
    return (
      <div className = "details-section" id="detailsContainer">
        <div className  = "details-head">
          <h2>{props.data.income.placeName}</h2>
        </div>
        <div className = "top-bar">
          <BarChart data={props.data.income}></BarChart>
          <BarChart data={props.data.age}></BarChart>
        </div>
        <div className ="doughnut-charts">
          <DoughnutChart></DoughnutChart>
        </div>

      </div>
    );
}

export default Details;




