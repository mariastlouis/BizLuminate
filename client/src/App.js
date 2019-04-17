import React, { Component } from 'react';
import './App.scss';
import Map from './Map/Map';
import Header from './Header/Header';
import Details from './Details/Details';
// import Bar from './Details/Bar';
import BarChart from './BarChart/BarChart';
import {selectPlace} from './Helper/helper';

class App extends Component {

  constructor(props) {
    super(props)
    this.state ={
      selectedPlace: {},
    }
  }

  setPlace = async(id) => {
    const placeInfo = await selectPlace(id);
    this.setState({selectedPlace:placeInfo})
    this.setState({showDetails: true})
  }

  showDetails = () => {
    this.setState({showDetails: true})
  }

  hideDetails = () => {
    this.setState({showDetials: false})
  }


  render() {
    return (
      <div className="App">
        <Header></Header>
        <Map getPlace = {this.setPlace}></Map>
        {this.state.showDetails && <Details data ={this.state.selectedPlace}></Details>}

      </div>
    );
  }
}

export default App;
