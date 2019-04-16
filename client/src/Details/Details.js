import React, { Component } from 'react';
import {HorizontalBar} from 'react-chartjs-2';
import './Details.scss';
const data = {
  labels: ['Median income'],
  datasets: [
    {
      label: 'Boulder',
      backgroundColor: 'rgb(90,189,183)',
      borderColor: 'rgb(90,189,183)',
      borderWidth: 2,
      hoverBackgroundColor: 'rgba(90,189,183, 0.4)',
      hoverBorderColor: 'rgba(90,189,183, 0.4)',
      data: [65]
    },
    {
      label: 'Colorado',
      backgroundColor: 'rgb(112,112,112)',
      borderColor: 'rgb(112,112,112)',
      borderWidth: 2,
      hoverBackgroundColor: 'rgba(112,112,112,0.4)',
      hoverBorderColor: 'rgba(112,112,112,0.4)',
      data: [81]
    }
  ]
};

class Details extends Component {
  render() {
    return (
      <div className ="details-section">
        <div className = "chart-container">
        <HorizontalBar
          data={data}
          width={100}
          height={125}
          options={{
            maintainAspectRatio: false,
          }}
        />
        </div>
      </div>
    );
  }
}

export default Details;




