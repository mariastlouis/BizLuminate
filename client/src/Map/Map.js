import React, {Component} from 'react';
import mapboxgl from 'mapbox-gl'
import './Map.scss'
import {mapKey} from '../mapKey'
import countydata from '../geographyData/countydata.json';
import {countyIdFetch, altFuelFetch} from '../Helper/helper'
import {mapOptions} from '../geographyData/mapOptions.js'


mapboxgl.accessToken = mapKey

const bounds = [
  [ -110.795166, 36.703349],
  [-98.204833, 41.803789]
]


class Map extends Component {

  constructor(props){
    super(props)
      this.state = {
        activeLayer:{},
        stations: {},
        mapObj: {}
      }
  }

  componentDidUpdate() {
    this.createMap();
    if(this.state.activeLayer.type === 'choropleth') {
      document.getElementById('map-info').innerHTML='<p>Hover over a county</p>'
    } else {
      document.getElementById('map-info').innerHTML='<p>Zoom in and click to get information on locations</p>'

    }
  }

  componentWillMount = async () => {
    this.setState({activeLayer: mapOptions[0]})
    let altFuel = await altFuelFetch();
    this.setState({stations: altFuel})
  }

  componentDidMount() {
    this.createMap()
  }

  createMap (){

    const type = this.state.activeLayer.type
    const mapType = type === 'choropleth' ? this.choroplethMap() : this.clusterMap();
    return mapType
  }

  choroplethMap(){
    const {property, name} = this.state.activeLayer;

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/msantra/cjubdei266aw11fpph8r7qkym',
      center: [-104.5, 39.3 ],
      zoom: 6,
      maxBounds: bounds

    });

      map.on('load',() => {

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

    map.on('mousemove', (e) => {
      let selectedCounty = map.queryRenderedFeatures(e.point);

      if(selectedCounty.length > 0 && typeof selectedCounty !=='undefined')  {
        let countyName = selectedCounty[0].properties.county_name
        let selectedNumber = selectedCounty[0].properties[property]
        map.getCanvas().style.cursor = 'pointer'
          if(typeof selectedNumber !== "undefined") {
            document.getElementById('map-info').innerHTML='<h2>'+countyName+'</h2> <p>'+name+": "+selectedNumber+'</p>'
          }
      }
    });

    map.on('click', (e) => {
      let selectedCounty = map.queryRenderedFeatures(e.point);
      console.log(selectedCounty)
      if(selectedCounty.length > 0) {
        let countyId = '8' + selectedCounty[0].properties.COUNTYFP;
        map.getCanvas().style.cursor = 'pointer'
        this.fetchCountyInfo(countyId)
      }
    });

    this.setFill(map)
  }

  clusterMap(){
    let altFuel = this.state.stations;
    let paintProp = this.state.activeLayer.paint

    this.mapContainer.innerHTML = null

    const clusterMap = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/msantra/cjuei1zod2ki91fmul8pz65wo',
      center: [-104.5, 39.3 ],
      zoom: 6,
      minZoom: 6,
      maxBounds: bounds
    });

    clusterMap.on('load', function(){
      clusterMap.addSource('stations', {
        'type':'geojson',
        'data':altFuel,
        'cluster':true,
        'clusterMaxZoom':14,
        'clusterRadius':50
      });

      clusterMap.addLayer({
        'id':'clusters',
        'type':'circle',
        'source':'stations',
        'filter':['has','point_count'],
        'layout':{
          'visibility':'visible'
        },
        paint: paintProp
      });

      clusterMap.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "stations",
        filter: ["has", "point_count"],
        layout: {
        "text-field": "{point_count_abbreviated}",
        "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
        "text-size": 12
        }
        });

        clusterMap.addLayer({
        id: "unclustered-point",
        type: "circle",
        source: "stations",
        filter: ["!", ["has", "point_count"]],
        paint: {
        "circle-color": "#5abdb7",
        "circle-radius": 6,
        "circle-stroke-width": 1,
        "circle-stroke-color": "#fff"
        }
        });
    })
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
      return '#6cdbd4'
    } return "";
  }

  textColor(property){
    const selectedProperty = this.state.activeLayer.property
    if(selectedProperty === property) {
      return 'white'
    } return ""
  }

   render () {
     const {name, stops, property} = this.state.activeLayer;
     const renderRadio = (option, i) => {
        return (
          <label key={i} className="radio-container">
            <input onChange={()=> this.setState({activeLayer: mapOptions[i]})} checked ={option.property === property} name="toggle" type="radio" />
            <div className = "radio-label" style ={{color:this.textColor(option.property), backgroundColor:this.bgColor(option.property)}}>{option.name}</div>
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
          </div>
        </div>
      </div>
    )
  }
}

export default Map