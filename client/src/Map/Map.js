import React, {Component} from 'react';
import mapboxgl from 'mapbox-gl'
import './Map.scss'
import key from '../mapKey'
import countydata from '../geographyData/countydata.json';
import {countyIdFetch} from '../Helper/helper'
import {mapOptions} from '../geographyData/mapOptions.js'

mapboxgl.accessToken = key

class Map extends Component {

  constructor(props){
    super(props)
      this.state = {
        activeLayer:{},
      }
  }

  componentDidUpdate() {
    this.createMap();
    document.getElementById('map-info').innerHTML='<p>Hover over a county</p>'
  }

  componentWillMount(){
    this.setState({activeLayer: mapOptions[0]})
  }

  componentDidMount() {
    this.createMap()
  }

  createMap (){
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/msantra/cjubdei266aw11fpph8r7qkym',
      center: [-104.5, 39.3 ],
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
    let selectedName = this.state.activeLayer.name

    map.on('mousemove', (e) => {
      let selectedCounty = map.queryRenderedFeatures(e.point);
      if(selectedCounty.length > 0 )  {
        let selectedNumber = selectedCounty[0].properties[selectedProperty]
        map.getCanvas().style.cursor = 'pointer'
        if(typeof selectedNumber !== "undefined") {
          document.getElementById('map-info').innerHTML='<h2>'+selectedName+'</h2> <p>'+selectedNumber+'</p>'
        }
      }
    });

    map.on('click', (e) => {
      let selectedCounty = map.queryRenderedFeatures(e.point);
      if(selectedCounty.length > 0) {
        let countyId = '8' + selectedCounty[0].properties.COUNTYFP;
        map.getCanvas().style.cursor = 'pointer'
        this.fetchCountyInfo(countyId)
      }
    })
    this.setFill(map)
  }

  fetchCountyInfo = async(id) => {
    const countyInfo = await countyIdFetch(id);

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

  bgColor(property){
    const selectedProperty = this.state.activeLayer.property
    if(selectedProperty === property){
      return '#5abdb7'
    } return "";
  }

   render () {
     const {name, stops, property} = this.state.activeLayer;


     const renderRadio = (option, i) => {
        return (

          <label key={i} className="radio-container">
            <input onChange={()=> this.setState({activeLayer: mapOptions[i]})} checked ={option.property === property} name="toggle" type="radio" />
            <div className = "radio-label" style ={{backgroundColor:this.bgColor(option.property)}}>{option.name}</div>
          </label>

       )
     }
    return (
      <div className = "county-map">
        <div className = "map-side">
          <div id = "map-sidebar">
            <div className = "map-buttons">
              {mapOptions.map(renderRadio)}
            </div>

          </div>
        </div>
        <div className = "main-map">
          <div className = "map-holder" ref={el => this.mapContainer = el} />
          <div id="map-info">
            <p>Hover over a county. Click on the county to see additional details</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Map