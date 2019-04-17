import React, { Component } from 'react';
import {HorizontalBar} from 'react-chartjs-2';
import './Details.scss';
import BarChart from '../BarChart/BarChart';


const Details =(props) => {
    const mapData = {
      labels: ['Median income'],
      datasets: [
        {
          label: props.data.income.placeName,
          backgroundColor: 'rgb(90,189,183)',
          borderColor: 'rgb(90,189,183)',
          borderWidth: 2,
          hoverBackgroundColor: 'rgba(90,189,183, 0.4)',
          hoverBorderColor: 'rgba(90,189,183, 0.4)',
          data: [props.data.income.placeData]
        },
        {
          label: 'Colorado',
          backgroundColor: 'rgb(112,112,112)',
          borderColor: 'rgb(112,112,112)',
          borderWidth: 2,
          hoverBackgroundColor: 'rgba(112,112,112,0.4)',
          hoverBorderColor: 'rgba(112,112,112,0.4)',
          data: [props.data.income.stateData]
        }
      ]
    };

    return (
      <div className = "details-section">
        <div className = "chart-container">
        <BarChart data={props.data.income}></BarChart>
        </div>
      </div>
    );
}

export default Details;




