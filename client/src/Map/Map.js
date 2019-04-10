import React, {Component} from 'react';
import mapboxgl from 'mapbox-gl'
import './Map.scss'
import key from '../mapKey'
import countydata from '../geographyData/countydata.json';

mapboxgl.accessToken = key

const mapOptions = [
  {
    'name':'Unemployment Rate',
    'property':'unemploymentRate',
    'stops':[
     [1.9, '#f0f9e8'],
     [2.9, '#bae4bc'],
     [3.9, '#7bccc4'],
     [8.9, '#2b8cbe']
    ]
  },
  {
    'name':'Median Household Income',
    'property': 'medianhouseholdincome',
    'stops': [
      [2900, '#f0f9e8'],
      [2900, '#bae4bc'],
      [49539, '#7bccc4'],
      [70077, '#43a2ca'],
      [111154, '#0868ac'],
    ]
  }
]

class Map extends Component {

  constructor(props){
    super(props)
      this.state = {
        activeLayer: mapOptions[0],
        mapObj: {}
      }
  }

  componentDidUpdate() {
    this.createMap();
  }

  componentDidMount() {
    this.createMap();
  }

  createMap (){
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/msantra/cjubdei266aw11fpph8r7qkym',
      center: [-105.5, 39 ],
      zoom: 6
    });

    map.on('load', function() {

      map.addSource('counties', {
        'type': 'geojson',
        'data': countydata
      });

      map.addLayer({
        'id': 'county-fill',
        'type': 'fill',
        'paint':{
          'fill-outline-color': 'white'
        },
        'source': 'counties'
      },'country-label');
    });

    let selectedProperty = this.state.activeLayer.property
    console.log(selectedProperty)
    map.on('mousemove', function(e){
      let selectedCounty = map.queryRenderedFeatures(e.point);
      if(selectedCounty.length > 0) {
        console.log(selectedCounty[0].properties[selectedProperty])

        // console.log(selected)
        // if(selectedProperty === 'unemploymentRate') {
        //    console.log(selectedCounty[0].properties[selectedProperty])
        // } else {
        //   console.log(selectedCounty[0].properties.medianhouseholdincome)
        // }

      }

    })
      this.setFill(map);
  }

  setFill(map) {
    const {property, stops} = this.state.activeLayer;

    map.on('load', function() {
      map.setPaintProperty('county-fill', 'fill-color',{
        property,
        stops
      });
    })
  }

   render () {
     const {name, stops, property} = this.state.activeLayer;
     const renderRadio = (option, i) => {
       console.log(mapOptions[i])
        return (
          <label key={i} className="radio-container">
            <input onChange={()=> this.setState({activeLayer: mapOptions[i]})} checked ={option.property === property} name="toggle" type="radio" />
            <div className = "radio-label">{option.name}</div>
          </label>
       )
     }
    return (
      <div className = "county-map">
        <div className = "map-side">
          <div id = "map-sidebar">
            {mapOptions.map(renderRadio)}
          </div>
          <div id="map-info">
            <p>hello</p>
          </div>
        </div>
        <div className = "main-map">
          <div className = "map-holder" ref={el => this.mapContainer = el} />
        </div>
      </div>
    )
  }

}

export default Map