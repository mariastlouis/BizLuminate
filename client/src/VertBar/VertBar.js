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
        '#bfc1c1',
        '#a8ddb5',
        '#7bccc4',
        '#43a2ca',
        '#0868ac'
      ],
      hoverBackgroundColor: [
        '#bfc1c1',
        '#a8ddb5',
        '#7bccc4',
        '#43a2ca',
        '#0868ac'
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