import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import './DoughnutChart.scss';
const DoughnutChart = (props) => {
const {placeData, labels} = props.data

  const mapData = {
    labels: labels,
    datasets: [{
      data: placeData,
      backgroundColor: [
      '#edf8fb',
      '#bfc1c1',
      '#a8ddb5',
      '#7bccc4',
      '#43a2ca',
      '#0868ac'
      ],
      hoverBackgroundColor: [
      '#edf8fb',
      '#bfc1c1',
      '#a8ddb5',
      '#7bccc4',
      '#43a2ca',
      '#0868ac'
      ]
    }]
  };
      return (
        <div className = "doughnut-chart">
          <Doughnut
           data={mapData}
           width ={400}
           options={{
             legend: {
               position: 'right'
             },
             responsive: false
           }} />
        </div>
      );


}

export default DoughnutChart