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
        <div className = "chart-section">
          <div class ="chart-head">
            <h2>Getting around</h2>
            <div className ="short-line"></div>
          </div>
          <div className ="chart-holder">
            <div className ="chart-subhead">
              <h3>{props.data.transportation.chartName}</h3>
              <div className ="short-line"></div>
            </div>
            <DoughnutChart data= {props.data.transportation.travel}></DoughnutChart>
            <BarChart data={props.data.transportation.commute}></BarChart>
          </div>
        </div>
        <div className ="chart-section">
          <BarChart data={props.data.income}></BarChart>
          <BarChart data={props.data.age}></BarChart>
        </div>
        <div className ="chart-section">
          <DoughnutChart data= {props.data.education.level}></DoughnutChart>
        </div>

      </div>
    );
}

export default Details;




