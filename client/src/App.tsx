import React, { Component } from 'react';
import logo from './logo.svg';
import Place from '../../server/api-objects/Place';
import './App.scss';
import Map from './Map/Map'

class App extends Component {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    fetch('/api/v1/places/8001')
      .then(res => res.json())
      .then((data: Array<Place>) => {
        console.log(JSON.stringify(data, null, 2));
      });
  }

  render() {
    return (
      <div className="App">
        <Map></Map>
      </div>
    );
  }
}

export default App;
