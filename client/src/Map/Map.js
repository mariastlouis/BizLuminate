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
    'name':'unemployment',
    'property':'unemploymentRate',
    'stops':[
     [1.9, '#f0f9e8'],
     [2.9, '#bae4bc'],
     [3.9, '#7bccc4'],
     [8.9, '#2b8cbe']
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

  setFill(map) {
    console.log(map)
    const {property, stops} = this.state.activeLayer;
    map.on('load', function() {
      map.setPaintProperty('county-fill', 'fill-color',{
        property,
        stops
      });
    })

  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      // style: 'mapbox://styles/msantra/cju9br68i4r8w1gnq67cec8xs',
      center: [-106.110198, 37.751359 ],
      zoom: 6
    });

    map.on('load', function() {
   map.addSource('counties', {
        'type': 'geojson',
        'data': countydata
      })


      map.addLayer({
        'id': 'county-fill',
        'type': 'fill',
        'source': 'counties'
      },'state-label');
      })

      // this.setState({mapObj: map})
      // console.log(this.state.mapObj)
      this.setFill(map);
}






   render () {
    return (
      <div className = "county-map">
        <div id = "map-sidebar">

        </div>
        <div className = "main-map">
          <div className = "map-holder" ref={el => this.mapContainer = el} />
        </div>
      </div>
    )
  }

}

export default Map