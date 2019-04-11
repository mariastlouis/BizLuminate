import React, { Component } from 'react';
import './App.scss';
import Map from './Map/Map';
import Header from './Header/Header';

class App extends Component {
  componentDidMount() {
    fetch('/api/v1/places/8001')
      .then(res => res.json())
      .then((data) => {
        // console.log(JSON.stringify(data, null, 2));
        JSON.stringify(data, null, 2);
      });
  }

  render() {
    return (
      <div className="App">
       <Header></Header>
       <Map></Map>
      </div>
    );
  }
}

export default App;
