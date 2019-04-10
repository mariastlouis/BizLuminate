import React, {Component} from 'react';
import mapboxgl from 'mapbox-gl'
import './Map.scss'
import key from '../mapKey'

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

class Map extends Component {

  constructor(props){
    super(props)
      this.state = {
        activeLayer: mapLayers[0],
        previousLayer: ''
      }
  }

  componentDidMount() {
     const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/msantra/cju9br68i4r8w1gnq67cec8xs',
      center: [-106.110198, 37.751359 ],
      zoom: 6
    });

    console.log(map.style)


     map.on('mousemove', function(e) {
        let counties = map.queryRenderedFeatures(e.point);
        if(counties.length > 0) {
          document.getElementById('map-sidebar').innerHTML= '<h2>'+counties[0].properties.NAMELSAD10 + '</h2>'
          console.log(counties[0].properties.NAMELSAD10)
        }
       });





}
    // this.map.on('load', () => {

      // mapLayers.forEach((layer)=>{
        // let input = document.createElement('input');
        // input.type = 'checkbox';
        // input.id = layer.id;
        // input.checked = true;
        // mapSidebar.appendChild('input')

        // let label = document.createElement('label');
        // label.setAttribute('for', layer.id);
        // label.textContent = layer.name;
        // mapSidebar.appendChild(label)

      // })
    // })


  getCheckboxes = () => {
    mapLayers.map((layer, index) => {
      return (
       <p>hello</p>
        // <input type = "checkbox" name="layer-select" value = {layer.layerid} checked = {layer.checked}>
        //   {layer.name}
        // </input>
      )
    })
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