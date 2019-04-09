import React, {Component} from 'react';
import mapboxgl from 'mapbox-gl'
import './Map.scss'
import key from '../mapKey'
import countydata from '../geographyData/countydata.json'
// import {countyUnemploymentFetch} from '../Helper/helper';
// import countydatasimple from '../geographyData/countydatasimple.json'
// import data from '../geographyData/data.json'

mapboxgl.accessToken = key

const options = [{
  name: "unemployment",
  description: 'Unemployment by Colorado County',
  property: 'unemploymentRate',
  stops: [
    [0, '#f8d5cc'],
    [3, '#f4bfb6'],
    [4, '#ee8f9a'],
    [90, '#9f43d7']
  ]
}]

class Map extends Component {

  constructor(props){
    super(props)
      this.state = {
        active: options[0]
      }
  }

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/msantra/cju9br68i4r8w1gnq67cec8xs',
      center: [-106.110198, 37.751359 ],
      zoom: 6
    });

    this.map.on('load', () => {
      console.log(this.map.getStyle().sources)
      console.log(this.map.style)
      // this.map.addSource('counties', {
      //   type: 'geojson',
      //   data: countydata
      // })

      // this.map.addSource('counties', {
      //   type: 'vector',
      //   url: 'mapbox://msantra.7x1t01n6'
      // })

      console.log(this.map.getStyle().sources)
      console.log(this.map.style)
      // this.map.addLayer({
      //   'id': 'countyData',
      //   'type': 'fill',
      //   'source': 'counties',
      //   'paint':{
      //     'fill-color':'#f8d5cc',


      //   }
      // },'background');

    })
  }
    // setFill() {
    //   const {property, stops} = this.state.active;
    //   this.map.setPaintProperty('counties', 'fill-color', {
    //     property,
    //     stops
    //   });
    //   console.log(this.map.style)
    // }
    // this.map.on('load', () => {
    //   this.map.addSource('counties', {
    //     type: 'vector',
    //     url: 'mapbox://countyMapData-9pozcu'
    //   });


      // this.map.addLayer({
      //   id: 'counties',
      //   type: 'fill',
      //   source: 'countyMapData-9pozcu',
      //   paint: {
      //     "fill-color": '#9f43d7'
      //   }
      // }, 'country-label-lg');

    // })


  // setFill() {
  //   const { property, stops } = this.state.active;
  //   this.map.setPaintProperty('countries', 'fill-color', {
  //     property,
  //     stops
  //   });
  // }

   render () {
    return (
      <div className = "county-map">
        <div className = "map-sidebar">
          <p> sidebar content goes here</p>
        </div>
        <div className = "main-map">
          <div className = "map-holder" ref={el => this.mapContainer = el} />
        </div>
      </div>
    )
  }

}

export default Map