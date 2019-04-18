import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import './DoughnutChart.scss';
const DoughnutChart = (props) => {
  const {placeName, placeData, labels, chartName} = props.data

  const mapData = {
    labels: labels,
    datasets: [{
      data: placeData,
      backgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56',
      '#5abdb7',
      '#fea946'
      ],
      hoverBackgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56',
      '#5abdb7',
      '#fea946'
      ]
    }]
  };
      return (
        <div className = "doughnut-chart">
          <Doughnut
           data={mapData}
           options={{
             legend: {
               position: 'right'
             }
           }} />
        </div>
      );


}

export default DoughnutChart