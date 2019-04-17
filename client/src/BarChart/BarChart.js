import React, { Component } from 'react';
import {HorizontalBar} from 'react-chartjs-2';
import './BarChart.scss';

const BarChart = (props) => {
  const {placeName, placeData, stateData} = props.data
  const mapData = {
      labels: ['Median income'],
      datasets: [
        {
          label: placeName,
          backgroundColor: 'rgb(90,189,183)',
          borderColor: 'rgb(90,189,183)',
          borderWidth: 2,
          hoverBackgroundColor: 'rgba(90,189,183, 0.4)',
          hoverBorderColor: 'rgba(90,189,183, 0.4)',
          data: [placeData]
        },
        {
          label: 'Colorado',
          backgroundColor: 'rgb(112,112,112)',
          borderColor: 'rgb(112,112,112)',
          borderWidth: 2,
          hoverBackgroundColor: 'rgba(112,112,112,0.4)',
          hoverBorderColor: 'rgba(112,112,112,0.4)',
          data: [stateData]
        }
      ]
    };
      return (
      <div className = "bar-chart-section">
        <div className = "chart-container">
        <HorizontalBar
          data={mapData}
          width={125}
          height={100}
          options={{
            maintainAspectRatio: false,
          }}
        />

        </div>
      </div>
    );
}

export default BarChart;

