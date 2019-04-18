import React from 'react';
import {Bar} from 'react-chartjs-2';
import { NONAME } from 'dns';

const VertBar = (props) => {
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
    <div className = "bar-chart">
      <Bar
       data={mapData}
       height ={500}
       options={{
         responsive: false,
         legend: {
           display: false,
         }
       }} />
    </div>
  );

}

export default VertBar;