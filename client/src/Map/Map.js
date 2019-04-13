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
      minZoom: 6
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
        id: 'cluster-count',
        type: 'symbol',
        source: 'stations',
        filter: ['has', 'point_count'],
        layout: {
        'text-field': '{point_count_abbreviated}',
        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        'text-size': 12
        }
        });

      clusterMap.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'stations',
        filter: ['!', ['has', 'point_count']],
        paint: {
          'circle-color': '#ccebc5',
          'circle-radius': 6,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#fff'
        }
      });
    });

    clusterMap.on('click', 'unclustered-point', (e) => {
      let features = clusterMap.queryRenderedFeatures(e.point, { layers: ['unclustered-point'] });
      if(features.length) {
        let address = features[0].properties.address;
        let city = features[0].properties.city
        let zip = features[0].properties.zip
          document.getElementById('map-info').innerHTML='<h2>'+city+'</h2> <p>'+address+" "+ zip+'</p>'
      }
    })

    clusterMap.on('click', 'clusters', (e) => {
      let features = clusterMap.queryRenderedFeatures(e.point, { layers: ['clusters'] });

      let clusterId = features[0].properties.cluster_id;

      clusterMap.getSource('stations').getClusterExpansionZoom(clusterId, (err, zoom) => {
        if (err)
        return;

        clusterMap.easeTo({
        center: features[0].geometry.coordinates,
        zoom: zoom
        });
      });
    });

    clusterMap.on('mouseenter', 'clusters', () => {
      clusterMap.getCanvas().style.cursor = 'pointer';
    });

    clusterMap.on('mouseenter', 'unclustered-point',() => {
      clusterMap.getCanvas().style.cursor = 'pointer';
    });

    clusterMap.on('mouseleave', 'clusters', () => {
      clusterMap.getCanvas().style.cursor = '';
    });

    clusterMap.on('mouseleave', 'unclustered-point', () => {
      clusterMap.getCanvas().style.cursor = '';

    });
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
      });
  }

  styles(property){
    const selectedProperty = this.state.activeLayer.property;
    const styleObj = {
      borderBottom: '2px solid #fea946'
    }
    return selectedProperty === property ? styleObj : null
  }

   render () {
     const { stops,property, type, name} = this.state.activeLayer;

     const renderRadio = (option, i) => {
        return (
          <label key={i} className="radio-container">
            <input onChange={()=> this.setState({activeLayer: mapOptions[i]})} checked ={option.property === property} name="toggle" type="radio" />
            <div className = "radio-label" style ={this.styles(option.property)}>{option.name}</div>
          </label>
       )
     }

    const renderLegend = (stop = 0, i) => {
      if(type === 'choropleth') {
        return (
          <div key = {i} className = 'legend-key'>
            <div class = "legend-block">
              <span className = "legend-color" style={{ backgroundColor: stop[1]}}></span>
              <span className ="legend-value">{`${stop[0].toLocaleString()}`}</span>
            </div>
          </div>
        )
      }
    }
    return (
      <div className = "county-map">
        <div className = "map-buttons">
          {mapOptions.map(renderRadio)}
        </div>
        <div className = "main-map">
          <div className = "map-holder" ref={el => this.mapContainer = el} />
          <div class = "map-sider">
            <div id="map-info"></div>
            <div id="map-legend">
              {stops.map(renderLegend)}
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default Map