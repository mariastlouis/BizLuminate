import React, {Component} from 'react';
import mapboxgl from 'mapbox-gl'
import './Map.scss'
import key from '../mapKey'
import countydata from '../geographyData/countydata.json';

mapboxgl.accessToken = key

const mapLayers = [
  {
    id: 'unemploymentRate',
    name: 'Unemployement Rate',
    checked: true,
  },
  {
    id: 'medianHouseholdIncome',
    name: 'Median Household Income',
    checked: false
  }
]

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
    'name':'Median Family Income',
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
    const oldMap = this.state.mapObj;
    oldMap.remove()
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/msantra/cjubdei266aw11fpph8r7qkym',
      // style: 'mapbox://styles/msantra/cju9br68i4r8w1gnq67cec8xs',
      center: [-106.110198, 37.751359 ],
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
        'source': 'counties'
      },'country-label');
    })
      this.setFill(map);

  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/msantra/cjubdei266aw11fpph8r7qkym',
      // style: 'mapbox://styles/msantra/cju9br68i4r8w1gnq67cec8xs',
      center: [-106.110198, 37.751359 ],
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
        'source': 'counties'
      },'country-label');
    })
      this.setState({mapObj: map})
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
        <div id = "map-sidebar">
          {mapOptions.map(renderRadio)}
        </div>
        <div className = "main-map">
          <div className = "map-holder" ref={el => this.mapContainer = el} />
        </div>
      </div>
    )
  }

}

export default Map