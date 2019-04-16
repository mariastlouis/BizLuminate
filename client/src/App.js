import React, { Component } from 'react';
import './App.scss';
import Map from './Map/Map';
import Header from './Header/Header';
import Details from './Details/Details';
import {selectPlace} from './Helper/helper';

class App extends Component {

  constructor(props) {
    super(props)
    this.state ={
      selectedPlace: {}
    }
  }

  setPlace = async(id) => {
    const placeInfo = await selectPlace(id);
    this.setState({selectedPlace:placeInfo})
  }


  render() {
    return (
      <div className="App">
        <Header></Header>
        <Map getPlace = {this.setPlace}></Map>
        <Details data={[5,10,1,3]} size={[500,500]}></Details>
      </div>
    );
  }
}

export default App;
